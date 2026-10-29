#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════
# F1 재현 테스트 — deploy-webpage.sh 동시 실행 시 미완성 산출물이 릴리스/current 가 되는가
#   (formal/deploy-release-atomicity, TLC 반례 MC_bug.cfg 의 인터리빙을 결정적으로 강제)
#
#   사용: bash test_F1_concurrent_deploy.sh [deploy-webpage.sh 경로]   (기본: 저장소의 deployment/deploy-webpage.sh)
#   종료코드: 0 = 모든 속성 단언 통과, 1 = 속성 위반, 2 = 하네스 오류(타임아웃 등)
#
#   외부 의존(git·npm·nginx·docker·sudo)은 PATH 앞에 둔 가짜 명령으로 대체한다. 네트워크·sudo·실제 nginx 는 쓰지 않는다.
#   가짜 `npm run build:static` 은 out/index.html 을 먼저 쓰고(1단계) 게이트 파일을 기다린 뒤 _next/static/app.js 를 쓴다(2단계).
#   → 모델의 BuildStart / BuildEnd 경계에 정확히 barrier 가 놓인다.
#
#   강제하는 인터리빙 (TLC trace, MC_bug.cfg):
#     A: Acquire, Clean, BuildStart, BuildEnd(npm 아직 종료 안 함)
#     B: Acquire, Clean(rm -rf out — A 의 완성 산출물 삭제), BuildStart(index.html 만 생성)
#     A: npm 종료 → test -f out/index.html 통과 → cp -a (B 의 미완성 out/) → current 교체     ← P1·P2 위반
#     B: BuildEnd → cp → current 교체
# ═══════════════════════════════════════════════════════════════════════════
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="${1:-$HERE/../../../deployment/deploy-webpage.sh}"
SCRIPT="$(cd "$(dirname "$SCRIPT")" && pwd)/$(basename "$SCRIPT")"
[ -f "$SCRIPT" ] || { echo "harness: script not found: $SCRIPT" >&2; exit 2; }

WORK="$(mktemp -d "${TMPDIR:-/tmp}/aicl-deploy-repro.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT
FAKEBIN="$WORK/bin"; GATES="$WORK/gates"; export DEPLOY_ROOT="$WORK/deploy"
mkdir -p "$FAKEBIN" "$GATES" "$DEPLOY_ROOT/repo/.git"     # .git 이 있으면 스크립트는 clone 을 건너뛴다

# ── 가짜 외부 명령 ────────────────────────────────────────────────────────
cat > "$FAKEBIN/git" <<'G'
#!/usr/bin/env bash
case "${1:-}" in
  rev-parse) echo "sha${REPRO_ID}" ;;        # 릴리스 디렉터리를 구분하기 위해 실행 id 를 섞는다
  log)       echo "fake commit (${REPRO_ID})" ;;
  *)         : ;;                            # fetch / checkout / reset → no-op
esac
G
cat > "$FAKEBIN/npm" <<'N'
#!/usr/bin/env bash
# ci → no-op.  run build:static → 2단계 비원자적 산출 (게이트로 제어)
wait_for() { local i=0; while [ ! -e "$1" ]; do sleep 0.05; i=$((i+1)); [ $i -gt 600 ] && { echo "fake npm: gate timeout $1" >&2; exit 97; }; done; }
case "${1:-}" in
  ci) exit 0 ;;
  run)
    mkdir -p out/_next/static
    echo "<html>build ${REPRO_ID}</html>" > out/index.html          # BuildStart: index.html 이 먼저 생긴다
    touch "$GATES/$REPRO_ID.index_written"
    wait_for "$GATES/$REPRO_ID.go_finish"
    echo "app ${REPRO_ID}" > out/_next/static/app.js                # BuildEnd: 나머지 자산
    touch "$GATES/$REPRO_ID.built"
    wait_for "$GATES/$REPRO_ID.go_exit"                              # 명령 종료 시점을 하네스가 결정
    exit 0 ;;
  *) exit 0 ;;
esac
N
printf '#!/usr/bin/env bash\nexit 0\n' > "$FAKEBIN/docker"     # `docker ps` → 컨테이너 없음 → nginx reload 생략 경로
printf '#!/usr/bin/env bash\nexit 1\n' > "$FAKEBIN/sudo"       # sudo 는 절대 쓰지 않는다
chmod +x "$FAKEBIN"/*
export PATH="$FAKEBIN:/usr/bin:/bin"                             # /usr/sbin 제외 → nginx 미발견
export GATES

wait_gate() { # wait_gate <file> [<pid>]  — pid 가 먼저 끝나면 'exited' 반환
  local i=0
  while [ ! -e "$1" ]; do
    if [ -n "${2:-}" ] && ! kill -0 "$2" 2>/dev/null; then echo exited; return 0; fi
    sleep 0.05; i=$((i+1)); [ $i -gt 600 ] && { echo "harness: timeout waiting for $1" >&2; exit 2; }
  done
  echo ok
}
run_deploy() { # run_deploy <id> → 백그라운드 실행, pid 는 LAST_PID (서브셸을 쓰면 wait 가 불가능하므로 전역 변수로 전달)
  REPRO_ID="$1" bash "$SCRIPT" > "$WORK/$1.log" 2>&1 &
  LAST_PID=$!
}
fail=0
assert() { # assert <desc> <cond-exit-code>
  if [ "$2" -eq 0 ]; then echo "  PASS  $1"; else echo "  FAIL  $1"; fail=1; fi
}
release_complete() { [ -f "$1/index.html" ] && [ -f "$1/_next/static/app.js" ]; }

echo "== F1 concurrent deploy repro — script: $SCRIPT"
echo "== work dir: $WORK"

# ── 1. A: 빌드 완료 직전까지 ─────────────────────────────────────────────
run_deploy A; PID_A=$LAST_PID
wait_gate "$GATES/A.index_written" "$PID_A" >/dev/null
touch "$GATES/A.go_finish"
wait_gate "$GATES/A.built" "$PID_A" >/dev/null
echo "step 1: A built out/ completely (npm not yet exited)"

# ── 2. B: 시작 → rm -rf out → index.html 만 생성 (또는 잠금으로 즉시 종료) ──
run_deploy B; PID_B=$LAST_PID
B_STATE=$(wait_gate "$GATES/B.index_written" "$PID_B")
if [ "$B_STATE" = exited ]; then
  wait "$PID_B"; B_RC=$?
  echo "step 2: B exited early with rc=$B_RC (lock?) — $(tail -1 "$WORK/B.log")"
else
  echo "step 2: B cleaned out/ and wrote index.html only (partial)"
fi

# ── 3. A: npm 종료 → test -f → cp -a → current 교체 ───────────────────────
touch "$GATES/A.go_exit"
wait "$PID_A"; A_RC=$?
echo "step 3: A finished rc=$A_RC — $(tail -1 "$WORK/A.log")"

echo "== P1 (CurrentComplete) after A's swap"
CUR="$(readlink "$DEPLOY_ROOT/current" 2>/dev/null || true)"; CUR_NAME="$(basename "${CUR:-none}")"
rc=1; [ -n "$CUR" ] && release_complete "$CUR" && rc=0
assert "current → complete release (index.html + _next/static/app.js) [current=$CUR_NAME]" $rc

# ── 4. B 마무리 ──────────────────────────────────────────────────────────
if [ "$B_STATE" != exited ]; then
  touch "$GATES/B.go_finish" "$GATES/B.go_exit"
  wait "$PID_B"; B_RC=$?
  echo "step 4: B finished rc=$B_RC — $(tail -1 "$WORK/B.log")"
else
  # 잠금으로 거절된 B 를 A 종료 후 다시 실행 — 잠금이 해제되었는지(C1) 확인
  rm -f "$GATES"/B.*
  run_deploy B; PID_B=$LAST_PID
  wait_gate "$GATES/B.index_written" "$PID_B" >/dev/null
  touch "$GATES/B.go_finish" "$GATES/B.go_exit"
  wait "$PID_B"; B_RC=$?
  echo "step 4: B re-run after A rc=$B_RC — $(tail -1 "$WORK/B.log")"
  assert "C1: lock released after A — sequential B succeeds" "$B_RC"
fi

echo "== P2 (ReleasesComplete) at rest"
p2=0
shopt -s nullglob
for r in "$DEPLOY_ROOT"/releases/*/; do
  if release_complete "$r"; then echo "  release $(basename "$r"): complete"; else echo "  release $(basename "$r"): PARTIAL ($(cd "$r" && find . -type f | sort | tr '\n' ' '))"; p2=1; fi
done
assert "every releases/<sha> is complete (rollback candidates)" $p2

echo "== P1 at rest"
CUR="$(readlink "$DEPLOY_ROOT/current" 2>/dev/null || true)"; CUR_NAME="$(basename "${CUR:-none}")"
rc=1; [ -n "$CUR" ] && release_complete "$CUR" && rc=0
assert "current → complete release at rest [current=$CUR_NAME]" $rc

echo "== deploy logs"; sed 's/^/  A| /' "$WORK/A.log"; sed 's/^/  B| /' "$WORK/B.log"
[ $fail -eq 0 ] && { echo "RESULT: PASS"; exit 0; } || { echo "RESULT: FAIL (property violated)"; exit 1; }
