/**
 * 사업자 표시 정보 (2026-10-14 확정) — 전자상거래법 제13조·개인정보보호법 제31조·위치정보법·직업안정법.
 * 운영 사업자 ㈜에이쓰리시큐리티 가 AI CareLink 서비스를 운영한다.
 * L-06: 위치기반서비스사업은 '신고' 대상이므로 '신고번호' 로 표기하고, 변경신고 진행 상황은 푸터가 아니라 /location-service-notice 상단에만 둔다.
 * TODO(LEGAL-L06): [사실확인] 신고번호 제2565호가 (주)에이쓰리시큐리티 명의인지 확인 후 확정.
 */
export const COMPANY = {
  serviceName: 'AI CareLink(AI케어링크)',
  name: '주식회사 에이쓰리시큐리티',
  nameEn: 'A3 Security Co., Ltd.',
  representative: '한재호',
  cpo: '이재익',
  corporateNumber: '110111-6247997',
  businessNumber: '172-81-00570',
  address: '서울특별시 영등포구 선유로9길 10, 1710호, 1711호(문래동6가, 문래에스케이브이원센터)',
  phone: '070-4155-5923',
  fax: '02-6952-8662',
  email: 'care@a3sc.co.kr',
  mailOrderNumber: '제2019-서울영등포-0676호',
  locationBizLabel: '위치기반서비스사업 신고번호',
  locationBizNumber: '제2565호',
  locationBizNote: 'AI CareLink 를 포함하는 변경신고 진행 중 — 완료 전까지 위치 공유 기능은 서버에서 비활성',   // 위치 고지 페이지 상단 안내 전용(푸터·사업자 표시줄에는 쓰지 않음)
  jobPlacementNumber: '제2025-318027-14-5-00029호',
  supportHours: '평일 09:00~18:00',
};
export const SUPPORT_PHONE = (process.env.NEXT_PUBLIC_SUPPORT_PHONE || '').trim() || COMPANY.phone;
