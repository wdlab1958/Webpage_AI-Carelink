'use client';

import { Star, MapPin, ShieldCheck, Award } from 'lucide-react';
import Image from 'next/image';

export default function CaregiverProfileCard({
    name = "김지영",
    experience = "8년",
    rating = 4.9,
    specialties = ["치매 케어", "재활 보조"],
    location = "서울시 서초구",
    matchRate = 98,
    imgSrc = "/Webpage_AI-Carelink/images/caregiver_1.png"
}) {
    return (
        <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all group">
            <div className="relative mb-6">
                <div className="w-full aspect-square relative rounded-2xl overflow-hidden mb-4">
                    <Image
                        src={imgSrc}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        AI 추천 {matchRate}%
                    </div>
                </div>

                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                            {name} 간병사 <ShieldCheck size={16} className="text-blue-400" />
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin size={14} /> {location}
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 font-bold">
                        <Star size={16} fill="currentColor" /> {rating}
                    </div>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                <div className="flex flex-wrap gap-2">
                    {specialties.map((s, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium text-gray-300">
                            {s}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Award size={16} className="text-purple-400" /> 경력 {experience}
                </div>
            </div>

            <button className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-purple-500 hover:text-white transition-all">
                상세 프로필 보기
            </button>
        </div>
    );
}
