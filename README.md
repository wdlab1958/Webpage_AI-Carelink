# AI CareLink — 대문 (www.ai-carelink.co.kr)

> 최종 수정일: 2026년 10월 15일 (2026-09-23 이후: nginx 배포 정본·보안 헤더·Cloudflare 대응, B2C 역할 우선 대문, 법적 고지 7종 v1.1 공용 렌더러·빌드 검사)

## 프로젝트 소개

AI CareLink 플랫폼의 진입 페이지(대문)입니다. 2026-10-14 UX 개편으로 메인(`/`)은 **B2C 역할 우선 진입** — 첫 질문 하나
"어떤 도움이 필요하세요?" → 보호자 / 간병인·동행매니저 / 요양병원·요양원 3갈래로 앱(`/family`·`/work`·`/institution`)에 바로 연결하고,
요청서 → 지원자 비교 → 연결 3단계·핵심 기능 6종을 큰 글씨로 안내합니다. 기관(B2G) 내용 — 5개 도메인·모바일 앱 2종, 2026~2027 요양급여
제도 변화(요양병원 간병 급여화 · 간병지원 시범사업), 한국보훈복지의료공단 AI 의료 솔루션 실증 테스트베드 연계 제안 — 은
`/institution-guide`(요양병원·요양원 안내)와 `/pilot-2026` 으로 옮겼습니다. 푸터·법적 고지의 사업자 표시는 `src/lib/company.js` 한 곳에서 관리합니다
(운영 사업자 ㈜에이쓰리시큐리티, 2026-10-14 확정).

| 호스트 | 역할 |
|---|---|
| `www.ai-carelink.co.kr` | 대문 (본 저장소, 정적 export) |
| `app.ai-carelink.co.kr` | 플랫폼 전체 (AiCarelink/frontend, Next.js 14) — 5개 도메인 + 모바일 앱 2종 |
| `api.ai-carelink.co.kr` | 백엔드 (AiCarelink/backend, FastAPI) |

## 기술 스택

- Next.js 16.1.1 (App Router) · React 19.2.3 · Framer Motion · Lucide React
- 스타일: `src/app/globals.css` 에 유틸리티 클래스를 직접 정의 (Tailwind 패키지 미사용)
- 운영: `npm run build:static` → `out/` 정적 export → nginx (`deployment/`). 빌드 후 `check-no-localhost` · `check-legal-placeholders` 검사가 자동 실행되어 실패 시 산출물을 배포하지 않습니다.
- CI: `.github/workflows/deploy.yml` — push/PR 마다 lint + 운영 루트 경로 빌드 검증, main 은 GitHub Pages 임시 미리보기(`build:ghpages`, basePath `/Webpage_AI-Carelink`, 앱/백엔드 링크는 운영 도메인 고정)

## 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 메인 — B2C 역할 우선 진입 3버튼(보호자 → app `/family`, 간병인·동행매니저 → `/work`, 요양병원·요양원 → `/institution`) · 3단계 흐름 · 기존 vs AI케어링크 비교 · 핵심 기능 6종 · 상담 전화(`NEXT_PUBLIC_SUPPORT_PHONE`) |
| `/institution-guide` | 요양병원·요양원 안내(B2G, 내비 강조) — 5개 도메인 · 모바일 앱 2종 · 기관 포털 · 급여화 로드맵 · 보훈공단 실증 · 도메인 구성 (구 메인 내용) |
| `/pilot-2026` | 요양급여 제도 변화(2024→2027) · 제도 요건 · 대응 기능 매핑 · 보훈공단 AI 테스트베드 실증 제안 · 출처 |
| `/service-intro` | 서비스 소개 |
| `/ai-matching` | AI 매칭 설명 |
| `/community` | 커뮤니티 |
| `/login` `/signup` `/mypage` | 플랫폼(app)으로 리다이렉트 — 인증·회원 기능은 app 도메인에서 처리 |
| `/terms` · `/terms/v1.0` | 서비스 이용약관(보호자·공통) v1.1 · 종전 v1.0 보존 |
| `/terms-caregiver` | 간병인·병원동행 매니저 이용약관 v1.1 |
| `/privacy` · `/privacy/history/v1.0` | 개인정보처리방침(통합) v1.1 개정안 · 종전 v1.0 보존 — 자리표시자가 남아 있는 동안 `/privacy` 는 v1.0 본문을 표시(게이트) |
| `/privacy-caregiver` | 간병인 개인정보처리방침 v1.1 |
| `/ecommerce-notice` | 전자상거래 고지 v1.1 — 통신판매중개자/통신판매업자 이중 지위, 사업자 표시(전자상거래법 §13), 청약철회·환불, 결제대금예치 |
| `/location-service-notice` | 위치기반서비스 이용자 고지 v1.1 — 간병인·동행매니저 단말기 GPS 만 수집, 변경신고 완료 전 기능 비활성 |
| `/ai-ethics` | AI 윤리·투명성 고지 v1.1 — AI 기본법 §31 사전 고지·생성물 표시, 자동화된 결정 권리(§37의2), 정렬 수식·가중치 공개, 서버 내부 Local LLM(데이터 비반출) |

## 법적 고지 (공용 렌더러 · 버전 관리 · 빌드 검사)

- **본문은 `src/content/*.js` 한 곳에서만 관리**: `terms-v2.js`(서비스 약관) · `terms-caregiver.js` · `privacy-v2.js` · `privacy-caregiver.js` · `ecommerce-notice.js` · `location-notice.js` · `ai-ethics.js`. 페이지(`src/app/<경로>/page.js`)는 `src/components/LegalDocument.js` 공용 렌더러에 `meta / banner / chapters / history / related` 를 넘기기만 합니다(조문 "제n조" 헤딩에서 목차 자동 생성, `{{ }}` 자리표시자는 화면에 강조 표시).
- **버전·상태·공고일·시행일은 `src/content/legal-meta.js` 한 곳**: 초기 1.0 → 현행 **1.1**, `status: announced`, 공고 **2026-10-27** · 시행 **2027-01-01**(사전공지 66일, 불리·중요 변경 30일 충족). 배너·부칙·개정 이력은 이 값을 렌더링한다(날짜 직접 기재 금지). 시행일(2027-01-01 00:00 KST) 전에는 `LegalVersionGate` 가 현행 시행 버전(v1.0)을 기본 뷰로 보이고 `?version=1.1` 로 개정안을 열며, 시행일부터 v1.1 이 기본·v1.0 은 `?version=1.0` 이력(열람 시각 기준 자동 전환, 수동 배포 불필요). 시행된 종전 버전이 없는 문서(간병인 약관·방침, 전자상거래·위치·AI 고지)는 v1.1 을 보이고 시행 전 적용 규범을 안내한다. 개인정보처리방침(통합) v1.1 은 자리표시자 해소 전까지 `status: draft`(공개 화면은 v1.0). 공고 후 v1.1 본문을 바꾸면 재공고해야 하며 시행일을 지키려면 **2026-12-02** 까지(`LEGAL_REANNOUNCE_DEADLINE`). 상세: AiCarelink 저장소 `aicarelink-legal-fix-spec.md` L-01.
- **앱과 동기화**: `node scripts/export-terms-text.mjs [앱 저장소 경로]` 가 서비스 약관 v1.1 을 평문으로 내보내 AiCarelink 저장소 `backend/legal/terms_of_service_v1.1.txt` · `docs/legal/` 에 기록합니다(앱은 `backend/scripts/seed_legal_terms.py` 로 DB `terms_versions` 에 시드). 간병인 약관/방침은 앱 가입 화면에서 이 대문 URL(`/terms-caregiver/`, `/privacy-caregiver/`)로 링크됩니다.
- **빌드 검사** (`build:static` · `build:ghpages` 의 후속 단계, 단독 실행 `npm run check:legal`):
  - 약관·간병인 약관/방침·전자상거래·위치·AI 윤리 소스와 `out/` 산출물에 `{{ }}` · `NOTE:` · `[확인 필요` 가 남아 있으면 **실패**.
  - (L-01) `src/` 에 미확정 문구(검토 중·조정 가능 등 `LEGAL_FORBIDDEN_PHRASES`)·구 공고일(12월 1일)이 남아 있거나, 7종 메타가 `status`·`announced_at`·`effective_at`·사전공지 ≥ 30일 조건을 어기면 **실패**. 각 content 모듈도 로드 시 `assertLegalMeta()` 를 실행하므로 `next build` 자체가 실패한다.
  - 개인정보처리방침 v1.1 의 남은 자리표시자 목록을 출력(회사가 사실관계를 확정해 채워야 하는 항목). 채워지기 전까지 `/privacy` 는 v1.0 본문을 노출하고, `STRICT_PRIVACY=1` 이면 빌드 실패로 승격.
- 푸터 "법적 고지" 메뉴: 이용약관(보호자·공통) · 간병인 이용약관 · 전자상거래 고지 · 위치기반서비스 이용자 고지 · 개인정보처리방침(통합) · 간병인 개인정보처리방침 · AI 윤리·투명성.

## 앱 / 백엔드 라우팅 (집 · 회사 · 운영 자동 전환)

`src/lib/hosts.js` 가 **접속한 호스트**를 기준으로 앱/백엔드 주소를 유도합니다. 설정 변경 없이 어디서나 동작합니다.

| 대문 접속 | 앱(FE) | 백엔드(BE) |
|---|---|---|
| `localhost:3002` | `localhost:3001` | `localhost:8100` |
| `192.168.45.206:3002` (집) | `192.168.45.206:3001` | `192.168.45.206:8100` |
| `10.10.10.64:3002` (회사) | `10.10.10.64:3001` | `10.10.10.64:8100` |
| `www.ai-carelink.co.kr` | `app.ai-carelink.co.kr` | `api.ai-carelink.co.kr` |

포트는 `.env.local` 의 `NEXT_PUBLIC_APP_PORT` / `NEXT_PUBLIC_API_PORT`, 절대 URL 강제는 `NEXT_PUBLIC_APP_URL` / `NEXT_PUBLIC_API_URL`.
컴포넌트에서는 `<AppLink to={APP_PATHS.family}>` 또는 `useTargets()` 를 사용합니다.

- 로컬/LAN(localhost · 127.x · 10.x · 192.168.x · 172.16~31.x · `*.local`)이 **아닌 모든 호스트**(GitHub Pages 포함)는 운영 주소로 유도합니다.
- 운영 빌드(`STATIC_EXPORT` / `GITHUB_PAGES` / `NODE_ENV=production`)는 SSR 기본값부터 운영 주소를 써서 하이드레이션 전·실패 시에도 링크가 `localhost:3001` 로 남지 않습니다. `scripts/check-no-localhost.mjs` 가 `out/` 에 `localhost:3001|8100`, `127.0.0.1:3001|8100` 이 남아 있으면 빌드를 실패시킵니다(`npm run check:no-localhost`).
- `APP_PATHS` 가 플랫폼 진입 경로를 한 곳에 정의합니다 — 역할별 앱 `/family` · `/work` · `/institution`(구 `/dashboard/patient/mobile` · `/dashboard/caregiver/mobile` · `/dashboard/hospital` 대체), `/shop`, `/hospitals`, 관리자 `/dashboard/admin` · `/dashboard/shop-admin`, 로그인 `/?login=1`.

## 시작하기

```bash
npm install
npm run dev            # http://localhost:3002  (LAN: http://192.168.45.206:3002)
npm run lint
npm run build:static   # out/ — 운영 배포 산출물 (+ check-no-localhost + check-legal-placeholders)
npm run build:ghpages  # GitHub Pages 미리보기용(basePath) 빌드
npm run check:no-localhost ; npm run check:legal   # 검사만 단독 실행
node scripts/export-terms-text.mjs ../AiCarelink   # 약관 v1.1 평문을 앱 저장소로 내보내기
```

배포 절차는 [`deployment/README.md`](deployment/README.md) 참조 (집/회사 → GitHub push → 가비아 서버에서 `deployment/deploy-webpage.sh` 로 pull·빌드, 배포 경로는 홈 폴더 `~/AiCarelink-Webpage/{repo,releases/<sha>-<시각>,current}`).

## 배포 · nginx 정본 (`deployment/nginx/`)

`deployment/nginx/ai-carelink.co.kr.conf` 가 가비아 단일 서버의 **4개 호스트 전체 정본**입니다 (`ai-carelink-www.conf` 는 대문 단독 블록).

| 호스트 | 처리 |
|---|---|
| `www.ai-carelink.co.kr` | 정적 export `current/` 서빙, `_next/static` immutable 캐시 |
| `ai-carelink.co.kr` | → www 301 |
| `app.ai-carelink.co.kr` | 파일럿 frontend 컨테이너 `127.0.0.1:3001` 프록시. `next/image` 미사용이므로 `/_next/image` 차단(Next 14.x 이미지 최적화 API 권고 완화) |
| `api.ai-carelink.co.kr` | 파일럿 backend `127.0.0.1:8100` 프록시(`/token`, `/api/*`, `/ws` 업그레이드) — 공통 헤더는 `snippets/carelink-api-proxy.conf` |

- **HTTPS(2026-09-29 개통)**: 서버의 443 은 SSH 와 공유(nginx stream `ssl_preread` 멀티플렉서) → HTTPS 블록에 `listen 443 ssl` 을 쓰지 않고 `snippets/ai-carelink-ssl.conf` 를 include, `certbot --nginx` 금지(webroot 발급 + `certbot.timer` 갱신). 스니펫은 AiCarelink 저장소 `ops/nginx/` 에 있음.
- **보안 헤더(www)**: `Content-Security-Policy`(self + Google Fonts + `cdn.jsdelivr.net` Pretendard 폰트, `connect-src` 는 api 도메인만, `frame-ancestors 'none'`) · `X-Frame-Options DENY` · `X-Content-Type-Options nosniff` · `Referrer-Policy` · `Permissions-Policy(camera/microphone/geolocation 차단)`.
- **Cloudflare 대응**: `$carelink_client_ip`(Cloudflare 경유 시 `CF-Connecting-IP`, 아니면 접속 IP)로 `X-Real-IP` · `X-Forwarded-For` 를 덮어쓰고, `limit_req` 존(`carelink_auth_cip` 10r/m · `carelink_api_cip` 300r/m, 429)도 같은 키를 사용 — 키를 바꾼 존은 reload 로 교체할 수 없어 존 이름을 `_cip` 로 변경.

## 법적 컴플라이언스

- 인공지능 기본법 (2026.1.22 시행) 준수 — `/ai-ethics` 고지 v1.1(§31 사전 고지·생성물 표시, 고영향 AI 해당성·§34 조치)
- 개인정보보호법 · 민감정보(건강정보) 별도 동의 · 자동화된 결정 권리(§37의2) — `/privacy`, `/privacy-caregiver`
- 전자상거래법(§13 표시·§17·18 청약철회·§20 중개자 고지) — `/ecommerce-notice`, 위치정보법 — `/location-service-notice`
- 사업자 표시는 `src/lib/company.js` 단일 출처(푸터·결제 안내·법적 고지 공통)
- KWCAG 2.2 웹 접근성 표준 준수

## 최근 업데이트 (2026-10-15 기준)

| 날짜 | 내용 |
|---|---|
| 2026-09-23 | CI: GitHub Pages 임시 미리보기 배포 + `build:ghpages`(basePath) 빌드 |
| 2026-09-28~29 | nginx 정본을 서버 실제 구성에 맞춰 재작성 — 홈 폴더 배포(`deploy-webpage.sh` 기본 경로 변경), app/api 파일럿 프록시, HTTPS 는 443 SSH 공유 구성(`listen 443 ssl`·`certbot --nginx` 제거) |
| 2026-09-30 | Cloudflare 대응 — `X-Forwarded-For`·`limit_req` 키를 `$carelink_client_ip` 로, 존 이름 `_cip` 변경 |
| 2026-10-01 | www 보안 헤더(CSP·X-Frame-Options DENY·Permissions-Policy), CSP 에 `cdn.jsdelivr.net`(Pretendard) 허용, app `/_next/image` 차단 |
| 2026-10-04 | 전자상거래 고지 · 위치기반서비스 이용자 고지 초안 + 푸터 법적 고지 메뉴 |
| 2026-10-14 | **B2C 역할 우선 대문**(`/`), B2G 내용 `/institution-guide` 분리, `src/lib/hosts.js` 운영 빌드 SSR 기본값·`APP_PATHS`·비로컬 호스트 운영 유도, `check-no-localhost` 빌드 검사, 사업자 정보 확정 `src/lib/company.js` |
| 2026-10-14 | 이용약관 개정(개정 지시서 AICL-TERMS-REV-2026-10, v1.0 보존 `/terms/v1.0`, 조문 자동 목차), 개인정보처리방침 개정안(작업서 §3 21개 조 + 생성형 AI 부록, v1.0 보존 `/privacy/history/v1.0`, 자리표시자 게이트), `export-terms-text.mjs` 앱 동기화 |
| 2026-10-14 | 간병인 이용약관 · 간병인 개인정보처리방침 신규, 공용 렌더러 `LegalDocument.js`, 전자상거래·위치·AI 윤리 고지 법률 검토 재작성, **전 법적 고지 v1.1 · 공고 12월 1일(구 공고일, 10-27 L-01 로 2026-10-27 정정) · 시행 2027-01-01 통일**(`legal-meta.js`), `check-legal-placeholders` 빌드 검사 |
| 2026-10-27 | **L-01** 법적 고지 7종 버전 메타 확정: 공고 2026-10-27 · 시행 2027-01-01, `status: announced`, 미확정 문구 제거, `LegalVersionGate`(시행일 전 v1.0 기본·`?version=1.1`, 시행일부터 자동 전환), 빌드 시 메타 검증(`assertLegalMeta`), `/terms` 공용 렌더러 통합 |

---

© 2026 AI CareLink. All rights reserved.
