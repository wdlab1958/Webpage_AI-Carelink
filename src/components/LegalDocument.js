'use client';

/**
 * 법적 고지 공용 렌더러 — 이용약관·개인정보처리방침(보호자/간병인) 이 같은 디자인을 쓴다.
 * props: { icon, title, subtitle, meta:{version, announcedAt, effectiveAt, previousVersion?, previousEffectiveAt?, previousHref?, status?},
 *          banner?:{title, body, tone:'amber'|'purple'}, chapters:[{title, articles:[{title, body, table?, bodyAfter?}]}],
 *          history:[{version, announcedAt?, effectiveAt, summary}], footerLine, related?:[{href,label}] }
 * 목차는 "제n조"/"n." 헤딩에서 자동 생성한다. {{ }} 자리표시자는 눈에 띄게 표시한다.
 */
import { motion } from 'framer-motion';
import { ChevronRight, History, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const articleId = (title) => {
  const m = title.match(/^제(\d+)조/) || title.match(/^(\d+)\./);
  return m ? `article-${m[1]}` : title === '부칙' ? 'addendum' : title.replace(/[^\w가-힣]+/g, '-');
};

export function Text({ children, className = '' }) {
  const parts = String(children || '').split(/(\{\{[^}]*\}\})/g);
  return (
    <span className={className}>
      {parts.map((p, i) => (/^\{\{[^}]*\}\}$/.test(p)
        ? <mark key={i} className="rounded bg-amber-400/20 px-1 text-amber-200 border border-amber-400/40" title="회사 확정 필요 항목">{p}</mark>
        : <span key={i}>{p}</span>))}
    </span>
  );
}

export function DataTable({ table }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[520px]">
        <thead><tr>{table.head.map((h) => <th key={h} className="text-left border-b border-white/20 py-2 pr-4 text-gray-200 align-top">{h}</th>)}</tr></thead>
        <tbody>{table.rows.map((r, ri) => <tr key={ri}>{r.map((c, cj) => <td key={cj} className="border-b border-white/10 py-2 pr-4 text-gray-300 align-top whitespace-pre-line"><Text>{c}</Text></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function LegalDocument({ icon: Icon, title, subtitle, meta, banner, chapters, history = [], footerLine, related = [] }) {
  const toc = chapters.map((ch) => ({ chapter: ch.title, items: ch.articles.filter((a) => a.title !== ch.title).map((a) => ({ id: articleId(a.title), title: a.title })) }));
  const metaBar = (
    <div className="flex flex-wrap gap-4 text-xs text-gray-400">
      <span>버전: {meta.version}</span>
      {meta.announcedAt && <span>공고일: <Text>{meta.announcedAt}</Text></span>}
      <span>시행일: <Text>{meta.effectiveAt}</Text></span>
      {meta.previousHref && <Link href={meta.previousHref} className="text-purple-300 hover:text-purple-200 underline">이전 버전(v{meta.previousVersion}) 보기</Link>}
      {history.length > 0 && <a href="#revision-history" className="text-purple-300 hover:text-purple-200 underline">개정 이력</a>}
    </div>
  );
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 z-[-1]" />
      <main className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-white transition-colors">홈</Link>
              <ChevronRight size={16} />
              <span className="text-white">{title}</span>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                {Icon && <Icon className="text-purple-400 w-7 h-7" />}
              </div>
              <div>
                <h1 className="text-4xl font-bold">{title}</h1>
                {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
              </div>
            </div>
            {banner && (
              <div className={`p-6 glass rounded-2xl mb-4 border ${banner.tone === 'purple' ? 'border-purple-400/30 bg-purple-500/5' : 'border-amber-400/30 bg-amber-500/5'}`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`${banner.tone === 'purple' ? 'text-purple-300' : 'text-amber-400'} w-5 h-5 mt-0.5 shrink-0`} />
                  <div className="text-sm leading-relaxed text-gray-200">
                    <p className={`font-semibold ${banner.tone === 'purple' ? 'text-purple-200' : 'text-amber-200'}`}>{banner.title}</p>
                    <p className="mt-1 whitespace-pre-line"><Text>{banner.body}</Text></p>
                    {meta.status && <p className="mt-2 text-xs text-gray-400">{meta.status}</p>}
                  </div>
                </div>
              </div>
            )}
            <div className="p-6 glass rounded-2xl border border-white/10 mb-8">{metaBar}</div>
          </motion.div>

          <motion.nav aria-label="목차" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12 p-6 glass rounded-2xl border border-white/10">
            <h2 className="text-lg font-bold mb-4">목차</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {toc.map((g) => (
                <div key={g.chapter}>
                  {chapters.length > 1 && <p className="text-xs font-semibold tracking-wide text-purple-300/80 mb-1">{g.chapter}</p>}
                  <ul className="space-y-1">{g.items.map((i) => <li key={i.id}><a href={`#${i.id}`} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">{i.title}</a></li>)}</ul>
                </div>
              ))}
            </div>
          </motion.nav>

          <div className="space-y-10">
            {chapters.map((ch, ci) => (
              <section key={ch.title} aria-labelledby={`chapter-${ci}`}>
                {chapters.length > 1 && <h2 id={`chapter-${ci}`} className="text-2xl font-bold text-white mb-4">{ch.title}</h2>}
                <div className="space-y-6">
                  {ch.articles.map((a, ai) => (
                    <motion.article key={a.title} id={articleId(a.title)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + ai * 0.02 }} className="p-6 glass rounded-2xl border border-white/10 scroll-mt-28">
                      {a.title !== ch.title && <h3 className="text-xl font-bold mb-4 text-purple-400">{a.title}</h3>}
                      <Text className="block text-gray-300 text-sm leading-relaxed whitespace-pre-line">{a.body}</Text>
                      {a.table && <DataTable table={a.table} />}
                      {a.bodyAfter && <Text className="mt-4 block text-gray-300 text-sm leading-relaxed whitespace-pre-line">{a.bodyAfter}</Text>}
                    </motion.article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {history.length > 0 && (
            <section id="revision-history" className="mt-12 p-6 glass rounded-2xl border border-white/10 scroll-mt-28">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><History size={18} className="text-purple-400" /> 개정 이력</h2>
              <table className="w-full text-sm">
                <thead><tr className="text-gray-200"><th className="text-left border-b border-white/20 py-2 pr-4">버전</th><th className="text-left border-b border-white/20 py-2 pr-4">공고일</th><th className="text-left border-b border-white/20 py-2 pr-4">시행일</th><th className="text-left border-b border-white/20 py-2">주요 내용</th></tr></thead>
                <tbody>{history.map((h) => <tr key={h.version} className="text-gray-300"><td className="border-b border-white/10 py-2 pr-4">{h.href ? <Link href={h.href} className="text-purple-300 underline">{h.version}</Link> : h.version}</td><td className="border-b border-white/10 py-2 pr-4"><Text>{h.announcedAt || '—'}</Text></td><td className="border-b border-white/10 py-2 pr-4"><Text>{h.effectiveAt}</Text></td><td className="border-b border-white/10 py-2">{h.summary}</td></tr>)}</tbody>
              </table>
              <div className="mt-4">{metaBar}</div>
            </section>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 p-6 glass rounded-2xl border border-white/10 text-center">
            <p className="text-gray-400 text-sm">문의사항이 있으시면 고객센터로 연락해 주시기 바랍니다.</p>
            <p className="text-gray-500 text-xs mt-3 leading-relaxed"><span className="text-gray-400 font-semibold">사업자 정보</span> {footerLine}</p>
            {related.length > 0 && <p className="mt-3 text-xs text-gray-500">관련 문서: {related.map((r, i) => <span key={r.href}>{i > 0 && ' · '}<Link href={r.href} className="text-purple-300 underline">{r.label}</Link></span>)}</p>}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
