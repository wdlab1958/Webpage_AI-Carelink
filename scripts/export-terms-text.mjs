#!/usr/bin/env node
/** 약관 v1.1 본문을 평문으로 내보내 앱(backend/legal, docs/legal)과 동기화한다. 사용: node scripts/export-terms-text.mjs [앱 저장소 경로] */
import fs from 'node:fs';
import path from 'node:path';
import { loadContent } from './lib/load-content.mjs';
const here = path.dirname(new URL(import.meta.url).pathname);
const mod = await loadContent('terms-v2');
const text = mod.toPlainText();
if (/\{\{|NOTE:/.test(text)) { console.error('자리표시자 잔존'); process.exit(1); }
const app = process.argv[2] || path.join(here, '../../AiCarelink');
for (const rel of ['backend/legal/terms_of_service_v1.1.txt', 'docs/legal/terms_of_service_v1.1.txt']) {
  const out = path.join(app, rel); fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, text + '\n');
  console.log('→', out, text.length, 'chars');
}
