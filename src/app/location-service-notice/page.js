'use client';
/** 위치기반서비스 이용자 고지 v1.1 — 본문 src/content/location-notice.js, 공용 렌더러(LegalDocument)·버전 게이트(L-01). 시행된 종전 버전이 없어 시행 전에도 v1.1 을 보이고 현재 상태를 안내한다. */
import { MapPin } from 'lucide-react';
import LegalDocument from '@/components/LegalDocument';
import LegalVersionGate from '@/components/LegalVersionGate';
import { announcementSentence } from '@/content/legal-meta';
import { COMPANY_LINE, LOCATION_CHAPTERS, LOCATION_HISTORY, LOCATION_META } from '@/content/location-notice';

export default function LocationServiceNoticePage() {
  return (
    <LegalVersionGate noun="고지" meta={LOCATION_META}
      interimNote={<>시행일({LOCATION_META.effectiveAt}) 전까지 위치 공유 기능은 서버에서 비활성 상태이며 개인위치정보를 수집하지 않습니다.</>}
      current={{ render: (notice) => <LocationNoticeDoc notice={notice} /> }} />
  );
}

function LocationNoticeDoc({ notice }) {
  return (
    <LegalDocument icon={MapPin} title="위치기반서비스 이용자 고지" subtitle={`간병인·병원동행 매니저 앱 위치 공유 — 수집·제공·통보·파기 안내 및 사업자 등록 확인 (위치정보법) v${LOCATION_META.version}`}
      notice={notice} meta={LOCATION_META}
      banner={{ tone: 'purple', title: '수집 대상과 현재 상태', body: `위치정보를 수집하는 대상은 간병인·병원동행 매니저 회원의 단말기뿐이며, 서비스 진행 중 앱을 켠 동안에만 수집됩니다. 위치 공유 기능은 위치기반서비스사업 변경신고(AI CareLink 포함) 완료 전까지 서버에서 꺼져 있습니다. ${announcementSentence('고지', '는')}` }}
      chapters={LOCATION_CHAPTERS} history={LOCATION_HISTORY} footerLine={COMPANY_LINE}
      related={[{ href: 'https://app.ai-carelink.co.kr/location-terms', label: '위치기반서비스 이용약관 전문' }, { href: '/privacy', label: '개인정보처리방침' }, { href: '/privacy-caregiver', label: '간병인 개인정보처리방침' }]} />
  );
}
