'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Calendar, TrendingUp } from 'lucide-react';

export default function DailyReportPreview() {
    return (
        <div className="glass-card p-6 rounded-3xl border border-white/10 max-w-md w-full animate-float">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-purple-400" />
                    <span className="text-sm font-medium text-gray-400">2025년 12월 30일 리포트</span>
                </div>
                <span className="px-3 py-1 bg-quantum/20 text-quantum text-xs rounded-full font-bold">분석 완료</span>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                        <MessageSquare size={20} className="text-blue-400" />
                        AI 케어 요약
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        "어르신의 오늘 컨디션은 전반적으로 <span className="text-quantum font-bold">매우 양호</span>합니다. 오전 10시경 산책 중 평소보다 걸음걸이가 가벼우셨으며, 식사량도 평소의 1.2배로 증가했습니다. 다만, 오후에 약간의 미열(37.2도)이 관찰되었으니 저녁 시간대 모니터링이 필요합니다."
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl">
                        <div className="text-xs text-gray-400 mb-1">평균 혈압</div>
                        <div className="text-xl font-bold font-mono">124/82</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl">
                        <div className="text-xs text-gray-400 mb-1">식사 보조</div>
                        <div className="text-xl font-bold">3회 (완식)</div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2">
                        상세 데이터 확인하기 <TrendingUp size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
