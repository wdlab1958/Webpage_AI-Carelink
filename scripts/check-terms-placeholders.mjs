#!/usr/bin/env node
/** 약관 소스·정적 산출물에 자리표시자({{ }})나 작성자 주석(NOTE:)이 남아 있으면 빌드 실패 (개정 지시서 T3·T4). */
import fs from 'node:fs';
import path from 'node:path';
// JSX 파일의 {{ }} 는 스타일 객체라 제외 — 본문 모듈과 렌더된 HTML 만 검사
const targets = ['src/content/terms-v2.js', 'out/terms'];
const hits = [];
function scan(p) {
  if (!fs.existsSync(p)) return;
  if (fs.statSync(p).isDirectory()) return fs.readdirSync(p).forEach((f) => scan(path.join(p, f)));
  if (!/\.(js|jsx|html|txt|md)$/.test(p)) return;
  const s = fs.readFileSync(p, 'utf8');
  for (const re of [/\{\{[^}]*\}\}/g, /NOTE:/g, /\[확인 필요/g]) { const m = s.match(re); if (m) hits.push(`${p}: ${re.source} ×${m.length}`); }
}
targets.forEach(scan);
if (hits.length) { console.error('✖ 약관 자리표시자/주석 잔존:\n' + hits.join('\n')); process.exit(1); }
console.log('✓ 약관 자리표시자·NOTE 0건');
