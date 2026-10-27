'use client';

/**
 * AI CareLink 서비스 이용약관 — 본문은 src/content/terms-v2.js 한 곳에서만 관리한다(앱 DB 본문도 같은 파일에서 내보냄).
 * L-01: 시행일(2027-01-01 KST) 전 기본 뷰는 현행 v1.0(TermsV1Page), ?version=1.1 로 개정안. 시행일부터 v1.1 이 기본, v1.0 은 ?version=1.0.
 * 목차는 "제n조" 헤딩에서 자동 생성한다(T2). 자리표시자·NOTE·미확정 문구는 빌드 검사로 차단한다(T3·T4·L-01).
 */
import { FileText } from 'lucide-react';
import LegalDocument from '@/components/LegalDocument';
import LegalVersionGate from '@/components/LegalVersionGate';
import { CHAPTERS, COMPANY_LINE, REVISION_HISTORY, TERMS_META } from '@/content/terms-v2';
import { announcementSentence } from '@/content/legal-meta';
import TermsV1Page from './v1.0/page';

const HISTORY = REVISION_HISTORY.map((h) => (h.version === TERMS_META.previousVersion ? { ...h, href: TERMS_META.previousHref } : h));

function TermsV2({ notice }) {
  return (
    <LegalDocument
      icon={FileText}
      title="이용약관"
      subtitle={`AI CareLink 서비스 이용약관 v${TERMS_META.version}`}
      notice={notice}
      meta={TERMS_META}
      banner={{ tone: 'amber', title: '개정 약관 공고', body: `${announcementSentence('약관', '은')} 시행일 전까지는 종전 약관(v${TERMS_META.previousVersion}, ${TERMS_META.previousEffectiveAt} 시행)이 적용됩니다. 회원에게 불리하거나 중요한 변경이 포함되어 시행 30일 전에 공고하며, 회원에게는 이메일·앱 알림·문자로 개별 통지합니다. 시행일 전까지 거부 의사를 표시하지 않으면 변경 약관에 동의한 것으로 보며, 동의하지 않는 회원은 이용계약을 해지할 수 있습니다.` }}
      chapters={CHAPTERS}
      history={HISTORY}
      footerLine={COMPANY_LINE}
      related={[{ href: '/terms-caregiver', label: '간병인 이용약관' }, { href: '/ecommerce-notice', label: '전자상거래 고지' }, { href: '/privacy', label: '개인정보처리방침' }, { href: '/ai-ethics', label: 'AI 윤리·투명성' }]}
    />
  );
}

export default function TermsPage() {
  return (
    <LegalVersionGate
      noun="약관"
      meta={TERMS_META}
      previous={{ version: TERMS_META.previousVersion, effectiveAt: TERMS_META.previousEffectiveAt, render: (notice) => <TermsV1Page embedded notice={notice} /> }}
      current={{ render: (notice) => <TermsV2 notice={notice} /> }}
    />
  );
}
