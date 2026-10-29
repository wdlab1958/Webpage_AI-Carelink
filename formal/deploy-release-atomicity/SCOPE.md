# Scope: deploy-release-atomicity

- Project / Module: AiCarelink-Webpage / `deployment/deploy-webpage.sh` (가비아 서버 운영 배포 스크립트)
- Verification Level Target: **L2** (TLA+/TLC bounded model check) — Lean 미설치, L3 미주장
- Concern (한 문장): 배포 스크립트 두 실행이 겹칠 때 공유 작업 디렉터리 `repo/out` 의 **미완성 빌드 산출물**이 `releases/<sha>` 로 복사되고 `current` 심볼릭 링크가 그것을 가리킬 수 있는가.
- Rank: blast radius **H** (운영 사이트 전체: 자산 404·빈 페이지, 롤백 후보 오염) × concurrency **M** (집/회사 두 터미널·재실행·자동화; CI 는 `concurrency: group: pages` 로 막지만 서버 스크립트는 잠금 없음)
- 검사한 commit: `07e4dfc` (main, 2026-10-29)

## In scope
- 실행 단위(Deployer) 2개가 같은 `DEPLOY_ROOT` 에서 스크립트를 임의 인터리빙으로 실행
- 단계: 잠금 획득(수정 후) → `git reset`·`npm ci`·`rm -rf out`(Clean) → `next build` 전반(BuildStart: `out/index.html` 생성) → 후반(BuildEnd: `_next/static/*` 등 완성) → `test -f out/index.html` + `cp -a out/. RELEASE/`(Copy, 스냅숏) → `ln -sfn`+`mv -Tf` 교체(Swap) → 종료(잠금 해제)
- 공유 상태: `out`(absent/partial/complete), 각 실행의 릴리스 내용 `rel[d]`, `current`, `lock`
- 수정 토글 `UseLock`: TRUE = `flock -n` 배타 실행(실패 시 즉시 exit 1), FALSE = 수정 전 코드

## Abstracted (버그를 숨길 수 있는 추상화 명시)
- **A1 빌드 2단계**: `next build` 산출을 "index.html 먼저, 나머지 자산 나중" 2 action 으로 추상화. 실제 파일 생성 순서는 Next 내부 구현에 따르며, 순서가 달라도 "index.html 존재 ≠ 완성" 이라는 검사(`test -f`)의 약점은 동일하다.
- **A2 복사 원자성**: `cp -a out/. RELEASE/` 를 그 순간 `out` 의 스냅숏을 통째로 복사하는 1 action 으로 둔다. 실제로는 복사 중 다른 실행의 `rm -rf`/빌드 쓰기가 끼어들어 더 다양한 손상(파일 일부만 복사, cp 오류로 abort)이 가능하다 — 모델이 보이는 것보다 **더 나쁠 수 있다**.
- **A3 산출물 혼합**: 다른 실행이 `rm -rf out` 한 뒤 내 빌드가 나머지 파일을 쓰면 실제로는 두 빌드의 파일이 섞인 트리가 된다. 모델은 BuildEnd 를 무조건 `complete` 로 두어 혼합 손상을 보지 않는다(보수적: 이 경로의 버그는 숨겨질 수 있음).
- **A4 git/npm**: `git reset --hard`·`npm ci` 의 동시 실행 충돌(인덱스 잠금 오류, node_modules 손상)은 Clean 에 흡수. 실패하면 `set -e` 로 종료되어 current 를 건드리지 않으므로 P1·P2 에는 보수적.
- **A5 릴리스 정리** (`ls -1dt | tail -n +6 | xargs rm -rf`): 실행 2개·릴리스 ≤2 개이므로 결코 발동하지 않아 모델 밖. 6개 이상 쌓인 뒤 롤백 상태에서의 정리 상호작용은 미검증.
- **A6 nginx reload·캐시**: 정적 파일 교체 후 브라우저/CDN 캐시 불일치는 모델 밖.
- **A7 같은 sha·같은 초**: 두 실행이 같은 커밋을 같은 초에 배포하면 `RELEASE` 경로가 같아져 한 디렉터리에 겹쳐 복사된다 — 모델은 실행별 릴리스를 구분(`rel[d]`)하므로 이 경로는 보지 않는다(관찰로 기록).

## Out of scope
- `.github/workflows/deploy.yml`(GitHub Pages 미리보기) — 이미 `concurrency: group: pages` 로 직렬화
- nginx 설정·TLS·443 멀티플렉서, DNS, Cloudflare
- 빌드 자체의 정확성(`check-no-localhost`, `check-legal-placeholders`) — L0 정적 점검으로만 확인(CANDIDATES.md)
- `src/lib/api.js` 토큰 갱신 경합(사장 코드, F2 로 기록만), OG 이미지 누락(F3)

## Tool choice & rationale
TLA+/TLC. 셸 스크립트 두 인스턴스의 인터리빙 문제 = 표준 §7 "check-then-act / 공유 자원" 클래스. 상태공간이 작아(2 실행 × 8 pc × 3 out) 전수 탐색이 즉시 끝나고,
반례를 bash 하네스(가짜 `npm` + 게이트 파일 barrier)로 결정적으로 재현할 수 있다. Lean 은 미설치이며 무한 보장(N 실행)이 요구되지 않는다 — 잠금은 N 에 대해 자명하게 일반화되지만 L3 는 주장하지 않는다.

## Bounds
`Deployers = {d1, d2}`, 빌드 2단계, 릴리스 정리 미발동. TLC 결과(fix ON): **49 states generated, 37 distinct, depth 13**; fix OFF: 120/76, 반례 depth 9(P2)·10(P1).

## 속성 수확 (G2) — 동결 표 (표준 §10.3)

| ID | Property | Level | Source | Frozen |
|---|---|---|---|---|
| P1 | `CurrentComplete` — `current` 가 가리키는 릴리스는 항상 완전한 산출물 | protocol (invariant) | `deployment/deploy-webpage.sh:8-9` "current 심볼릭 링크 교체(원자적)", `README.md:24` "실패 시 산출물을 배포하지 않습니다", `deployment/nginx/ai-carelink-www.conf:29` (`root … /current`) | ✅ |
| P2 | `ReleasesComplete` — `releases/` 의 모든 릴리스는 완전(롤백 후보 무결) | protocol (invariant) | `deployment/deploy-webpage.sh:10` 롤백 절차, `deployment/README.md:101` | ✅ |
| P3 | `SomeoneDeploys` — 어떤 실행은 결국 `done` (잠금이 교착·기아를 만들지 않음) | protocol (liveness, WF on Step) | `deployment/deploy-webpage.sh:8` 동작 설명, 표준 §2 Hard real-time | ✅ |
| C1 | `LockReleasedWhenDone` — 끝난/중단된 실행은 잠금을 쥐지 않음 | code | 수정 코드 `deployment/deploy-webpage.sh:28-33` (flock fd 는 프로세스 종료로 해제) | — |
| S | `NeverBothDone` — sanity, 반드시 FAIL | sanity | — | — |

- HITL: `hitl_approvals: ["G2: pending Brian review", "G7: pending Brian review (flock -n fail-fast vs flock -w 대기 선택)"]`
