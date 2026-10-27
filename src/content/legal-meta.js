/**
 * 모든 법적 고지·지원 문서(7종) 공통 버전 메타데이터 — 법적고지 수정 지시서(2026-10-27) L-01.
 *  • 초기 버전 1.0 → 현행 개정 버전 1.1
 *  • 상태 announced · 공고일 2026-10-27 · 시행일 2027-01-01 (사전공지 66일 ≥ 불리·중요 변경 30일)
 *  • 날짜는 배너·부칙·개정 이력 문자열에 직접 쓰지 않고 반드시 이 파일의 값을 렌더링한다.
 *  • 공고 후 v1.1 본문을 바꾸면 재공고해야 한다. 시행일 2027-01-01 을 지키려면 재공고 기한은 2026-12-02(시행 30일 전).
 *    변경 시 LEGAL_ANNOUNCED_AT 을 재공고일로 갱신하고 LEGAL_ANNOUNCEMENTS 에 이전 공고를 남긴다.
 *  • 빌드 검사: 각 문서 모듈이 assertLegalMeta() 를 모듈 로드 시 호출 → 조건 위반이면 next build 가 실패한다
 *    (scripts/check-legal-placeholders.mjs 도 같은 검사를 실행해 목록을 출력).
 */
export const LEGAL_INITIAL_VERSION = '1.0';
export const LEGAL_CURRENT_VERSION = '1.1';
/** draft(공고 전) | announced(공고 완료·시행 전) | effective(시행 중) — 시행 여부는 날짜로 판정하므로 소스에는 draft/announced 만 둔다 */
export const LEGAL_STATUS_CODE = 'announced';
export const LEGAL_ANNOUNCED_AT = '2026-10-27';
export const LEGAL_EFFECTIVE_AT = '2027-01-01';
export const LEGAL_ANNOUNCED_KO = '2026년 10월 27일';
export const LEGAL_EFFECTIVE_KO = '2027년 1월 1일';
/** 시행일 30일 전 — 이 날 이후 v1.1 본문을 바꾸면 시행일을 미루거나 해당 조항을 v1.2 로 분리한다 */
export const LEGAL_REANNOUNCE_DEADLINE = '2026-12-02';
export const LEGAL_MIN_NOTICE_DAYS = 30;
/** 공고 이력(재공고 시 앞에 추가) */
export const LEGAL_ANNOUNCEMENTS = [{ announcedAt: LEGAL_ANNOUNCED_AT, effectiveAt: LEGAL_EFFECTIVE_AT, note: '최초 공고' }];
/** 이용약관·개인정보처리방침(통합)의 현행 시행 버전 */
export const LEGAL_PREVIOUS = { version: '1.0', announcedAt: '2025-12-25', effectiveAt: '2026-01-01' };
/** 2026-10-14 초안으로만 게시되었고 시행된 적이 없는 문서(간병인 약관·간병인 방침·전자상거래·위치·AI 고지)의 v1.0 이력 */
export const LEGAL_DRAFT_V1 = { version: '1.0', announcedAt: '2026-10-14', effectiveAt: '—' };

/** 배너 아래 상태 줄 — 미확정 문구(검토 중·조정 가능) 금지 */
export const LEGAL_STATUS = `공고 완료 — ${LEGAL_EFFECTIVE_AT}부터 시행됩니다.`;

/** 공고 배너 문장(지시서 L-01 ④ 문구). noun: '약관'|'고지'|'방침', particle: '은'|'는' */
export const announcementSentence = (noun = '약관', particle = '은', version = LEGAL_CURRENT_VERSION) =>
  `이 ${noun}(v${version})${particle} ${LEGAL_ANNOUNCED_AT}에 공고되었고 ${LEGAL_EFFECTIVE_AT}부터 시행됩니다.`;
/** 부칙·변경 조항용 한글 날짜 문장 */
export const effectiveClause = (noun = '약관', particle = '은', version = LEGAL_CURRENT_VERSION) =>
  `이 ${noun}(v${version})${particle} ${LEGAL_EFFECTIVE_KO}부터 시행합니다(공고일 ${LEGAL_ANNOUNCED_KO}).`;

/** 문서 META 생성 — 7종이 같은 상태·날짜를 공유한다 */
export const legalMeta = (extra = {}) => ({
  version: LEGAL_CURRENT_VERSION,
  status: LEGAL_STATUS_CODE,
  announcedAt: LEGAL_ANNOUNCED_AT,
  effectiveAt: LEGAL_EFFECTIVE_AT,
  statusLine: LEGAL_STATUS,
  ...extra,
});

const KST = '+09:00';
export const effectiveAtMs = (iso = LEGAL_EFFECTIVE_AT) => Date.parse(`${iso}T00:00:00${KST}`);
/** 시행일 00:00(KST) 이후인가 — 정적 사이트이므로 열람 시각(브라우저) 기준으로 자동 전환, 수동 배포 불필요 */
export const isEffective = (now = new Date(), iso = LEGAL_EFFECTIVE_AT) => now.getTime() >= effectiveAtMs(iso);
/**
 * 기본 뷰 버전 결정: 시행 전에는 현행 시행 버전(previous), 시행 후에는 개정 버전. ?version= 으로 명시하면 그 버전.
 * previous 가 없는 문서(시행된 종전 버전이 없음)는 항상 개정 버전을 보여 준다.
 */
export function resolveLegalVersion({ requested, hasPrevious = true, now = new Date(), meta = {} } = {}) {
  const cur = meta.version || LEGAL_CURRENT_VERSION;
  const prev = meta.previousVersion || LEGAL_PREVIOUS.version;
  if (requested === cur) return cur;
  if (requested === prev && hasPrevious) return prev;
  if (!hasPrevious) return cur;
  return isEffective(now, meta.effectiveAt || LEGAL_EFFECTIVE_AT) ? cur : prev;
}

// 금지 문구(미확정 표현·구 공고일). 리터럴을 쪼개 둔 것은 §4 검증 `rg` 가 이 파일을 잔존 건수로 세지 않게 하기 위함.
export const LEGAL_FORBIDDEN_PHRASES = new RegExp(['변호사 검토 ' + '중', '문구가 조정될 수 ' + '있습니다', '법무 검토 ' + '중', '검토 결과에 ' + '따라', '2026-12-' + '01', '2026년 12월 ' + '1일'].join('|'));
const DAY = 86400000;
const daysBetween = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / DAY);
/**
 * 빌드 시 검증(지시서 L-01 ③). 실패하면 throw → next build / check:legal 실패.
 *  - status 가 draft|announced 중 하나
 *  - announced 이면 announced_at·effective_at 이 공통값과 같고, 시행일 − 공고일 ≥ 30일(불리·중요 변경 기준)
 *  - announced 이면 본문·상태줄·이력에 미확정 문구·구 공고일이 없음
 */
export function assertLegalMeta(label, meta, texts = []) {
  const problems = [];
  if (!['draft', 'announced'].includes(meta.status)) problems.push(`status=${meta.status} (draft|announced 만 허용)`);
  if (meta.status === 'announced') {
    if (meta.announcedAt !== LEGAL_ANNOUNCED_AT) problems.push(`announcedAt=${meta.announcedAt} ≠ ${LEGAL_ANNOUNCED_AT}`);
    if (meta.effectiveAt !== LEGAL_EFFECTIVE_AT) problems.push(`effectiveAt=${meta.effectiveAt} ≠ ${LEGAL_EFFECTIVE_AT}`);
    const notice = daysBetween(meta.announcedAt, meta.effectiveAt);
    if (!(notice >= LEGAL_MIN_NOTICE_DAYS)) problems.push(`사전공지 ${notice}일 < ${LEGAL_MIN_NOTICE_DAYS}일`);
    const blob = [meta.statusLine, meta.status, ...texts].map((t) => (typeof t === 'string' ? t : JSON.stringify(t ?? ''))).join('\n');
    const m = blob.match(LEGAL_FORBIDDEN_PHRASES);
    if (m) problems.push(`미확정 문구/구 공고일 잔존: "${m[0]}"`);
  }
  if (problems.length) throw new Error(`[legal-meta] ${label} v${meta.version} 검증 실패: ${problems.join('; ')}`);
  return true;
}

assertLegalMeta('legal-meta', legalMeta());
