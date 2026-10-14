'use client';

/**
 * AI CareLink 서비스 이용약관 v2.0 — 개정 지시서 AICL-TERMS-REV-2026-10 반영.
 * 본문은 src/content/terms-v2.js 한 곳에서만 관리한다(앱 DB 본문도 같은 파일에서 내보냄).
 * 목차는 "제n조" 헤딩에서 자동 생성한다(T2). 자리표시자·NOTE 는 빌드 검사로 차단한다(T3·T4).
 */
import { motion } from 'framer-motion';
import { FileText, ChevronRight, History, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { CHAPTERS, COMPANY_LINE, REVISION_HISTORY, TERMS_META } from '@/content/terms-v2';

const articleId = (title) => {
  const m = title.match(/^제(\d+)조/);
  return m ? `article-${m[1]}` : title === '부칙' ? 'addendum' : title.replace(/\s+/g, '-');
};

export default function TermsPage() {
  const toc = CHAPTERS.map((ch) => ({ chapter: ch.title, items: ch.articles.map((a) => ({ id: articleId(a.title), title: a.title })) }));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 z-[-1]" />
      <main className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-white transition-colors">홈</Link>
              <ChevronRight size={16} />
              <span className="text-white">이용약관</span>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <FileText className="text-purple-400 w-7 h-7" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">이용약관</h1>
                <p className="text-gray-400 mt-1">AI CareLink 서비스 이용약관 v{TERMS_META.version}</p>
              </div>
            </div>

            <div className="p-6 glass rounded-2xl border border-amber-400/30 bg-amber-500/5 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-amber-400 w-5 h-5 mt-0.5 shrink-0" />
                <div className="text-sm leading-relaxed text-gray-200">
                  <p className="font-semibold text-amber-200">개정 약관 사전 공지</p>
                  <p className="mt-1">이 약관(v{TERMS_META.version})은 <strong>{TERMS_META.publishedAt}</strong>에 게시되었고 <strong>{TERMS_META.effectiveAt}</strong>부터 시행됩니다. 시행일 전까지는 종전 약관(v{TERMS_META.previousVersion}, {TERMS_META.previousEffectiveAt} 시행)이 적용됩니다. 회원에게 불리하거나 중요한 변경이 포함되어 시행 30일 전에 게시하며, 회원에게는 이메일·앱 알림·문자로 개별 통지합니다. 시행일 전까지 거부 의사를 표시하지 않으면 변경 약관에 동의한 것으로 보며, 동의하지 않는 회원은 이용계약을 해지할 수 있습니다.</p>
                  <p className="mt-2 text-xs text-gray-400">{TERMS_META.status}</p>
                </div>
              </div>
            </div>
            <div className="p-6 glass rounded-2xl border border-white/10 mb-8">
              <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                <span>버전: {TERMS_META.version}</span>
                <span>게시일: {TERMS_META.publishedAt}</span>
                <span>시행일: {TERMS_META.effectiveAt}</span>
                <Link href={TERMS_META.previousHref} className="text-purple-300 hover:text-purple-200 underline">이전 버전(v{TERMS_META.previousVersion}) 보기</Link>
                <a href="#revision-history" className="text-purple-300 hover:text-purple-200 underline">개정 이력</a>
              </div>
            </div>
          </motion.div>

          {/* 목차 — 제n조 헤딩 자동 생성 */}
          <motion.nav aria-label="목차" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12 p-6 glass rounded-2xl border border-white/10">
            <h2 className="text-lg font-bold mb-4">목차</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {toc.map((g) => (
                <div key={g.chapter}>
                  <p className="text-xs font-semibold tracking-wide text-purple-300/80 mb-1">{g.chapter}</p>
                  <ul className="space-y-1">
                    {g.items.filter((i) => i.title !== g.chapter).map((i) => (
                      <li key={i.id}><a href={`#${i.id}`} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">{i.title}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.nav>

          {/* 본문 */}
          <div className="space-y-10">
            {CHAPTERS.map((ch, ci) => (
              <section key={ch.title} aria-labelledby={`chapter-${ci}`}>
                <h2 id={`chapter-${ci}`} className="text-2xl font-bold text-white mb-4">{ch.title}</h2>
                <div className="space-y-6">
                  {ch.articles.map((a, ai) => (
                    <motion.article key={a.title} id={articleId(a.title)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + ai * 0.03 }} className="p-6 glass rounded-2xl border border-white/10 scroll-mt-28">
                      {a.title !== ch.title && <h3 className="text-xl font-bold mb-4 text-purple-400">{a.title}</h3>}
                      <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{a.body}</div>
                      {a.table && (
                        <table className="mt-4 w-full text-sm border-collapse">
                          <thead><tr>{a.table.head.map((h) => <th key={h} className="text-left border-b border-white/20 py-2 pr-4 text-gray-200">{h}</th>)}</tr></thead>
                          <tbody>{a.table.rows.map((r, ri) => <tr key={ri}>{r.map((c, cj) => <td key={cj} className="border-b border-white/10 py-2 pr-4 text-gray-300">{c}</td>)}</tr>)}</tbody>
                        </table>
                      )}
                      {a.bodyAfter && <div className="mt-4 text-gray-300 text-sm leading-relaxed whitespace-pre-line">{a.bodyAfter}</div>}
                    </motion.article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 개정 이력 */}
          <section id="revision-history" className="mt-12 p-6 glass rounded-2xl border border-white/10 scroll-mt-28">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><History size={18} className="text-purple-400" /> 개정 이력</h2>
            <table className="w-full text-sm">
              <thead><tr className="text-gray-200"><th className="text-left border-b border-white/20 py-2 pr-4">버전</th><th className="text-left border-b border-white/20 py-2 pr-4">시행일</th><th className="text-left border-b border-white/20 py-2">주요 내용</th></tr></thead>
              <tbody>
                {REVISION_HISTORY.map((h) => (
                  <tr key={h.version} className="text-gray-300"><td className="border-b border-white/10 py-2 pr-4">{h.version === TERMS_META.previousVersion ? <Link href={TERMS_META.previousHref} className="text-purple-300 underline">{h.version}</Link> : h.version}</td><td className="border-b border-white/10 py-2 pr-4">{h.effectiveAt}</td><td className="border-b border-white/10 py-2">{h.summary}</td></tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 사업자 정보 */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 p-6 glass rounded-2xl border border-white/10 text-center">
            <p className="text-gray-400 text-sm">본 약관에 대한 문의사항이 있으시면 고객센터로 연락해 주시기 바랍니다.</p>
            <p className="text-gray-500 text-xs mt-3 leading-relaxed"><span className="text-gray-400 font-semibold">사업자 정보</span> {COMPANY_LINE}</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
