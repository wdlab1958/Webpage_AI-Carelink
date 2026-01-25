'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // 필수 - 항상 true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // 쿠키 동의 여부 확인
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // 약간의 딜레이 후 표시
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const consentData = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      >
        <div className="container max-w-4xl mx-auto">
          <div className="glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Cookie className="text-purple-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">쿠키 사용 동의</h3>
                    <p className="text-gray-400 text-sm">AI CareLink는 더 나은 서비스를 위해 쿠키를 사용합니다</p>
                  </div>
                </div>
                <button
                  onClick={handleRejectAll}
                  className="text-gray-500 hover:text-white transition-colors p-1"
                  aria-label="닫기"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                본 웹사이트는 서비스 제공, 이용자 경험 개선, 통계 분석을 위해 쿠키를 사용합니다.
                필수 쿠키는 서비스 운영에 반드시 필요하며, 선택 쿠키는 동의 여부를 선택할 수 있습니다.
                자세한 내용은 <Link href="/privacy" className="text-purple-400 hover:underline">개인정보처리방침</Link>을 확인해 주세요.
              </p>
            </div>

            {/* Expandable Settings */}
            <div className="px-6">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-2"
              >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                쿠키 설정 상세보기
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 py-4 border-t border-white/10">
                      {/* Essential Cookies */}
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">필수 쿠키</span>
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">필수</span>
                          </div>
                          <p className="text-gray-400 text-xs mt-1">
                            로그인, 보안 등 서비스 제공에 필수적인 쿠키입니다. 비활성화할 수 없습니다.
                          </p>
                        </div>
                        <div className="ml-4">
                          <div className="w-12 h-6 bg-purple-500 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">분석 쿠키</span>
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">선택</span>
                          </div>
                          <p className="text-gray-400 text-xs mt-1">
                            서비스 이용 통계 및 개선을 위한 분석 쿠키입니다.
                          </p>
                        </div>
                        <button
                          onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                          className="ml-4"
                        >
                          <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                            preferences.analytics ? 'bg-purple-500 justify-end' : 'bg-gray-600 justify-start'
                          }`}>
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        </button>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">마케팅 쿠키</span>
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">선택</span>
                          </div>
                          <p className="text-gray-400 text-xs mt-1">
                            맞춤형 광고 및 마케팅을 위한 쿠키입니다.
                          </p>
                        </div>
                        <button
                          onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                          className="ml-4"
                        >
                          <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                            preferences.marketing ? 'bg-purple-500 justify-end' : 'bg-gray-600 justify-start'
                          }`}>
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="p-6 pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRejectAll}
                className="flex-1 px-6 py-3 border border-white/20 rounded-xl font-medium text-gray-300 hover:bg-white/5 transition-colors"
              >
                필수만 허용
              </button>
              {isExpanded && (
                <button
                  onClick={handleAcceptSelected}
                  className="flex-1 px-6 py-3 border border-purple-500/50 rounded-xl font-medium text-purple-300 hover:bg-purple-500/10 transition-colors"
                >
                  선택 항목 저장
                </button>
              )}
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-white transition-colors"
              >
                모두 허용
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
