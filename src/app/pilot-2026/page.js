'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
  Wallet,
  Landmark,
  FlaskConical,
  FileCheck,
  Activity,
  HandHeart,
  Stethoscope,
  Smartphone,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  CalendarDays,
  Globe,
  BadgeCheck,
  ClipboardList,
  BarChart3,
  MapPin,
  Home,
  Mail,
} from 'lucide-react';
import AppLink from '@/components/AppLink';
import { APP_PATHS, PROD_DOMAIN } from '@/lib/hosts';

/* ═══════════════════════════════════════════════════════════════════════════
   Data — 2026.9.23 기준 보건복지부 발표 · 언론 보도 정리
   ═══════════════════════════════════════════════════════════════════════════ */

const timeline = [
  { when: '2024.04', title: '간병지원 시범사업 1단계 개시', body: '국민건강보험공단 · 보건복지부. 부산·대구·광주·대전 등 10개 지역 20개 요양병원, 병원당 약 60명. 환자 1인당 180일간 간병비 일부 지원, 본인부담 40~50%.', status: 'done' },
  { when: '2025.09.22', title: '「의료중심 요양병원 혁신 및 간병 급여화」 공청회', body: '보건복지부 추진방향 첫 공개, 9.25 건강보험정책심의위원회 보고. 원안: 2026 상반기 대상기관 선정 → 2026 하반기 200개소 급여 개시 → 2030년 500개소·10만 병상.', status: 'done' },
  { when: '2025.12', title: '간병지원 시범사업 1단계 종료', body: '20개 병원 중 3곳 이탈(간병인 모집난·간호인력 수급), 종합평가 통과율 74.5% · 실이용 63.7% — 인력 확보와 운영 시스템이 핵심 과제로 확인.', status: 'done' },
  { when: '2026.02', title: '간병인 관리·운영 표준지침(안) · 표준교육 프로그램', body: '보건복지부가 대한요양병원협회를 통해 보급. 간호사 지도·감독 하 업무 수행, 학대·불법의료행위 엄격 제한.', status: 'done' },
  { when: '2026.03.27', title: '통합돌봄법 전국 시행', body: '「의료·요양 등 지역 돌봄의 통합지원에 관한 법률」. 시·군·구 중심 의료·요양·돌봄 통합지원 체계 가동.', status: 'done' },
  { when: '2026', title: '간병지원 시범사업 2단계', body: '대상 확대 운영. 2027년 1월 전국 본사업 전환 목표.', status: 'now' },
  { when: '2026.07.28', title: '「요양병원 의료혁신 및 간병서비스 제도화」 토론회 — 수정안', body: '대상: 100병상 이상 · 간병인 직접고용 · 의료기관 인증 · 의사/간호 인력수준 · 비급여 수익비율 · 환자구성 요건 충족 요양병원 500개소 내외. 시행: 2027년 상반기.', status: 'now' },
  { when: '2027 상반기', title: '요양병원 간병 급여화 개시 (수정안)', body: '의료최고도·의료고도, 치매·파킨슨 등 중증 환자부터 단계적 확대. 2027년 약 1.5만 명 → 2028~29년 3.4만 명 → 2030년 8.5만 명.', status: 'next' },
  { when: '2027', title: '요양병원 인증 의무화 · 적정성평가 강화', body: '유형·중증도별 입원급여 적정성평가 강화 계획 병행.', status: 'next' },
];

const requirements = [
  { icon: Building2, title: '대상 기관', value: '100병상 이상 · 간병인 직접고용 요양병원 500개소 내외', note: '의료기관 인증, 의사·간호사 인력수준, 비급여 수익비율, 환자구성 비율 요건 (2026.7 수정안 · 원안 200개소)' },
  { icon: Users, title: '대상 환자', value: '의료최고도 · 의료고도 → 단계적 확대', note: '요양병원 입원환자 5단계 분류 기준, 치매·파킨슨 등 중증도 높은 환자 우선' },
  { icon: Wallet, title: '본인부담', value: '현행 100% (비급여) → 30% 안팎', note: '월 200~267만원 간병비 중 환자 부담 60~80만원 수준 예상 (보도 기준)' },
  { icon: BadgeCheck, title: '간병인 요건', value: '표준교육 이수 · 간호사 지도감독', note: '별도 국가자격 신설은 확인되지 않음. 병원 직접고용이 필수 요건 (파견·업체형 배제 방향)' },
  { icon: ClipboardList, title: '배치 · 교대', value: '미확정 (4인실 3교대 vs 6인실 2교대 논의)', note: '간병인 1인당 환자 수와 교대제 수치는 최종안 미발표' },
  { icon: BarChart3, title: '재정 규모', value: '2030년까지 총 6.5조원 (보도 추정)', note: '연도별 대상 인원 확대에 따라 단계적 투입' },
];

const stakeholders = [
  { icon: Building2, color: 'text-blue-400', border: 'border-blue-500/30', title: '요양병원', points: ['간병인 직접고용 → 채용 · 계약 · 급여 · 4대보험 관리 부담 증가', '표준교육 이수 · 인력 검증 · 근무기록의 증빙 책임', '간병 급여 청구와 질 평가 대응 시스템 필요', '1단계 시범사업 이탈 사례처럼 인력 수급 실패 시 사업 참여 자체가 위험'] },
  { icon: HandHeart, color: 'text-emerald-400', border: 'border-emerald-500/30', title: '간병인', points: ['사적 계약 → 병원 소속 근로자로 신분 전환', '표준교육 이수 이력과 경력이 곧 자산', '교대 근무 · 근무시간 기록 · 급여 명세의 투명성', '간호사 지도·감독 체계 안에서 역할 명확화'] },
  { icon: Users, color: 'text-rose-400', border: 'border-rose-500/30', title: '환자 · 보호자', points: ['본인부담 100% → 30% 안팎으로 경감', '검증된 간병인력 · 표준화된 서비스', '급여 대상(중증도) 해당 여부와 잔여 부담 확인 필요', '급여 대상 외 환자는 여전히 사적 간병 · 매칭 수요 지속'] },
];

const capabilityMap = [
  { req: '간병인 직접고용 · 노무 관리', feat: '전자 근로계약 · 급여 자동 계산(2교대·격일제) · 원천징수 3.3% · 정산 명세서 · 4대보험 연동 항목', icon: FileCheck },
  { req: '간병인력 검증 · 표준교육 이수', feat: '자격 · 교육 이수 · 경력 · 범죄경력 확인 서류 온보딩, 검증 상태 프로필, 만료 알림', icon: BadgeCheck },
  { req: '근무 · 교대 · 서비스 제공 기록', feat: '간병인 앱 근무 시작/종료 기록, 위치 기반 출퇴근 확인, 바이탈 · 투약 · 케어 일지 타임스탬프', icon: Activity },
  { req: '급여 청구 증빙', feat: '병동별 · 환자별 간병 제공 기록을 청구 증빙 형식(근무 일지 · 서비스 내역 · 인력 현황)으로 자동 생성', icon: ClipboardList },
  { req: '질 평가 · 모니터링', feat: '병원 대시보드 — 병동별 배치율, 긴급호출 대응, 낙상 · 이상징후 알림, 보호자 만족도', icon: BarChart3 },
  { req: 'EMR 연계 · 환자 중증도', feat: 'HL7 FHIR 기반 EMR 연동, 환자 상태 · 처방 · 중증도(의료최고도/고도) 정보의 간병 현장 전달', icon: Stethoscope },
  { req: '급여 대상 외 환자 · 재가 돌봄', feat: 'AI 매칭(요양원 2,364개소 · 간병인 풀), 병원동행 서비스, 케어 쇼핑몰(286 카탈로그)로 제도 밖 수요까지 커버', icon: MapPin },
  { req: '보호자 · 간병인 접근성', feat: '환자·보호자 앱 · 간병인 앱(Android PWA) — 설치 없이 홈 화면 추가, 노인 친화 UI(KWCAG 2.2)', icon: Smartphone },
];

const kvhsBackground = [
  { when: '2025.03.18', title: '연구개발특구진흥재단 — 보훈공단 업무협약', body: '딥테크 기반 신의료·헬스케어 기술개발 및 테스트베드 운영. 전국 6개 보훈병원을 실증 환경으로 개방, 특구재단이 실증 수요 기업 발굴·매칭 및 사업화 지원.' },
  { when: '2025.11.13', title: '보훈공단 — 서울대학교병원 헬스케어AI연구원 협약', body: '임상 현장 중심 AI 플랫폼 공동개발. 보훈공단은 이사장 직속 「AI 디지털 대전환」 전담조직을 구성해 추진.' },
  { when: '2026.01.20', title: '동반성장 우수제품 인증 (AI 2개 제품)', body: '시범운영(실증)을 거쳐 검증된 제품은 전국 보훈병원 · 보훈요양원 우선 구매 권장 및 타 공공기관 판로 확대.' },
  { when: '2026.03', title: 'AI 기반 보훈재가복지 실증 테스트베드 용역', body: '보훈대상 가구에 데이터 수집장치 설치, 위험감지 · 생활편의 실증 — 재가 돌봄 영역으로 확장.' },
  { when: '2026.08.13', title: '대구보훈병원 AI 실증 설명회 — 5개 기업 실증 진행', body: '음성인식 진료차트, 낙상·이상행동 감지, 얼굴인식 생체신호 측정, 보행패턴 경도인지장애 선별, AI 맞춤 조명.' },
  { when: '2026.08.27', title: '보훈공단 — 한국보건복지인재원 장기요양 업무협약', body: '돌봄 인재 양성 체계 구축 — 간병 · 요양 인력 교육과 직결.' },
];

const proposals = [
  { icon: FileCheck, title: '① 간병 급여화 대응 인력 · 기록 · 청구 실증', body: '보훈병원 간호·간병 통합서비스 확대 흐름에 맞춰, 직고용 간병인의 표준교육 이수 관리 · 근무/교대 기록 · 서비스 제공 기록 · 청구 증빙 자동 생성을 실제 병동에서 검증합니다.', kpi: '증빙 서류 작성 시간 절감률 · 기록 누락률 · 청구 반려율' },
  { icon: Activity, title: '② 스마트병동 연계 바이탈 · 낙상 · 긴급호출 모니터링', body: '입원환자 실시간 모니터링(스마트병동) 데이터와 간병인 앱 케어 일지를 결합해 이상징후 → 간병인 · 간호사 · 보호자 3자 알림 체계를 실증합니다.', kpi: '이상징후 탐지-대응 시간 · 낙상 사고율 · 보호자 알림 도달률' },
  { icon: HandHeart, title: '③ 보훈요양원 · 재가 돌봄 AI 매칭 + 병원동행', body: '보훈요양원 입소자와 재가 보훈대상자에게 AI 매칭 간병인 · 병원동행(외래 동행) 서비스를 연결하고, 재가복지 테스트베드의 위험감지 데이터와 연동합니다.', kpi: '매칭 소요 시간 · 매칭 만족도 · 외래 동행 이행률' },
  { icon: Stethoscope, title: '④ HL7 FHIR 기반 EMR 연동 파이프라인', body: '보훈병원 HIS/EMR과 FHIR R4 리소스(Patient · Encounter · Observation · MedicationRequest)로 연동해 간병 현장에 필요한 최소 정보만 안전하게 전달합니다.', kpi: '연동 성공률 · 데이터 지연 · 개인정보 접근 감사 로그 완전성' },
  { icon: Smartphone, title: '⑤ 보호자 · 간병인 모바일 앱 현장 수용성', body: '고령 보호자와 간병인이 Android PWA 앱으로 케어 리포트 · 메시징 · 긴급호출을 실제 사용하는 과정을 관찰하고 접근성(KWCAG 2.2)을 검증합니다.', kpi: '주간 활성 사용률 · 과업 완료율 · 접근성 점검 통과율' },
];

const procedure = [
  { step: '1', title: '연계 희망기업 조사 응답', body: '수요조사서 제출 — 솔루션 개요 · 실증 희망 기관 · 필요 데이터/인프라 · 기간 · 기대효과' },
  { step: '2', title: '실증 기관 · 범위 협의', body: '보훈병원/보훈요양원 선정, IRB · 개인정보 영향평가, 데이터 접근 범위 확정' },
  { step: '3', title: '실증 (3~6개월)', body: '병동 · 요양원 현장 배치, 주간 KPI 리포트, 이슈 대응' },
  { step: '4', title: '평가 · 확산', body: '성과 평가 → 동반성장 우수제품 인증 · 보훈병원/요양원 우선구매 · 공공기관 판로 연계' },
];

const sources = [
  { label: '보건복지부 — 요양병원 간병 급여화 추진방향 공청회 (2025.9.22)', url: 'https://mohw.go.kr/board.es?act=view&bid=0027&list_no=1487465&mid=a10503000000' },
  { label: '보건복지부 — 간병지원 시범사업 1단계 (2024.4)', url: 'https://www.mohw.go.kr/board.es?mid=a10503010100&bid=0027&act=view&list_no=1480898' },
  { label: '뉴스핌 — 요양병원 의료혁신 및 간병서비스 제도화 토론회 (2026.7.28)', url: 'https://www.newspim.com/news/view/20260728000795' },
  { label: '서울신문 — 100병상 이상 · 직고용 · 500개소 수정안 (2026.7.28)', url: 'https://www.seoul.co.kr/news/society/2026/07/28/20260728500116' },
  { label: '메디칼업저버 — 간병지원 시범사업 2단계 · 2027 본사업 전환', url: 'https://www.monews.co.kr/news/articleView.html?idxno=328808' },
  { label: '서울경제 — 시범사업 1단계 이탈 · 실이용률', url: 'https://m.sedaily.com/amparticle/14049884' },
  { label: 'K-공감 — 통합돌봄법 2026.3.27 시행', url: 'https://gonggam.korea.kr/newsContentView.es?mid=a12502000000&section_id=NCCD_COVER&news_id=7a827be8-f73c-4084-81f6-354ef6a1da83' },
  { label: '헤럴드경제 — 특구재단·보훈공단 테스트베드 업무협약 (2025.3.18)', url: 'https://biz.heraldcorp.com/article/10444243' },
  { label: '로봇신문 — 보훈공단·서울대병원 헬스케어AI연구원 협약 (2025.11.13)', url: 'https://www.irobotnews.com/news/articleView.html?idxno=43383' },
  { label: '뉴스핌 — 보훈공단 동반성장 우수제품 인증 (2026.1.20)', url: 'https://www.newspim.com/news/view/20260120001106' },
  { label: '경북일보 — 대구보훈병원 AI 실증 설명회 (2026.8.13)', url: 'https://www.kyongbuk.co.kr/news/articleView.html?idxno=4081141' },
  { label: '뉴스핌 — 보훈공단·보건복지인재원 장기요양 협약 (2026.8.27)', url: 'https://www.newspim.com/news/view/20260827001121' },
];

const statusStyle = {
  done: 'bg-white/5 border-white/10 text-gray-500',
  now: 'bg-teal-500/10 border-teal-500/30 text-teal-300',
  next: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
};
const statusLabel = { done: '완료', now: '진행 중', next: '예정' };

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Pilot2026Page() {
  const partnerEmail = `partner@${PROD_DOMAIN}`;

  return (
    <div className="relative overflow-hidden">
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-nebula blur-3xl opacity-20 rounded-full pointer-events-none z-0" />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
            <div className="section-label justify-center">요양급여 제도 변화 · 정부 시범사업 · 보훈공단 AI 실증</div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">
              간병이 제도권으로 들어오는 순간,<br />
              <span className="text-gradient">AI CareLink가 준비한 것</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              요양병원 간병비의 건강보험 급여화, 간병지원 시범사업 2단계, 통합돌봄법 시행, 그리고 한국보훈복지의료공단의 AI 의료 솔루션 실증 테스트베드.
              2026~2027년 제도 변화의 요건을 정리하고 AI CareLink의 대응 기능과 실증 제안을 소개합니다.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#policy" className="btn btn-primary btn-sm">급여화 로드맵 <ArrowRight size={16} /></a>
              <a href="#requirements" className="btn btn-outline btn-sm">제도 요건</a>
              <a href="#mapping" className="btn btn-outline btn-sm">대응 기능</a>
              <a href="#kvhs" className="btn btn-outline btn-sm">보훈공단 실증 제안</a>
            </div>
            <p className="text-xs text-gray-600 mt-6 inline-flex items-center gap-1.5">
              <AlertTriangle size={12} /> 2026년 9월 23일 기준 보건복지부 발표 · 언론 보도 정리. 최종 확정안(수가 · 배치기준 · 청구방식)은 정부 발표에 따라 변경될 수 있습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── POLICY TIMELINE ──────────────────────────────────────────── */}
      <section id="policy" className="py-20 glass border-y border-white/5">
        <div className="container">
          <div className="section-header">
            <div className="section-label">요양급여 로드맵</div>
            <h2>2024 → 2027, 간병 급여화까지의 길</h2>
            <p>원안(2026 하반기 · 200개소)은 2026년 7월 토론회에서 2027년 상반기 · 500개소 내외 · 100병상 이상 · 직고용 요건으로 조정되었습니다.</p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.when + t.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? 'md:text-left' : 'md:text-right'}`}
                >
                  <div className={`absolute left-[11px] md:left-1/2 md:-ml-[8px] top-2 w-4 h-4 rounded-full border-2 ${t.status === 'now' ? 'bg-teal-400 border-teal-300' : t.status === 'next' ? 'bg-purple-500 border-purple-300' : 'bg-gray-700 border-gray-500'}`} />
                  <div className={`${i % 2 ? 'md:col-start-2' : 'md:col-start-1'}`}>
                    <div className={`inline-flex items-center gap-2 text-xs font-bold px-2.5 py-1 rounded-full border mb-2 ${statusStyle[t.status]}`}>
                      <CalendarDays size={12} /> {t.when} · {statusLabel[t.status]}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{t.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{t.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REQUIREMENTS ─────────────────────────────────────────────── */}
      <section id="requirements" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">제도 요건 요약</div>
            <h2>급여화 수정안이 요구하는 것</h2>
            <p>2026년 7월 28일 토론회 수정안과 2025년 9월 원안, 관련 보도를 종합했습니다. 「미확정」 항목은 정부 최종안 발표 전입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {requirements.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="feature-card"
              >
                <div className="feature-icon w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  <r.icon className="text-teal-400 w-6 h-6" />
                </div>
                <div className="text-xs text-gray-500 mb-1">{r.title}</div>
                <h4 className="text-base">{r.value}</h4>
                <p className="text-xs">{r.note}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {stakeholders.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-7 rounded-2xl border ${s.border}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <s.icon className={`${s.color} w-5 h-5`} />
                  <h3 className="font-bold text-lg">{s.title}에게 의미하는 것</h3>
                </div>
                <ul className="space-y-2.5">
                  {s.points.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className={`${s.color} w-4 h-4 shrink-0 mt-0.5`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITY MAPPING ───────────────────────────────────────── */}
      <section id="mapping" className="py-20 glass border-y border-white/5">
        <div className="container">
          <div className="section-header">
            <div className="section-label">AI CareLink 대응 기능</div>
            <h2>제도 요건 → 플랫폼 기능 매핑</h2>
            <p>요양병원이 급여화에 참여하려면 「사람(인력 검증) · 기록(근무 · 서비스) · 돈(급여 · 청구)」이 한 시스템에서 맞물려야 합니다. 5개 도메인 통합 플랫폼이기에 가능한 구조입니다.</p>
          </div>

          <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl border border-white/10">
            <div className="hidden md:grid grid-cols-12 px-6 py-3 bg-white/5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <div className="col-span-4">제도 · 시범사업 요건</div>
              <div className="col-span-8">AI CareLink 기능</div>
            </div>
            {capabilityMap.map((m, i) => (
              <motion.div
                key={m.req}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-5 border-t border-white/5 hover:bg-white/[0.03] transition-colors"
              >
                <div className="md:col-span-4 flex items-start gap-3">
                  <m.icon className="text-teal-400 w-5 h-5 shrink-0 mt-0.5" />
                  <span className="font-semibold text-gray-200">{m.req}</span>
                </div>
                <div className="md:col-span-8 text-sm text-gray-400 leading-relaxed pl-8 md:pl-0">{m.feat}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <AppLink to={APP_PATHS.hospital} className="btn btn-primary">요양병원 포털 열기 <Building2 size={18} /></AppLink>
            <AppLink to={APP_PATHS.caregiverMobile} className="btn btn-secondary">간병인 앱 열기 <Smartphone size={18} /></AppLink>
            <AppLink to={APP_PATHS.patientMobile} className="btn btn-outline">환자·보호자 앱 열기 <Users size={18} /></AppLink>
          </div>
        </div>
      </section>

      {/* ── KVHS TESTBED ─────────────────────────────────────────────── */}
      <section id="kvhs" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">한국보훈복지의료공단 · AI 의료 솔루션 실증 테스트베드</div>
            <h2>보훈병원 · 보훈요양원 현장 실증 제안</h2>
            <p>
              한국보훈복지의료공단은 전국 보훈병원을 AI 의료 솔루션 실증 테스트베드로 개방하고 연계 희망기업을 조사하고 있습니다.
              AI CareLink는 간병 급여화 대응과 돌봄 AI를 축으로 아래 5개 실증 과제를 제안합니다.
            </p>
          </div>

          {/* Background */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {kvhsBackground.map((b, i) => (
              <motion.div
                key={b.when}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div className="text-xs font-bold text-purple-400 mb-1 inline-flex items-center gap-1.5"><Landmark size={12} /> {b.when}</div>
                <h4 className="font-semibold text-sm mb-1.5">{b.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Proposals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
            {proposals.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-7 rounded-2xl border border-purple-500/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <p.icon className="text-purple-400 w-5 h-5" />
                  </div>
                  <h3 className="font-bold">{p.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{p.body}</p>
                <div className="text-xs text-gray-500 inline-flex items-start gap-1.5">
                  <BarChart3 size={13} className="text-teal-400 shrink-0 mt-0.5" />
                  <span><span className="text-teal-400 font-semibold">KPI</span> {p.kpi}</span>
                </div>
              </motion.div>
            ))}

            {/* Platform facts card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-7 rounded-2xl border border-teal-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  <ShieldCheck className="text-teal-400 w-5 h-5" />
                </div>
                <h3 className="font-bold">실증 준비 현황</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                {[
                  '5개 도메인 통합 플랫폼 · 환자·보호자 앱 · 간병인 앱(Android PWA) 구현 완료',
                  'FastAPI 678개 API · Next.js 14 · PostgreSQL 15 · Redis — 가비아 클라우드 배포',
                  '실 요양원 2,364개소 · 케어 카탈로그 286개 데이터 기반 운영',
                  'AES-256 필드 암호화 · 감사 로그 · RBAC · 민감정보 별도동의',
                  'EMR 인증제 · HL7 Korea 워킹그룹 참여 추진',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle className="text-teal-400 w-4 h-4 shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Procedure */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-6">실증 절차 (제안)</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {procedure.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="stat-card text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold flex items-center justify-center mb-3 text-sm">{s.step}</div>
                  <div className="font-bold mb-1">{s.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{s.body}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-14 p-8 glass rounded-2xl border border-white/10 max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold mb-3">기관 제휴 · 실증 참여 문의</h3>
            <p className="text-gray-400 mb-6">요양병원 급여화 준비, 보훈병원·요양원 실증, EMR 연동 협의는 아래로 연락 주세요.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`mailto:${partnerEmail}?subject=${encodeURIComponent('[AI CareLink] 기관 제휴 · 실증 문의')}`} className="btn btn-primary">
                <Mail size={18} /> {partnerEmail}
              </a>
              <AppLink to={APP_PATHS.hospital} className="btn btn-outline">요양병원 포털 <ExternalLink size={16} /></AppLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOURCES ──────────────────────────────────────────────────── */}
      <section className="py-16 glass border-t border-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-4 inline-flex items-center gap-2"><Globe size={18} className="text-gray-400" /> 참고 자료</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sources.map(s => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-teal-300 transition-colors inline-flex items-start gap-1.5">
                    <ExternalLink size={13} className="shrink-0 mt-1" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-600 mt-6 leading-relaxed">
              본 페이지의 정책 · 사업 내용은 공개된 정부 발표와 언론 보도를 AI CareLink가 정리한 것이며, 보건복지부 · 국민건강보험공단 · 한국보훈복지의료공단의 공식 입장이나 선정 결과를 의미하지 않습니다.
              보훈공단 실증 테스트베드 연계 희망기업 조사의 공고 원문은 한국보훈복지의료공단 알림마당 및 나라장터에서 확인하시기 바랍니다.
            </p>
            <div className="mt-6">
              <Link href="/" className="text-sm text-gray-400 hover:text-white inline-flex items-center gap-1.5"><Home size={14} /> 홈으로</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
