'use client';
/** 간병인·병원동행 매니저 이용약관 v1.1 — 본문 src/content/terms-caregiver.js. 공용 렌더러(LegalDocument)·버전 게이트(L-01). 시행된 종전 버전이 없어 시행 전에도 v1.1 을 보이고 적용 규범을 안내한다. */
import { FileText } from 'lucide-react';
import Link from 'next/link';
import LegalDocument from '@/components/LegalDocument';
import LegalVersionGate from '@/components/LegalVersionGate';
import { announcementSentence } from '@/content/legal-meta';
import { CAREGIVER_TERMS_CHAPTERS, CAREGIVER_TERMS_HISTORY, CAREGIVER_TERMS_META, COMPANY_LINE } from '@/content/terms-caregiver';

export default function CaregiverTermsPage() {
  return (
    <LegalVersionGate noun="약관" meta={CAREGIVER_TERMS_META}
      interimNote={<>시행일({CAREGIVER_TERMS_META.effectiveAt}) 전까지 간병인·병원동행 매니저 회원에게는 <Link href="/terms" className="underline font-semibold">「서비스 이용약관」</Link>이 적용됩니다.</>}
      current={{ render: (notice) => <CaregiverTermsDoc notice={notice} /> }} />
  );
}

function CaregiverTermsDoc({ notice }) {
  return (
    <LegalDocument
      icon={FileText}
      title="간병인 이용약관"
      subtitle={`AI CareLink 간병인·병원동행 매니저 회원 이용약관 v${CAREGIVER_TERMS_META.version}`}
      notice={notice}
      meta={CAREGIVER_TERMS_META}
      banner={{ tone: 'amber', title: '제정 약관 사전 공지', body: `${announcementSentence('약관', '은')} 간병인·병원동행 매니저 회원에게는 「서비스 이용약관」과 함께 이 약관이 적용됩니다. 시행일 전까지 거부 의사를 표시하지 않으면 동의한 것으로 보며, 동의하지 않는 회원은 이용계약을 해지할 수 있습니다.` }}
      chapters={CAREGIVER_TERMS_CHAPTERS}
      history={CAREGIVER_TERMS_HISTORY}
      footerLine={COMPANY_LINE}
      related={[{ href: '/terms', label: '서비스 이용약관(보호자·공통)' }, { href: '/privacy-caregiver', label: '간병인 개인정보처리방침' }, { href: '/location-service-notice', label: '위치기반서비스 이용자 고지' }, { href: '/ai-ethics', label: 'AI 윤리·투명성' }]}
    />
  );
}
