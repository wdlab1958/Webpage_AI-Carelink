'use client';

/**
 * AI CareLink 개인정보처리방침 v2.0 — 「개인정보처리방침 법률 검토 및 개정 작업서」(2026-10-14) 반영.
 * 본문은 src/content/privacy-v2.js 한 곳에서만 관리한다. 목차는 "제n조" 헤딩에서 자동 생성한다.
 * {{ }} 자리표시자는 회사가 확정해야 하는 값으로, 화면에서 눈에 띄게 표시되며 빌드 검사(scripts/check-legal-placeholders.mjs)가 목록을 출력한다.
 */
import { motion } from 'framer-motion';
import { Shield, ChevronRight, AlertCircle, History } from 'lucide-react';
import Link from 'next/link';
import { APPENDIX, ARTICLES, PRIVACY_HISTORY, PRIVACY_META, SENSITIVE_BANNER } from '@/content/privacy-v2';
import { COMPANY } from '@/lib/company';

const articleId = (title) => { const m = title.match(/^제(\d+)조/); return m ? `article-${m[1]}` : 'appendix'; };

/** {{ }} 를 눈에 띄게 표시 (임의로 채우지 않음) */
function Text({ children, className = '' }) {
  const parts = String(children || '').split(/(\{\{[^}]*\}\})/g);
  return (
    <span className={className}>
      {parts.map((p, i) => (/^\{\{[^}]*\}\}$/.test(p)
        ? <mark key={i} className="rounded bg-amber-400/20 px-1 text-amber-200 border border-amber-400/40" title="회사 확정 필요 항목">{p}</mark>
        : <span key={i}>{p}</span>))}
    </span>
  );
}

function DataTable({ table }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[560px]">
        <thead><tr>{table.head.map((h) => <th key={h} className="text-left border-b border-white/20 py-2 pr-4 text-gray-200 align-top">{h}</th>)}</tr></thead>
        <tbody>{table.rows.map((r, ri) => <tr key={ri}>{r.map((c, cj) => <td key={cj} className="border-b border-white/10 py-2 pr-4 text-gray-300 align-top"><Text>{c}</Text></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function PrivacyPage() {
  const meta = (
    <div className="flex flex-wrap gap-4 text-xs text-gray-400">
      <span>버전: {PRIVACY_META.version}</span>
      <span>공고일: <Text>{PRIVACY_META.announcedAt}</Text></span>
      <span>시행일: <Text>{PRIVACY_META.effectiveAt}</Text></span>
      <Link href={PRIVACY_META.previousHref} className="text-purple-300 hover:text-purple-200 underline">이전 버전(v{PRIVACY_META.previousVersion}, {PRIVACY_META.previousEffectiveAt} 시행) 보기</Link>
      <a href="#revision-history" className="text-purple-300 hover:text-purple-200 underline">개정 이력</a>
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
              <span className="text-white">개인정보처리방침</span>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Shield className="text-purple-400 w-7 h-7" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">개인정보처리방침</h1>
                <p className="text-gray-400 mt-1">{COMPANY.name} · AI CareLink 서비스 · v{PRIVACY_META.version}</p>
              </div>
            </div>

            <div className="p-6 glass rounded-2xl border border-amber-400/30 bg-amber-500/5 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-amber-400 w-5 h-5 mt-0.5 shrink-0" />
                <div className="text-sm leading-relaxed text-gray-200">
                  <p className="text-amber-200 font-medium">민감정보(건강정보) 처리 안내</p>
                  <p className="mt-1">{SENSITIVE_BANNER}</p>
                  <p className="mt-2 text-xs text-gray-400">{PRIVACY_META.status}</p>
                </div>
              </div>
            </div>
            <div className="p-6 glass rounded-2xl border border-white/10 mb-8">{meta}</div>
          </motion.div>

          <motion.nav aria-label="목차" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12 p-6 glass rounded-2xl border border-white/10">
            <h2 className="text-lg font-bold mb-4">목차</h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              {ARTICLES.map((a) => <li key={a.title}><a href={`#${articleId(a.title)}`} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">{a.title}</a></li>)}
              <li><a href="#appendix" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">{APPENDIX.title}</a></li>
            </ol>
          </motion.nav>

          <div className="space-y-6">
            {ARTICLES.map((a, i) => (
              <motion.article key={a.title} id={articleId(a.title)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.02 }} className="p-6 glass rounded-2xl border border-white/10 scroll-mt-28">
                <h2 className="text-xl font-bold mb-4 text-purple-400">{a.title}</h2>
                <Text className="block text-gray-300 text-sm leading-relaxed whitespace-pre-line">{a.body}</Text>
                {a.table && <DataTable table={a.table} />}
                {a.bodyAfter && <Text className="mt-4 block text-gray-300 text-sm leading-relaxed whitespace-pre-line">{a.bodyAfter}</Text>}
              </motion.article>
            ))}
            <article id="appendix" className="p-6 glass rounded-2xl border border-purple-400/30 scroll-mt-28">
              <h2 className="text-xl font-bold mb-4 text-purple-300">{APPENDIX.title}</h2>
              <Text className="block text-gray-300 text-sm leading-relaxed whitespace-pre-line">{APPENDIX.body}</Text>
              <p className="mt-3 text-xs text-gray-500">관련: <Link href="/ai-ethics" className="text-purple-300 underline">AI 윤리·투명성</Link> · <Link href="/location-service-notice" className="text-purple-300 underline">위치기반서비스 이용자 고지</Link></p>
            </article>
          </div>

          <section id="revision-history" className="mt-12 p-6 glass rounded-2xl border border-white/10 scroll-mt-28">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><History size={18} className="text-purple-400" /> 개정 이력</h2>
            <table className="w-full text-sm">
              <thead><tr className="text-gray-200"><th className="text-left border-b border-white/20 py-2 pr-4">버전</th><th className="text-left border-b border-white/20 py-2 pr-4">공고일</th><th className="text-left border-b border-white/20 py-2 pr-4">시행일</th><th className="text-left border-b border-white/20 py-2">주요 변경</th></tr></thead>
              <tbody>{PRIVACY_HISTORY.map((h) => (
                <tr key={h.version} className="text-gray-300"><td className="border-b border-white/10 py-2 pr-4">{h.version === PRIVACY_META.previousVersion ? <Link href={PRIVACY_META.previousHref} className="text-purple-300 underline">{h.version}</Link> : h.version}</td><td className="border-b border-white/10 py-2 pr-4"><Text>{h.announcedAt}</Text></td><td className="border-b border-white/10 py-2 pr-4"><Text>{h.effectiveAt}</Text></td><td className="border-b border-white/10 py-2">{h.summary}</td></tr>
              ))}</tbody>
            </table>
            <div className="mt-4">{meta}</div>
          </section>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 p-6 glass rounded-2xl border border-white/10 text-center">
            <p className="text-gray-400 text-sm">개인정보 관련 문의·열람·정정·삭제·처리정지·동의 철회·자동화된 결정 설명 요구</p>
            <p className="text-gray-500 text-xs mt-2">개인정보 보호책임자 {COMPANY.cpo} · {COMPANY.email} · {COMPANY.phone} ({COMPANY.supportHours}) · {COMPANY.name}</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
