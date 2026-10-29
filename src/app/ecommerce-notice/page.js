'use client';
/** 전자상거래 고지 v1.1 — 본문 src/content/ecommerce-notice.js, 공용 렌더러(LegalDocument)·버전 게이트(L-01). 시행된 종전 버전이 없어 시행 전에도 v1.1 을 보이고 적용 규범을 안내한다. */
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import LegalDocument from '@/components/LegalDocument';
import LegalVersionGate from '@/components/LegalVersionGate';
import { announcementSentence } from '@/content/legal-meta';
import { COMPANY_LINE, ECOMMERCE_CHAPTERS, ECOMMERCE_HISTORY, ECOMMERCE_META } from '@/content/ecommerce-notice';

export default function EcommerceNoticePage() {
  return (
    <LegalVersionGate noun="고지" meta={ECOMMERCE_META}
      interimNote={<>시행일({ECOMMERCE_META.effectiveAt}) 전까지 거래 조건은 현행 <Link href="/terms" className="underline font-semibold">「서비스 이용약관」</Link>(v1.0)과 개별 거래 화면의 표시사항에 따릅니다.</>}
      current={{ render: (notice) => <EcommerceNoticeDoc notice={notice} /> }} />
  );
}

function EcommerceNoticeDoc({ notice }) {
  return (
    <LegalDocument icon={ShoppingBag} title="전자상거래 고지" subtitle={`통신판매중개 고지 · 청약철회 · 환불 · 사업자 표시 (전자상거래법) v${ECOMMERCE_META.version}`}
      notice={notice} meta={ECOMMERCE_META}
      banner={{ tone: 'amber', title: '개정 고지 공고', body: `AI CareLink 는 간병·병원동행 서비스의 통신판매중개자이자 케어 쇼핑몰·멤버십의 통신판매업자입니다. ${announcementSentence('고지', '는')}` }}
      chapters={ECOMMERCE_CHAPTERS} history={ECOMMERCE_HISTORY} footerLine={COMPANY_LINE}
      related={[{ href: '/terms', label: '이용약관' }, { href: '/terms-caregiver', label: '간병인 이용약관' }, { href: '/privacy', label: '개인정보처리방침' }, { href: 'https://app.ai-carelink.co.kr/refund-policy', label: '환불·취소 정책 전문' }]} />
  );
}
