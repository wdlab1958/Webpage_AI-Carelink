'use client';

import { useState, useEffect } from 'react';
import { Brain, Menu, X, Smartphone, LogIn, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLink from '@/components/AppLink';
import { APP_PATHS } from '@/lib/hosts';

const navLinks = [
  { href: '/service-intro', label: '서비스 소개' },
  { href: '/pilot-2026', label: '요양급여 · 시범사업', highlight: true },
  { href: '/ai-matching', label: 'AI 매칭' },
  { href: '/community', label: '커뮤니티' },
];

const appShortcuts = [
  { to: APP_PATHS.patientMobile, label: '환자·보호자 앱', color: 'text-rose-400' },
  { to: APP_PATHS.caregiverMobile, label: '간병인 앱', color: 'text-emerald-400' },
  { to: APP_PATHS.hospital, label: '요양병원 포털', color: 'text-blue-400' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/10 shadow-lg backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <div className="container flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="AI CareLink 홈">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <Brain className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">AI CareLink</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-white bg-white/10'
                    : link.highlight
                      ? 'text-teal-300 hover:text-white hover:bg-white/5'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="w-px h-5 bg-white/10 mx-2" />

            <div className="flex items-center gap-2">
              <AppLink
                to={APP_PATHS.login}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <LogIn size={15} /> 로그인
              </AppLink>
              <AppLink
                to={APP_PATHS.root}
                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full transition-all inline-flex items-center gap-1.5"
              >
                앱 열기 <ExternalLink size={14} />
              </AppLink>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />

          <div className="absolute top-0 right-0 w-72 h-full glass border-l border-white/10 shadow-2xl p-6 pt-24 flex flex-col gap-2 overflow-y-auto">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.href) ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <hr className="border-white/10 my-3" />

            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone size={12} /> 바로가기 (app.ai-carelink.co.kr)
            </p>
            {appShortcuts.map(s => (
              <AppLink
                key={s.to}
                to={s.to}
                className={`px-4 py-3 rounded-xl text-base font-medium ${s.color} hover:bg-white/5 transition-colors`}
              >
                {s.label}
              </AppLink>
            ))}

            <hr className="border-white/10 my-3" />

            <AppLink
              to={APP_PATHS.login}
              className="px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              로그인
            </AppLink>
            <AppLink
              to={APP_PATHS.root}
              className="px-4 py-3 rounded-xl text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center transition-all"
            >
              앱 열기
            </AppLink>
          </div>
        </div>
      )}
    </>
  );
}
