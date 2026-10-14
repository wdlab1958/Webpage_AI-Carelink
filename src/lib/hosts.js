/* ═══════════════════════════════════════════════════════════════════════════
   Host-aware target resolver — www(대문) → app(플랫폼) / api(백엔드) 라우팅

   원칙: "접속한 호스트"를 기준으로 앱/백엔드 주소를 유도한다.
   같은 코드가 집(192.168.45.206) · 회사(10.10.10.64) · localhost · 운영 도메인에서
   설정 변경 없이 동작한다.

   ┌──────────────────────────────┬──────────────────────────────┬──────────────────────────────┐
   │ 대문 접속 호스트              │ 앱(FE)                        │ 백엔드(BE)                    │
   ├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
   │ localhost:3002               │ http://localhost:3001         │ http://localhost:8100         │
   │ 192.168.45.206:3002 (집)     │ http://192.168.45.206:3001    │ http://192.168.45.206:8100    │
   │ 10.10.10.64:3002 (회사)      │ http://10.10.10.64:3001       │ http://10.10.10.64:8100       │
   │ www.ai-carelink.co.kr (운영) │ https://app.ai-carelink.co.kr │ https://api.ai-carelink.co.kr │
   └──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘

   우선순위:
     1. NEXT_PUBLIC_APP_URL / NEXT_PUBLIC_API_URL 이 비어있지 않으면 그 값을 그대로 사용 (운영 명시 원칙)
     2. 브라우저: window.location.hostname 기준으로 유도
     3. SSR: 기본값(localhost)
   ═══════════════════════════════════════════════════════════════════════════ */

export const PROD_DOMAIN = 'ai-carelink.co.kr';
export const PROD_WWW_URL = `https://www.${PROD_DOMAIN}`;
export const PROD_APP_URL = `https://app.${PROD_DOMAIN}`;
export const PROD_API_URL = `https://api.${PROD_DOMAIN}`;

// 로컬/LAN 개발 포트 — 집·회사 공통 (FE 3001 / BE 8100, run_all_projects.sh 할당과 동일). 환경변수로 덮어쓸 수 있다.
export const DEV_APP_PORT = Number(process.env.NEXT_PUBLIC_APP_PORT) || 3001;
export const DEV_API_PORT = Number(process.env.NEXT_PUBLIC_API_PORT) || 8100;
export const DEV_WWW_PORT = Number(process.env.NEXT_PUBLIC_WWW_PORT) || 3002;

const ENV_APP_URL = (process.env.NEXT_PUBLIC_APP_URL || '').trim();
const ENV_API_URL = (process.env.NEXT_PUBLIC_API_URL || '').trim();

function stripTrailingSlash(u) {
  return u.replace(/\/+$/, '');
}

/**
 * 순수 함수 — 테스트 가능. hostname(포트 제외) → { appUrl, apiUrl, wwwUrl, mode }
 * @param {string} hostname  예: 'localhost' | '192.168.45.206' | 'www.ai-carelink.co.kr'
 * @param {string} protocol  예: 'http:' | 'https:'
 */
/** 로컬·LAN 호스트인가 — localhost / 127.x / 10.x / 192.168.x / 172.16~31.x / *.local / 호스트명 없음 */
export function isLocalHostname(hostname) {
  const h = (hostname || '').toLowerCase();
  if (!h || h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h === '0.0.0.0') return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (h === '::1' || h === '[::1]') return true;
  return false;
}

// 운영 빌드(정적 export / NODE_ENV=production)는 SSR 기본값부터 운영 주소를 쓴다 — UX 개편 Phase 0-1(F1):
// 하이드레이션 전·실패 시에도 대문 링크가 localhost:3001 로 남지 않는다.
export const IS_PROD_BUILD = process.env.NODE_ENV === 'production' || !!process.env.STATIC_EXPORT || !!process.env.GITHUB_PAGES;

export function resolveTargets(hostname, protocol = 'http:') {
  const h = (hostname || '').toLowerCase();

  // 운영 도메인 (www / root / app / api 어느 서브도메인으로 들어와도 동일) + 로컬/LAN 이 아닌 모든 호스트(GitHub Pages 등)
  if (h === PROD_DOMAIN || h.endsWith(`.${PROD_DOMAIN}`) || !isLocalHostname(h)) {
    return {
      mode: 'production',
      wwwUrl: PROD_WWW_URL,
      appUrl: ENV_APP_URL ? stripTrailingSlash(ENV_APP_URL) : PROD_APP_URL,
      apiUrl: ENV_API_URL ? stripTrailingSlash(ENV_API_URL) : PROD_API_URL,
    };
  }

  // 로컬 / LAN (localhost, 127.0.0.1, 192.168.x.x, 10.x.x.x, 172.16-31.x.x, *.local 등)
  const proto = protocol === 'https:' ? 'https:' : 'http:';
  const host = h || 'localhost';
  return {
    mode: 'development',
    wwwUrl: `${proto}//${host}:${DEV_WWW_PORT}`,
    appUrl: ENV_APP_URL ? stripTrailingSlash(ENV_APP_URL) : `${proto}//${host}:${DEV_APP_PORT}`,
    apiUrl: ENV_API_URL ? stripTrailingSlash(ENV_API_URL) : `${proto}//${host}:${DEV_API_PORT}`,
  };
}

/** SSR 및 초기 렌더용 기본값 — 운영 빌드는 운영 주소, 개발은 localhost (하이드레이션 후 useTargets 가 실제 호스트 기준으로 갱신) */
export const DEFAULT_TARGETS = IS_PROD_BUILD ? resolveTargets(`www.${PROD_DOMAIN}`, 'https:') : resolveTargets('localhost', 'http:');

/** 브라우저에서 현재 접속 호스트 기준 타깃 계산 */
export function getTargets() {
  if (typeof window === 'undefined') return DEFAULT_TARGETS;
  return resolveTargets(window.location.hostname, window.location.protocol);
}

/** 앱 내부 경로 → 절대 URL. path 는 '/dashboard/patient/mobile' 형식. */
export function appHref(path = '/', targets = getTargets()) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${targets.appUrl}${p === '/' ? '' : p}`;
}

/* ── 플랫폼 진입 경로 (app.ai-carelink.co.kr 기준, 메인 AiCarelink Next.js 라우트) ── */
export const APP_PATHS = {
  root: '/',                                   // 역할 우선 진입 화면 ("어떤 도움이 필요하세요?")
  login: '/?login=1',                          // 첫 화면의 로그인 열기
  // UX 개편(2026-10-14) 역할별 앱 — 보호자 / 간병인·동행매니저 / 기관
  family: '/family',
  work: '/work',
  institution: '/institution',
  patient: '/family',
  patientMobile: '/family',                    // (구 /dashboard/patient/mobile)
  caregiver: '/work',
  caregiverMobile: '/work',                    // (구 /dashboard/caregiver/mobile)
  hospital: '/institution',                    // (구 /dashboard/hospital)
  shop: '/shop',
  shopAdmin: '/dashboard/shop-admin',
  admin: '/dashboard/admin',
  hospitals: '/hospitals',                     // 요양기관 검색
};
