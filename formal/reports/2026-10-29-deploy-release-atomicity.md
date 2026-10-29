# AiCarelink-Webpage 형식 검증 보고서 (WDLAB-STD-VERIFY-001)

- 프로젝트: **AiCarelink-Webpage** — www.ai-carelink.co.kr 대문 (Next.js 16 정적 export 마케팅·법적 고지 웹페이지), GitHub `wdlab1958/Webpage_AI-Carelink` `main`
- 검사일: **2026-10-29** · 검사한 commit: **`07e4dfc`** (docs(readme): 2026-10-15 기준 신규 구현 기능 반영)
- 표준: WDLAB-STD-VERIFY-001 v1.0 · 도구: proof-skills 0.1.1, TLA+ TLC 2026.10.28 (tla2tools v1.8.0), OpenJDK 21.0.12.1 · 모델: claude-fable-5-1 · Lean 4 미설치
- 워크플로: **W1 Bug hunt** (게이트 G0~G8)

## 1. 판정 요약

| 항목 | 값 |
|---|---|
| concern | `deploy-release-atomicity` — 가비아 서버 배포 스크립트 `deployment/deploy-webpage.sh` 의 릴리스 교체 프로토콜 |
| **Verdict** | **F1 `FIXED`** (CONFIRMED → 수정 → 모델·테스트 재통과 + mutation 확인) · 수정 후 모델 **`BOUNDED-PASS`** |
| 달성 레벨 | **L2** (TLA+/TLC bounded model check). L3 미주장(Lean 미설치) |
| 경계 (Bounds) | `Deployers = {d1, d2}`, 빌드 2단계(index.html 선행/자산 후행), 릴리스 정리 미발동 · fix ON: **49 states generated, 37 distinct, depth 13** · fix OFF: 120/76, 반례 depth 9 (P2) · 10 (P1) |
| 신뢰 기반 | TLC 2026.10.28 · 추상화 A1~A7 (§5) — 특히 `cp -a` 를 원자 스냅숏으로, 두 빌드의 혼합 트리를 complete 로 간주(모델이 보이는 것보다 실제가 더 나쁠 수 있음) |
| Findings | **1 FIXED** (F1) · **1 CONFIRMED-미수정** (F3, L0 자산 누락, HITL) · **1 SUSPECTED** (F2, 사장 코드) |
| 수정 파일 | `deployment/deploy-webpage.sh` (+9/-2: `flock -n` 배타 실행), `README.md` (형식 검증 섹션) |
| 재현 테스트 | `formal/deploy-release-atomicity/repro/test_F1_concurrent_deploy.sh` — 수정 전 FAIL(`evidence/test_before.log`), 수정 후 PASS(`evidence/test_after.log`) |
| HITL | G2 속성 동결·G7 수정 설계 승인 **pending (Brian)** |

> "검증됨" 의 의미: 위 경계와 추상화 안에서 동결 속성 P1·P2·P3·C1 의 반례가 없다는 뜻이다. 스크립트 전체 또는 사이트의 정확성 주장이 아니다.

## 2. 프로젝트 개요와 G0 후보표

이 저장소는 Next.js 16 **정적 export** 대문이다. 서버 로직·DB·폼 제출·서비스워커·i18n 토글이 없고, JS 72개 파일 대부분이 법적 고지 본문(`src/content/*.js`)과 프레젠테이션 컴포넌트다.
운영 상태를 바꾸는 로직은 배포 스크립트와 빌드 검사 스크립트뿐이다. `src/lib/api.js` 의 JWT 로그인·갱신 로직은 어디서도 import 되지 않는 **사장 코드**다(`grep -rn "lib/api" src` 0건).

| # | 후보 | 위치(수정 전 줄) | Blast × Conc. | 순위 | 처리 |
|---|---|---|---|---|---|
| C1 | 배포 스크립트 동시 실행 — 공유 `repo/out` 의 미완성 산출물이 릴리스/`current` 가 됨 | `deployment/deploy-webpage.sh:32-66` | H × M | **1** | **선정 → F1 FIXED** |
| C2 | 동시 401 → `tryRefreshToken()` 중복 → 회전된 refresh 토큰 실패 → `clearTokens()` 가 유효 토큰 삭제 | `src/lib/api.js:93-108, 120-139` | L(사장 코드) × H | 2 | F2 SUSPECTED, 기록만 |
| C3 | `/privacy` v1.0↔v1.1 게이트 `placeholders()` 완전성 (누락 시 `{{ }}` 공개 노출) | `src/app/privacy/page.js:15,44`, `src/content/privacy-v2.js:229-237` | M × L | 3 | L0: `out/privacy/index.html` 에 `{{` 0건 ✓; `SENSITIVE_BANNER`·`table.head` 미검사(현재 자리표시자 없음) 관찰 |
| C4 | `useTargets` 1회 캐시 + `AppRedirect` 400 ms 후 `location.replace` — SSR 기본 href 로 이동 가능성 | `src/lib/useTargets.js:8-13`, `src/components/AppRedirect.js:14-19` | L × L | 4 | 운영 빌드는 SSR 기본값도 운영 주소 → 영향 없음 |
| C5 | `check-legal-placeholders.mjs` 임시 파일 `scripts/.privacy-v2.tmp.mjs` 잔존·동시 덮어쓰기 | `scripts/check-legal-placeholders.mjs:28-31` | L × L | 5 | 관찰 |
| C6 | 쿠키 동의 `localStorage.cookieConsent` — 기록은 어디서도 읽지 않음 | `src/components/CookieConsent.js:17-56` | L × L | 6 | 모델링 대상 아님 |

**L0 정적 점검** (로컬 node v22.23.4): `npm run lint` PASS(0 warnings) · `node --check scripts/*.mjs`, `bash -n deployment/*.sh scripts/*.sh`, `python3 -m py_compile *.py` PASS · `STATIC_EXPORT=1 npm run build:static` PASS(21 페이지, localhost 링크 0건/185 files, 약관 자리표시자 0건, 개인정보처리방침 v1.1 자리표시자 41건은 설계상 게이트) · 내부 링크 13종 ↔ 라우트 18개 대응 PASS · **OG 이미지 `/images/og-image.png` 누락 FAIL → F3**. 로그: `formal/deploy-release-atomicity/evidence/l0_*.log`.

## 3. Finding F1 — 배포 스크립트 동시 실행으로 미완성 산출물이 `current` 가 됨 (severity high, **FIXED**)

### 3.1 위반 속성

- **P1 `CurrentComplete`** (동결): `current # None => rel[current] = "complete"` — `current` 가 가리키는 릴리스는 항상 완전한 산출물. 출처 `deployment/deploy-webpage.sh:8-9` "current 심볼릭 링크 교체(원자적)", `README.md:24` "실패 시 산출물을 배포하지 않습니다", `deployment/nginx/ai-carelink-www.conf:29` (`root …/current`).
- **P2 `ReleasesComplete`** (동결): `\A d : rel[d] \in {"none","complete"}` — 롤백 후보 무결. 출처 `deployment/deploy-webpage.sh:10`, `deployment/README.md:101`.

### 3.2 최소 반례 트레이스 (TLC BFS, `MC_bug_current.cfg`, UseLock = FALSE)

| # | Actor | Action | 코드 (수정 후 줄 [수정 전]) | 상태 변화 |
|---|---|---|---|---|
| 1 | — | `Init` | — | `out=absent`, `current=None`, `rel=none/none` |
| 2 | d1 | `Acquire(d1)` | `:41-44` [32-35] git fetch/reset | `pc[d1]=sync` |
| 3 | d1 | `Clean(d1)` | `:49-51` [40-42] `npm ci; rm -rf out` | `pc[d1]=building` |
| 4 | d1 | `BuildStart(d1)` | `:52` [43] `npm run build:static` 전반 | `out=partial` |
| 5 | d1 | `BuildEnd(d1)` | `:52` [43] 후반 | `out=complete`, `pc[d1]=checked` |
| 6 | d2 | `Acquire(d2)` | `:41-44` [32-35] | `pc[d2]=sync` |
| 7 | d2 | `Clean(d2)` | `:49-51` [40-42] **`rm -rf out` — d1 의 완성 산출물 삭제** | `out=absent` |
| 8 | d2 | `BuildStart(d2)` | `:52` [43] index.html 만 생성 | `out=partial` |
| 9 | d1 | `Copy(d1)` ⚠ P2 | `:53` [44] `test -f out/index.html` 통과, `:56-58` [47-49] `cp -a out/.` | **`rel[d1]=partial`** |
| 10 | d1 | `Swap(d1)` ⚠ P1 | `:59-60` [50-51] `ln -sfn; mv -Tf current` | **`current=d1`** (미완성 릴리스 서빙) |

도메인 서술: 운영자 A 의 빌드가 끝난 직후 운영자 B(다른 터미널·재실행·자동화)가 같은 `repo/` 에서 `rm -rf out` 을 하고 자기 빌드를 시작한다. A 는 `test -f out/index.html` 만 보므로 B 의 미완성 `out/` 을 자기 릴리스로 복사해 `current` 를 교체한다. 사이트는 `_next/static/*` 가 없는 페이지를 서빙하고, 그 릴리스는 B 가 끝난 뒤에도 `releases/` 에 **롤백 후보로 남는다**.

### 3.3 코드 매핑 (요지)

| 모델 | 코드 | 비고 |
|---|---|---|
| 공유 `out` | `$REPO_DIR/out` — 모든 실행이 같은 디렉터리 | 레이스의 원인 |
| `Clean` | `rm -rf out` (`:51` [42]) | 다른 실행의 산출물을 지움 |
| `Copy` 의 검사 | `test -f out/index.html` (`:53` [44]) | 완성 여부가 아니라 파일 1개 존재만 확인 |
| `Swap` | `ln -sfn … current.tmp; mv -Tf current.tmp current` (`:59-60` [50-51]) | 교체 자체는 원자적 — 문제는 교체 **대상** |

전체 대응표: `formal/deploy-release-atomicity/CORRESPONDENCE.md`.

### 3.4 재현 테스트와 수정 전 실패 로그

`formal/deploy-release-atomicity/repro/test_F1_concurrent_deploy.sh` — 외부 명령(`git`·`npm`·`docker`·`sudo`)을 PATH 앞의 가짜로 대체하고, 가짜 `npm run build:static` 이 `out/index.html` 을 먼저 쓴 뒤 **게이트 파일(barrier)** 을 기다렸다가 `_next/static/app.js` 를 쓰도록 하여 트레이스 2~10 의 인터리빙을 결정적으로 강제한다. 네트워크·sudo·실제 nginx 는 쓰지 않는다. 단언은 속성(P1·P2)이다.

`evidence/test_before.log` (수정 전 `07e4dfc` 스크립트) 발췌:

```text
step 1: A built out/ completely (npm not yet exited)
step 2: B cleaned out/ and wrote index.html only (partial)
step 3: A finished rc=0 — [deploy] done: https://www.ai-carelink.co.kr  (sha shaA)
== P1 (CurrentComplete) after A's swap
  FAIL  current → complete release (index.html + _next/static/app.js) [current=shaA-20261029143905]
step 4: B finished rc=0 — [deploy] done: https://www.ai-carelink.co.kr  (sha shaB)
== P2 (ReleasesComplete) at rest
  release shaA-20261029143905: PARTIAL (./index.html )
  release shaB-20261029143905: complete
  FAIL  every releases/<sha> is complete (rollback candidates)
RESULT: FAIL (property violated)
EXIT=1
```

→ **CONFIRMED**: 모델 반례가 실코드(스크립트 로직)에서 속성 단언으로 재현됨.

### 3.5 수정 diff (`evidence/patches/F1-deploy-webpage-flock.diff`)

```diff
@@ -23,6 +23,15 @@ log() { ... }
 mkdir -p "$DEPLOY_ROOT/releases"
 
+# 0. 동시 실행 방지 (formal/deploy-release-atomicity F1) — 두 실행이 repo/out 작업 디렉터리를 공유하므로 겹치면
+#    미완성 out/ 이 릴리스로 복사되어 current 가 깨진 사이트를 가리킬 수 있다 → flock 으로 배타 실행, 겹치면 즉시 종료(fail-closed)
+LOCK_FILE="$DEPLOY_ROOT/.deploy.lock"
+exec 9>"$LOCK_FILE"
+if ! flock -n 9; then
+  echo "[deploy] 다른 배포가 진행 중입니다 ($LOCK_FILE) — 끝난 뒤 다시 실행하세요" >&2
+  exit 1
+fi
+
 # 1. 소스 동기화
```
(헤더 주석 1줄에 "flock(동시 실행 차단)" 추가.) **Anti-Reward-Hacking 점검**: 단독 실행 경로는 변경 없음, 기능 제거·무조건 early-return 아님. 패치가 동작을 바꾸는 입력 범위 = "같은 `DEPLOY_ROOT` 에서 이미 다른 실행이 잠금을 쥔 경우" 만. `flock` 은 util-linux 기본(서버 Ubuntu 22.04 ✓).
설계 선택(HITL G7 pending): `flock -n` 즉시 종료(fail-closed, 운영자가 상황 인지) vs `flock -w <초>` 대기(두 번째 배포가 뒤이어 실행). 전자를 적용했다.

### 3.6 수정 후 증거

| 검사 | 결과 | 증거 |
|---|---|---|
| 재현 테스트 (수정 후 스크립트) | **PASS** — B 는 `[deploy] 다른 배포가 진행 중입니다 … exit 1`, A 완료 후 B 재실행 성공(C1 잠금 해제), 모든 릴리스 complete | `evidence/test_after.log` |
| 모델 `MC.cfg` (UseLock=TRUE) | **PASS** exit 0 — TypeOK·P1·P2·C1 invariant + P3 liveness, 49/37 states, depth 13 | `evidence/tlc_fixed.log` |
| Mutation `MC_bug.cfg` (UseLock=FALSE, 코드 수정 후 재실행) | **FAIL** exit 12 — `ReleasesComplete` 위반 depth 9 (기대대로 다시 실패) | `evidence/mutation.log`, `evidence/mutation_tlc.log` |
| `MC_bug_current.cfg` | FAIL exit 12 — `CurrentComplete` 위반 depth 10 | `evidence/tlc_bug_current.log`, `evidence/trace_bug_current.md` |
| Sanity `MC_sanity.cfg` | **FAIL** exit 12 (기대) — `NeverBothDone` 위반: 잠금 하에서 두 실행이 순차로 모두 완료되는 상태 도달 | `evidence/tlc_sanity.log`, `evidence/trace_sanity.md` |
| `-coverage 1` | 모든 action 발화; UseLock=FALSE 분기(spec 59-60행)만 fix ON 에서 0 (기대값) | `evidence/tlc_fixed.log` |
| 회귀 | `bash -n deployment/deploy-webpage.sh` OK; 프로젝트에 기존 테스트 없음 → `npm run lint`·`build:static` PASS 로 무영향 확인(스크립트는 빌드 산출물에 포함되지 않음) | `evidence/l0_*.log` |

## 4. 검증된 것과 경계 (속성 표)

| ID | 속성 | 종류 | 출처 | 동결 | 결과 (fix ON) | 결과 (fix OFF) |
|---|---|---|---|---|---|---|
| P1 | `CurrentComplete` | invariant | `deploy-webpage.sh:8-9`, `README.md:24`, nginx conf:29 | ✅ | holds | **violated** (depth 10) |
| P2 | `ReleasesComplete` | invariant | `deploy-webpage.sh:10`, `deployment/README.md:101` | ✅ | holds | **violated** (depth 9) |
| P3 | `SomeoneDeploys` `<>(\E d : pc[d]="done")` | liveness (WF on Step) | `deploy-webpage.sh:8` | ✅ | holds (잠금이 교착·기아를 만들지 않음) | holds |
| C1 | `LockReleasedWhenDone` | invariant (code) | `deploy-webpage.sh:28-33` | — | holds | n/a |
| — | `TypeOK` | invariant | — | — | holds | holds |
| S | `NeverBothDone` (sanity) | must-fail | — | — | **violated** (기대) | — |

경계: `Deployers={d1,d2}`; 빌드는 2단계; 릴리스 정리(최근 5개 보존)·nginx reload·캐시는 모델 밖. **PASS 의 의미는 "이 경계 안에서 반례 없음"** 이다. 잠금은 N 실행에 자명하게 일반화되지만 N≥3 은 검사하지 않았고 Lean 증명도 없다.

## 5. 신뢰 기반과 버그를 숨길 수 있는 추상화

- **신뢰하는 것**: TLC 2026.10.28 의 BFS 전수 탐색, `Properties.tla` 의 속성 문장, `flock(2)`/`rename(2)` 의 OS 의미론(A6·A7), util-linux `flock -n`.
- **A1 빌드 2단계**: 실제 `next build` 의 파일 생성 순서는 다를 수 있다. 어떤 순서든 `test -f index.html` 이 완성을 보증하지 못한다는 점은 동일하지만, 순서가 역이면 중간 상태에서 index.html 이 없어 `set -e` 종료로 **덜** 나쁠 수도 있다.
- **A2 `cp -a` 원자 스냅숏**: 실제로는 복사 중 `rm -rf`/쓰기가 끼어들어 더 다양한 손상(일부 파일만 복사, cp 오류)이 가능 — 모델이 보이는 것보다 **더 나쁠 수 있다**.
- **A3 혼합 트리**: 다른 실행의 `rm -rf` 뒤 내 빌드가 계속 쓰면 두 빌드 파일이 섞인다. 모델은 이를 `complete` 로 간주하므로 **이 경로의 손상은 숨겨진다**(보수적 추상화, 수정 후에는 잠금으로 경로 자체가 차단됨).
- **A4 git/npm 충돌**, **A5 릴리스 정리 미발동**(6개 이상 쌓인 뒤 롤백 상태에서의 정리 상호작용 미검증), **A7 같은 sha·같은 초 → 같은 `RELEASE` 경로** 는 모델 밖(관찰로 기록).
- 재현 하네스의 가짜 `npm` 은 A1 을 그대로 구현한 것이므로, 하네스가 증명하는 것은 "스크립트 로직이 A1 하에서 미완성 산출물을 배포한다" 이다(A8).

## 6. 재실행 명령어

```bash
cd ~/ai_project/AiCarelink-Webpage
bash formal/run_all.sh                                  # MC=PASS(0) / MC_bug=FAIL(12) / MC_sanity=FAIL(12) / repro=PASS 단언, TLC_WORKERS 존중
# 개별
cd formal/deploy-release-atomicity/tla
java -cp ~/.cache/proof-skills/tla2tools.jar tlc2.TLC -workers 4 -config MC.cfg        DeployRelease.tla   # exit 0
java -cp ~/.cache/proof-skills/tla2tools.jar tlc2.TLC -workers 4 -config MC_bug.cfg    DeployRelease.tla   # exit 12 (ReleasesComplete)
java -cp ~/.cache/proof-skills/tla2tools.jar tlc2.TLC -workers 4 -config MC_bug_current.cfg DeployRelease.tla  # exit 12 (CurrentComplete)
java -cp ~/.cache/proof-skills/tla2tools.jar tlc2.TLC -workers 4 -config MC_sanity.cfg DeployRelease.tla   # exit 12 (NeverBothDone)
cd ~/ai_project/AiCarelink-Webpage
bash formal/deploy-release-atomicity/repro/test_F1_concurrent_deploy.sh                                        # 수정 후: PASS
bash formal/deploy-release-atomicity/repro/test_F1_concurrent_deploy.sh <(git show 07e4dfc:deployment/deploy-webpage.sh)  # 수정 전: FAIL
```

## 7. HITL 승인 이력

| 게이트 | 항목 | 상태 |
|---|---|---|
| G2 | 속성 동결 (P1·P2·P3, `Properties.tla`) | **pending — Brian review** (에이전트 단독 실행, 승인 불가) |
| G7 | 수정 설계: `flock -n` 즉시 종료(적용) vs `flock -w <초>` 대기 | **pending — Brian review** (공개 API 변경 아님, 최소 변경이라 적용 후 승인 요청) |
| G8 | F3 OG 이미지 누락 처리(이미지 추가 vs 참조 제거) | pending — Brian 결정 |

## 8. 후속 제안

- **W5 CI 회귀 가드**: `.github/workflows/deploy.yml` 에 `bash formal/run_all.sh` 단계 추가(`deployment/**`·`formal/**` 변경 시). Java 는 `actions/setup-java@v4`, tla2tools 는 proof-skills `setup_tla.sh`.
- **W4 단순화**: 잠금이 있으면 `test -f out/index.html` 은 "빌드 실패 감지" 역할만 남는다. 더 근본적으로는 실행별 임시 빌드 경로(`out-$SHA-$$`)를 써서 공유 자원 자체를 없애는 설계가 가능 — 재검증 필요.
- **W7 Lean 승격(후속 제안만)**: Lean 설치 후 N 실행에 대한 상호배제 불변식(`lock` 보유자 유일 ⇒ `rel` 완전성) 증명. 현 L2 경계 N=2.
- **F2** (`src/lib/api.js`): 모듈을 실제로 쓰게 되면 single-flight refresh(갱신 Promise 공유) 로 수정 후 `IdempotentRetry` 패턴으로 모델링. 지금은 사장 코드라 미수정.
- **F3**: `public/images/og-image.png` 추가(1200×630) 또는 `layout.js` 의 `openGraph.images` 제거.
- **관찰**: 같은 커밋을 같은 초에 두 번 배포하면 `RELEASE` 경로 충돌(A7) — 잠금으로 동시 실행은 막혔으나 1초 내 순차 재실행은 가능하므로 `$$`(pid) 또는 `date +%N` 접미사 고려.

## 9. Definition of Done 체크리스트 (표준 §15)

| 항목 | 상태 |
|---|---|
| SCOPE.md: 단일 concern, 포함/추상화/제외, 경계 명시 | ✅ |
| Properties: 출처 인용, 프로토콜 속성 동결 + HITL 승인 기록 | ✅ 동결·출처 / ⏳ HITL pending |
| CORRESPONDENCE.md: 모든 action ↔ file:line | ✅ |
| MC.cfg PASS / MC_bug.cfg FAIL / MC_sanity.cfg FAIL (로그 저장) | ✅ `evidence/tlc_{fixed,bug,sanity}.log` |
| 반례 → 결정적 재현, 수정 전 실패 로그 저장, 속성 단언에서 실패 | ✅ `evidence/test_before.log` |
| 수정 후 모델·테스트 통과, mutation check 로 수정 되돌리면 다시 실패 | ✅ `evidence/test_after.log`, `evidence/mutation.log` |
| (Lean) sorry 0, 표준 공리만 | — 해당 없음(Lean 미설치, L3 미주장) |
| 패치 감사 기록 (evidence/patches/), 무력화 수정 아님 확인 | ✅ |
| findings.json (wdlab 블록 포함), 판정 어휘 준수 | ✅ |
| Artifact 보고서 발행 + reports/ 로컬 사본 | ✅ 로컬 사본 `formal/reports/2026-10-29-deploy-release-atomicity.md` + docx / Artifact 발행은 부모 세션 재량 |
| W5 CI 가드 등록 여부 결정, W4 단순화 후속 제안 | ⏳ 제안만 (§8) |

## 10. 변경 파일 목록과 git commit

| 파일 | 변경 |
|---|---|
| `deployment/deploy-webpage.sh` | F1 수정: `flock -n` 배타 실행 (+9/-2) |
| `README.md` | "형식 검증 — Oct.29, 2026" 섹션, 최종 수정일·최근 업데이트 갱신 |
| `formal/README.md`, `formal/TOOLCHAIN.lock`, `formal/CANDIDATES.md`, `formal/findings.json`, `formal/run_all.sh`, `formal/.gitignore` | 신규 |
| `formal/deploy-release-atomicity/{SCOPE.md, CORRESPONDENCE.md}` | 신규 |
| `formal/deploy-release-atomicity/tla/{DeployRelease.tla, Properties.tla, MC.cfg, MC_bug.cfg, MC_bug_current.cfg, MC_sanity.cfg}` | 신규 |
| `formal/deploy-release-atomicity/repro/test_F1_concurrent_deploy.sh` | 신규 (재현 테스트) |
| `formal/deploy-release-atomicity/evidence/**` | TLC 로그·트레이스, 테스트 전/후 로그, mutation, L0 로그, 패치 diff |
| `formal/reports/2026-10-29-deploy-release-atomicity.md` | 본 보고서 사본 |

사용자가 미리 변경해 둔 untracked 파일(`.deepseek/`, `_extract_docs.py`, `_update_docs.py`)은 건드리지 않았다.

- 커밋: `formal: WDLAB proof-skills 검증 (deploy-release-atomicity) — FIXED 2026-10-29` — sha: **(커밋 후 §10.1 에 기록)**
- push: `origin main` — 결과는 §10.1

### 10.1 커밋 기록

(커밋 후 갱신)
