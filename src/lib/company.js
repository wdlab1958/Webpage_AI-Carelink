/**
 * 사업자 표시 정보 (2026-10-14 확정) — 전자상거래법 제13조·개인정보보호법 제31조·위치정보법·직업안정법.
 * 운영 사업자 ㈜에이쓰리시큐리티 가 AI CareLink 서비스를 운영한다. 위치기반사업자 등록번호는 케어링크 포함 재신고 중(변경 시 갱신).
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
  locationBizNumber: '제2565호',
  locationBizNote: '케어링크 포함 재신고 중 — 변경 시 갱신',
  jobPlacementNumber: '제2025-318027-14-5-00029호',
  supportHours: '평일 09:00~18:00',
};
export const SUPPORT_PHONE = (process.env.NEXT_PUBLIC_SUPPORT_PHONE || '').trim() || COMPANY.phone;
