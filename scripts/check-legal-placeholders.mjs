#!/usr/bin/env node
/**
 * 법적 고지 자리표시자 검사 (약관 T3·T4, 개인정보처리방침 작업서 §0-4).
 *  - 이용약관(terms-v2.js, out/terms): {{ }}·NOTE:·[확인 필요 가 있으면 실패
 *  - 개인정보처리방침(privacy-v2.js): 남은 {{ }} 목록을 출력하고 실패 → 회사가 채우기 전엔 운영 배포 불가.
 *    긴급 배포가 필요하면 ALLOW_LEGAL_PLACEHOLDERS=1 로 우회(목록은 여전히 출력).
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
let fail = false;

// 1) 약관 — 엄격
const termsHits = [];
function scan(p) {
  if (!fs.existsSync(p)) return;
  if (fs.statSync(p).isDirectory()) return fs.readdirSync(p).forEach((f) => scan(path.join(p, f)));
  if (!/\.(js|html|txt|md)$/.test(p)) return;
  const s = fs.readFileSync(p, 'utf8');
  for (const re of [/\{\{[^}]*\}\}/g, /NOTE:/g, /\[확인 필요/g]) { const m = s.match(re); if (m) termsHits.push(`${path.relative(root, p)}: ${re.source} ×${m.length}`); }
}
['src/content/terms-v2.js', 'src/content/terms-caregiver.js', 'src/content/privacy-caregiver.js', 'src/content/ecommerce-notice.js', 'src/content/location-notice.js', 'src/content/ai-ethics.js', 'out/terms', 'out/terms-caregiver', 'out/privacy-caregiver', 'out/ecommerce-notice', 'out/location-service-notice', 'out/ai-ethics'].forEach((t) => scan(path.join(root, t)));
if (termsHits.length) { console.error('✖ 이용약관 자리표시자/주석 잔존:\n' + termsHits.join('\n')); fail = true; }
else console.log('✓ 이용약관 자리표시자·NOTE 0건');

// 2) 개인정보처리방침 — 목록 출력
const tmp = path.join(root, 'scripts/.privacy-v2.tmp.mjs');
fs.writeFileSync(tmp, fs.readFileSync(path.join(root, 'src/content/privacy-v2.js'), 'utf8'));
const mod = await import(pathToFileURL(tmp).href);
fs.unlinkSync(tmp);
const ph = mod.placeholders();
if (ph.length) {
  console.error(`⚠ 개인정보처리방침 v1.1(개정안) 자리표시자 ${ph.length}건 — 회사가 사실관계를 확정해 채워야 합니다:`);
  for (const p of ph) console.error(`   - ${p.where}: ${p.text}`);
  console.error('   → /privacy 는 자리표시자가 남아 있는 동안 v1.0 본문을 표시합니다(src/app/privacy/page.js 게이트). 채우면 자동으로 v1.1 이 노출됩니다.');
  if (process.env.STRICT_PRIVACY === '1') fail = true;
} else console.log('✓ 개인정보처리방침 자리표시자 0건');
process.exit(fail ? 1 : 0);
