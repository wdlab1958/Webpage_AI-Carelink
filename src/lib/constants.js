/* ═══════════════════════════════════════════════════════════════════════════
   AiCarelink Constants (호환 레이어)

   실제 라우팅 로직은 src/lib/hosts.js 로 이동했다.
   - 접속 호스트 기준으로 앱/백엔드 주소를 유도 (집 192.168.45.206 · 회사 10.10.10.64 · 운영 도메인)
   - 컴포넌트에서는 <AppLink to="/..."> 또는 useTargets() 를 사용할 것.

   아래 상수는 SSR/모듈 평가 시점의 기본값(localhost)이므로 링크 href 로 직접 쓰지 말 것.
   ═══════════════════════════════════════════════════════════════════════════ */

import { DEFAULT_TARGETS, PROD_DOMAIN, PROD_WWW_URL, PROD_APP_URL, PROD_API_URL, APP_PATHS } from './hosts';

export { PROD_DOMAIN, PROD_WWW_URL, PROD_APP_URL, PROD_API_URL, APP_PATHS };

// 백엔드 API (FastAPI) — 기본 localhost:8100 (NEXT_PUBLIC_API_PORT / NEXT_PUBLIC_API_URL 로 변경)
export const API_BASE_URL = DEFAULT_TARGETS.apiUrl;

// 메인 애플리케이션 (Next.js) — 기본 localhost:3001 → 운영 app.ai-carelink.co.kr
export const AI_CARELINK_APP_URL = DEFAULT_TARGETS.appUrl;

// Legacy alias — 기존 코드 호환성 유지
export const AI_CARELINK_SERVER_URL = AI_CARELINK_APP_URL;

/* ── 도메인 ────────────────────────────────────────────────────────────── */
// www.ai-carelink.co.kr — 본 프로젝트 (대문/소개 페이지, 정적 export)
// app.ai-carelink.co.kr — 메인 애플리케이션 (플랫폼 관리자/요양병원/쇼핑몰/간병인/환자·보호자 + 모바일 앱 2종)
// api.ai-carelink.co.kr — 백엔드 API (FastAPI)

/* ── 회사/연락처 ───────────────────────────────────────────────────────── */
export const CONTACT_EMAIL = `support@${PROD_DOMAIN}`;
export const PARTNER_EMAIL = `partner@${PROD_DOMAIN}`;
