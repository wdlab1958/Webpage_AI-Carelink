'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Building2, ShoppingBag, Activity, FileText, CheckCircle, Smartphone, Settings, Monitor } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AiMatching() {
    const [activeWorkflowTab, setActiveWorkflowTab] = useState('patient');

    // Simplified Workflow Data
    const PATIENT_STEPS = [
        { id: 1, title: "간편 신청", desc: "앱에서 원하는 시간과 장소만 입력하세요.", icon: Smartphone, color: "bg-rose-500" },
        { id: 2, title: "AI 매칭", desc: "나에게 딱 맞는 검증된 간병인을 찾습니다.", icon: Brain, color: "bg-purple-500" },
        { id: 3, title: "안심 케어", desc: "실시간 리포트를 받으며 마음 편히 요양하세요.", icon: Heart, color: "bg-rose-400" },
    ];

    const CAREGIVER_STEPS = [
        { id: 1, title: "프로필 등록", desc: "경력과 근무 가능 지역을 설정합니다.", icon: FileText, color: "bg-green-500" },
        { id: 2, title: "매칭 수락", desc: "조건에 맞는 일감을 추천받고 선택합니다.", icon: CheckCircle, color: "bg-blue-500" },
        { id: 3, title: "자동 정산", desc: "근무가 끝나면 다음 날 바로 입금됩니다.", icon: ShoppingBag, color: "bg-amber-500" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Navbar />

            {/* Ambient Background */}
            <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900 blur-[150px] opacity-20 rounded-full z-[-1]" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900 blur-[150px] opacity-20 rounded-full z-[-1]" />

            <main className="pt-32 pb-20">
                {/* Hero */}
                <section className="container text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            하나의 플랫폼, <br />
                            <span className="text-gradient-purple">다섯 개의 전문화된 경험</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            AI CareLink는 단순한 기능의 합이 아닌, <br className="hidden md:block" />
                            모든 참여자가 유기적으로 연결되어 더 큰 가치를 만들어내는 살아있는 생태계입니다.
                        </p>
                    </motion.div>
                </section>

                {/* Ecosystem Diagram */}
                <section className="container mb-32">
                    <div className="relative h-[700px] w-full glass rounded-[40px] border border-white/5 flex items-center justify-center overflow-hidden">
                        {/* Central AI Hub */}
                        <div className="absolute z-20 flex flex-col items-center">
                            <motion.div
                                animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(168, 85, 247, 0.4)", "0 0 40px rgba(168, 85, 247, 0.6)", "0 0 20px rgba(168, 85, 247, 0.4)"] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-40 h-40 rounded-full bg-[#1e293b] border-4 border-slate-600 flex flex-col items-center justify-center relative z-20 shadow-2xl"
                            >
                                <Brain className="w-12 h-12 text-white mb-2" />
                                <span className="text-white font-bold text-lg">AI CareLink</span>
                                <span className="text-purple-300 font-bold text-sm">지능형 코어</span>
                            </motion.div>
                            <p className="mt-4 text-sm font-medium text-gray-400">AI Matching, 정산, 데이터</p>
                        </div>

                        {/* Nodes - Left (Caregiver, Patient) */}
                        <Node position="left-top" icon={Smartphone} label="간병인" delay={0.2} color="slate" />
                        <Node position="left-bottom" icon={Heart} label="환자/보호자" delay={0} color="slate" />

                        {/* Nodes - Right (Platform, Hospital, Mall) */}
                        <Node position="right-top" icon={Settings} label="플랫폼 관리자" delay={0.6} color="slate" />
                        <Node position="right-middle" icon={Building2} label="병원 관리자" delay={0.4} color="slate" />
                        <Node position="right-bottom" icon={ShoppingBag} label="쇼핑몰 관리자" delay={0.8} color="slate" />

                        {/* Connection Lines & Particles */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                            {/* Left Connections */}
                            <Connection start={{ x: '25%', y: '30%' }} end={{ x: '50%', y: '50%' }} color="#94a3b8" delay={0} />
                            <Connection start={{ x: '25%', y: '70%' }} end={{ x: '50%', y: '50%' }} color="#94a3b8" delay={1} />

                            {/* Right Connections */}
                            <Connection start={{ x: '75%', y: '20%' }} end={{ x: '50%', y: '50%' }} color="#94a3b8" delay={2} />
                            <Connection start={{ x: '75%', y: '50%' }} end={{ x: '50%', y: '50%' }} color="#94a3b8" delay={1.5} />
                            <Connection start={{ x: '75%', y: '80%' }} end={{ x: '50%', y: '50%' }} color="#94a3b8" delay={3} />
                        </svg>
                    </div>
                </section>


                {/* Stakeholder Benefits Grid - Kept for extra value content */}
                <section className="container">
                    <div className="text-center mb-16">
                        <span className="text-blue-400 font-bold tracking-wider text-sm">BENEFITS</span>
                        <h2 className="text-4xl font-bold mt-2">모두를 위한 가치</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <BenefitCard
                            title="환자 & 보호자"
                            items={[
                                "검증된 간병인 매칭 성공률 98%",
                                "실시간 스마트 리포트로 안심 케어",
                                "AI가 알아서 챙겨주는 맞춤형 용구 추천"
                            ]}
                            icon={Heart}
                            color="rose"
                        />
                        <BenefitCard
                            title="간병인"
                            items={[
                                "성향이 맞는 환자 매칭으로 업무 피로도 감소",
                                "AI 음성인식 자동 리포팅으로 업무 간소화",
                                "체계적인 평점 관리로 소득 증대 기회"
                            ]}
                            icon={Smartphone}
                            color="green"
                        />
                        <BenefitCard
                            title="요양/병의원"
                            items={[
                                "퇴원 환자 연계 관리 시스템 자동화",
                                "재입원율 예측 및 선제적 대응 가능",
                                "보호자 컴플레인 70% 감소 솔루션"
                            ]}
                            icon={Building2}
                            color="blue"
                        />
                        <BenefitCard
                            title="쇼핑몰 & 제휴사"
                            items={[
                                "환자 상태 기반 타겟 마케팅 적중률 상승",
                                "재구매 시점 자동 알림으로 매출 증대",
                                "반품률 0%에 도전하는 정확한 제품 추천"
                            ]}
                            icon={ShoppingBag}
                            color="amber"
                        />
                    </div>
                </section>

                {/* Synergy Cycle - Integrated Workflow */}
                <section className="container py-24 border-t border-white/5">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">시너지의 완성: 하나의 통합된 케어 사이클</h2>
                        <p className="text-xl text-gray-400">
                            단순한 기능의 합이 아닌, 모든 참여자가 유기적으로 연결되어 <br className="hidden md:block" />
                            더 큰 가치를 만들어내는 살아있는 생태계입니다.
                        </p>
                    </div>

                    {/* Workflow Tabs */}
                    <div className="flex justify-center gap-4 mb-16">
                        {[
                            { id: 'patient', label: '환자/보호자 모드' },
                            { id: 'caregiver', label: '간병인 모드' },
                            { id: 'system', label: '전체 시스템 보기' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveWorkflowTab(tab.id)}
                                className={`px-6 py-3 rounded-full font-bold transition-all border ${activeWorkflowTab === tab.id
                                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                    : 'glass text-gray-400 border-white/5 hover:bg-white/5'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Conditional Rendering based on Tab */}
                    {activeWorkflowTab === 'system' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-in fade-in zoom-in duration-500">
                            {/* Left: Interactive Diagram (Unified System) */}
                            <div className="relative aspect-square max-w-lg mx-auto w-full glass rounded-[3rem] border border-white/10 p-8 flex items-center justify-center bg-[#0f172a]/50">
                                <SystemDiagram />
                            </div>

                            {/* Right: Steps List */}
                            <div className="space-y-6">
                                {[
                                    { id: 1, role: "[환자/보호자]", text: "대시보드에서 특정 시간(서비스 슬롯)에 간병 매칭을 요청합니다.", color: "bg-rose-500" },
                                    { id: 2, role: "[AI 코어]", text: "요청을 분석하여 최적의 [간병인]에게 알림을 전송합니다.", color: "bg-amber-500" },
                                    { id: 3, role: "[간병인]", text: "요청을 수락하고, 서비스 시작 시 [병원 관리자]는 케어 현황을 모니터링합니다.", color: "bg-green-500" },
                                    { id: 4, role: "[AI 코어]", text: "서비스 완료 후, 자동으로 정산 및 분석 리포트를 생성합니다.", color: "bg-blue-500" },
                                    { id: 5, role: "[플랫폼 관리자]", text: "이 모든 과정의 데이터와 흐름을 실시간으로 감독합니다.", color: "bg-purple-500" }
                                ].map((step) => (
                                    <div key={step.id} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                                        <div className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center font-bold text-white shrink-0 mt-1 shadow-lg`}>
                                            {step.id}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-200 mb-1 group-hover:text-white transition-colors">
                                                {step.role}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                {step.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Simplified View for Patient/Caregiver
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {(activeWorkflowTab === 'patient' ? PATIENT_STEPS : CAREGIVER_STEPS).map((step, index) => (
                                <div key={step.id} className="relative group text-center">
                                    {/* Connection Line (Desktop only) */}
                                    {index < 2 && (
                                        <div className="hidden md:block absolute top-[2.5rem] left-[50%] w-full h-1 bg-white/10 z-0">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '100%' }}
                                                transition={{ duration: 1, delay: 0.5 * index }}
                                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                            />
                                        </div>
                                    )}

                                    <div className={`relative z-10 w-20 h-20 mx-auto rounded-2xl ${step.color} flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <step.icon className="w-10 h-10 text-white" />
                                    </div>

                                    <div className="p-6 glass rounded-3xl border border-white/10 hover:bg-white/5 transition-colors">
                                        <div className="text-sm font-bold text-purple-400 mb-2">STEP 0{step.id}</div>
                                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}

// Sub-components

function Node({ position, icon: Icon, label, delay, color }) {
    const positions = {
        'left-top': 'top-[30%] left-[10%] md:left-[20%]',
        'left-bottom': 'bottom-[30%] left-[10%] md:left-[20%]',
        'right-top': 'top-[20%] right-[10%] md:right-[20%]',
        'right-middle': 'top-[50%] right-[10%] md:right-[20%] -translate-y-1/2',
        'right-bottom': 'bottom-[20%] right-[10%] md:right-[20%]',
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            className={`absolute ${positions[position]} flex flex-col items-center z-20`}
        >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 border-slate-600 bg-slate-800 text-slate-200 shadow-xl`}>
                <Icon className="w-8 h-8" />
            </div>
            <div className="mt-3 font-bold text-base text-gray-200">
                {label}
            </div>
        </motion.div>
    );
}

function Connection({ start, end, color, delay }) {
    if (!start || !end || !start.x || !start.y || !end.x || !end.y) return null;

    return (
        <>
            <line
                x1={start.x} y1={start.y}
                x2={end.x} y2={end.y}
                stroke="#334155"
                strokeWidth="2"
            />
            <motion.circle
                r="3"
                fill={color}
                animate={{
                    cx: [start.x, end.x],
                    cy: [start.y, end.y],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeInOut"
                }}
            />
        </>
    );
}


function BenefitCard({ title, items, icon: Icon, color }) {
    const colors = {
        rose: 'text-rose-400',
        green: 'text-green-400',
        blue: 'text-blue-400',
        amber: 'text-amber-400',
    };

    return (
        <div className="p-10 glass rounded-[32px] border border-white/5 flex flex-col md:flex-row gap-8 items-start hover:border-white/10 transition-colors">
            <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 ${colors[color]}`}>
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-6">{title}</h3>
                <ul className="space-y-4">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-current ${colors[color]}`} />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// New Unified System Diagram Component
function SystemDiagram() {
    // 0~100 coordinate system
    const COORDS = {
        center: { x: 50, y: 50 },
        patient: { x: 20, y: 20 },
        caregiver: { x: 80, y: 20 },
        hospital: { x: 20, y: 80 },
        platform: { x: 80, y: 80 },
        mall: { x: 50, y: 85 }
    };

    return (
        <div className="w-full h-full relative">
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6" fill="#64748b" />
                    </marker>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.5" />
                    </linearGradient>
                </defs>

                {/* Connections with Flow Animation */}
                {/* 1. Patient -> Center */}
                <FlowLine start={COORDS.patient} end={COORDS.center} />

                {/* 2. Center -> Caregiver */}
                <FlowLine start={COORDS.center} end={COORDS.caregiver} delay={0.5} />

                {/* 3. Caregiver -> Hospital */}
                <path d={`M${COORDS.caregiver.x},${COORDS.caregiver.y + 5} Q80,50 ${COORDS.hospital.x + 5},${COORDS.hospital.y}`}
                    fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" strokeDasharray="2,2" />

                {/* 4. Center -> Platform */}
                <FlowLine start={COORDS.center} end={COORDS.platform} />

                {/* 5. Mall connection */}
                <line x1={COORDS.center.x} y1={COORDS.center.y} x2={COORDS.mall.x} y2={COORDS.mall.y} stroke="#334155" strokeWidth="0.5" opacity="0.5" />

            </svg>

            {/* Nodes (Positioned via CSS using same COORDS) */}
            <Node2 pos={COORDS.center} icon={Brain} label="AI 코어" sub="중앙 제어" size="large" color="purple" />
            <Node2 pos={COORDS.patient} icon={Heart} label="환자/보호자" sub="매칭 요청" color="rose" />
            <Node2 pos={COORDS.caregiver} icon={Smartphone} label="간병인" sub="수락 및 케어" color="amber" />
            <Node2 pos={COORDS.hospital} icon={Building2} label="병원 관리자" sub="모니터링" color="blue" />
            <Node2 pos={COORDS.platform} icon={Monitor} label="플랫폼 Admin" sub="전체 관리" color="slate" />
            <Node2 pos={COORDS.mall} icon={ShoppingBag} label="제휴 쇼핑몰" sub="용품 추천" color="emerald" size="small" />
        </div>
    );
}

function FlowLine({ start, end, delay = 0 }) {
    return (
        <>
            <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#334155" strokeWidth="0.5" />
            <motion.circle r="1" fill="#a855f7"
                animate={{ cx: [start.x, end.x], cy: [start.y, end.y], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay, ease: "linear" }}
            />
        </>
    );
}

function Node2({ pos, icon: Icon, label, sub, size = "normal", color }) {
    const sizeClasses = {
        large: "w-24 h-24 text-2xl",
        normal: "w-16 h-16 text-lg",
        small: "w-12 h-12 text-sm"
    };

    const colors = {
        purple: "bg-slate-800 border-purple-500 text-purple-400",
        rose: "bg-slate-900 border-rose-500/50 text-rose-400",
        amber: "bg-slate-900 border-amber-500/50 text-amber-400",
        blue: "bg-slate-900 border-blue-500/50 text-blue-400",
        slate: "bg-slate-900 border-slate-500/50 text-slate-400",
        emerald: "bg-slate-900 border-emerald-500/50 text-emerald-400"
    };

    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 text-center w-32"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        >
            <div className={`${sizeClasses[size].split(' ')[0]} ${sizeClasses[size].split(' ')[1]} rounded-full flex items-center justify-center border-2 shadow-lg mb-2 ${colors[color]}`}>
                <Icon className="w-1/2 h-1/2" />
            </div>
            <div className="leading-tight">
                <div className="font-bold text-gray-200 text-sm">{label}</div>
                {sub && <div className="text-[10px] text-gray-500">{sub}</div>}
            </div>
        </div>
    );
}
