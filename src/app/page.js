'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain,
  ShieldCheck,
  Clock,
  Activity,
  Users,
  Building2,
  ChevronRight,
  TrendingUp,
  Wallet,
  ShoppingBag,
  Smartphone,
  Settings,
  ArrowRight,
  CheckCircle,
  Sparkles,
  HandHeart,
  Stethoscope,
  BadgeCheck,
  Zap,
  Globe,
  Lock,
  MapPin,
  MessageSquare,
  FileCheck,
  Landmark,
  CalendarDays,
  FlaskConical,
} from 'lucide-react';

import DailyReportPreview from '@/components/DailyReportPreview';
import CaregiverProfileCard from '@/components/CaregiverProfileCard';
import DashboardPreview from '@/components/DashboardPreview';
import AppLink from '@/components/AppLink';
import { APP_PATHS } from '@/lib/hosts';

/* ═══════════════════════════════════════════════════════════════════════════
   Animation Variants
   ═══════════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ═══════════════════════════════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════════════════════════════ */

const personas = [
  {
    id: 'patient',
    emoji: '👨‍👩‍👦',
    title: '환자 · 보호자',
    subtitle: '내 가족을 위한 맞춤 간병인 찾기',
    desc: 'AI가 환자의 건강 상태, 필요 돌봄 수준, 위치, 예산을 종합 분석하여 가장 적합한 간병인을 추천합니다. 스마트폰 앱의 실시간 케어 리포트로 먼 거리에서도 안심할 수 있습니다.',
    benefits: ['AI 정밀 매칭 · 검증된 간병인 프로필', '바이탈 · 투약 · 케어 일지 실시간 확인', '급여화 대비 본인부담 자동 계산'],
    colorClass: 'border-rose-500/30',
    bgClass: 'bg-rose-500/10',
    textClass: 'text-rose-400',
    cta: '환자·보호자 앱 열기',
    to: APP_PATHS.patientMobile,
  },
  {
    id: 'caregiver',
    emoji: '🤲',
    title: '전문 간병인',
    subtitle: '나에게 맞는 환자와 연결되기',
    desc: '희망 근무 시간, 전문 분야, 지역을 등록하면 AI가 최적의 환자-간병인 매칭을 제안합니다. 전자 근로계약, 근무 기록, 자동 급여 정산, 경력 관리까지 앱 하나로.',
    benefits: ['희망 조건 기반 매칭 제안', '전자 근로계약 · 근무시간 자동 기록', '일한 만큼 투명하게 정산'],
    colorClass: 'border-emerald-500/30',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-400',
    cta: '간병인 앱 열기',
    to: APP_PATHS.caregiverMobile,
  },
  {
    id: 'facility',
    emoji: '🏥',
    title: '요양병원 · 요양기관',
    subtitle: '간병 급여화 시대의 병원 운영',
    desc: '병동별 간병인 배치 현황, 근무·교대 기록, 서비스 제공 기록을 하나의 대시보드에서. 급여화·시범사업이 요구하는 인력 검증과 청구 증빙 서류를 자동 생성합니다.',
    benefits: ['실시간 병동별 간병 현황 대시보드', '청구 · 증빙 서류 자동 생성', 'EMR · FHIR 연동, 인력 배치 최적화 AI'],
    colorClass: 'border-blue-500/30',
    bgClass: 'bg-blue-500/10',
    textClass: 'text-blue-400',
    cta: '요양병원 포털 열기',
    to: APP_PATHS.hospital,
  },
];

const domains = [
  { icon: Settings, title: '플랫폼 관리자', desc: '회원·기관 승인, 정산·감사 로그, 운영 모니터링', color: 'text-purple-400', to: APP_PATHS.admin },
  { icon: Building2, title: '요양병원', desc: '병동 간병 관제, EMR·FHIR 연동, 청구 증빙', color: 'text-blue-400', to: APP_PATHS.hospital },
  { icon: ShoppingBag, title: '쇼핑몰', desc: '간병·요양 용품 카탈로그, 주문·배송·정산', color: 'text-amber-400', to: APP_PATHS.shop },
  { icon: HandHeart, title: '간병인', desc: '매칭 수락, 근무 기록, 급여·경력 관리', color: 'text-emerald-400', to: APP_PATHS.caregiver },
  { icon: Users, title: '환자 · 보호자', desc: '간병인 찾기, 케어 리포트, 병원동행 예약', color: 'text-rose-400', to: APP_PATHS.patient },
];

const mobileApps = [
  {
    title: '환자 · 보호자 앱',
    tag: 'Android PWA',
    color: 'rose',
    to: APP_PATHS.patientMobile,
    points: ['간병인 매칭 요청 · 수락 알림', '바이탈 · 투약 · 케어 일지 실시간 열람', '긴급호출 · 위치 공유 · 메시징', '병원동행(외래 동행) 서비스 요청'],
  },
  {
    title: '간병인 앱',
    tag: 'Android PWA',
    color: 'emerald',
    to: APP_PATHS.caregiverMobile,
    points: ['매칭 제안 확인 · 일정 관리', '바이탈 · 투약 · 케어 일지 입력', '근무 시작/종료 기록 · 급여 조회', '보호자 · 병원과 실시간 메시징'],
  },
];

const stats = [
  { value: '5 + 2', label: '도메인 5개 · 모바일 앱 2종', color: 'text-purple-400' },
  { value: '500개소', label: '급여화 대상 요양병원 (2026.7 수정안)', color: 'text-blue-400' },
  { value: '30%', label: '급여화 시 본인부담률 (현행 100%)', color: 'text-teal-400' },
  { value: '6.5조원', label: '2030년까지 투입 예상 공적 재정', color: 'text-amber-400' },
];

const problems = [
  { icon: Clock, label: '기존', text: '간병인 구하는 데 평균 수 주 소요', color: 'text-gray-500' },
  { icon: Wallet, label: '기존', text: '월 200~267만원 간병비 전액 사비 부담', color: 'text-gray-500' },
  { icon: ShieldCheck, label: '기존', text: '간병인 자격 · 교육 · 경력 확인 어려움', color: 'text-gray-500' },
  { icon: Sparkles, label: 'AI CareLink', text: 'AI 매칭으로 조건에 맞는 간병인 즉시 추천', color: 'text-teal-400' },
  { icon: TrendingUp, label: 'AI CareLink', text: '급여화 시 본인부담 100% → 30% 자동 반영', color: 'text-teal-400' },
  { icon: BadgeCheck, label: 'AI CareLink', text: '자격 · 표준교육 이수 · 경력 검증 프로필', color: 'text-teal-400' },
];

const policyTimeline = [
  { when: '2024.04', title: '간병지원 시범사업 1단계', desc: '건보공단 · 10개 지역 20개 요양병원', icon: FlaskConical },
  { when: '2025.09', title: '간병 급여화 추진방향 공청회', desc: '복지부 · 2026 하반기 200개소 급여 개시(원안)', icon: Landmark },
  { when: '2026.03', title: '통합돌봄법 전국 시행', desc: '시·군·구 중심 의료 · 요양 · 돌봄 통합지원', icon: Globe },
  { when: '2026.07', title: '제도화 토론회 · 수정안', desc: '100병상 이상 · 직고용 · 500개소 내외 · 2027 상반기', icon: CalendarDays },
];

const features = [
  { icon: <Brain className="text-purple-400 w-6 h-6" />, title: 'AI 정밀 매칭', desc: 'ADL, 질환, 위치, 예산, 희망 조건을 AI가 분석해 환자-간병인 최적 조합을 추천합니다.' },
  { icon: <Wallet className="text-teal-400 w-6 h-6" />, title: '결제 · 정산 · 노무', desc: '에스크로 결제, 2교대·격일제 급여 계산, 원천징수 3.3%, 정산 명세서까지 자동화.' },
  { icon: <Activity className="text-blue-400 w-6 h-6" />, title: '바이탈 · 케어 모니터링', desc: '바이탈 사인 · 투약 · 케어 일지를 실시간 기록하고 이상 징후 시 보호자에게 자동 알림.' },
  { icon: <MapPin className="text-amber-400 w-6 h-6" />, title: '실시간 위치 · 메시징', desc: '간병인 위치 공유, 긴급호출, 보호자-간병인-병원 3자 메시징.' },
  { icon: <Stethoscope className="text-rose-400 w-6 h-6" />, title: 'EMR · FHIR 통합', desc: 'HL7 FHIR 기반 병원 EMR 연동으로 환자 상태 · 처방 정보를 간병 현장에 안전하게 전달.' },
  { icon: <Users className="text-emerald-400 w-6 h-6" />, title: '병원동행 서비스', desc: '외래 진료 동행 예약 · 배정 · 기록. 거동이 불편한 어르신의 통원을 함께합니다.' },
  { icon: <Lock className="text-purple-400 w-6 h-6" />, title: '보안 · 컴플라이언스', desc: '건강정보 AES-256 암호화, 민감정보 별도 동의, AI 기본법 · 의료법 · 개인정보보호법 준수.' },
  { icon: <FileCheck className="text-teal-400 w-6 h-6" />, title: '급여화 청구 증빙', desc: '간병인력 검증 · 근무시간 · 서비스 제공 기록을 급여 청구 증빙 형식으로 자동 생성.' },
  { icon: <Zap className="text-blue-400 w-6 h-6" />, title: '실시간 알림', desc: '앱 푸시 · SMS로 긴급 상황, 매칭 결과, 일정 변경을 즉시 전달.' },
];

const trustBadges = [
  { label: '인공지능 기본법 준수', sub: '2026.1.22 시행' },
  { label: '개인정보보호법 · 민감정보', sub: '건강정보 암호화 · 별도동의' },
  { label: 'KWCAG 2.2 접근성', sub: '노인 친화적 UI' },
  { label: 'ISO 27001 추진 중', sub: '정보보안 관리체계' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* ── Background Ambient ──────────────────────────────────────── */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-nebula blur-3xl opacity-20 rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cosmic blur-3xl opacity-20 rounded-full pointer-events-none z-0" />

      {/* ═══════════════════════════════════════════════════════════════
         HERO
         ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-8">
              <Link
                href="/pilot-2026"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-sm font-medium text-teal-400">요양병원 간병 급여화 대응 플랫폼</span>
                <ChevronRight size={14} className="text-teal-400" />
              </Link>
              <Link
                href="/pilot-2026#kvhs"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
              >
                <FlaskConical size={14} className="text-purple-400" />
                <span className="text-sm font-medium text-purple-300">보훈공단 AI 의료 실증 테스트베드 연계 추진</span>
              </Link>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter">
              기술이 사람을 이해할 때,<br />
              <span className="text-gradient">진정한 돌봄이 시작됩니다</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI CareLink는{' '}
              <span className="text-white font-semibold">플랫폼 관리자 · 요양병원 · 쇼핑몰 · 간병인 · 환자·보호자</span>{' '}
              5개 도메인을 하나의 디지털 생태계로 통합한 종합 간병 서비스 플랫폼입니다.{' '}
              <br className="hidden md:block" />
              AI 매칭 · 결제·정산 · 간병 검증 · 실시간 위치·메시징 · EMR·FHIR · 병원동행 · 스마트폰 전용 앱까지, 단일 코드베이스로 제공합니다.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-12">
              {stats.map((s, i) => (
                <div key={i} className="px-6 py-3 glass rounded-2xl border border-white/10">
                  <span className={`${s.color} font-black text-2xl`}>{s.value}</span>
                  <span className="text-gray-500 text-sm ml-2">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <AppLink to={APP_PATHS.patientMobile} className="btn btn-primary btn-lg text-base">
                맞춤 간병인 매칭 시작하기 <ArrowRight size={20} />
              </AppLink>
              <Link href="/pilot-2026" className="btn btn-outline btn-lg text-base">
                요양급여 · 시범사업 알아보기 <ChevronRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         WHY AI CARELINK — Problem / Solution
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 glass border-y border-white/5">
        <div className="container">
          <div className="section-header">
            <div className="section-label">왜 AI CareLink 인가</div>
            <h2>변화하는 간병 시장,<br />새로운 기준이 필요합니다</h2>
            <p>요양병원 간병비가 건강보험 급여로 편입되는 전환기입니다. 간병은 사적 계약에서 제도권 서비스로 바뀌고, 인력 검증과 기록의 투명성이 곧 경쟁력이 됩니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-5 rounded-xl ${p.label === 'AI CareLink' ? 'bg-teal-500/5 border border-teal-500/15' : 'bg-white/[0.02] border border-white/5'}`}
              >
                <div className="flex items-center gap-3">
                  <p.icon className={`${p.color} w-5 h-5 shrink-0`} />
                  <div>
                    <span className={`text-xs font-semibold ${p.label === 'AI CareLink' ? 'text-teal-400' : 'text-gray-500'}`}>{p.label}</span>
                    <p className="text-sm text-gray-300 mt-0.5">{p.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         3 CUSTOMER PERSONAS
         ═══════════════════════════════════════════════════════════════ */}
      <section id="personas" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">누구를 위한 서비스인가요</div>
            <h2>당신의 역할에 꼭 맞는 경험</h2>
            <p>주 이용자인 환자·보호자와 간병인은 스마트폰 전용 앱으로, 요양병원은 웹 포털로 이용합니다.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {personas.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`glass-card p-8 rounded-2xl border ${p.colorClass} flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{p.emoji}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.bgClass} ${p.textClass}`}>{p.title}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{p.subtitle}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.desc}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.benefits.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className={`${p.textClass} w-4 h-4 shrink-0 mt-0.5`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <AppLink
                  to={p.to}
                  className={`btn w-full text-center justify-center ${p.id === 'caregiver' ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                >
                  {p.cta} <ArrowRight size={16} />
                </AppLink>
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm text-gray-600 mt-10">
            쇼핑몰 관리자 · 플랫폼 관리자는{' '}
            <AppLink to={APP_PATHS.admin} className="text-purple-400 hover:text-purple-300 underline underline-offset-2">전용 관리자 포털</AppLink>
            에서 접속하실 수 있습니다.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         5 DOMAINS + 2 MOBILE APPS
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 glass border-y border-white/5">
        <div className="container">
          <div className="section-header">
            <div className="section-label">플랫폼 구성</div>
            <h2>5개 도메인, 2개 모바일 앱, 하나의 코드베이스</h2>
            <p>모든 애플리케이션은 app.ai-carelink.co.kr 에서 제공됩니다. 역할별 대시보드와 스마트폰 전용 앱이 같은 데이터 위에서 실시간으로 동기화됩니다.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {domains.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <AppLink to={d.to} className="block h-full p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all">
                  <d.icon className={`${d.color} w-6 h-6 mb-3`} />
                  <h4 className="font-bold mb-1">{d.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
                </AppLink>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {mobileApps.map((app, i) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-7 rounded-2xl border ${app.color === 'rose' ? 'border-rose-500/30' : 'border-emerald-500/30'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Smartphone className={app.color === 'rose' ? 'text-rose-400' : 'text-emerald-400'} size={20} />
                    <h3 className="text-lg font-bold">{app.title}</h3>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${app.color === 'rose' ? 'bg-rose-500/10 text-rose-300' : 'bg-emerald-500/10 text-emerald-300'}`}>
                    {app.tag}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {app.points.map(pt => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className={`${app.color === 'rose' ? 'text-rose-400' : 'text-emerald-400'} w-4 h-4 shrink-0 mt-0.5`} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mb-4">Android Chrome에서 열고 「홈 화면에 추가」하면 앱처럼 설치됩니다. 별도 스토어 설치가 필요 없습니다.</p>
                <AppLink to={app.to} className={`btn btn-sm w-full justify-center ${app.color === 'rose' ? 'btn-primary' : 'btn-secondary'}`}>
                  {app.title} 열기 <ArrowRight size={16} />
                </AppLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         2026–2027 POLICY — 요양급여 제도 변화
         ═══════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">요양급여 제도 변화 2026 → 2027</div>
            <h2>요양병원 간병비, 건강보험 급여로</h2>
            <p>
              보건복지부는 2025년 9월 공청회에서 요양병원 간병 급여화 추진방향을 공개했고, 2026년 7월 토론회에서 100병상 이상 · 간병인 직접고용 요양병원
              500개소 내외를 대상으로 2027년 상반기부터 급여를 개시하는 수정안을 제시했습니다. 간병지원 시범사업(건보공단)은 2026년 2단계를 거쳐 2027년 본사업 전환을 목표로 합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
            {policyTimeline.map((t, i) => (
              <motion.div
                key={t.when}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="stat-card text-left"
              >
                <div className="flex items-center gap-2 mb-3">
                  <t.icon size={18} className="text-teal-400" />
                  <span className="text-xs font-bold text-teal-400 tracking-wider">{t.when}</span>
                </div>
                <div className="font-bold mb-1">{t.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{t.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="stats-grid max-w-4xl mx-auto mb-10">
            {[
              { value: '2027 상반기', label: '급여 개시 (2026.7 수정안 · 원안 2026 하반기)', icon: <Clock size={24} />, color: 'text-purple-400' },
              { value: '500개소 내외', label: '100병상 이상 · 직고용 요양병원 (원안 200개소)', icon: <Building2 size={24} />, color: 'text-blue-400' },
              { value: '30% 안팎', label: '본인부담률 (현행 100% 비급여)', icon: <Wallet size={24} />, color: 'text-teal-400' },
              { value: '8.5만 명', label: '2030년 수혜 환자 (2027년 1.5만 명부터 확대)', icon: <TrendingUp size={24} />, color: 'text-amber-400' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="stat-card"
              >
                <div className={`mb-3 ${s.color}`}>{s.icon}</div>
                <div className="stat-value text-2xl">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 glass rounded-2xl border border-white/10 max-w-3xl mx-auto text-center"
          >
            <p className="text-lg text-gray-300 mb-6">
              <span className="text-purple-400 font-bold">AI CareLink</span>는 급여화가 요구하는{' '}
              <span className="text-teal-400 font-semibold">간병인력 검증 · 표준교육 이수 관리</span>,{' '}
              <span className="text-blue-400 font-semibold">근무·교대·서비스 제공 기록</span>,{' '}
              <span className="text-amber-400 font-semibold">청구 증빙 자동 생성</span>을 하나의 플랫폼으로 제공합니다.
            </p>
            <Link href="/pilot-2026" className="btn btn-primary">
              제도 요건과 대응 기능 자세히 보기 <ArrowRight size={18} />
            </Link>
            <p className="text-xs text-gray-600 mt-4">정책 수치는 보건복지부 발표 · 언론 보도(2026.9 기준)를 정리한 것으로, 정부 최종 확정안에 따라 변경될 수 있습니다.</p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         KVHS AI TESTBED
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 glass border-y border-white/5">
        <div className="container">
          <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 flex flex-col lg:flex-row items-center gap-10 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
            <div className="flex-1">
              <div className="section-label">한국보훈복지의료공단 · AI 의료 솔루션 실증 테스트베드</div>
              <h3 className="text-3xl font-bold mb-4">보훈병원 · 보훈요양원 현장에서 검증하는 AI 간병</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                한국보훈복지의료공단은 전국 보훈병원을 AI 의료 솔루션 실증 테스트베드로 개방하고 연계 희망기업을 조사하고 있습니다.
                AI CareLink는 간병 급여화 대응 인력·기록 관리, 입원환자 바이탈·낙상 모니터링, 보훈요양원·재가 돌봄 매칭, EMR·FHIR 연동을 실증 과제로 제안합니다.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {[
                  '간병인력 검증 · 근무기록 · 청구 증빙',
                  '스마트병동 바이탈 · 낙상 · 긴급호출',
                  '보훈요양원 · 재가 돌봄 AI 매칭 · 병원동행',
                  'HL7 FHIR 기반 EMR 연동 파이프라인',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="text-purple-400 w-4 h-4 shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/pilot-2026#kvhs" className="btn btn-primary">
                실증 제안 내용 보기 <FlaskConical size={18} />
              </Link>
            </div>
            <div className="flex-1 hidden lg:flex justify-center">
              <div className="w-56 h-56 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <Landmark className="text-purple-400 w-24 h-24" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         CORE FEATURES
         ═══════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">핵심 기능</div>
            <h2>돌봄의 모든 순간을 책임지는 기술</h2>
          </div>

          <div className="feature-grid">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="feature-card"
              >
                <div className="feature-icon w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {trustBadges.map((b, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10">
                <ShieldCheck className="text-teal-400 w-4 h-4" />
                <span className="text-sm text-gray-400">{b.label}</span>
                <span className="text-xs text-gray-600">· {b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         AI MATCHING SHOWCASE
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white/[0.02]">
        <div className="container">
          <div className="section-header">
            <div className="section-label">AI 매칭</div>
            <h2>당신의 가족을 위한 최적의 파트너</h2>
            <p>데이터를 기반으로 전문성과 인성을 모두 갖춘 간병인을 연결합니다. (아래는 예시 프로필입니다)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <CaregiverProfileCard name="김지영" specialties={['치매 케어', '재활 보조']} matchRate={98} location="서울시 서초구" imgSrc="/images/korean_specialist_main.jpg" />
            <CaregiverProfileCard name="이정희" specialties={['욕창 관리', '식이 조절']} matchRate={95} location="서울시 강남구" imgSrc="/images/caregiver_2.png" />
            <CaregiverProfileCard name="박미숙" specialties={['정서 지원', '거동 보조']} matchRate={92} location="서울시 송파구" imgSrc="/images/korean_caregiver_3_pink.png" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         DAILY REPORT + DASHBOARD SHOWCASE
         ═══════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">기관용 솔루션</div>
            <h2>전문 기관을 위한 통합 관제 시스템</h2>
            <p>병동별 간병 현황과 인력 배치를 한눈에. 보호자 앱에는 매일 케어 리포트가 자동으로 전달됩니다.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <DashboardPreview />
            </div>
            <div>
              <DailyReportPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         COMMUNITY
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 glass border-y border-white/5">
        <div className="container">
          <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
            <div className="flex-1">
              <div className="section-label">커뮤니티</div>
              <h3 className="text-3xl font-bold mb-4">마음 연결 커뮤니티</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                돌봄의 여정은 때로 고립감을 주기도 합니다. 비슷한 고민을 가진 보호자, 간병인들과 경험을 나누고 서로를 격려하세요.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {['보호자 경험 나눔', '간병 노하우 · 케어 팁', '제도 · 급여화 Q&A'].map(t => (
                  <span key={t} className="px-4 py-2 bg-white/5 rounded-2xl text-sm text-gray-300 inline-flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-purple-400" /> {t}
                  </span>
                ))}
              </div>
              <Link href="/community" className="btn btn-primary">
                커뮤니티 입장하기 <Users size={18} />
              </Link>
            </div>
            <div className="flex-1 hidden md:flex justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <HandHeart className="text-purple-400 w-20 h-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         FINAL CTA
         ═══════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">지금, 당신에게 맞는 돌봄을 시작하세요</h2>
            <p className="text-gray-400 text-lg mb-10">AI CareLink와 함께라면 간병인 찾기는 더 이상 혼자 감당할 문제가 아닙니다.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {personas.map(p => (
                <AppLink
                  key={p.id}
                  to={p.to}
                  className={`glass-card p-6 rounded-2xl border ${p.colorClass} text-center hover:scale-105 transition-transform block`}
                >
                  <span className="text-2xl block mb-2">{p.emoji}</span>
                  <span className="font-bold block mb-1">{p.title}</span>
                  <span className={`text-sm ${p.textClass}`}>{p.cta} →</span>
                </AppLink>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
