'use client';
/** 전자상거래 고지 v1.1 — 본문 src/content/ecommerce-notice.js, 공용 렌더러(LegalDocument). */
import { ShoppingBag } from 'lucide-react';
import LegalDocument from '@/components/LegalDocument';
import { COMPANY_LINE, ECOMMERCE_CHAPTERS, ECOMMERCE_HISTORY, ECOMMERCE_META } from '@/content/ecommerce-notice';

export default function EcommerceNoticePage() {
  return (
    <LegalDocument icon={ShoppingBag} title="전자상거래 고지" subtitle="통신판매중개 고지 · 청약철회 · 환불 · 사업자 표시 (전자상거래법) v1.1"
      meta={ECOMMERCE_META}
      banner={{ tone: 'amber', title: '개정 고지 사전 공지', body: `AI CareLink 는 간병·병원동행 서비스의 통신판매중개자이자 케어 쇼핑몰·멤버십의 통신판매업자입니다. 이 고지(v${ECOMMERCE_META.version})는 ${ECOMMERCE_META.announcedAt}에 공고되었고 ${ECOMMERCE_META.effectiveAt}부터 시행됩니다.` }}
      chapters={ECOMMERCE_CHAPTERS} history={ECOMMERCE_HISTORY} footerLine={COMPANY_LINE}
      related={[{ href: '/terms', label: '이용약관' }, { href: '/terms-caregiver', label: '간병인 이용약관' }, { href: '/privacy', label: '개인정보처리방침' }, { href: 'https://app.ai-carelink.co.kr/refund-policy', label: '환불·취소 정책 전문' }]} />
  );
}
