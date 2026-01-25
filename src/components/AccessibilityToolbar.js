'use client';

import { useState, useEffect } from 'react';
import { Type, Eye } from 'lucide-react';

export default function AccessibilityToolbar() {
    const [fontSize, setFontSize] = useState(1); // 1 = normal, 1.2 = large, 1.4 = xlarge
    const [highContrast, setHighContrast] = useState(false);

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize * 100}%`;
        if (highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }, [fontSize, highContrast]);

    return (
        <div className="fixed bottom-8 left-8 z-[100] flex gap-3">
            <div className="glass p-2 flex gap-2 border border-white/20 shadow-2xl">
                <button
                    onClick={() => setFontSize(prev => prev >= 1.4 ? 1 : prev + 0.2)}
                    className="p-3 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2"
                    title="글자 크기 조절"
                >
                    <Type size={20} />
                    <span className="text-sm font-bold">{fontSize === 1 ? '보통' : fontSize === 1.2 ? '크게' : '가장 크게'}</span>
                </button>

                <div className="w-px h-8 bg-white/10 self-center" />

                <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`p-3 rounded-xl transition-colors flex items-center gap-2 ${highContrast ? 'bg-quantum text-black' : 'hover:bg-white/10'}`}
                    title="고대비 모드"
                >
                    <Eye size={20} />
                    <span className="text-sm font-bold">고대비</span>
                </button>
            </div>

            <style jsx global>{`
        .high-contrast {
          --background: 240 10% 0%;
          --foreground: 0 0% 100%;
          --nebula-purple: 270 100% 60%;
          --quantum-green: 120 100% 50%;
          --cosmic-blue: 210 100% 60%;
        }
        .high-contrast .glass, 
        .high-contrast .glass-card {
          background: #000;
          border: 2px solid #fff;
          backdrop-filter: none;
        }
        .high-contrast p, 
        .high-contrast span {
          color: #fff !important;
          font-weight: 500;
        }
      `}</style>
        </div>
    );
}
