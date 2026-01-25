'use client';

import { motion } from 'framer-motion';
import { Brain, ChevronRight, Eye, Scale, Users, AlertTriangle, RefreshCw, MessageSquare, ShieldCheck, Cpu, Heart, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AIEthicsPage() {
  const aiFactors = [
    { icon: <Heart className="w-5 h-5" />, name: 'ADL 수준', desc: '일상생활수행능력 (이동, 식사, 배설, 목욕 등)' },
    { icon: <AlertTriangle className="w-5 h-5" />, name: '질환 정보', desc: '치매, 뇌졸중, 욕창, 파킨슨 등 특이사항' },
    { icon: <Users className="w-5 h-5" />, name: '간병인 전문성', desc: '자격, 경력, 전문 교육 이수 내역' },
    { icon: <Scale className="w-5 h-5" />, name: '매칭 적합도', desc: '성별, 연령대, 언어, 성격 선호도' },
    { icon: <Cpu className="w-5 h-5" />, name: '지리적 위치', desc: '환자 위치와 간병인 근무 가능 지역' },
    { icon: <ShieldCheck className="w-5 h-5" />, name: '신뢰도 점수', desc: '이전 서비스 평가, 리뷰, 근무 이력' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background - simplified for performance */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 z-[-1]" />

      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-white transition-colors">홈</Link>
              <ChevronRight size={16} />
              <span className="text-white">AI 윤리 및 투명성</span>
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                <Brain className="text-purple-400 w-7 h-7" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">AI 윤리 및 투명성</h1>
                <p className="text-gray-400 mt-1">인공지능 기본법 준수 및 AI 시스템 운영 원칙</p>
              </div>
            </div>

            {/* Intro */}
            <div className="p-6 glass rounded-2xl border border-white/10 mb-8">
              <p className="text-gray-300 leading-relaxed">
                AI CareLink는 <span className="text-purple-400 font-medium">인공지능 발전과 신뢰 기반 조성 등에 관한 기본법(2026년 1월 22일 시행)</span>에 따라
                AI 시스템의 투명성과 신뢰성을 확보하기 위해 노력합니다.
                본 페이지에서는 AI 매칭 시스템의 작동 원리, 고려 요소, 한계점 및 이용자의 권리에 대해 설명합니다.
              </p>
            </div>
          </motion.div>

          {/* AI System Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-8 glass rounded-2xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Eye className="text-purple-400 w-6 h-6" />
              <h2 className="text-2xl font-bold">AI 매칭 시스템 작동 원리</h2>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="font-bold mb-3 text-purple-300">1단계: 데이터 수집 및 분석</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  환자/보호자가 입력한 정보(건강상태, ADL 수준, 질환, 선호사항)와 간병인이 등록한 정보(전문성, 경력, 가용시간)를
                  수집하여 구조화된 데이터로 변환합니다.
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="font-bold mb-3 text-purple-300">2단계: 매칭 알고리즘 실행</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  머신러닝 기반 매칭 알고리즘이 환자의 요구사항과 간병인의 역량을 다차원적으로 비교 분석합니다.
                  각 요소별 가중치를 적용하여 최적의 매칭 후보를 선정합니다.
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="font-bold mb-3 text-purple-300">3단계: 매칭 결과 제시</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  적합도 점수가 높은 순서로 간병인 후보를 제시하며, 각 후보에 대한 매칭 이유와
                  적합도 점수를 함께 제공합니다. 최종 선택은 이용자가 직접 결정합니다.
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="font-bold mb-3 text-purple-300">4단계: 인간 검토 및 확정</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  AI가 제안한 매칭은 전문 상담사가 검토하여 적절성을 확인합니다.
                  특수한 케어가 필요한 경우, 전문가의 추가 검토가 진행됩니다.
                </p>
              </div>
            </div>
          </motion.section>

          {/* AI Factors */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 p-8 glass rounded-2xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Scale className="text-blue-400 w-6 h-6" />
              <h2 className="text-2xl font-bold">AI가 고려하는 매칭 요소</h2>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              AI 매칭 시스템은 다음의 요소들을 종합적으로 분석하여 최적의 간병인을 추천합니다.
              각 요소의 중요도는 환자의 상태와 요구사항에 따라 동적으로 조정됩니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiFactors.map((factor, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                    {factor.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{factor.name}</h4>
                    <p className="text-gray-400 text-sm">{factor.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-blue-300 text-sm">
                <strong>투명성 보장:</strong> 매칭 결과 화면에서 각 간병인이 추천된 이유와
                주요 매칭 요소별 점수를 확인할 수 있습니다.
              </p>
            </div>
          </motion.section>

          {/* AI Limitations */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 p-8 glass rounded-2xl border border-amber-500/30 bg-amber-500/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-amber-400 w-6 h-6" />
              <h2 className="text-2xl font-bold">AI 시스템의 한계점</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">의료적 판단 대체 불가</h4>
                  <p className="text-gray-400 text-sm">AI 시스템은 의료 전문가의 진단이나 치료 결정을 대체하지 않습니다. 건강 관련 중요 결정은 반드시 의료 전문가와 상담하세요.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">데이터 의존성</h4>
                  <p className="text-gray-400 text-sm">매칭 품질은 입력된 정보의 정확성에 의존합니다. 부정확하거나 불완전한 정보는 매칭 결과에 영향을 줄 수 있습니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">정성적 요소의 한계</h4>
                  <p className="text-gray-400 text-sm">간병인의 성격, 환자와의 케미스트리 등 정량화하기 어려운 요소는 완벽하게 예측할 수 없습니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-xs font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">상황 변화 대응</h4>
                  <p className="text-gray-400 text-sm">환자 상태의 급격한 변화나 예상치 못한 상황에 대한 실시간 대응에는 인간의 판단이 필요합니다.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Human Oversight */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-8 p-8 glass rounded-2xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-green-400 w-6 h-6" />
              <h2 className="text-2xl font-bold">인적 관리 및 감독 체계</h2>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              AI CareLink는 AI 의사결정에 대한 인간의 감독 체계를 갖추고 있습니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <h4 className="font-bold text-green-300 mb-2">전문 상담사 검토</h4>
                <p className="text-gray-400 text-sm">모든 AI 매칭 결과는 전문 상담사가 검토하여 적절성을 확인합니다.</p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <h4 className="font-bold text-green-300 mb-2">AI 윤리위원회</h4>
                <p className="text-gray-400 text-sm">정기적으로 AI 시스템의 공정성과 윤리성을 검토하는 내부 위원회를 운영합니다.</p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <h4 className="font-bold text-green-300 mb-2">모니터링 시스템</h4>
                <p className="text-gray-400 text-sm">AI 의사결정 패턴을 상시 모니터링하여 이상 징후를 탐지합니다.</p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <h4 className="font-bold text-green-300 mb-2">정기 감사</h4>
                <p className="text-gray-400 text-sm">외부 전문기관을 통한 정기적인 AI 시스템 감사를 실시합니다.</p>
              </div>
            </div>
          </motion.section>

          {/* User Rights */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-8 glass rounded-2xl border border-purple-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="text-purple-400 w-6 h-6" />
              <h2 className="text-2xl font-bold">이용자의 권리</h2>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              이용자는 AI 의사결정에 대해 다음과 같은 권리를 가집니다.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-purple-400 w-5 h-5" />
                  <h4 className="font-bold text-white">설명 요구권</h4>
                </div>
                <p className="text-gray-400 text-sm">AI 매칭 결과에 대한 상세한 설명을 요청할 수 있습니다. 어떤 요소가 매칭에 영향을 미쳤는지 확인할 수 있습니다.</p>
              </div>

              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-purple-400 w-5 h-5" />
                  <h4 className="font-bold text-white">이의 제기권</h4>
                </div>
                <p className="text-gray-400 text-sm">AI 매칭 결과에 동의하지 않는 경우 이의를 제기하고 재검토를 요청할 수 있습니다.</p>
              </div>

              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-purple-400 w-5 h-5" />
                  <h4 className="font-bold text-white">재매칭 요청권</h4>
                </div>
                <p className="text-gray-400 text-sm">매칭된 간병인이 적합하지 않다고 판단되는 경우 새로운 매칭을 요청할 수 있습니다.</p>
              </div>

              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-purple-400 w-5 h-5" />
                  <h4 className="font-bold text-white">인간 개입 요청권</h4>
                </div>
                <p className="text-gray-400 text-sm">AI 의사결정 대신 전문 상담사의 직접 매칭을 요청할 수 있습니다.</p>
              </div>
            </div>
          </motion.section>

          {/* Appeal Process */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-8 p-8 glass rounded-2xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-blue-400 w-6 h-6" />
              <h2 className="text-2xl font-bold">이의제기 및 재매칭 절차</h2>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500/30" />

              <div className="space-y-6 relative">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm z-10">1</div>
                  <div className="flex-1 pb-6">
                    <h4 className="font-bold text-white mb-1">이의 신청</h4>
                    <p className="text-gray-400 text-sm">마이페이지 또는 고객센터를 통해 AI 매칭 결과에 대한 이의를 신청합니다.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm z-10">2</div>
                  <div className="flex-1 pb-6">
                    <h4 className="font-bold text-white mb-1">접수 확인</h4>
                    <p className="text-gray-400 text-sm">24시간 이내에 접수 확인 및 담당자 배정 안내를 받습니다.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm z-10">3</div>
                  <div className="flex-1 pb-6">
                    <h4 className="font-bold text-white mb-1">검토 진행</h4>
                    <p className="text-gray-400 text-sm">전문 상담사가 AI 매칭 과정과 결과를 상세히 검토합니다. (영업일 기준 3일 이내)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm z-10">4</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">결과 안내</h4>
                    <p className="text-gray-400 text-sm">검토 결과 및 조치 사항(재매칭, 보완 설명 등)을 안내받습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* AI Generated Content Notice */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 p-8 glass rounded-2xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="text-indigo-400 w-6 h-6" />
              <h2 className="text-2xl font-bold">AI 생성 콘텐츠 표시</h2>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              AI CareLink에서 AI가 생성한 콘텐츠는 다음과 같이 명확하게 표시됩니다.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-2 py-1 bg-purple-500/20 rounded text-purple-300 text-xs font-medium">AI 생성</div>
                  <span className="text-white font-medium">AI 일일 리포트</span>
                </div>
                <p className="text-gray-400 text-sm">환자의 건강 데이터를 기반으로 AI가 생성한 일일 건강 요약 리포트입니다.</p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-2 py-1 bg-blue-500/20 rounded text-blue-300 text-xs font-medium">AI 분석</div>
                  <span className="text-white font-medium">매칭 적합도 분석</span>
                </div>
                <p className="text-gray-400 text-sm">AI가 분석한 간병인-환자 간 매칭 적합도 및 추천 사유입니다.</p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-2 py-1 bg-green-500/20 rounded text-green-300 text-xs font-medium">AI 추천</div>
                  <span className="text-white font-medium">맞춤 케어 제안</span>
                </div>
                <p className="text-gray-400 text-sm">환자 상태에 따른 AI의 케어 방법 추천입니다.</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <p className="text-indigo-300 text-sm">
                <strong>중요:</strong> AI가 생성한 모든 콘텐츠는 참고용이며, 의료적 조언을 대체하지 않습니다.
                중요한 건강 관련 결정은 반드시 의료 전문가와 상담하시기 바랍니다.
              </p>
            </div>
          </motion.section>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-6 glass rounded-2xl border border-white/10 text-center"
          >
            <h3 className="font-bold text-lg mb-3">AI 윤리 관련 문의</h3>
            <p className="text-gray-400 text-sm mb-4">
              AI 시스템 관련 문의사항이나 이의제기가 있으시면 언제든지 연락해 주세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="text-gray-300">이메일: ai-ethics@ai-carelink.kr</span>
              <span className="text-gray-300">전화: 02-XXXX-XXXX</span>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
