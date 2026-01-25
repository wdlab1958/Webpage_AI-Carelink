'use client';

import { motion } from 'framer-motion';
import {
    BarChart3,
    Users2,
    Clock3,
    AlertCircle,
    TrendingUp,
    ArrowUpRight
} from 'lucide-react';

export default function DashboardPreview() {
    return (
        <div className="glass-card rounded-3xl border border-white/10 overflow-hidden w-full max-w-5xl mx-auto shadow-2xl">
            {/* Dashboard Header */}
            <div className="bg-white/5 px-8 py-4 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-cosmic-blue/20 flex items-center justify-center">
                        <BarChart3 size={18} className="text-cosmic-blue" />
                    </div>
                    <span className="font-bold">통합 관제 대시보드 (기관용)</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-quantum animate-pulse" />
                    <span className="text-xs text-quantum font-medium">실시간 연동 중</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatItem title="전체 환자" value="128" icon={<Users2 />} change="+5" />
                <StatItem title="현재 근무 중" value="42" icon={<Clock3 />} />
                <StatItem title="긴급 호출" value="1" icon={<AlertCircle />} color="text-rose-500" />
                <StatItem title="병상 가동률" value="94%" icon={<TrendingUp />} change="+2%" />
            </div>

            {/* Main Content Area */}
            <div className="px-8 pb-8 flex flex-col md:flex-row gap-6">
                <div className="flex-[2] glass p-6 border-white/5">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold">주간 케어 트렌드</h4>
                        <div className="text-xs text-gray-400">최근 7일 데이터</div>
                    </div>
                    <div className="h-48 flex items-end justify-between gap-2">
                        {[40, 65, 45, 90, 70, 85, 95].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                className="flex-1 bg-gradient-to-t from-cosmic-blue/40 to-nebula-purple/40 rounded-t-lg relative group"
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-2 py-1 rounded text-[10px] font-bold">
                                    {h}%
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 glass p-6 border-white/5">
                    <h4 className="font-bold mb-6">신규 매칭 알림</h4>
                    <div className="space-y-4">
                        <NotificationItem name="김*수 환자" service="재활 보조" time="방금 전" />
                        <NotificationItem name="박*자 환자" service="치매 케어" time="12분 전" />
                        <NotificationItem name="최*호 환자" service="욕창 관리" time="45분 전" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatItem({ title, value, icon, change, color = "text-white" }) {
    return (
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-lg text-gray-400">{icon}</div>
                {change && (
                    <div className="flex items-center text-[10px] font-bold text-quantum bg-quantum/10 px-2 py-0.5 rounded-full">
                        <ArrowUpRight size={10} /> {change}
                    </div>
                )}
            </div>
            <div className="text-sm text-gray-500 mb-1">{title}</div>
            <div className={`text-2xl font-black ${color}`}>{value}</div>
        </div>
    );
}

function NotificationItem({ name, service, time }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="w-2 h-2 rounded-full bg-nebula-purple" />
            <div className="flex-1">
                <div className="text-xs font-bold">{name} - {service}</div>
                <div className="text-[10px] text-gray-500">{time}</div>
            </div>
        </div>
    );
}
