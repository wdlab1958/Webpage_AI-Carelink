/** src/content/*.js (ESM, 확장자 없는 상대 import) 를 Node 에서 바로 import 하기 위한 임시 복사 로더 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
let dir = null;
export function contentDir() {
  if (dir) return dir;
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'carelink-content-'));
  for (const f of fs.readdirSync(path.join(root, 'src/content')).filter((f) => f.endsWith('.js'))) {
    const src = fs.readFileSync(path.join(root, 'src/content', f), 'utf8').replace(/from '\.\/([\w-]+)'/g, "from './$1.mjs'");
    fs.writeFileSync(path.join(dir, f.replace(/\.js$/, '.mjs')), src);
  }
  process.on('exit', () => { try { fs.rmSync(dir, { recursive: true, force: true }); } catch { /* ignore */ } });
  return dir;
}
export const loadContent = (name) => import(pathToFileURL(path.join(contentDir(), `${name}.mjs`)).href);
