'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Heart, Shield, Activity, Users, Clock, ArrowRight,
  CheckCircle, Sparkles, Wallet, TrendingUp, BadgeCheck,
  FileCheck, Stethoscope, Smartphone, Building2, Zap, Globe, Lock
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AppLink from '@/components/AppLink';
import { APP_PATHS } from '@/lib/hosts';

/* ═══════════════════════════════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════════════════════════════ */

const personaDetails = [
  {
    id: 'patient',
    emoji: '👨‍👩‍👦',
    title: '환자 · 보호자',
    question: '내 가족에게 꼭 맞는 간병인을 찾고 계신가요?',
    intro: 'AI CareLink는 환자의 건강 상태, 필요 돌봄 수준, 위치, 예산을 AI로 정밀 분석해 최적의 간병인을 48시간 내에 연결합니다.',
    features: [
      { icon: <Brain size={20} />, title: 'AI 정밀 매칭', desc: '환자의 ADL(일상생활 수행능력), 질환 이력, 성격 특성까지 분석해 매칭 실패율 5% 미만의 최적 조합을 찾아냅니다.' },
      { icon: <Activity size={20} />, title: '실시간 건강 리포트', desc: '식사량, 복약, 바이탈 사인, 감정 상태까지 — 매일 저녁 자연어로 요약된 케어 리포트를 받아보세요.' },
      { icon: <Wallet size={20} />, title: '간병비 부담 경감', desc: '2026년 간병비 급여화로 본인부담률 100%→30%. 정부 지원금을 자동 계산해 경제적 부담을 덜어드립니다.' }
    ],
    steps: ['간단한 환자 정보 등록', 'AI가 최적의 간병인 추천', '간병인 프로필 확인 후 선택', '실시간 케어 모니터링'],
    color: 'rose',
    cta: '간병인 찾기',
    ctaTo: APP_PATHS.patientMobile
  },
  {
    id: 'caregiver',
    emoji: '🤲',
    title: '전문 간병인',
    question: '내 전문성에 맞는 환자와 연결되고 싶으신가요?',
    intro: '희망 근무 조건을 등록하면 AI가 당신의 경력·전문 분야·위치에 꼭 맞는 환자를 추천합니다. 근로계약부터 급여 정산까지 한 번에.',
    features: [
      { icon: <Sparkles size={20} />, title: '조건 기반 매칭', desc: '근무 가능 시간, 전문 케어 분야, 희망 지역을 설정하면 AI가 최적의 환자-간병인 조합을 제안합니다.' },
      { icon: <FileCheck size={20} />, title: '전자 근로계약 · 4대 보험', desc: '종이 계약서 대신 전자 계약. 4대 보험 가입과 급여 명세서 발급이 자동으로 처리됩니다.' },
      { icon: <BadgeCheck size={20} />, title: '경력 관리 · 평판', desc: '케어 이력이 자동 기록되고, 환자/보호자의 리뷰가 프로필에 반영되어 더 나은 매칭으로 이어집니다.' }
    ],
    steps: ['프로필 · 경력 등록', '희망 근무 조건 설정', 'AI 매칭 제안 수락', '케어 수행 · 자동 정산'],
    color: 'emerald',
    cta: '간병인 등록하기',
    ctaTo: APP_PATHS.caregiverMobile
  },
  {
    id: 'facility',
    emoji: '🏥',
    title: '요양기관 담당자',
    question: '병원·요양원의 간병 관리를 효율화하고 싶으신가요?',
    intro: '병동별 간병인 배치부터 근무 시간 관리, 정부 시범사업 증빙 서류까지 — 하나의 대시보드에서 모든 간병 업무를 통합 관리합니다.',
    features: [
      { icon: <Building2 size={20} />, title: '통합 관제 대시보드', desc: '병동별·환자별 간병인 배치 현황, 근무 시간, 긴급 호출을 실시간으로 모니터링합니다.' },
      { icon: <FileCheck size={20} />, title: '정부 증빙 자동 생성', desc: '2026년 간병비 급여화 시범사업에 필요한 근무 일지, 급여 명세, 인력 검증 서류가 자동 생성됩니다.' },
      { icon: <TrendingUp size={20} />, title: '인력 배치 최적화 AI', desc: '환자 중증도, 간병인 전문성, 근무 시간을 종합 분석해 병동별 최적 인력 배치를 추천합니다.' }
    ],
    steps: ['기관 정보 등록', '병동 · 환자 현황 입력', 'AI 배치 최적화 알림 수신', '증빙 서류 자동 생성'],
    color: 'blue',
    cta: '기관 등록 문의',
    ctaTo: APP_PATHS.hospital
  }
];

const complianceItems = [
  { icon: <Shield size={20} />, label: '인공지능 기본법 준수', desc: '2026.1.22 시행 · 고영향 AI 위험관리체계 구축' },
  { icon: <Lock size={20} />, label: '개인정보보호법 완전 준수', desc: '건강정보 AES-256 암호화 · 민감정보 별도 동의' },
  { icon: <Globe size={20} />, label: 'KWCAG 2.2 접근성', desc: '노인 친화적 UI · 고대비 모드 · 큰 글씨 옵션' },
  { icon: <BadgeCheck size={20} />, label: 'ISO 27001 추진', desc: '정보보안 관리체계 · 정기 보안 감사' }
];

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function ServiceIntro() {
  const [activeTab, setActiveTab] = useState('patient');

  return (
    <div className="relative overflow-hidden">
      {/* Background Ambient */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-nebula blur-3xl opacity-20 rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cosmic blur-3xl opacity-20 rounded-full pointer-events-none z-0" />

      {/* ═══════════════════════════════════════════════════════════
         HERO
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="section-label">서비스 소개</div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">
              기술이 사람을 이해할 때,<br />
              <span className="text-gradient">진정한 돌봄이 시작됩니다</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              AI CareLink는 환자·보호자, 간병인, 요양기관을 하나로 연결하는{' '}
              <span className="text-white font-semibold">AI 기반 통합 간병 매칭 플랫폼</span>입니다.
              2026년 정부 시범사업 200개 병원과 함께합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         PERSONA TABS — 3대 고객 유형별 상세
         ═══════════════════════════════════════════════════════════ */}
      <section className="section-sm">
        <div className="container">
          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {personaDetails.map(p => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                  activeTab === p.id
                    ? 'bg-white/10 border border-white/20 text-white'
                    : 'bg-white/[0.02] border border-white/5 text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="text-lg">{p.emoji}</span>
                {p.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {personaDetails.filter(p => p.id === activeTab).map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question + Intro */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{p.question}</h2>
                  <p className="text-gray-400 text-lg leading-relaxed">{p.intro}</p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {p.features.map((f, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl border border-white/10">
                      <div className={`w-10 h-10 rounded-xl bg-${p.color}-500/10 flex items-center justify-center mb-4`}>
                        <span className={p.color === 'rose' ? 'text-rose-400' : p.color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'}>
                          {f.icon}
                        </span>
                      </div>
                      <h4 className="font-bold mb-2">{f.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Steps */}
                <div className="glass rounded-2xl border border-white/10 p-8 max-w-3xl mx-auto mb-10">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6 text-center">이용 절차</h4>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {p.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-3 flex-1">
                        <div className={`w-8 h-8 rounded-full bg-${p.color}-500/20 border border-${p.color}-500/30 flex items-center justify-center shrink-0`}>
                          <span className={`text-sm font-bold ${p.color === 'rose' ? 'text-rose-400' : p.color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'}`}>
                            {i + 1}
                          </span>
                        </div>
                        <span className="text-sm text-gray-300">{step}</span>
                        {i < p.steps.length - 1 && (
                          <ArrowRight size={16} className="text-gray-600 shrink-0 hidden md:block" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <AppLink to={p.ctaTo} className="btn btn-primary btn-lg">
                    {p.cta} <ArrowRight size={20} />
                  </AppLink>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         PHILOSOPHY
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 glass border-y border-white/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-label">우리가 집중하는 가치</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">따뜻한 기술,<br />사람을 향한 마음</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                병원 밖에서도 안전하고 존엄한 삶을 영위하는 것.<br />
                그것이 AI CareLink가 존재하는 이유입니다.<br />
                우리는 차가운 데이터 너머에 있는 <span className="text-white font-semibold">&ldquo;사람&rdquo;</span>을 봅니다.
              </p>
              <ul className="space-y-4">
                {[
                  { label: '정서적 유대감', desc: 'AI가 환자의 감정과 선호를 이해하고 존중합니다' },
                  { label: '빈틈없는 안전망', desc: '실시간 바이탈 모니터링과 긴급 알림 시스템' },
                  { label: '개인화된 존중', desc: '모든 환자는 다릅니다. 맞춤형 케어가 답입니다' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-teal-400 w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">{item.label}</span>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="aspect-square w-full max-w-sm rounded-[40px] glass border border-white/10 relative overflow-hidden group">
                <Image
                  src="/images/korean_senior_tablet_care.png"
                  alt="스마트 돌봄 케어"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         COMPLIANCE
         ═══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">신뢰와 안전</div>
            <h2>법적·보안적 기준을 완벽하게 준수합니다</h2>
            <p>의료 정보를 다루는 만큼, 가장 엄격한 기준으로 사용자의 데이터를 보호합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceItems.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl border border-white/10 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-400">{c.icon}</span>
                </div>
                <h4 className="font-bold text-sm mb-2">{c.label}</h4>
                <p className="text-gray-500 text-xs">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">이용약관</Link>
            <span className="text-gray-600">·</span>
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">개인정보처리방침</Link>
            <span className="text-gray-600">·</span>
            <Link href="/ai-ethics" className="text-sm text-gray-400 hover:text-white transition-colors">AI 윤리 및 투명성</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         FINAL CTA
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 glass border-y border-white/5">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              지금, 당신에게 맞는 돌봄을 시작하세요
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              첫 상담은 무료입니다. AI CareLink가 제안하는 새로운 돌봄 경험을 확인해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AppLink to={APP_PATHS.login} className="btn btn-primary btn-lg">
                로그인 · 회원가입 <ArrowRight size={20} />
              </AppLink>
              <Link href="/pilot-2026" className="btn btn-outline btn-lg">
                요양급여 · 시범사업 알아보기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
