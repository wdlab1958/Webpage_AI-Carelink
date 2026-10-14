#!/usr/bin/env node
/** 약관 v2.0 본문을 평문으로 내보내 앱(backend/legal, docs/legal)과 동기화한다. 사용: node scripts/export-terms-text.mjs [앱 저장소 경로] */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const here = path.dirname(new URL(import.meta.url).pathname);
const src = path.join(here, '../src/content/terms-v2.js');
const tmp = path.join(here, '.terms-v2.tmp.mjs');
fs.writeFileSync(tmp, fs.readFileSync(src, 'utf8'));
const mod = await import(pathToFileURL(tmp).href);
fs.unlinkSync(tmp);
const text = mod.toPlainText();
if (/\{\{|NOTE:/.test(text)) { console.error('자리표시자 잔존'); process.exit(1); }
const app = process.argv[2] || path.join(here, '../../AiCarelink');
for (const rel of ['backend/legal/terms_of_service_v2.0.txt', 'docs/legal/terms_of_service_v2.0.txt']) {
  const out = path.join(app, rel); fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, text + '\n');
  console.log('→', out, text.length, 'chars');
}
