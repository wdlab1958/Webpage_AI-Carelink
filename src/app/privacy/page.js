'use client';

import { motion } from 'framer-motion';
import { Shield, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const sections = [
    {
      title: '제1조 (개인정보의 처리 목적)',
      content: `AI CareLink(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

① 회원가입 및 관리
회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지 목적으로 개인정보를 처리합니다.

② AI 간병 매칭 서비스 제공
환자/보호자와 간병인 간 최적 매칭, 간병 서비스 품질 관리, 서비스 개선을 위한 분석 목적으로 개인정보를 처리합니다.

③ 건강 모니터링 서비스
환자의 건강상태 모니터링, AI 일일리포트 생성, 이상징후 알림 서비스 제공 목적으로 개인정보를 처리합니다.

④ 민원사무 처리
민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를 처리합니다.

⑤ 마케팅 및 광고 활용 (선택 동의)
이벤트 및 광고성 정보 제공, 서비스의 유효성 확인, 접속빈도 파악 목적으로 개인정보를 처리합니다.`
    },
    {
      title: '제2조 (처리하는 개인정보 항목)',
      content: `① 필수 수집 항목
• 회원가입 시: 이름, 이메일, 휴대폰 번호, 비밀번호, 생년월일, 성별
• 본인인증 시: CI(연계정보), DI(중복가입확인정보)
• 서비스 이용 시: 서비스 이용기록, 접속 로그, 쿠키, 접속 IP, 기기정보

② 선택 수집 항목
• 프로필 정보: 프로필 사진, 주소, 선호 서비스 지역
• 결제 정보: 카드번호, 계좌번호 (PG사 암호화 저장)

③ 간병인 추가 수집 항목
• 자격 정보: 요양보호사 자격증 번호, 경력사항, 교육이수 내역
• 근무 정보: 희망 근무지역, 희망 근무시간, 전문분야

④ 민감정보 (건강정보) - 별도 동의 필수
• 환자 건강정보: 진단명, 투약정보, 바이탈 사인(체온, 혈압, 맥박, 산소포화도)
• ADL(일상생활수행능력) 정보: 이동, 배설, 식사, 목욕 등 수행능력 수준
• 질환 정보: 치매, 뇌졸중, 욕창 등 특이사항

⑤ 자동 수집 항목
서비스 이용 과정에서 IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록, 불량 이용기록 등이 자동으로 생성되어 수집될 수 있습니다.`
    },
    {
      title: '제3조 (민감정보(건강정보)의 처리)',
      content: `① 회사는 개인정보보호법 제23조에 따라 건강에 관한 정보를 민감정보로 분류하여 처리합니다.

② 민감정보 수집 동의
회사는 다음의 민감정보를 수집하며, 이에 대해 별도의 동의를 받습니다:
• 환자의 건강상태 및 질환 정보
• 바이탈 사인 데이터
• ADL 평가 정보
• 투약 및 치료 관련 정보

③ 민감정보 처리 목적
• AI 기반 맞춤 간병인 매칭
• 건강 모니터링 및 이상징후 알림
• AI 일일리포트 생성
• 서비스 품질 개선

④ 민감정보 보호 조치
• 별도 분리된 데이터베이스에 암호화 저장
• 접근 권한 최소화 및 접근 로그 기록
• 정기적인 보안 점검 실시

⑤ 동의 철회
이용자는 언제든지 민감정보 수집·이용에 대한 동의를 철회할 수 있습니다. 단, 동의 철회 시 일부 서비스 이용이 제한될 수 있습니다.`
    },
    {
      title: '제4조 (개인정보의 보유 및 이용 기간)',
      content: `① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:

• 회원정보: 회원 탈퇴 시까지 (탈퇴 후 30일 이내 파기)
• 건강정보(민감정보): 서비스 이용 종료 후 1년
• 서비스 이용기록: 3년
• 결제기록: 5년 (전자상거래법)
• AI 의사결정 기록: 5년 (인공지능 기본법)

③ 관련 법령에 의한 정보보유 기간:
• 계약 또는 청약철회 등에 관한 기록: 5년
• 대금결제 및 재화 등의 공급에 관한 기록: 5년
• 소비자의 불만 또는 분쟁처리에 관한 기록: 3년
• 표시/광고에 관한 기록: 6개월
• 웹사이트 방문기록: 3개월`
    },
    {
      title: '제5조 (개인정보의 제3자 제공)',
      content: `① 회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.

② 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다:

제공받는 자: 매칭된 간병인 또는 보호자
제공 목적: 간병 서비스 제공 및 연락
제공 항목: 이름, 연락처, 서비스 이용 관련 정보
보유 기간: 서비스 종료 시까지

제공받는 자: 매칭된 병원/요양기관
제공 목적: 환자 케어 및 간병 서비스 관리
제공 항목: 환자 건강정보, 간병 기록
보유 기간: 서비스 종료 후 1년

③ 이용자는 개인정보의 제3자 제공에 대한 동의를 거부할 권리가 있으나, 동의 거부 시 서비스 이용이 제한될 수 있습니다.`
    },
    {
      title: '제6조 (개인정보 처리의 위탁)',
      content: `① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:

위탁받는 자: [클라우드 서비스 제공자]
위탁업무: 데이터 저장 및 관리
보유 기간: 위탁계약 종료 시까지

위탁받는 자: [본인인증 서비스 제공자]
위탁업무: 본인인증
보유 기간: 인증 완료 후 즉시 파기

위탁받는 자: [PG사]
위탁업무: 결제 처리
보유 기간: 관련 법령에 따른 보관기간

위탁받는 자: [SMS/알림톡 서비스 제공자]
위탁업무: 문자 및 알림 발송
보유 기간: 발송 완료 후 즉시 파기

② 회사는 위탁계약 체결 시 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독 등에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.`
    },
    {
      title: '제7조 (정보주체의 권리·의무 및 행사방법)',
      content: `① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
• 개인정보 열람 요구
• 오류 등이 있을 경우 정정 요구
• 삭제 요구
• 처리정지 요구

② AI 자동화 의사결정에 대한 권리
• 이용자는 AI 매칭 결과에 대한 설명을 요구할 수 있습니다
• AI 의사결정에 대해 이의를 제기하고 재검토를 요청할 수 있습니다
• 인간의 개입을 요청할 수 있습니다

③ 개인정보 전송 요구권
• 이용자는 자신의 개인정보를 본인 또는 제3자에게 전송해줄 것을 요구할 수 있습니다
• 전송 요구 시 3년간 전송 내역이 보관됩니다

④ 권리 행사 방법
• 서비스 내 마이페이지에서 직접 처리
• 개인정보보호 책임자에게 서면, 이메일로 연락

⑤ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.`
    },
    {
      title: '제8조 (개인정보의 파기)',
      content: `① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.

② 파기 절차
이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.

③ 파기 방법
• 전자적 파일 형태: 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제
• 종이 문서: 분쇄기로 분쇄하거나 소각`
    },
    {
      title: '제9조 (개인정보의 안전성 확보 조치)',
      content: `회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:

① 관리적 조치
• 내부관리계획 수립·시행
• 개인정보 취급 직원의 최소화 및 교육
• 정기적인 자체 감사 실시

② 기술적 조치
• 개인정보처리시스템 등의 접근권한 관리
• 접근통제시스템 설치
• 고유식별정보 등의 암호화 (AES-256)
• 보안프로그램 설치
• 민감정보(건강정보) 별도 암호화 저장

③ 물리적 조치
• 전산실, 자료보관실 등의 접근통제
• 클라우드 서버 국내 데이터센터 운영`
    },
    {
      title: '제10조 (쿠키의 설치·운영 및 거부)',
      content: `① 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.

② 쿠키의 사용 목적
• 회원과 비회원의 접속 빈도나 방문 시간 등을 분석
• 이용자의 취향과 관심분야를 파악
• 서비스 개선을 위한 분석

③ 쿠키의 종류
• 필수 쿠키: 서비스 제공에 반드시 필요한 쿠키
• 분석 쿠키: 서비스 이용 통계를 위한 쿠키 (선택)
• 마케팅 쿠키: 맞춤형 광고를 위한 쿠키 (선택)

④ 쿠키의 설치·운영 및 거부
• 웹브라우저 상단의 도구 > 인터넷 옵션 > 개인정보 메뉴에서 쿠키 저장을 거부할 수 있습니다.
• 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.`
    },
    {
      title: '제11조 (개인정보 보호책임자)',
      content: `① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

■ 개인정보 보호책임자
• 성명: [개인정보보호책임자명]
• 직책: [직책]
• 연락처: privacy@ai-carelink.kr
• 전화: 02-XXXX-XXXX

■ 개인정보 보호 담당부서
• 부서명: 개인정보보호팀
• 연락처: privacy@ai-carelink.kr

② 정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다.`
    },
    {
      title: '제12조 (권익침해 구제방법)',
      content: `정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.

• 개인정보침해 신고센터 (한국인터넷진흥원 운영)
  - 소관업무: 개인정보 침해사실 신고, 상담 신청
  - 홈페이지: privacy.kisa.or.kr
  - 전화: (국번없이) 118

• 개인정보 분쟁조정위원회
  - 소관업무: 개인정보 분쟁조정신청, 집단분쟁조정
  - 홈페이지: www.kopico.go.kr
  - 전화: (국번없이) 1833-6972

• 대검찰청 사이버수사과
  - 전화: (국번없이) 1301
  - 홈페이지: www.spo.go.kr

• 경찰청 사이버수사국
  - 전화: (국번없이) 182
  - 홈페이지: ecrm.cyber.go.kr`
    },
    {
      title: '제13조 (개인정보 처리방침 변경)',
      content: `① 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.

② 이용자에게 불리한 변경의 경우 30일 전부터 고지하며, 이메일 등의 방법으로 개별 통지합니다.

■ 개인정보처리방침 버전 및 시행일
• 버전: 1.0
• 공고일: 2025년 12월 25일
• 시행일: 2026년 1월 1일`
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
              <span className="text-white">개인정보처리방침</span>
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Shield className="text-blue-400 w-7 h-7" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">개인정보처리방침</h1>
                <p className="text-gray-400 mt-1">AI CareLink 개인정보 보호정책</p>
              </div>
            </div>

            {/* Important Notice */}
            <div className="p-6 glass rounded-2xl border border-amber-500/30 bg-amber-500/5 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-amber-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-200 font-medium mb-2">민감정보(건강정보) 처리 안내</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    AI CareLink는 간병 서비스 제공을 위해 건강정보(민감정보)를 처리합니다.
                    건강정보의 수집·이용에는 별도의 동의가 필요하며, 언제든지 동의를 철회할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-6 glass rounded-2xl border border-white/10 mb-8">
              <p className="text-gray-300 text-sm leading-relaxed">
                AI CareLink(이하 "회사")는 개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고
                이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
                <span>시행일: 2026년 1월 1일</span>
                <span>버전: 1.0</span>
                <span>최종 수정일: 2025년 12월 25일</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
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
                  href={`#privacy-section-${index}`}
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors py-1"
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
                id={`privacy-section-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.03 }}
                className="p-6 glass rounded-2xl border border-white/10"
              >
                <h2 className="text-xl font-bold mb-4 text-blue-400">{section.title}</h2>
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
              개인정보 관련 문의사항이 있으시면 개인정보보호 책임자에게 연락해 주시기 바랍니다.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              이메일: privacy@ai-carelink.kr | 전화: 02-XXXX-XXXX
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
