#!/usr/bin/env node
/**
 * 정적 export 산출물(out/)에 localhost 링크가 남아 있으면 빌드 실패 — UX 개편 Phase 0-1 (F1).
 * 사용: node scripts/check-no-localhost.mjs [dir]   (build:static 의 후속 단계)
 */
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve(process.argv[2] || 'out');
if (!fs.existsSync(dir)) { console.error(`✖ ${dir} 가 없습니다 (먼저 npm run build:static)`); process.exit(1); }
const PATTERNS = [/localhost:3001/g, /localhost:8100/g, /127\.0\.0\.1:3001/g, /127\.0\.0\.1:8100/g];
const hits = [];
let files = 0;
(function walk(p) {
  for (const f of fs.readdirSync(p)) {
    const full = path.join(p, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.(html|js|txt|json)$/.test(f)) {
      files++;
      const s = fs.readFileSync(full, 'utf8');
      for (const re of PATTERNS) {
        re.lastIndex = 0;
        if (re.test(s)) hits.push(`${path.relative(process.cwd(), full)} ← ${re.source}`);
      }
    }
  }
})(dir);
if (hits.length) {
  console.error(`✖ 운영 산출물에 localhost 링크 ${hits.length}건 — 대문에서 앱으로 진입할 수 없습니다 (Phase 0-1)\n` + hits.join('\n'));
  process.exit(1);
}
console.log(`✓ localhost 링크 0건 (${files} files in ${path.relative(process.cwd(), dir) || '.'})`);
