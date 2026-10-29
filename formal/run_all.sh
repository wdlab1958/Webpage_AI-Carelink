#!/usr/bin/env bash
# formal/run_all.sh — Three-Config Rule (표준 §6.1) 단언 + F1 재현 테스트
#   MC.cfg(fix ON)=PASS(0), MC_bug.cfg(fix OFF)=FAIL(12), MC_sanity.cfg=FAIL(12), repro=PASS(0, 수정 후 코드)
#   사용: bash formal/run_all.sh            (TLC_WORKERS 환경변수 존중, 기본 4)
#   필요: java 11+, ~/.cache/proof-skills/tla2tools.jar (또는 TLA2TOOLS=경로)
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TLA="$HERE/deploy-release-atomicity/tla"
JAR="${TLA2TOOLS:-$HOME/.cache/proof-skills/tla2tools.jar}"
[ -f "$JAR" ] || { echo "tla2tools.jar not found ($JAR) — proof-skills setup_tla.sh 로 설치" >&2; exit 2; }
WORKERS="${TLC_WORKERS:-4}"
fail=0
check() { # check <cfg> <expected-exit>
  local out="$TLA/.tlc-out/${1%.cfg}"; mkdir -p "$out"
  (cd "$TLA" && java -XX:+UseParallelGC -cp "$JAR" tlc2.TLC -workers "$WORKERS" -config "$1" -metadir "$out/states" DeployRelease.tla > "$out/tlc.log" 2>&1)
  local rc=$?; rm -rf "$out/states"; rm -f "$TLA"/DeployRelease_TTrace_* 2>/dev/null
  if [ "$rc" -eq "$2" ]; then echo "  OK    $1 → exit $rc (expected $2)"; else echo "  FAIL  $1 → exit $rc (expected $2)  see $out/tlc.log"; fail=1; fi
}
echo "== TLC three-config gate (Deployers={d1,d2})"
check MC.cfg 0
check MC_bug.cfg 12
check MC_sanity.cfg 12
echo "== F1 reproduction against current deployment/deploy-webpage.sh (expected PASS after fix)"
if bash "$HERE/deploy-release-atomicity/repro/test_F1_concurrent_deploy.sh" > "$HERE/deploy-release-atomicity/.repro-last.log" 2>&1; then
  echo "  OK    repro PASS"; else echo "  FAIL  repro exit $? — see $HERE/deploy-release-atomicity/.repro-last.log"; fail=1; fi
[ $fail -eq 0 ] && echo "ALL GATES OK" || { echo "GATE FAILURE"; exit 1; }
