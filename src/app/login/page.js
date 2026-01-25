'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    }
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // 로그인 처리 (목업)
    setTimeout(() => {
      alert('로그인 기능은 현재 목업 상태입니다.');
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} 로그인은 현재 목업 상태입니다.`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background - simplified for performance */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 z-[-1]" />

      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="text-white w-7 h-7" />
              </div>
              <span className="text-2xl font-bold">AI CareLink</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">로그인</h1>
            <p className="text-gray-400">AI CareLink에 오신 것을 환영합니다</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl border border-white/10 p-8"
          >
            {/* 소셜 로그인 */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin('카카오')}
                className="w-full py-3.5 bg-[#FEE500] hover:bg-[#FDD800] text-[#3C1E1E] rounded-xl font-bold transition-colors flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.58 2 11c0 2.88 1.87 5.41 4.68 6.85l-1.19 4.42c-.11.4.35.72.7.49l5.27-3.49c.17.01.35.03.54.03 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                </svg>
                카카오로 시작하기
              </button>

              <button
                onClick={() => handleSocialLogin('네이버')}
                className="w-full py-3.5 bg-[#03C75A] hover:bg-[#02B350] text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.273 12.845L7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z"/>
                </svg>
                네이버로 시작하기
              </button>

              <button
                onClick={() => handleSocialLogin('Google')}
                className="w-full py-3.5 bg-white hover:bg-gray-100 text-gray-700 rounded-xl font-bold transition-colors flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google로 시작하기
              </button>
            </div>

            {/* 구분선 */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-sm">또는</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* 이메일 로그인 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">이메일</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                {errors.email && (
                  <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">비밀번호</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="비밀번호를 입력해주세요"
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.password}
                  </p>
                )}
              </div>

              {/* 로그인 유지 & 비밀번호 찾기 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded accent-purple-500"
                  />
                  <span className="text-sm text-gray-400">로그인 상태 유지</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-purple-400 hover:underline">
                  비밀번호 찾기
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 rounded-xl font-bold text-white transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  '로그인'
                )}
              </button>
            </form>
          </motion.div>

          {/* 회원가입 링크 */}
          <p className="text-center text-gray-400 text-sm mt-6">
            아직 계정이 없으신가요?{' '}
            <Link href="/signup" className="text-purple-400 hover:underline font-medium">
              회원가입
            </Link>
          </p>

          {/* 추가 링크 */}
          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
            <Link href="/terms" className="hover:text-gray-300">이용약관</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-gray-300">개인정보처리방침</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
