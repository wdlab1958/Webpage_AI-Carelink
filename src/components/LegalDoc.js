'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/constants';

/**
 * 법적 고지 문서 공통 레이아웃 — /terms 와 같은 구성(브레드크럼 · 머리말 · 안내 상자 · 목차 · 조문 · 꼬리말).
 * sections: [{ title, content }] — content 는 줄바꿈을 그대로 보여 준다(whitespace-pre-line).
 * draft: true 면 "초안 — 법무 검토 전" 띠를 보인다. [ ] 로 표시한 값은 확정 뒤 채운다.
 */
export default function LegalDoc({ icon: Icon, title, subtitle, intro, effective, version, draft, sections, footnote }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 z-[-1]" />

      <main className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-white transition-colors">홈</Link>
              <ChevronRight size={16} />
              <span className="text-white">{title}</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Icon className="text-purple-400 w-7 h-7" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="text-gray-400 mt-1">{subtitle}</p>
              </div>
            </div>

            {draft && (
              <div className="mb-4 px-4 py-2 rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-200 text-xs">
                초안 — 법무 검토 전입니다. [ ] 로 표시된 항목은 확정 뒤 채워지며, 그 전까지는 참고용입니다.
              </div>
            )}

            <div className="p-6 glass rounded-2xl border border-white/10 mb-8">
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{intro}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
                <span>시행일: {effective}</span>
                <span>버전: {version}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 p-6 glass rounded-2xl border border-white/10"
          >
            <h2 className="text-lg font-bold mb-4">목차</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((s, i) => (
                <a key={i} href={`#section-${i}`} className="text-sm text-gray-400 hover:text-purple-400 transition-colors py-1">
                  {s.title}
                </a>
              ))}
            </div>
          </motion.div>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <motion.section
                key={i}
                id={`section-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="p-6 glass rounded-2xl border border-white/10"
              >
                <h2 className="text-xl font-bold mb-4 text-purple-400">{s.title}</h2>
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{s.content}</div>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 glass rounded-2xl border border-white/10 text-center"
          >
            <p className="text-gray-400 text-sm whitespace-pre-line">{footnote}</p>
            <p className="text-gray-500 text-xs mt-2">문의: {CONTACT_EMAIL} | 운영시간: 평일 09:00 - 18:00</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
