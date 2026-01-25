'use client';

import { useState } from 'react';
import { Brain, Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import { AI_CARELINK_SERVER_URL } from '@/lib/constants';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
                <div className="container flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Brain className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">AI CareLink</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6 font-medium">
                        <Link href="/service-intro" className="text-gray-300 hover:text-white transition-colors">서비스 소개</Link>
                        <Link href="/ai-matching" className="text-gray-300 hover:text-white transition-colors">AI 매칭</Link>
                        <Link href="/community" className="text-gray-300 hover:text-white transition-colors">커뮤니티</Link>
                        <div className="w-px h-6 bg-white/10" />
                        <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                            로그인
                        </Link>
                        <Link
                            href="/signup"
                            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all"
                        >
                            회원가입
                        </Link>
                        <button
                            onClick={() => window.location.href = AI_CARELINK_SERVER_URL}
                            className="px-5 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all"
                        >
                            시작하기
                        </button>
                    </div>

                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="mobile-menu-overlay">
                    <Link href="/service-intro" onClick={() => setIsMenuOpen(false)}>서비스 소개</Link>
                    <Link href="/ai-matching" onClick={() => setIsMenuOpen(false)}>AI 매칭</Link>
                    <Link href="/community" onClick={() => setIsMenuOpen(false)}>커뮤니티</Link>
                    <div className="w-32 h-px bg-white/20 my-4" />
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-300">로그인</Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="text-purple-400">회원가입</Link>
                    <button className="absolute top-6 right-6 p-2" onClick={() => setIsMenuOpen(false)}>
                        <X size={28} />
                    </button>
                </div>
            )}
        </>
    );
}
