import { Brain, Phone, Mail, ExternalLink, ShieldCheck, Smartphone } from 'lucide-react';
import Link from 'next/link';
import AppLink from '@/components/AppLink';
import { APP_PATHS, PROD_DOMAIN } from '@/lib/hosts';
import { COMPANY } from '@/lib/company';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const supportEmail = COMPANY.email;
  const partnerEmail = COMPANY.email;

  return (
    <footer className="border-t border-white/5">
      {/* Emergency Contact Banner */}
      <div className="bg-rose-500/5 border-b border-rose-500/10">
        <div className="container py-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
          <Phone size={14} className="text-rose-400" />
          <span className="text-rose-300 font-semibold">응급 상황</span>
          <span className="text-gray-400">· 응급 시 119로 먼저 연락하세요 ·</span>
          <span className="text-gray-400">앱 내 긴급호출은 담당 간병인·보호자에게 즉시 전달됩니다</span>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold">AI CareLink</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-xs">
                보호자에게는 간병인·병원 동행 매니저를, 간병인에게는 일감을, 요양병원·요양원에는 인력과 증빙을
                쉽게 연결합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                  <ShieldCheck size={12} className="text-teal-400" />
                  AI 기본법 준수
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                  <ShieldCheck size={12} className="text-teal-400" />
                  개인정보보호법 · 민감정보 별도동의
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                  <Smartphone size={12} className="text-emerald-400" />
                  Android PWA
                </span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">서비스</h4>
              <ul className="space-y-2.5">
                <li><Link href="/service-intro" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">서비스 소개</Link></li>
                <li><Link href="/pilot-2026" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">요양급여 · 시범사업</Link></li>
                <li><Link href="/ai-matching" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">AI 매칭</Link></li>
                <li><Link href="/community" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">커뮤니티</Link></li>
              </ul>
            </div>

            {/* App */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">플랫폼 바로가기</h4>
              <ul className="space-y-2.5">
                <li><AppLink to={APP_PATHS.family} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">보호자 앱 (가족 간병·병원 동행)</AppLink></li>
                <li><AppLink to={APP_PATHS.work} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">간병인·동행 매니저 앱</AppLink></li>
                <li><AppLink to={APP_PATHS.institution} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">요양병원·요양원 포털</AppLink></li>
                <li><Link href="/institution-guide" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">요양병원·요양원 안내</Link></li>
                <li><AppLink to={APP_PATHS.shop} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">케어 쇼핑몰</AppLink></li>
                <li><AppLink to={APP_PATHS.login} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">로그인</AppLink></li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">법적고지 · 지원</h4>
              <ul className="space-y-2.5">
                <li><Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">이용약관 (보호자·공통)</Link></li>
                <li><Link href="/terms-caregiver" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">간병인 이용약관</Link></li>
                <li><Link href="/ecommerce-notice" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">전자상거래 고지 (중개·청약철회·환불)</Link></li>
                <li><Link href="/location-service-notice" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">위치기반서비스 이용자 고지</Link></li>
                <li><AppLink path={APP_PATHS.locationTerms} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">위치기반서비스 이용약관</AppLink></li>
                <li><AppLink path={APP_PATHS.refundPolicy} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">환불·취소 정책</AppLink></li>
                {/* TODO(LEGAL-L10): 이용약관 제5조가 언급하는 '운영정책' 전문 페이지가 아직 없음 — 게시 후 링크 추가 */}
                <li><Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">개인정보처리방침 (통합)</Link></li>
                <li><Link href="/privacy-caregiver" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">간병인 개인정보처리방침</Link></li>
                <li><Link href="/ai-ethics" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">AI 윤리 · 투명성</Link></li>
                <li>
                  <a href={`mailto:${supportEmail}`} className="text-gray-500 hover:text-gray-300 text-sm transition-colors inline-flex items-center gap-1">
                    <Mail size={12} />
                    {supportEmail}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${partnerEmail}`} className="text-gray-500 hover:text-gray-300 text-sm transition-colors inline-flex items-center gap-1">
                    <ExternalLink size={12} />
                    기관 제휴 · 실증 문의
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
            <p className="text-gray-400 font-semibold">{COMPANY.name} ({COMPANY.nameEn}) · 서비스명 {COMPANY.serviceName} · www.{PROD_DOMAIN} · app.{PROD_DOMAIN}</p>
            <p>대표자 {COMPANY.representative} · 사업자등록번호 {COMPANY.businessNumber} · 법인등록번호 {COMPANY.corporateNumber} · 통신판매업신고 {COMPANY.mailOrderNumber}</p>
            <p>{COMPANY.address}</p>
            <p>대표전화 <a href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-gray-300">{COMPANY.phone}</a> ({COMPANY.supportHours}) · 팩스 {COMPANY.fax} · 이메일 <a href={`mailto:${COMPANY.email}`} className="hover:text-gray-300">{COMPANY.email}</a></p>
            <p>개인정보보호책임자 {COMPANY.cpo} · {COMPANY.locationBizLabel} {COMPANY.locationBizNumber} · 유료직업소개사업 등록번호 {COMPANY.jobPlacementNumber}</p>
            <p className="text-gray-600">회사는 간병·병원동행 서비스의 통신판매중개자로서 거래 당사자가 아니며, 케어 쇼핑몰 직접 판매 상품에 대해서는 통신판매업자입니다.</p>
          </div>
          <p className="text-xs text-gray-600 whitespace-nowrap">
            © {currentYear} {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
