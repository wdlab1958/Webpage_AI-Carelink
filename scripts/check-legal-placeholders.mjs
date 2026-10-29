#!/usr/bin/env node
/**
 * 법적 고지 빌드 검사 (약관 T3·T4, 개인정보처리방침 작업서 §0-4, 법적고지 수정 지시서 L-01 ③).
 *  1) 이용약관·고지 6종 + out/: {{ }}·NOTE:·[확인 필요 가 있으면 실패
 *  2) 전 소스(src/): 미확정 문구(검토 중·조정 가능 — legal-meta LEGAL_FORBIDDEN_PHRASES)·구 공고일(12월 1일) 잔존 시 실패
 *  3) 버전 메타: 7종 모두 status(draft|announced)·announced_at·effective_at·사전공지 ≥30일·미확정 문구 없음 (announced 문서),
 *     draft 문서는 기본 뷰로 노출되지 않음을 전제로 목록만 출력
 *  4) 개인정보처리방침 v1.1 남은 {{ }} 목록 출력(채우기 전엔 draft 유지). STRICT_PRIVACY=1 이면 실패.
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadContent } from './lib/load-content.mjs';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
let fail = false;

const walk = (p, out = []) => {
  if (!fs.existsSync(p)) return out;
  if (fs.statSync(p).isDirectory()) { fs.readdirSync(p).forEach((f) => walk(path.join(p, f), out)); return out; }
  if (/\.(js|mjs|html|txt|md)$/.test(p)) out.push(p);
  return out;
};

// 1) 자리표시자·NOTE — 엄격
const termsHits = [];
for (const t of ['src/content/terms-v2.js', 'src/content/terms-caregiver.js', 'src/content/privacy-caregiver.js', 'src/content/ecommerce-notice.js', 'src/content/location-notice.js', 'src/content/ai-ethics.js', 'out/terms', 'out/terms-caregiver', 'out/privacy-caregiver', 'out/ecommerce-notice', 'out/location-service-notice', 'out/ai-ethics']) {
  for (const p of walk(path.join(root, t))) {
    const s = fs.readFileSync(p, 'utf8');
    for (const re of [/\{\{[^}]*\}\}/g, /NOTE:/g, /\[확인 필요/g]) { const m = s.match(re); if (m) termsHits.push(`${path.relative(root, p)}: ${re.source} ×${m.length}`); }
  }
}
if (termsHits.length) { console.error('✖ 이용약관 자리표시자/주석 잔존:\n' + termsHits.join('\n')); fail = true; }
else console.log('✓ 이용약관 자리표시자·NOTE 0건');

// 2) 미확정 문구·구 공고일 — src 전체 (legal-meta 의 금지 목록 자체는 리터럴을 쪼개 두어 걸리지 않는다)
const meta = await loadContent('legal-meta');
const forbidden = [];
for (const p of walk(path.join(root, 'src'))) {
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  lines.forEach((l, i) => { const m = l.match(meta.LEGAL_FORBIDDEN_PHRASES); if (m) forbidden.push(`${path.relative(root, p)}:${i + 1}: ${m[0]}`); });
}
if (forbidden.length) { console.error('✖ 미확정 문구/구 공고일 잔존(L-01):\n' + forbidden.join('\n')); fail = true; }
else console.log('✓ 미확정 문구·구 공고일 0건');

// 3) 버전 메타 7종
const DOCS = [
  ['이용약관', 'terms-v2', 'TERMS_META', ['REVISION_HISTORY', 'CHAPTERS']],
  ['간병인 이용약관', 'terms-caregiver', 'CAREGIVER_TERMS_META', ['CAREGIVER_TERMS_HISTORY', 'CAREGIVER_TERMS_CHAPTERS']],
  ['전자상거래 고지', 'ecommerce-notice', 'ECOMMERCE_META', ['ECOMMERCE_HISTORY', 'ECOMMERCE_CHAPTERS']],
  ['위치기반서비스 이용자 고지', 'location-notice', 'LOCATION_META', ['LOCATION_HISTORY', 'LOCATION_CHAPTERS']],
  ['개인정보처리방침(통합)', 'privacy-v2', 'PRIVACY_META', ['PRIVACY_HISTORY', 'ARTICLES', 'APPENDIX']],
  ['간병인 개인정보처리방침', 'privacy-caregiver', 'CAREGIVER_PRIVACY_META', ['CAREGIVER_PRIVACY_HISTORY', 'CAREGIVER_PRIVACY_CHAPTERS']],
  ['AI 윤리·투명성', 'ai-ethics', 'AI_ETHICS_META', ['AI_ETHICS_HISTORY', 'AI_ETHICS_CHAPTERS']],
];
const rows = [];
for (const [label, mod, metaKey, textKeys] of DOCS) {
  try {
    const m = await loadContent(mod);   // 모듈 로드 시 assertLegalMeta 가 실행된다
    const md = m[metaKey];
    meta.assertLegalMeta(label, md, textKeys.map((k) => m[k]));
    const days = Math.round((Date.parse(md.effectiveAt) - Date.parse(md.announcedAt)) / 86400000);
    rows.push(`   ${md.status === 'announced' ? '✓' : '○'} ${label.padEnd(16)} v${md.version} ${md.status.padEnd(9)} 공고 ${md.announcedAt} · 시행 ${md.effectiveAt} (사전공지 ${days}일)`);
  } catch (e) { rows.push(`   ✖ ${label}: ${e.message}`); fail = true; }
}
console.log((fail ? '✖' : '✓') + ' 버전 메타 검증:\n' + rows.join('\n'));

// 4) 개인정보처리방침 자리표시자 목록
const pv = await loadContent('privacy-v2');
const ph = pv.placeholders();
if (ph.length) {
  console.error(`⚠ 개인정보처리방침 v1.1(개정안) 자리표시자 ${ph.length}건 — 회사가 사실관계를 확정해 채워야 합니다:`);
  for (const p of ph) console.error(`   - ${p.where}: ${p.text}`);
  console.error('   → /privacy 는 status=draft 인 동안 v1.0 본문을 표시합니다(src/app/privacy/page.js 게이트). 채우고 announced 로 바꾸면 버전 게이트가 시행일 기준으로 v1.1 을 노출합니다.');
  if (pv.PRIVACY_META.status === 'announced') { console.error('✖ announced 상태인데 자리표시자가 남아 있습니다'); fail = true; }
  if (process.env.STRICT_PRIVACY === '1') fail = true;
} else console.log('✓ 개인정보처리방침 자리표시자 0건');
process.exit(fail ? 1 : 0);
