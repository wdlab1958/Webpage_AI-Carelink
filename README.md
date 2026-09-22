# AI CareLink — 대문 (www.ai-carelink.co.kr)

> 최종 수정일: 2026년 9월 23일

## 프로젝트 소개

AI CareLink 플랫폼의 진입 페이지(대문)입니다. 플랫폼 관리자 / 요양병원 / 쇼핑몰 / 간병인 / 환자·보호자 5개 도메인과
환자·보호자 앱 · 간병인 앱(Android PWA)을 소개하고, 2026~2027 요양급여 제도 변화(요양병원 간병 급여화 · 간병지원 시범사업)와
한국보훈복지의료공단 AI 의료 솔루션 실증 테스트베드 연계 제안을 정리해 보여줍니다.

| 호스트 | 역할 |
|---|---|
| `www.ai-carelink.co.kr` | 대문 (본 저장소, 정적 export) |
| `app.ai-carelink.co.kr` | 플랫폼 전체 (AiCarelink/frontend, Next.js 14) — 5개 도메인 + 모바일 앱 2종 |
| `api.ai-carelink.co.kr` | 백엔드 (AiCarelink/backend, FastAPI) |

## 기술 스택

- Next.js 16.1.1 (App Router) · React 19.2.3 · Framer Motion · Lucide React
- 스타일: `src/app/globals.css` 에 유틸리티 클래스를 직접 정의 (Tailwind 패키지 미사용)
- 운영: `npm run build:static` → `out/` 정적 export → nginx (`deployment/`)

## 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 메인 랜딩 — 5개 도메인 · 모바일 앱 2종 · 급여화 로드맵 · 보훈공단 실증 · 핵심 기능 |
| `/pilot-2026` | 요양급여 제도 변화(2024→2027) · 제도 요건 · 대응 기능 매핑 · 보훈공단 AI 테스트베드 실증 제안 · 출처 |
| `/service-intro` | 서비스 소개 |
| `/ai-matching` | AI 매칭 설명 |
| `/community` | 커뮤니티 |
| `/login` `/signup` `/mypage` | 플랫폼(app)으로 리다이렉트 — 인증·회원 기능은 app 도메인에서 처리 |
| `/terms` `/privacy` `/ai-ethics` | 이용약관 · 개인정보처리방침 · AI 윤리 |

## 앱 / 백엔드 라우팅 (집 · 회사 · 운영 자동 전환)

`src/lib/hosts.js` 가 **접속한 호스트**를 기준으로 앱/백엔드 주소를 유도합니다. 설정 변경 없이 어디서나 동작합니다.

| 대문 접속 | 앱(FE) | 백엔드(BE) |
|---|---|---|
| `localhost:3002` | `localhost:3001` | `localhost:8001` |
| `192.168.45.206:3002` (집) | `192.168.45.206:3001` | `192.168.45.206:8001` |
| `10.10.10.64:3002` (회사) | `10.10.10.64:3001` | `10.10.10.64:8001` |
| `www.ai-carelink.co.kr` | `app.ai-carelink.co.kr` | `api.ai-carelink.co.kr` |

포트는 `.env.local` 의 `NEXT_PUBLIC_APP_PORT` / `NEXT_PUBLIC_API_PORT`, 절대 URL 강제는 `NEXT_PUBLIC_APP_URL` / `NEXT_PUBLIC_API_URL`.
컴포넌트에서는 `<AppLink to="/dashboard/patient/mobile">` 또는 `useTargets()` 를 사용합니다.

## 시작하기

```bash
npm install
npm run dev            # http://localhost:3002  (LAN: http://192.168.45.206:3002)
npm run lint
npm run build:static   # out/ — 운영 배포 산출물
```

배포 절차는 [`deployment/README.md`](deployment/README.md) 참조 (집/회사 → GitHub push → 가비아 서버 pull·빌드).

## 법적 컴플라이언스

- 인공지능 기본법 (2026.1.22 시행) 준수
- 개인정보보호법 · 민감정보(건강정보) 별도 동의
- KWCAG 2.2 웹 접근성 표준 준수

---

© 2026 AI CareLink. All rights reserved.
