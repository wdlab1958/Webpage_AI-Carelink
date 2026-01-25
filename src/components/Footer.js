import { Brain } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Brain className="text-purple-500 w-6 h-6" />
              <span className="text-xl font-bold">AI CareLink</span>
            </Link>
            <p className="text-gray-500 text-sm">
              우리는 기술을 통해 돌봄의 공백을 메우고, <br />
              세상의 모든 고령층이 존엄한 삶을 누릴 수 있도록 돕습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h4 className="font-bold mb-6">서비스</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><Link href="/service-intro" className="hover:text-gray-300 transition-colors">서비스 소개</Link></li>
                <li><Link href="/ai-matching" className="hover:text-gray-300 transition-colors">AI 매칭</Link></li>
                <li><Link href="/community" className="hover:text-gray-300 transition-colors">커뮤니티</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">회사</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><Link href="/service-intro" className="hover:text-gray-300 transition-colors">소개</Link></li>
                <li><Link href="/ai-ethics" className="hover:text-gray-300 transition-colors">AI 윤리</Link></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">채용</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">고객지원</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-gray-300 transition-colors">도움말</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">문의하기</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">법적고지</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><Link href="/terms" className="hover:text-gray-300 transition-colors">이용약관</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-300 transition-colors">개인정보처리방침</Link></li>
                <li><Link href="/ai-ethics" className="hover:text-gray-300 transition-colors">AI 투명성 정책</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span>상호명: AI CareLink</span>
              <span>대표: OOO</span>
              <span>사업자등록번호: 000-00-00000</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <span>이메일: support@ai-carelink.kr</span>
              <span>전화: 02-XXXX-XXXX</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-400 text-xs">
          © 2026 AI CareLink Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
