'use client';

import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { useAppHref } from '@/lib/useTargets';

/**
 * 대문(www)의 /login, /signup, /mypage 는 플랫폼(app.ai-carelink.co.kr)으로 넘긴다.
 * 인증·회원 기능은 모두 app 도메인에서 처리한다.
 */
export default function AppRedirect({ to = '/', title = '플랫폼으로 이동합니다', desc }) {
  const href = useAppHref(to);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // 첫 렌더(localhost 기본값)가 아닌, 실제 호스트 기준 href 가 계산된 뒤 이동
    const t = setTimeout(() => window.location.replace(href), 400);
    return () => clearTimeout(t);
  }, [href]);

  return (
    <section className="pt-40 pb-32">
      <div className="container text-center max-w-lg mx-auto">
        <div className="glass p-10 rounded-3xl border border-white/10">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-400 text-sm mb-6">{desc || '로그인 · 회원가입 · 마이페이지는 AI CareLink 앱(app.ai-carelink.co.kr)에서 이용하실 수 있습니다.'}</p>
          <a href={href} className="btn btn-primary">
            바로 이동 <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
