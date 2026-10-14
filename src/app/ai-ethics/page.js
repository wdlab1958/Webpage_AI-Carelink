'use client';
/** AI 윤리·투명성 고지 v1.1 — 본문 src/content/ai-ethics.js, 공용 렌더러(LegalDocument). (구 마케팅형 페이지를 법적 고지 형식으로 전환) */
import { Brain } from 'lucide-react';
import LegalDocument from '@/components/LegalDocument';
import { AI_ETHICS_CHAPTERS, AI_ETHICS_HISTORY, AI_ETHICS_META, COMPANY_LINE } from '@/content/ai-ethics';

export default function AIEthicsPage() {
  return (
    <LegalDocument icon={Brain} title="AI 윤리 · 투명성" subtitle="인공지능 이용 사전 고지 · 추천 수식 공개 · 이용자 권리 (AI 기본법 제31조, 개인정보 보호법 제37조의2) v1.1"
      meta={AI_ETHICS_META}
      banner={{ tone: 'purple', title: '인공지능 이용 사전 고지', body: `AI CareLink 의 간병인 추천(지원자 정렬·추천 이유·가중치 조정)과 AI 상담은 인공지능으로 운용됩니다. 인공지능은 순서와 이유를 제안할 뿐이며 간병인 선택·확정은 사람이 합니다. 서비스는 의료기기가 아니며 응급 수단이 아닙니다 — 응급 시 119. 이 고지(v${AI_ETHICS_META.version})는 ${AI_ETHICS_META.announcedAt}에 공고되었고 ${AI_ETHICS_META.effectiveAt}부터 시행됩니다.` }}
      chapters={AI_ETHICS_CHAPTERS} history={AI_ETHICS_HISTORY} footerLine={COMPANY_LINE}
      related={[{ href: '/terms', label: '이용약관 제7조·제8조' }, { href: '/privacy', label: '개인정보처리방침 제10조(자동화된 결정)' }, { href: '/privacy-caregiver', label: '간병인 개인정보처리방침 제8항' }]} />
  );
}
