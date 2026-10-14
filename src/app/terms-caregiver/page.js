'use client';
/** 간병인·병원동행 매니저 이용약관 v1.0 — 본문 src/content/terms-caregiver.js. 공용 렌더러(LegalDocument) 로 이용약관·개인정보처리방침과 같은 디자인. */
import { FileText } from 'lucide-react';
import LegalDocument from '@/components/LegalDocument';
import { CAREGIVER_TERMS_CHAPTERS, CAREGIVER_TERMS_HISTORY, CAREGIVER_TERMS_META, COMPANY_LINE } from '@/content/terms-caregiver';

export default function CaregiverTermsPage() {
  return (
    <LegalDocument
      icon={FileText}
      title="간병인 이용약관"
      subtitle="AI CareLink 간병인·병원동행 매니저 회원 이용약관 v1.0"
      meta={CAREGIVER_TERMS_META}
      banner={{ tone: 'amber', title: '제정 약관 사전 공지', body: `이 약관(v${CAREGIVER_TERMS_META.version})은 ${CAREGIVER_TERMS_META.announcedAt}에 공고되었고 ${CAREGIVER_TERMS_META.effectiveAt}부터 시행됩니다. 간병인·병원동행 매니저 회원에게는 「서비스 이용약관」과 함께 이 약관이 적용됩니다. 시행일 전까지 거부 의사를 표시하지 않으면 동의한 것으로 보며, 동의하지 않는 회원은 이용계약을 해지할 수 있습니다.` }}
      chapters={CAREGIVER_TERMS_CHAPTERS}
      history={CAREGIVER_TERMS_HISTORY}
      footerLine={COMPANY_LINE}
      related={[{ href: '/terms', label: '서비스 이용약관(보호자·공통)' }, { href: '/privacy-caregiver', label: '간병인 개인정보처리방침' }, { href: '/location-service-notice', label: '위치기반서비스 이용자 고지' }, { href: '/ai-ethics', label: 'AI 윤리·투명성' }]}
    />
  );
}
