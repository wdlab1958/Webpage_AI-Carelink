'use client';

import { motion } from 'framer-motion';
import { FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const sections = [
    {
      title: '제1조 (목적)',
      content: `본 약관은 AI CareLink(이하 "회사")가 제공하는 AI 기반 간병 매칭 플랫폼 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.`
    },
    {
      title: '제2조 (정의)',
      content: `① "서비스"란 회사가 제공하는 AI 기반 간병인 매칭, 건강 모니터링, 커뮤니티, 정산 관리 등 관련 제반 서비스를 의미합니다.
② "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 환자, 보호자, 간병인, 병원 관리자 등을 말합니다.
③ "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
④ "AI 매칭"이란 인공지능 기술을 활용하여 환자의 상태, 요구사항과 간병인의 전문성, 가용성을 분석하여 최적의 매칭을 제공하는 서비스를 말합니다.`
    },
    {
      title: '제3조 (약관의 효력 및 변경)',
      content: `① 본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.
② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.
③ 약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 서비스 내 공지합니다. 다만, 이용자에게 불리한 변경의 경우 30일 전부터 공지합니다.
④ 이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있습니다.`
    },
    {
      title: '제4조 (서비스의 제공)',
      content: `① 회사는 다음과 같은 서비스를 제공합니다:
  1. AI 기반 간병인 매칭 서비스
  2. 실시간 건강 모니터링 서비스
  3. AI 일일 리포트 제공 서비스
  4. 간병인-보호자 커뮤니케이션 서비스
  5. 급여 정산 및 계약 관리 서비스
  6. 커뮤니티 및 정보 제공 서비스
  7. 기타 회사가 정하는 서비스

② 회사는 서비스의 품질 향상을 위해 서비스의 내용을 추가, 변경할 수 있습니다.`
    },
    {
      title: '제5조 (회원가입)',
      content: `① 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
② 회사는 다음 각 호에 해당하는 경우 회원가입을 거절할 수 있습니다:
  1. 가입신청자가 본 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우
  2. 실명이 아니거나 타인의 명의를 이용한 경우
  3. 허위의 정보를 기재하거나, 회사가 요구하는 정보를 제공하지 않은 경우
  4. 만 14세 미만인 경우
  5. 기타 회원으로 등록하는 것이 서비스 운영에 현저히 지장이 있다고 판단되는 경우`
    },
    {
      title: '제6조 (회원의 의무)',
      content: `① 회원은 다음 행위를 하여서는 안 됩니다:
  1. 신청 또는 변경 시 허위 내용의 등록
  2. 타인의 정보 도용
  3. 회사가 게시한 정보의 변경
  4. 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
  5. 회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해
  6. 회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
  7. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위
  8. 환자의 개인정보 및 건강정보를 무단으로 수집, 이용, 제공하는 행위

② 간병인 회원은 서비스 이용 중 알게 된 환자의 개인정보 및 건강정보에 대해 비밀유지 의무를 준수해야 합니다.`
    },
    {
      title: '제7조 (서비스 제공자의 의무)',
      content: `① 회사는 관련 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다합니다.
② 회사는 이용자의 개인정보 보호를 위해 보안시스템을 갖추어야 하며, 개인정보처리방침을 공시하고 준수합니다.
③ 회사는 AI 시스템의 의사결정 과정에 대한 투명성을 확보하고, 이용자의 요청 시 AI 매칭 결과에 대한 설명을 제공합니다.
④ 회사는 서비스 이용과 관련하여 이용자로부터 제기된 의견이나 불만이 정당하다고 인정할 경우 이를 처리하여야 합니다.`
    },
    {
      title: '제8조 (AI 서비스 관련 고지)',
      content: `① 본 서비스의 AI 매칭 시스템은 환자의 건강상태, 요구사항 및 간병인의 전문성을 분석하여 매칭을 제안하나, 최종 결정은 이용자의 판단에 따릅니다.
② AI 시스템이 생성한 리포트 및 분석 결과는 참고용이며, 의료적 진단이나 처방을 대체하지 않습니다.
③ AI가 생성한 콘텐츠(일일 리포트, 건강 분석 등)에는 "AI 생성 콘텐츠"임을 명시합니다.
④ 이용자는 AI 의사결정에 대해 이의를 제기하고 재매칭을 요청할 권리가 있습니다.`
    },
    {
      title: '제9조 (서비스 이용의 제한 및 중지)',
      content: `① 회사는 다음 각 호에 해당하는 경우 서비스 제공을 제한하거나 중지할 수 있습니다:
  1. 서비스용 설비의 보수 등 공사로 인한 부득이한 경우
  2. 전기통신사업법에 규정된 기간통신사업자가 전기통신서비스를 중지했을 경우
  3. 기타 불가항력적 사유가 있는 경우

② 회사는 국가비상사태, 정전, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 때에는 서비스의 전부 또는 일부를 제한하거나 정지할 수 있습니다.`
    },
    {
      title: '제10조 (계약 해지 및 회원 탈퇴)',
      content: `① 회원이 서비스 이용계약을 해지하고자 하는 경우, 회원 본인이 서비스 내 마이페이지 또는 고객센터를 통해 회원 탈퇴를 신청할 수 있습니다.
② 회사는 회원이 다음 각 호의 사유에 해당하는 경우, 서비스 이용을 제한하거나 이용계약을 해지할 수 있습니다:
  1. 가입 신청 시 허위 내용을 등록한 경우
  2. 다른 이용자의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자거래 질서를 위협하는 경우
  3. 서비스를 이용하여 법령 또는 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우`
    },
    {
      title: '제11조 (손해배상 및 면책)',
      content: `① 회사는 서비스 제공과 관련하여 회사의 고의 또는 중과실로 인하여 회원에게 손해가 발생한 경우 그 손해를 배상합니다.
② 회사는 다음 각 호의 경우에 대해서는 책임을 지지 않습니다:
  1. 천재지변, 전쟁, 기타 불가항력으로 인한 서비스 제공 불가
  2. 이용자의 귀책사유로 인한 서비스 이용 장애
  3. 서비스에 접속 또는 이용 과정에서 발생하는 개인적인 손해
  4. 이용자가 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관한 사항

③ 회사는 AI 매칭 결과에 대한 참고 정보를 제공하나, 간병 서비스의 품질 및 간병인의 행위에 대해서는 직접적인 책임을 지지 않습니다.`
    },
    {
      title: '제12조 (분쟁 해결)',
      content: `① 회사와 이용자 간에 발생한 분쟁에 관한 소송은 대한민국 법을 적용합니다.
② 회사와 이용자 간에 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제기합니다.
③ 이용자는 서비스 이용과 관련하여 불만이 있는 경우 고객센터를 통해 이의를 제기할 수 있으며, 회사는 신속하게 처리합니다.`
    },
    {
      title: '제13조 (기타)',
      content: `① 본 약관에서 정하지 아니한 사항과 본 약관의 해석에 관하여는 관계법령 및 상관례에 따릅니다.
② 회사가 필요한 경우 서비스 내의 개별 서비스에 대한 별도 약관이나 이용 정책을 둘 수 있으며, 그 내용이 본 약관과 상충될 경우 개별 약관이 우선 적용됩니다.`
    }
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
              <span className="text-white">이용약관</span>
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <FileText className="text-purple-400 w-7 h-7" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">이용약관</h1>
                <p className="text-gray-400 mt-1">AI CareLink 서비스 이용약관</p>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-6 glass rounded-2xl border border-white/10 mb-8">
              <p className="text-gray-300 text-sm leading-relaxed">
                본 약관은 AI CareLink 서비스 이용에 관한 기본적인 사항을 규정합니다.
                서비스를 이용하시기 전에 아래 내용을 주의 깊게 읽어주시기 바랍니다.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
                <span>시행일: 2026년 1월 1일</span>
                <span>버전: 1.0</span>
              </div>
            </div>
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 p-6 glass rounded-2xl border border-white/10"
          >
            <h2 className="text-lg font-bold mb-4">목차</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index}`}
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors py-1"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.section
                key={index}
                id={`section-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="p-6 glass rounded-2xl border border-white/10"
              >
                <h2 className="text-xl font-bold mb-4 text-purple-400">{section.title}</h2>
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 glass rounded-2xl border border-white/10 text-center"
          >
            <p className="text-gray-400 text-sm">
              본 약관에 대한 문의사항이 있으시면 고객센터로 연락해 주시기 바랍니다.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              고객센터: support@ai-carelink.kr | 운영시간: 평일 09:00 - 18:00
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
