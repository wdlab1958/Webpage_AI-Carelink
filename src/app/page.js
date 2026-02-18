'use client';

import { motion } from 'framer-motion';
import {
  Heart,
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
  FileCheck,
  Smartphone,
  Settings
} from 'lucide-react';

import DailyReportPreview from '@/components/DailyReportPreview';
import CaregiverProfileCard from '@/components/CaregiverProfileCard';
import DashboardPreview from '@/components/DashboardPreview';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AI_CARELINK_SERVER_URL } from '@/lib/constants';

export default function Home() {

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Background Orbs - reduced blur for performance */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-nebula blur-3xl opacity-20 rounded-full z-[-1]" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cosmic blur-3xl opacity-20 rounded-full z-[-1]" />

      {/* Navigation */}
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <main className="pt-32 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-8 animate-float">
              <span className="w-2 h-2 rounded-full bg-quantum" />
              <span className="text-sm font-medium">Technology Care for People</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              기술이 사람을 이해할 때, <br />
              <span className="text-gradient-purple">진정한 돌봄이 시작됩니다</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
              AI CareLink는 환자와 간병인, 병원, 요양 커머스를 하나로 연결하는 <br className="hidden md:block" />
              <span className="text-peach font-semibold" style={{ color: 'hsl(var(--human-peach))' }}>AI 기반 통합 간병 매칭 플랫폼</span>입니다.
            </p>

            {/* Market Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="px-6 py-3 glass rounded-2xl border border-white/10">
                <span className="text-purple-400 font-black text-2xl">10조+</span>
                <span className="text-gray-400 text-sm ml-2">사적 간병 시장</span>
              </div>
              <div className="px-6 py-3 glass rounded-2xl border border-white/10">
                <span className="text-blue-400 font-black text-2xl">6.5조</span>
                <span className="text-gray-400 text-sm ml-2">정부 투입 예산 (2030)</span>
              </div>
              <div className="px-6 py-3 glass rounded-2xl border border-white/10">
                <span className="text-green-400 font-black text-2xl">100%→30%</span>
                <span className="text-gray-400 text-sm ml-2">본인부담률 변화</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = AI_CARELINK_SERVER_URL}
                className="px-10 py-5 glass border border-white/10 rounded-2xl font-bold text-xl text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                맞춤 간병인 매칭하기 <ChevronRight size={24} />
              </button>
              <button className="px-10 py-5 glass border border-white/10 rounded-2xl font-bold text-xl text-white hover:bg-white/10 transition-colors">
                서비스 가이드
              </button>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="text-purple-400" />}
              title="AI 정밀 매칭"
              desc="환자의 중증도(ADL), 질환(치매, 뇌졸중, 욕창 등), 위치, 예산을 분석하여 매칭 실패율 5% 미만을 목표로 최적의 간병인을 연결합니다."
            />
            <FeatureCard
              icon={<Wallet className="text-green-400" />}
              title="정산/노무 자동화"
              desc="주/야간 2교대, 24시간 격일제 등 복잡한 급여 계산을 자동화하고, 정부 급여화 기준에 부합하는 증빙 서류를 자동 생성합니다."
            />
            <FeatureCard
              icon={<Activity className="text-blue-400" />}
              title="건강 모니터링"
              desc="실시간 바이탈 사인(체온, 혈압, 맥박, 산소포화도) 모니터링과 색상 기반 이상 징후 시각화로 선제적 건강 관리가 가능합니다."
            />
          </div>
        </div>
      </main>

      {/* Policy Opportunity Section */}
      <section className="py-20 glass border-y border-white/5">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <TrendingUp className="text-green-400 w-4 h-4" />
              <span className="text-sm font-medium text-green-400">2026 정책 변화</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">요양병원 간병비 급여화 시대</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              2026년, 대한민국 간병 시장은 '사적 계약'에서 '제도권'으로 진입하는 역사적 전환점을 맞이합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PolicyCard
              title="시행 시기"
              value="2026년 하반기"
              desc="시범사업 시작"
              icon={<Clock className="text-purple-400" />}
            />
            <PolicyCard
              title="대상 기관"
              value="200개소"
              desc="의료중심 요양병원"
              icon={<Building2 className="text-blue-400" />}
            />
            <PolicyCard
              title="본인부담률"
              value="30%"
              desc="100%에서 대폭 경감"
              icon={<Wallet className="text-green-400" />}
            />
            <PolicyCard
              title="공적 자금"
              value="6.5조원"
              desc="2030년까지 투입"
              icon={<TrendingUp className="text-amber-400" />}
            />
          </div>

          <div className="mt-12 p-8 glass rounded-3xl border border-white/10 text-center">
            <p className="text-lg text-gray-300 mb-4">
              <span className="text-purple-400 font-bold">AI CareLink</span>는 정부 시범사업 공식 파트너사 선정을 추진하며,
              <br className="hidden md:block" />
              급여화 정책이 요구하는 <span className="text-green-400 font-semibold">간병인력 검증</span> 및 <span className="text-blue-400 font-semibold">근무시간/급여 관리 투명성</span> 시스템을 선점합니다.
            </p>
          </div>
        </div>
      </section>

      {/* AI Report Showcase */}
      <section className="py-20 overflow-hidden">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <Brain className="text-blue-400 w-4 h-4" />
                <span className="text-sm font-medium text-blue-400">Human-Friendly Interface</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                보호자의 마음까지 헤아리는 <br />
                <span className="text-gradient-purple">AI 데일리 리포트</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                복잡한 수치와 데이터 대신, AI가 어르신의 하루를 따뜻한 언어로 요약해 드립니다.
                식사, 복약, 감정 상태까지 실시간으로 확인하고 안심하세요.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "자연어 기반 건강 상태 요약",
                  "실시간 바이탈 사인 그래프",
                  "개인 맞춤형 긴급 알림 설정"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-quantum/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-quantum" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              <DailyReportPreview />
            </div>
          </div>
        </div>
      </section>

      {/* AI Matching Showcase */}
      <section className="py-20 bg-white/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">당신의 가족을 위한 최적의 파트너</h2>
            <p className="text-gray-400">데이터를 기반으로 전문성과 인성을 모두 갖춘 간병인을 연결합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CaregiverProfileCard
              name="김지영"
              specialties={["치매 케어", "재활 보조"]}
              matchRate={98}
              location="서울시 서초구"
              imgSrc="/images/korean_specialist_main.jpg"
            />
            <CaregiverProfileCard
              name="이정희"
              specialties={["욕창 관리", "식이 조절"]}
              matchRate={95}
              location="서울시 강남구"
              imgSrc="/images/caregiver_2.png"
            />
            <CaregiverProfileCard
              name="박미숙"
              specialties={["정서 지원", "거동 보조"]}
              matchRate={92}
              location="서울시 송파구"
              imgSrc="/images/korean_caregiver_3_pink.png"
            />
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 glass border border-white/10 rounded-2xl font-bold text-white hover:bg-white/10 transition-all">
              더 많은 전문가 찾기
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Showcase */}
      <section className="py-32">
        <div className="container">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmic-blue/10 border border-cosmic-blue/20 mb-6">
              <Building2 className="text-cosmic-blue w-4 h-4" />
              <span className="text-sm font-medium text-cosmic-blue">Institutional Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">전문 기관을 위한 초정밀 관제 시스템</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              수동 관리를 넘어 AI 시뮬레이션을 통한 인력 배치 최적화와 병상 가동률 관리까지,
              요양시설의 운영 효율을 극대화합니다.
            </p>
          </div>
          <DashboardPreview />
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20">
        <div className="container">
          <div className="glass p-12 rounded-[40px] border border-white/10 flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6">마음 연결 커뮤니티</h2>
              <p className="text-gray-400 text-lg mb-8">
                돌봄의 여정은 때로 고립감을 주기도 합니다. <br />
                비슷한 고민을 가진 보호자, 간병인들과 경험을 나누고 서로를 격려하세요.
                전문 심리 상담사의 정서적 지원도 함께합니다.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 bg-white/5 rounded-2xl flex items-center gap-2">
                  <span className="text-purple-400 font-bold">1.2k+</span>
                  <span className="text-sm text-gray-500">참여 중인 보호자</span>
                </div>
                <div className="px-6 py-3 bg-white/5 rounded-2xl flex items-center gap-2">
                  <span className="text-blue-400 font-bold">450+</span>
                  <span className="text-sm text-gray-500">케어 노하우 공유</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <button className="px-10 py-5 bg-white text-black rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center gap-3">
                커뮤니티 입장하기 <Users />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Persona Section - 5 Stakeholders */}
      <section className="py-32 glass border-y border-white/5">
        <div className="container">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Users className="text-purple-400 w-4 h-4" />
              <span className="text-sm font-medium text-purple-400">Integrated Ecosystem</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">5대 핵심 이해관계자를 위한 통합 플랫폼</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              AI CareLink는 시장의 파편화를 해결하고, 각 이해관계자에게 맞춤형 대시보드를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PersonaCard
              icon={<Heart className="text-rose-400" />}
              title="환자 / 보호자"
              points={[
                "AI 간병인 매칭 요청",
                "실시간 건강 리포트 수신",
                "원클릭 결제 시스템"
              ]}
              color="border-rose-500/30"
            />
            <PersonaCard
              icon={<Smartphone className="text-green-400" />}
              title="전문 간병인"
              points={[
                "희망 근무 시간 등록",
                "전자 근로계약 체결",
                "급여 정산 자동화"
              ]}
              color="border-green-500/30"
            />
            <PersonaCard
              icon={<Building2 className="text-blue-400" />}
              title="병원 관리자"
              points={[
                "환자/간병인 현황 모니터링",
                "정부 제출용 증빙 자동 생성",
                "인력 배치 최적화"
              ]}
              color="border-blue-500/30"
            />
            <PersonaCard
              icon={<ShoppingBag className="text-amber-400" />}
              title="쇼핑몰 관리자"
              points={[
                "요양 용품 판매 관리",
                "환자 맞춤 자동 추천",
                "재고 및 정기 배송 관리"
              ]}
              color="border-amber-500/30"
            />
            <PersonaCard
              icon={<Settings className="text-purple-400" />}
              title="플랫폼 관리자"
              points={[
                "전체 이용자 및 정산 관제",
                "이상 징후 감지 (Fraud Detection)",
                "시스템 운영 모니터링"
              ]}
              color="border-purple-500/30"
            />
            <div className="p-8 glass rounded-3xl border border-white/10 flex flex-col justify-center items-center text-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                <Brain className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI 지능형 코어</h3>
              <p className="text-gray-400 text-sm">
                모든 이해관계자를 연결하는 <br />AI 매칭, 정산, 데이터 분석 엔진
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="p-8 glass-card rounded-3xl border border-white/5 h-full"
    >
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function PersonaCard({ icon, title, points, color }) {
  return (
    <div className={`p-8 glass rounded-3xl border ${color} hover:bg-white/5 transition-all group`}>
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PolicyCard({ title, value, desc, icon }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 glass rounded-2xl border border-white/10 text-center"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-2xl font-black text-white mb-1">{value}</p>
      <p className="text-gray-500 text-xs">{desc}</p>
    </motion.div>
  );
}
