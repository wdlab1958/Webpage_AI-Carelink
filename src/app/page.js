'use client';

/**
 * 대문 메인 — B2C 역할 우선 진입 (UX 개편 §3.1 / Phase 1-3).
 * 첫 질문은 하나: "어떤 도움이 필요하세요?" → 보호자 / 간병인·동행매니저 / 요양병원·요양원.
 * B2G(급여화·FHIR·보훈공단 실증·도메인 구성) 내용은 /institution-guide 로 옮겼다.
 */
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle, ChevronRight, Clock, Wallet, ShieldCheck, Sparkles, TrendingUp, BadgeCheck,
  Phone, FileCheck, Bell, Users, Stethoscope, HandHeart, MessageSquare, Building2, Lock,
} from 'lucide-react';

import CaregiverProfileCard from '@/components/CaregiverProfileCard';
import AppLink from '@/components/AppLink';
import { APP_PATHS } from '@/lib/hosts';

import { COMPANY, SUPPORT_PHONE } from '@/lib/company';   // L-07: 전화 상담 표기는 푸터와 같은 출처(평일 09:00~18:00 · 대표번호)로 통일

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* 역할 진입 3갈래 — 라벨·순서는 방법론 §3.1 고정 */
const entries = [
  { to: APP_PATHS.family, emoji: '👨‍👩‍👧', title: '가족 간병·병원 동행이 필요해요', sub: '보호자 · 돌봄 받으실 분 가족', cls: 'from-rose-500/20 to-rose-500/5 border-rose-500/40 hover:border-rose-400', text: 'text-rose-300' },
  { to: APP_PATHS.work, emoji: '🧑‍⚕️', title: '간병·동행 일을 찾고 있어요', sub: '간병인 · 병원 동행 매니저', cls: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/40 hover:border-emerald-400', text: 'text-emerald-300' },
  { to: APP_PATHS.institution, emoji: '🏥', title: '요양병원·요양원이에요', sub: '요양병원·요양원 담당자', cls: 'from-blue-500/20 to-blue-500/5 border-blue-500/40 hover:border-blue-400', text: 'text-blue-300' },
];

const steps = [
  { n: 1, title: '요청서 올리기', desc: '어떤 도움이, 언제, 어디서 필요한지 3~4번만 고르면 끝. 입력보다 선택으로.' },
  { n: 2, title: '지원한 분 비교하기', desc: '지원한 간병인·동행 매니저의 경력·자격·후기·금액을 보고 "이 분께 부탁하기".' },
  { n: 3, title: '연결 완료 · 진행 확인', desc: '연결되면 문자로 바로 알려 드리고, 간병 중·끝남까지 진행 상황을 한눈에.' },
];

const problems = [
  { icon: Clock, label: '기존', text: '간병인을 구하는 데 시간이 오래 걸리기도 합니다', color: 'text-gray-500' },
  { icon: Wallet, label: '기존', text: '보험 청구에 필요한 서류를 따로 챙겨야 함', color: 'text-gray-500' },
  { icon: ShieldCheck, label: '기존', text: '간병인 자격 · 교육 · 경력 확인 어려움', color: 'text-gray-500' },
  { icon: Sparkles, label: 'AI케어링크', text: '요청서를 올리면 간병인이 먼저 지원 — 비교해서 고르기', color: 'text-teal-400' },
  { icon: FileCheck, label: 'AI케어링크', text: '간병인 확인서 · 간병 사실 확인서 · 영수증을 앱에서 바로', color: 'text-teal-400' },
  { icon: BadgeCheck, label: 'AI케어링크', text: "제출 서류로 자격·교육 이수·경력을 확인한 분에게 '확인됨' 표시", color: 'text-teal-400', href: '/terms#article-10', hrefLabel: '확인 기준 보기' },
];

const features = [
  { icon: <Users className="text-rose-400 w-6 h-6" />, title: '요청서로 간병인 찾기', desc: '병원 간병 · 병원 동행 · 집으로 방문 중 고르고, 날짜·시간대·돌봄 받으실 분 상태·희망 금액만 선택하면 요청서가 올라갑니다.' },
  { icon: <HandHeart className="text-emerald-400 w-6 h-6" />, title: '간병인·동행 매니저 지원', desc: '내 지역 일감을 보고 "이 일 할게요" 한 번으로 지원. 오늘 할 일과 받을 돈을 큰 글씨로.' },
  { icon: <Bell className="text-amber-400 w-6 h-6" />, title: '연결되면 바로 문자', desc: '지원자 도착 · 연결 완료 · 간병 시작·종료를 카카오 알림톡·문자로 알려 드립니다.' },
  { icon: <FileCheck className="text-teal-400 w-6 h-6" />, title: '보험 청구 서류', desc: '간병이 끝나면 간병인 확인서 · 간병 사실 확인서 · 영수증을 앱에서 받습니다.' },
  { icon: <Stethoscope className="text-blue-400 w-6 h-6" />, title: '병원 동행', desc: '외래 진료 동행 요청 · 배정 · 기록. 거동이 불편한 어르신의 통원을 함께합니다.' },
  { icon: <Lock className="text-purple-400 w-6 h-6" />, title: '안전결제 · 개인정보 보호', desc: '결제대행사(토스페이먼츠)가 결제 대금을 보관하고, 간병이 진행된 만큼 24시간 단위로 간병인에게 지급. 건강정보 암호화 · 별도 동의.' },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-nebula blur-3xl opacity-20 rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cosmic blur-3xl opacity-20 rounded-full pointer-events-none z-0" />

      {/* ═══ HERO — 역할 우선 ═══ */}
      <section className="relative pt-32 pb-16">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tight">
              간병인 · 병원 동행 매니저를<br />
              <span className="text-gradient">쉽게 찾고, 쉽게 일하세요</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-2xl text-gray-300 mb-10 font-semibold">
              어떤 도움이 필요하세요?
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4 max-w-2xl mx-auto text-left" role="list">
              {entries.map((e) => (
                <AppLink
                  key={e.to}
                  to={e.to}
                  role="listitem"
                  className={`flex items-center gap-5 p-6 rounded-3xl border bg-gradient-to-br ${e.cls} transition-all hover:scale-[1.01] min-h-[96px]`}
                >
                  <span className="text-4xl" aria-hidden="true">{e.emoji}</span>
                  <span className="flex-1">
                    <span className="block text-xl md:text-2xl font-bold text-white">{e.title}</span>
                    <span className={`block text-sm md:text-base ${e.text}`}>{e.sub}</span>
                  </span>
                  <ArrowRight size={24} className="text-white/70 shrink-0" />
                </AppLink>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="mt-8 text-base md:text-lg text-gray-300 inline-flex flex-wrap items-center justify-center gap-2">
              <Phone size={18} className="text-emerald-400" />
              앱이 어려우신가요? 전화 상담 {COMPANY.supportHours} ·{' '}
              <a href={`tel:${SUPPORT_PHONE.replace(/[^0-9+]/g, '')}`} className="text-emerald-300 font-bold underline underline-offset-4">{SUPPORT_PHONE}</a>
            </motion.p>

            <motion.div variants={fadeUp} className="mt-4">
              <AppLink to={APP_PATHS.login} className="text-sm text-gray-400 hover:text-white underline underline-offset-4">이미 가입하셨어요? 로그인</AppLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 이렇게 진행돼요 ═══ */}
      <section className="py-20 glass border-y border-white/5">
        <div className="container">
          <div className="section-header">
            <div className="section-label">이렇게 진행돼요</div>
            <h2>요청서 올리기부터 연결까지, 3단계</h2>
            <p>개발 용어 없이, 한 화면에 한 가지 질문만. 큰 글씨와 큰 버튼으로 만들었습니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-7 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-black text-white mb-4">{s.n}</div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 왜 AI케어링크 ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">왜 AI케어링크인가</div>
            <h2>간병인 찾기, 혼자 감당하지 마세요</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {problems.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`p-5 rounded-xl ${p.label === 'AI케어링크' ? 'bg-teal-500/5 border border-teal-500/15' : 'bg-white/[0.02] border border-white/5'}`}>
                <div className="flex items-center gap-3">
                  <p.icon className={`${p.color} w-5 h-5 shrink-0`} />
                  <div>
                    <span className={`text-xs font-semibold ${p.label === 'AI케어링크' ? 'text-teal-400' : 'text-gray-500'}`}>{p.label}</span>
                    <p className="text-sm text-gray-300 mt-0.5">{p.text}</p>
                    {p.href && <Link href={p.href} className="text-xs text-teal-300 underline underline-offset-2 hover:text-teal-200">{p.hrefLabel}</Link>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 핵심 기능 (B2C) ═══ */}
      <section className="py-20 glass border-y border-white/5">
        <div className="container">
          <div className="section-header">
            <div className="section-label">무엇을 할 수 있나요</div>
            <h2>보호자와 간병인에게 꼭 필요한 것만</h2>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="feature-card">
                <div className="feature-icon w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 지원자 비교 예시 ═══ */}
      <section className="py-20 bg-white/[0.02]">
        <div className="container">
          <div className="section-header">
            <div className="section-label">지원자 비교</div>
            <h2>지원한 분들을 보고 직접 고르세요</h2>
            <p>경력 · 자격 · 후기 · 제시 금액을 한 카드에. 아래는 화면 예시이며 실제 인물이 아닙니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <CaregiverProfileCard name="김○○ (예시)" specialties={['치매 돌봄', '재활 보조']} matchRate={98} location="서울시 서초구" imgSrc="/images/korean_specialist_main.jpg" />
            <CaregiverProfileCard name="이○○ (예시)" specialties={['욕창 관리', '식사 보조']} matchRate={95} location="서울시 강남구" imgSrc="/images/caregiver_2.png" />
            <CaregiverProfileCard name="박○○ (예시)" specialties={['정서 지원', '거동 보조']} matchRate={92} location="서울시 송파구" imgSrc="/images/korean_caregiver_3_pink.png" />
          </div>
        </div>
      </section>

      {/* ═══ 기관 안내 ═══ */}
      <section className="section">
        <div className="container">
          <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
            <div className="flex-1">
              <div className="section-label">요양병원 · 요양원이신가요</div>
              <h3 className="text-3xl font-bold mb-4">인력 요청 · 배치 현황 · 동행 요청 · 증빙까지</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                요청 1건이 필요한 인원수만큼 공고가 되고, 끝난 배치는 급여 청구 증빙으로 출력됩니다. 간병 급여화·보훈공단 실증·EMR 연동 등 기관용 상세 안내는 별도 페이지에서 확인하세요.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/institution-guide" className="btn btn-primary">요양병원·요양원 안내 보기 <ChevronRight size={18} /></Link>
                <AppLink to={APP_PATHS.institution} className="btn btn-outline">기관 포털 열기 <Building2 size={18} /></AppLink>
              </div>
            </div>
            <div className="flex-1 hidden md:flex justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <Building2 className="text-blue-400 w-20 h-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 커뮤니티 ═══ */}
      <section className="py-20 glass border-y border-white/5">
        <div className="container">
          <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
            <div className="flex-1">
              <div className="section-label">커뮤니티</div>
              <h3 className="text-3xl font-bold mb-4">마음 연결 커뮤니티</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">비슷한 고민을 가진 보호자, 간병인들과 경험을 나누고 서로를 격려하세요.</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {['보호자 경험 나눔', '간병 노하우 · 케어 팁', '제도 · 급여화 Q&A'].map(t => (
                  <span key={t} className="px-4 py-2 bg-white/5 rounded-2xl text-sm text-gray-300 inline-flex items-center gap-1.5"><MessageSquare size={14} className="text-purple-400" /> {t}</span>
                ))}
              </div>
              <Link href="/community" className="btn btn-primary">커뮤니티 입장하기 <Users size={18} /></Link>
            </div>
            <div className="flex-1 hidden md:flex justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center"><HandHeart className="text-purple-400 w-20 h-20" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="section">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">지금 시작하세요</h2>
            <p className="text-gray-400 text-lg mb-10">어떤 도움이 필요하세요? 하나만 골라 주세요.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {entries.map(e => (
                <AppLink key={e.to} to={e.to} className={`glass-card p-6 rounded-2xl border bg-gradient-to-br ${e.cls} text-center hover:scale-105 transition-transform block`}>
                  <span className="text-3xl block mb-2">{e.emoji}</span>
                  <span className="font-bold block mb-1 text-white">{e.title}</span>
                  <span className={`text-sm ${e.text}`}>{e.sub} →</span>
                </AppLink>
              ))}
            </div>
            <p className="mt-8 text-sm text-gray-500 inline-flex items-center gap-2"><CheckCircle size={14} className="text-teal-400" /> 개발 용어 없는 쉬운 화면 · 큰 글씨 · 전화 상담 {COMPANY.supportHours} · {COMPANY.phone} <TrendingUp size={14} className="text-teal-400" /></p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
