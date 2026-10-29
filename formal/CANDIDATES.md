# G0 후보 선정 — AiCarelink-Webpage (www.ai-carelink.co.kr 대문)

- 검사일: 2026-10-29 · 기준 commit: `07e4dfc` (main) · 표준: WDLAB-STD-VERIFY-001 v1.0
- 프로젝트 성격: Next.js 16 **정적 export 마케팅/법적 고지 웹페이지**. 서버 로직·DB·폼 제출·서비스워커가 없다.
  JS 72개 중 대부분이 콘텐츠(법적 고지 본문)·프레젠테이션 컴포넌트. 동시성·상태 로직은 아래 소수 지점에만 존재한다.
  (참고: `src/lib/api.js` 의 JWT 로그인/갱신 로직은 어디서도 import 되지 않는 **사장 코드**다 — `grep -rn "lib/api" src` 결과 0건.)

## 후보표 (blast radius × concurrency 순위)

| # | 후보 | 위치 | 유형 | Blast radius | Concurrency | 순위 | 비고 |
|---|---|---|---|---|---|---|---|
| C1 | **배포 스크립트 동시 실행 — 공유 `repo/out` 작업 디렉터리로 미완성 산출물이 릴리스/`current` 가 됨** | `deployment/deploy-webpage.sh:32-66` (수정 전) | 레이스(공유 작업공간, 비원자 빌드 + 스냅숏 복사 + 원자 교체) | **H** (운영 사이트 전체가 깨진 페이지·자산 404) | **M** (집/회사 두 터미널, 재실행, 자동화 — CI 는 `concurrency: group: pages` 로 막지만 서버 스크립트에는 잠금 없음) | **1** | **선정** → `deploy-release-atomicity` |
| C2 | 토큰 갱신 경합 — 401 두 건이 동시에 `tryRefreshToken()` → 회전된 refresh 토큰으로 두 번째 갱신 실패 → `clearTokens()` 가 첫 번째의 유효 토큰을 지우고 `/login` 으로 강제 이동 | `src/lib/api.js:93-108, 120-139` | lost update / 비멱등 재시도 | L (현재 **사장 코드**, 호출처 없음) | H | 2 | 부수 finding F2 (SUSPECTED, 미수정 — 사용 시 single-flight 갱신 필요) |
| C3 | `/privacy` v1.0↔v1.1 게이트 — `placeholders()` 가 렌더되는 모든 필드를 훑는가 (누락 시 `{{ }}` 가 공개 화면에 노출, P-01 재발) | `src/app/privacy/page.js:15,44`, `src/content/privacy-v2.js:229-237` | 순수 함수 완전성 (상태기계: draft→announced→effective) | M (법적 노출) | L (빌드 시점 결정) | 3 | L0 점검: 현재 `out/privacy/index.html` 에 `{{` 0건 ✓. `SENSITIVE_BANNER`·`table.head` 는 미검사(현재 자리표시자 없음) → 관찰 기록 |
| C4 | `useTargets` 1회 캐시 스냅숏 + `AppRedirect` 400ms 후 `location.replace(href)` — 하이드레이션 전 href(SSR 기본값)로 이동할 가능성 | `src/lib/useTargets.js:8-13`, `src/components/AppRedirect.js:14-19` | 비동기 순서 | L (운영 빌드는 SSR 기본값도 운영 주소 → 영향 없음, LAN dev 만) | L | 4 | 모델링 가치 낮음 |
| C5 | `check-legal-placeholders.mjs` 가 `scripts/.privacy-v2.tmp.mjs` 를 쓰고 import 후 삭제 — import 실패 시 임시 파일 잔존(try/finally 없음), 동시 빌드 시 서로 덮어씀 | `scripts/check-legal-placeholders.mjs:28-31` | 임시 파일 레이스 | L | L (CI 는 순차) | 5 | 관찰 기록 |
| C6 | 쿠키 동의 상태 — `localStorage.cookieConsent` 기록 후 배너 비표시; 기록은 어디서도 읽지 않음(분석/마케팅 스크립트 부재) | `src/components/CookieConsent.js:17-56` | 단순 상태 | L | L | 6 | 모델링 대상 아님 |

## L0 정적 점검 결과 (2026-10-29, 로컬 `node v22.23.4`)

| 검사 | 결과 | 로그 |
|---|---|---|
| `npm run lint` (eslint 9, next core-web-vitals) | PASS (0 warnings) | `deploy-release-atomicity/evidence/l0_lint.log` |
| `node --check scripts/*.mjs` · `bash -n deployment/*.sh scripts/*.sh` · `python3 -m py_compile *.py` | PASS | `evidence/l0_syntax.log` |
| `STATIC_EXPORT=1 npm run build:static` (21 페이지 export + `check-no-localhost` + `check-legal-placeholders`) | PASS — localhost 링크 0건/185 files, 약관 자리표시자 0건, 개인정보처리방침 v1.1 자리표시자 41건(설계상 게이트, `/privacy` 는 v1.0 노출) | `evidence/l0_build_static.log` |
| 내부 링크 ↔ 라우트 대응 (`href="/..."` 13종 vs `src/app/**/page.js` 18 라우트) | PASS — 깨진 내부 링크 0건 | 본 문서 |
| OG 이미지 자산 | **FAIL** — `src/app/layout.js:47` 가 `/images/og-image.png` 를 참조하지만 `public/images/` 에 파일 없음 → 소셜 공유 미리보기 깨짐 | 부수 finding F3 |

## 선정 근거

C1 만이 "실제로 운영 산출물을 바꾸는 상태 전이 + 공유 자원 + 비원자 단계" 를 모두 갖는다. 표준 §7 의 "check-then-act / 공유 작업공간" 클래스이며
TLA+ 로 2 실행 × 3 단계 빌드로 전수 탐색 가능하고, bash 하네스(가짜 `npm`·게이트 파일 barrier)로 결정적 재현이 가능하다.
