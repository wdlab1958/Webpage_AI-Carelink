'use client';
/** 간병인·병원동행 매니저 개인정보처리방침 v1.0 — 본문 src/content/privacy-caregiver.js. 공용 렌더러(LegalDocument). */
import { Shield } from 'lucide-react';
import LegalDocument from '@/components/LegalDocument';
import { COMPANY_LINE } from '@/content/terms-v2';
import { CAREGIVER_PRIVACY_CHAPTERS, CAREGIVER_PRIVACY_HISTORY, CAREGIVER_PRIVACY_META } from '@/content/privacy-caregiver';

export default function CaregiverPrivacyPage() {
  return (
    <LegalDocument
      icon={Shield}
      title="간병인 개인정보처리방침"
      subtitle="AI CareLink 간병인·병원동행 매니저 회원용 v1.1 · 주식회사 에이쓰리시큐리티"
      meta={CAREGIVER_PRIVACY_META}
      banner={{ tone: 'purple', title: '간병인 회원 전용 안내', body: `이 방침은 간병인·병원동행 매니저 회원의 개인정보(자격·경력, 정산 계좌·소득 자료, 보호자에게 제공되는 항목, 보험·결격사유 확인, 위치정보, AI 추천 정렬)를 다룹니다. ${CAREGIVER_PRIVACY_META.announcedAt} 공고, ${CAREGIVER_PRIVACY_META.effectiveAt} 시행. 처리 위탁·국외 이전·안전조치 등 회사 공통 사항은 통합 개인정보처리방침을 따릅니다.` }}
      chapters={CAREGIVER_PRIVACY_CHAPTERS}
      history={CAREGIVER_PRIVACY_HISTORY}
      footerLine={COMPANY_LINE}
      related={[{ href: '/privacy', label: '개인정보처리방침(통합)' }, { href: '/terms-caregiver', label: '간병인 이용약관' }, { href: '/location-service-notice', label: '위치기반서비스 이용자 고지' }, { href: '/ai-ethics', label: 'AI 윤리·투명성' }]}
    />
  );
}
