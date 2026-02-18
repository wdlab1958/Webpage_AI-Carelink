'use client';

import { motion } from 'framer-motion';
import { Brain, Heart, Shield, Activity, Users, Clock, ArrowRight, AlertTriangle, FileCheck, Wallet, ShoppingBag, TrendingUp, CheckCircle } from 'lucide-react';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ServiceIntro() {
    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Navbar />

            {/* Background Ambience */}
            <div className="fixed top-[-20%] right-[-10%] w-[60%] h-[60%] bg-nebula blur-[150px] opacity-10 rounded-full z-[-1]" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-quantum blur-[150px] opacity-10 rounded-full z-[-1]" />

            <main className="pt-32">
                {/* Hero Section */}
                <section className="container mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-block px-4 py-2 rounded-full glass border border-white/10 mb-6 text-sm font-medium text-quantum animate-pulse">
                            Technology with Heart
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                            기술이 사람을 이해할 때, <br />
                            <span className="text-gradient-purple">진정한 돌봄이 시작됩니다</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            AI CareLink는 단순한 매칭 플랫폼이 아닙니다. <br className="hidden md:block" />
                            환자의 마음까지 읽어내는 감성 지능 AI로, 가족보다 더 가까운 케어를 약속합니다.
                        </p>
                    </motion.div>
                </section>

                {/* Philosophy Grid */}
                <section className="container mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass p-12 rounded-[40px] border border-white/10 h-full flex flex-col justify-center"
                        >
                            <Heart className="w-12 h-12 text-rose-400 mb-6" />
                            <h2 className="text-3xl font-bold mb-6">우리가 집중하는 가치</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                병원 밖에서도 안전하고 존엄한 삶을 영위하는 것. <br />
                                그것이 AI CareLink가 존재하는 이유입니다.
                                우리는 차가운 데이터 너머에 있는 '사람'을 봅니다.
                            </p>
                            <ul className="space-y-4">
                                {["정서적 유대감 형성", "빈틈없는 안전망", "개인화된 존중"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-rose-400" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid gap-6"
                        >
                            <div className="glass p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-all">
                                <Brain className="w-8 h-8 text-purple-400 mb-4" />
                                <h3 className="text-xl font-bold mb-2">공감하는 AI</h3>
                                <p className="text-gray-500">환자의 표정과 음성을 분석하여 통증과 감정 상태를 파악합니다.</p>
                            </div>
                            <div className="glass p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-all">
                                <Shield className="w-8 h-8 text-blue-400 mb-4" />
                                <h3 className="text-xl font-bold mb-2">예측하는 보호</h3>
                                <p className="text-gray-500">낙상 위험과 건강 이상 징후를 사전에 감지하고 예방합니다.</p>
                            </div>
                        </motion.div>
                        {/* Image Showcase 1 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="overflow-hidden rounded-[40px] border border-white/10"
                        >
                            <div className="relative w-full" style={{ height: '400px' }}>
                                <Image
                                    src="/Webpage_AI-Carelink/images/korean_caregiver_comfort.png"
                                    alt="Comforting senior care"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 100vw"
                                    priority
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                    <p className="text-white font-bold text-xl">"따뜻한 손길이 최고의 치유입니다"</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Detailed Services */}
                <section className="container mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">서비스 상세 안내</h2>
                        <p className="text-gray-400">환자와 보호자에게 꼭 필요한 핵심 기능</p>
                    </div>

                    <div className="space-y-32">
                        {/* Service 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="flex-1 order-2 md:order-1">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                                    <Users className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-3xl font-bold mb-6">성향까지 맞춘 <br /><span className="text-purple-400">지능형 매칭</span></h3>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    단순히 경력과 자격증만 보지 않습니다. 환자의 성격, 생활 패턴, 선호하는 대화 스타일까지 분석하여
                                    마음이 맞는 최적의 간병인을 연결해 드립니다.
                                </p>
                                <div className="p-6 glass rounded-2xl border border-white/5 bg-purple-900/10">
                                    <p className="text-purple-200 italic">"어머님이 낯가림이 심하신데, 조용하고 차분한 선생님을 만나서 정말 편안해하세요."</p>
                                    <p className="text-right text-sm text-purple-400 mt-2">- 김** 보호자님 후기</p>
                                </div>
                            </div>
                            <div className="flex-1 order-1 md:order-2">
                                <div className="aspect-square rounded-[40px] glass border border-white/10 relative overflow-hidden group">
                                    <Image
                                        src="/Webpage_AI-Carelink/images/korean_senior_rehab_walk.png"
                                        alt="Rehabilitation assistance"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* Service 2 */}
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="flex-1">
                                <div className="aspect-square rounded-[40px] glass border border-white/10 relative overflow-hidden group">
                                    <Image
                                        src="/Webpage_AI-Carelink/images/korean_senior_tablet_care.png"
                                        alt="Smart tech care"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                                    <Activity className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-3xl font-bold mb-6">안심을 전하는 <br /><span className="text-green-400">스마트 리포트</span></h3>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    "오늘 밥은 잘 드셨나?", "잠은 잘 주무셨나?" 걱정하지 마세요.
                                    식사량, 수면 패턴, 그날의 기분까지 AI가 꼼꼼히 기록하여 매일 저녁 따뜻한 알림톡으로 보내드립니다.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-gray-300">
                                        <Clock className="w-5 h-5 text-green-400" /> 실시간 바이탈 체크
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-300">
                                        <Brain className="w-5 h-5 text-green-400" /> 인지 능력 변화 추적
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 glass border-t border-white/5 mt-20">
                    <div className="container text-center">
                        <h2 className="text-4xl font-bold mb-8">이제 가족의 마음으로 케어하세요</h2>
                        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
                            첫 상담은 100% 무료입니다. AI CareLink가 제안하는 새로운 돌봄 경험을 직접 확인해보세요.
                        </p>
                        <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 mx-auto">
                            지금 바로 상담 신청하기 <ArrowRight />
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
