import { Brain, Phone, Mail, ExternalLink, ShieldCheck, Smartphone } from 'lucide-react';
import Link from 'next/link';
import AppLink from '@/components/AppLink';
import { APP_PATHS, PROD_DOMAIN } from '@/lib/hosts';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const supportEmail = `support@${PROD_DOMAIN}`;
  const partnerEmail = `partner@${PROD_DOMAIN}`;

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
                플랫폼 관리자 · 요양병원 · 쇼핑몰 · 간병인 · 환자·보호자, 5개 도메인을 하나의 디지털 생태계로
                통합한 종합 간병 서비스 플랫폼입니다.
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
                <li><AppLink to={APP_PATHS.patientMobile} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">환자·보호자 앱</AppLink></li>
                <li><AppLink to={APP_PATHS.caregiverMobile} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">간병인 앱</AppLink></li>
                <li><AppLink to={APP_PATHS.hospital} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">요양병원 포털</AppLink></li>
                <li><AppLink to={APP_PATHS.shop} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">케어 쇼핑몰</AppLink></li>
                <li><AppLink to={APP_PATHS.login} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">로그인</AppLink></li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">법적고지 · 지원</h4>
              <ul className="space-y-2.5">
                <li><Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">이용약관</Link></li>
                <li><Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">개인정보처리방침</Link></li>
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
          <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-1 text-xs text-gray-600">
            <span>서비스명: AI CareLink</span>
            <span>운영: WDLAB</span>
            <span>www.{PROD_DOMAIN} · app.{PROD_DOMAIN}</span>
          </div>
          <p className="text-xs text-gray-600">
            © {currentYear} AI CareLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
