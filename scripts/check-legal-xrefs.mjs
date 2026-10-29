#!/usr/bin/env node
// 법적 문서 간 조문 상호참조 검사 (L-05). 「문서명」 제N조 / 문서명 제N조 가 실제 존재하는 조문을 가리키는지 확인한다.
// 사용: node scripts/check-legal-xrefs.mjs   (build:static 에서 check-legal-placeholders 뒤에 실행)
import { readFileSync } from 'node:fs';
import { loadContent } from './lib/load-content.mjs';

const docs = {
  terms: { label: '서비스 이용약관(v1.1)', mod: 'terms-v2' },
  termsCaregiver: { label: '간병인 이용약관', mod: 'terms-caregiver' },
  privacy: { label: '통합 개인정보처리방침(v1.1)', mod: 'privacy-v2' },
  privacyCaregiver: { label: '간병인 개인정보처리방침', mod: 'privacy-caregiver', noSelf: true },   // 'N.' 번호 체계 — 내부 참조 검사 제외
  location: { label: '위치기반서비스 고지', mod: 'location-notice' },
  ecommerce: { label: '전자상거래 고지', mod: 'ecommerce-notice' },
  aiEthics: { label: 'AI 윤리·투명성 고지', mod: 'ai-ethics' },
};
// 모듈에서 조문 배열 추출: ARTICLES 또는 *CHAPTERS(=[{title, articles}]) 를 평탄화
const articlesOf = (m) => {
  if (Array.isArray(m.ARTICLES)) return m.ARTICLES;
  for (const v of Object.values(m)) if (Array.isArray(v) && v[0]?.articles) return v.flatMap((c) => c.articles);
  return [];
};
const nums = (arts) => new Set(arts.map((a) => (a.title.match(/^제(\d+)조/) || [])[1]).filter(Boolean).map(Number));
const loaded = {}; const artsOf = {};
for (const [k, d] of Object.entries(docs)) {
  artsOf[k] = articlesOf(await loadContent(d.mod));
  loaded[k] = nums(artsOf[k]);
}
// 현행(공개 중) 통합 방침 v1.0 — 보존본 page.js 에서 제목만 추출
const v1 = readFileSync(new URL('../src/app/privacy/history/v1.0/page.js', import.meta.url), 'utf8');
loaded.privacyV10 = new Set([...v1.matchAll(/제(\d+)조 \(/g)].map((m) => Number(m[1])));

// 참조 패턴: 문서명 뒤에 바로 오는 제N조. 같은 문서 안의 '제N조' 는 self 로 검사.
const refPatterns = [
  { re: /「?서비스 이용약관」?\s*제(\d+)조/g, target: 'terms' },
  { re: /「?이용약관」?\s*제(\d+)조/g, target: 'terms' },
  { re: /간병인 이용약관\s*제(\d+)조/g, target: 'termsCaregiver' },
  { re: /통합 개인정보처리방침\s*제(\d+)조/g, target: 'privacy' },
  { re: /개인정보처리방침\s*제(\d+)조/g, target: 'privacy' },
  { re: /현행 v1\.0 제(\d+)조/g, target: 'privacyV10' },
  { re: /v1\.1 시행 후 제(\d+)조/g, target: 'privacy' },
];

let bad = 0; const rows = [];
for (const [k, d] of Object.entries(docs)) {
  const arts = artsOf[k];
  const text = arts.map((a) => [a.body, a.bodyAfter, ...(a.table?.rows?.flat() || [])].filter(Boolean).join('\n')).join('\n');
  // 1) 다른 문서 참조
  for (const p of refPatterns) {
    for (const hit of text.matchAll(p.re)) {
      // '이용약관 제N조' 가 '간병인 이용약관 제N조' 의 일부면 건너뜀
      const before = text.slice(Math.max(0, hit.index - 4), hit.index);
      if (p.target === 'terms' && /간병인 ?$/.test(before)) continue;
      if (p.target === 'privacy' && /간병인 ?$/.test(before)) continue;
      if (p.target === 'privacy' && /통합 ?$/.test(before) && p.re.source.startsWith('개인')) continue;
      const n = Number(hit[1]);
      const ok = loaded[p.target].has(n);
      if (!ok) bad++;
      rows.push([d.label, hit[0].replace(/\s+/g, ' '), docs[p.target]?.label || '통합 방침 v1.0(현행)', ok ? 'OK' : 'MISSING']);
    }
  }
  // 2) 같은 문서 내부 참조 — 본문만 검사(표의 '근거' 열은 법령 조문이라 제외), 법률 조문(법·령·규칙·「…」 뒤, 제N조·제M조 체인)은 제외
  if (d.noSelf) continue;
  const bodyText = arts.map((a) => [a.body, a.bodyAfter].filter(Boolean).join('\n')).join('\n');
  for (const hit of bodyText.matchAll(/(?:^|[^가-힣])제(\d+)조(?!의)/g)) {
    const before = bodyText.slice(Math.max(0, hit.index - 12), hit.index + 1);
    if (/(법|령|규칙|약관|방침|고지|v1\.0|시행 후|」|조·|조, |호, |부터|\))\s?$/.test(before)) continue;   // '법 제15조부터 제26조', '기본법」(시행일) 제31조'
    const n = Number(hit[1]);
    if (!loaded[k].has(n)) { bad++; rows.push([d.label, `(내부) 제${n}조`, d.label, 'MISSING']); }
  }
}
for (const r of rows.filter((r) => r[3] === 'MISSING')) console.log('✖', ...r);
const cross = rows.filter((r) => r[3] === 'OK');
console.log(`${bad === 0 ? '✓' : '✖'} 조문 상호참조 ${rows.length}건 중 ${bad}건 불일치 (타 문서 참조 ${cross.length + rows.filter(r=>r[3]==='MISSING' && !r[1].startsWith('(내부)')).length}건)`);
if (bad) process.exit(1);
