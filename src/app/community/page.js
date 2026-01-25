'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, User, Star, Heart, Building2, ShoppingBag, Smartphone, Search, ThumbsUp, MessageSquare, X, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock Data Categories
const CATEGORIES = [
    { id: 'all', label: '전체', icon: null },
    { id: 'patient', label: '환자/보호자', icon: Heart },
    { id: 'caregiver', label: '간병인', icon: Smartphone },
    { id: 'hospital', label: '요양/병원', icon: Building2 },
    { id: 'mall', label: '스토어', icon: ShoppingBag },
];

const FEATURED_CONTENT = {
    all: [
        { title: "함께 만드는 돌봄 문화", desc: "AI CareLink는 서로 존중하고 배려하는 따뜻한 커뮤니티를 지향합니다.", icon: Star, color: "text-yellow-400" },
        { title: "이달의 베스트 후기", desc: "11월 베스트 간병 스토리: '어머니의 웃음을 되찾아주셔서 감사합니다'", icon: ThumbsUp, color: "text-blue-400" },
    ],
    patient: [
        { title: "안심 케어 가이드", desc: "좋은 간병인을 만나는 법부터 국가지원금 신청까지, 보호자를 위한 필수 정보입니다.", icon: Heart, color: "text-rose-400" },
        { title: "보호자 마음 치유", desc: "간병으로 지친 마음, 여기서 함께 나누고 위로 받으세요.", icon: MessageCircle, color: "text-rose-300" },
    ],
    caregiver: [
        { title: "간병 노하우 공유", desc: "경력 10년 차 선배가 알려주는 욕창 관리 비법 대공개!", icon: Smartphone, color: "text-green-400" },
        { title: "권익 보호 센터", desc: "부당한 대우를 받으셨나요? AI CareLink가 든든한 울타리가 되어드립니다.", icon: Star, color: "text-green-300" },
    ],
    hospital: [
        { title: "구인 효율화 팁", desc: "AI 매칭 시스템을 활용해 급한 공석을 30분 만에 채우는 방법.", icon: Building2, color: "text-blue-400" },
        { title: "스마트 병동 관리", desc: "IoT 센서와 연동된 AI 리포트로 야간 순찰 업무를 50% 줄여보세요.", icon: ActivityIcon, color: "text-blue-300" },
    ],
    mall: [
        { title: "입점 성공 사례", desc: "맞춤형 추천 알고리즘 덕분에 매출이 200% 상승한 사장님의 이야기.", icon: ShoppingBag, color: "text-amber-400" },
        { title: "신제품 체험단", desc: "우리 제품을 가장 필요로 하는 환자분들에게 직접 피드백을 받아보세요.", icon: Star, color: "text-amber-300" },
    ],
};

const POSTS = [
    // Patient/Guardian Posts (10+)
    { id: 101, category: 'patient', title: "어머니가 처음으로 간병인 선생님께 노래를 불러드렸어요 ^^", author: "효녀심청", likes: 124, comments: 45, tag: "감동후기", date: "2026-01-04", content: "치매가 심해지신 이후로 말씀을 거의 안 하시던 어머니께서 오늘 간병인 선생님과 함께 옛날 노래를 부르시는 걸 보고 눈물이 났습니다. AI 매칭으로 어머니 성향과 잘 맞는 분을 만난 덕분인 것 같아요. 정말 감사합니다." },
    { id: 102, category: 'patient', title: "장기요양등급 신청 서류 준비 도와주실 분 계신가요?", author: "초보보호자", likes: 12, comments: 8, tag: "질문", date: "2026-01-04", content: "처음 신청해보는데 서류가 너무 복잡하네요. 의사소견서는 병원에서 알아서 해주는 건가요? 경험 있으신 선배님들의 조언 부탁드립니다!" },
    { id: 103, category: 'patient', title: "간병인 선생님 식사 챙겨드리는 게 맞나요?", author: "궁금해요", likes: 34, comments: 22, tag: "고민상담", date: "2026-01-03", content: "입주 간병은 처음이라 식사를 어떻게 해드려야 할지 모르겠어요. 보통 따로 드시게 하나요 아니면 같이 드시나요?" },
    { id: 104, category: 'patient', title: "AI 리포트 기능 진짜 편하네요 (캡쳐있음)", author: "스마트케어", likes: 89, comments: 14, tag: "사용후기", date: "2026-01-03", content: "회사에서 일하다가도 알림톡으로 부모님 상태를 바로 확인할 수 있어서 너무 안심됩니다. 혈압이랑 식사량 그래프로 보여주는 게 특히 좋네요." },
    { id: 105, category: 'patient', title: "욕창 방지 매트리스 추천 부탁드립니다", author: "건강최고", likes: 23, comments: 19, tag: "쇼핑정보", date: "2026-01-02", content: "병원에서는 에어 매트리스 쓰라는데 종류가 너무 많아서요. 가성비 좋고 소음 적은 제품 있을까요?" },
    { id: 106, category: 'patient', title: "주말에만 오시는 분 구할 수 있을까요?", author: "직장인", likes: 15, comments: 5, tag: "구인", date: "2026-01-02", content: "평일에는 제가 케어 가능한데 주말 이틀만 도와주실 분이 필요합니다. 매칭이 잘 될까요?" },
    { id: 107, category: 'patient', title: "치매 어르신 배회 감지기 써보신 분?", author: "안전제일", likes: 45, comments: 12, tag: "제품문의", date: "2026-01-01", content: "자꾸 현관문을 열고 나가시려고 해서 걱정입니다. 스토어에 있는 배회 감지기 효과가 어떤가요?" },
    { id: 108, category: 'patient', title: "간병비 결제 카드 할부 되나요?", author: "경제적부담", likes: 8, comments: 3, tag: "결제", date: "2026-01-01", content: "장기로 이용하려니 비용이 만만치 않은데 카드 무이자 할부 혜택이 있는지 궁금합니다." },
    { id: 109, category: 'patient', title: "좋은 간병인님 만나서 퇴원합니다!", author: "회복중", likes: 210, comments: 56, tag: "감사", date: "2025-12-31", content: "수술 후 재활이 힘들었는데 선생님 덕분에 예상보다 빨리 퇴원하게 되었어요. 집에서도 계속 부탁드리고 싶네요." },
    { id: 110, category: 'patient', title: "요양병원 vs 요양원 차이가 뭔가요?", author: "선택장애", likes: 28, comments: 10, tag: "정보", date: "2025-12-30", content: "의료 처치가 필요한지 돌봄이 필요한지에 따라 다르다던데 구체적으로 어떤 기준으로 선택해야 할까요?" },

    // Caregiver Posts (10+)
    { id: 201, category: 'caregiver', title: "치매 어르신 식사 거부하실 때 저만의 꿀팁 공유합니다", author: "김프로", likes: 89, comments: 23, tag: "노하우", date: "2026-01-04", content: "억지로 드시게 하면 더 거부하시더라고요. 저는 좋아하는 옛날 노래 틀어놓고 리듬 타면서 한 숟가락씩 권해드리는데, 그러면 기분 좋게 드십니다. 그리고 그릇 색깔을 밝은색으로 바꾸는 것도 도움돼요." },
    { id: 202, category: 'caregiver', title: "오늘 환자분 가족분들께 감사 문자를 받았는데 힘이 나네요", author: "스마일케어", likes: 67, comments: 15, tag: "일상", date: "2026-01-04", content: "힘든 하루였는데 '선생님 덕분에 마음 놓고 일합니다'라는 문자를 받고 피로가 싹 가시네요. 이 맛에 간병하나 봅니다." },
    { id: 203, category: 'caregiver', title: "야간 근무 수당 계산이 안 맞는 것 같아요", author: "밤샘", likes: 12, comments: 8, tag: "노무", date: "2026-01-03", content: "시스템상 자동 정산이라고 들었는데 제가 계산한 거랑 차이가 있네요. 어디서 확인해야 하나요?" },
    { id: 204, category: 'caregiver', title: "남자 환자분 목욕시키기 너무 힘드네요 ㅠㅠ", author: "체력방전", likes: 45, comments: 30, tag: "고충", date: "2026-01-03", content: "체격이 크신 분이라 혼자 하기 버거운데 요령 없을까요? 허리가 너무 아파요." },
    { id: 205, category: 'caregiver', title: "다음 달부터 간병인 배상책임보험 의무화인가요?", author: "보험문의", likes: 33, comments: 11, tag: "정보", date: "2026-01-02", content: "뉴스에서 본 것 같은데 플랫폼에서 자동으로 가입되는 건지 개인이 들어야 하는 건지 궁금합니다." },
    { id: 206, category: 'caregiver', title: "환자분이 저를 도둑으로 의심하세요...", author: "억울해", likes: 56, comments: 25, tag: "고민", date: "2026-01-02", content: "치매 증상인 건 알지만 매번 제 가방 뒤지시고 소지품 검사하시니 너무 스트레스 받네요. 보호자님께 말씀드려야 할까요?" },
    { id: 207, category: 'caregiver', title: "AI 매칭 점수 올리는 방법 있나요?", author: "열정맨", likes: 21, comments: 6, tag: "꿀팁", date: "2026-01-01", content: "매칭이 좀 더 자주 됐으면 좋겠는데 프로필을 어떻게 수정하면 좋을까요? 자격증을 더 따야 할까요?" },
    { id: 208, category: 'caregiver', title: "욕창 드레싱 용품 추천해주세요", author: "약손", likes: 18, comments: 9, tag: "제품", date: "2026-01-01", content: "환자분 피부가 약해서 자극 없는 제품 찾고 있습니다. 폼 드레싱 중에 괜찮은 거 있을까요?" },
    { id: 209, category: 'caregiver', title: "오늘 복지용구 스토어에서 휠체어 샀는데 좋네요", author: "장비빨", likes: 14, comments: 4, tag: "후기", date: "2026-01-01", content: "가볍고 접기도 편해서 차에 싣기 좋습니다. 할인 쿠폰 써서 싸게 샀어요." },
    { id: 210, category: 'caregiver', title: "간병인 협회 교육 다녀왔습니다", author: "배움의길", likes: 29, comments: 7, tag: "교육", date: "2025-12-31", content: "최신 케어 기술 배우고 왔는데 도움 많이 되네요. 시간 되시는 분들 꼭 다녀오세요." },

    // Hospital Posts (10+)
    { id: 301, category: 'hospital', title: "요양병원 평가인증 준비하면서 AI 리포트 덕 많이 봤습니다", author: "행정부장", likes: 56, comments: 12, tag: "정보", date: "2026-01-04", content: "환자 안전 관리 기록이 자동으로 데이터화되니까 서류 준비할 게 확 줄었네요. 평가 위원들도 시스템 체계적이라고 칭찬했습니다." },
    { id: 302, category: 'hospital', title: "간병인 구인난 해결할 방법 없을까요?", author: "인사팀", likes: 34, comments: 18, tag: "고민", date: "2026-01-04", content: "급여를 올려도 사람이 안 구해져서 병동 운영이 힘드네요. 다른 병원들은 어떻게 하고 계신가요?" },
    { id: 303, category: 'hospital', title: "스마트 병실 도입하려는데 비용이 얼마나 들까요?", author: "원장님", likes: 22, comments: 8, tag: "질문", date: "2026-01-03", content: "전 병실에 IoT 센서 설치하고 태블릿 지급하려면 예산이 꽤 들 것 같은데, 투자 대비 효과가 있을지 고민입니다." },
    { id: 304, category: 'hospital', title: "보호자 면회 예약 시스템 오류 있나요?", author: "원무과", likes: 5, comments: 2, tag: "시스템", date: "2026-01-03", content: "오늘 오전 잠깐 접속 안 된다는 민원이 있었는데 지금은 괜찮은가요?" },
    { id: 305, category: 'hospital', title: "우리 병원 식단 자랑합니다 (사진)", author: "영양사", likes: 145, comments: 33, tag: "일상", date: "2026-01-02", content: "어르신들 소화 잘 되시라고 연화식 메뉴 개발했어요. 다들 맛있게 드셔주셔서 뿌듯합니다." },
    { id: 306, category: 'hospital', title: "낙상 사고 예방 교육 자료 공유합니다", author: "안전관리", likes: 78, comments: 25, tag: "자료공유", date: "2026-01-02", content: "직원 교육용으로 만든 PPT인데 필요하신 분들 쓰세요. 파일 첨부했습니다." },
    { id: 307, category: 'hospital', title: "퇴원 환자 연계 서비스 반응이 좋네요", author: "사회복지사", likes: 41, comments: 9, tag: "후기", date: "2026-01-01", content: "집으로 돌아가시는 분들께 AI CareLink매칭해드리니 안심하고 퇴원하십니다. 재입원율도 줄었어요." },
    { id: 308, category: 'hospital', title: "의료 폐기물 처리 업체 추천 부탁드려요", author: "총무", likes: 9, comments: 4, tag: "질문", date: "2026-01-01", content: "기존 업체가 가격을 너무 올려서 바꿔보려 합니다. 성실하고 가격 합리적인 곳 아시나요?" },
    { id: 309, category: 'hospital', title: "병원 홍보 영상 만들었는데 봐주세요", author: "홍보팀", likes: 67, comments: 21, tag: "홍보", date: "2025-12-31", content: "따뜻한 병원 이미지를 강조해봤습니다. 피드백 환영합니다!" },
    { id: 310, category: 'hospital', title: "신규 간호사 채용 공고 올렸습니다", author: "간호부", likes: 23, comments: 5, tag: "구인", date: "2025-12-30", content: "가족 같은 분위기에서 함께 성장하실 선생님 모십니다. 많은 지원 부탁드려요." },

    // Mall/Store Posts (10+)
    { id: 401, category: 'mall', title: "[공동구매] 욕창 방지 매트리스 30% 할인 (선착순 50명)", author: "건강지킴이", likes: 230, comments: 89, tag: "이벤트", date: "2026-01-04", content: "제조사와 직거래로 단가를 확 낮췄습니다. 프리미엄 에어셀 기술이 적용된 모델입니다. 댓글로 신청해주세요!" },
    { id: 402, category: 'mall', title: "성인용 기저귀 샘플 신청하세요", author: "안심케어", likes: 156, comments: 200, tag: "무료나눔", date: "2026-01-04", content: "피부 트러블 걱정되시는 분들을 위해 샘플 팩 무료로 보내드립니다. 배송비만 부담하세요." },
    { id: 403, category: 'mall', title: "입점 3개월 만에 매출 1억 달성 노하우", author: "대박사장", likes: 112, comments: 45, tag: "성공스토리", date: "2026-01-03", content: "AI 추천 광고 덕분에 타겟 고객에게 정확히 노출된 게 컸습니다. 상품 상세페이지 꿀팁도 공유할게요." },
    { id: 404, category: 'mall', title: "휠체어 대여 서비스 시작했습니다", author: "편한발", likes: 45, comments: 12, tag: "신규서비스", date: "2026-01-03", content: "단기간만 필요하신 분들을 위해 렌탈 서비스를 런칭했습니다. 많은 이용 부탁드립니다." },
    { id: 405, category: 'mall', title: "고객님들의 솔직한 리뷰를 기다립니다", author: "정직판매", likes: 23, comments: 8, tag: "이벤트", date: "2026-01-02", content: "포토 리뷰 남겨주시는 모든 분께 포인트 5,000원 적립해드립니다." },
    { id: 406, category: 'mall', title: "지팡이 길이는 어떻게 맞춰야 하나요?", author: "실버용품", likes: 18, comments: 6, tag: "정보", date: "2026-01-02", content: "어르신 키에 딱 맞는 지팡이 길이 조절법, 영상으로 확인하세요." },
    { id: 407, category: 'mall', title: "배송 지연 공지하니다 (폭설 관련)", author: "배송팀", likes: 56, comments: 0, tag: "공지", date: "2026-01-01", content: "강원 산간 지역 폭설로 인해 배송이 1-2일 지연될 수 있습니다. 널리 양해 부탁드립니다." },
    { id: 408, category: 'mall', title: "실버카 신형 모델 입고되었습니다", author: "효도선물", likes: 34, comments: 11, tag: "신상품", date: "2026-01-01", content: "브레이크 기능이 강화되고 디자인이 더 세련되어졌습니다. 부모님 선물로 강력 추천합니다." },
    { id: 409, category: 'mall', title: "반품/교환 규정 안내", author: "고객센터", likes: 12, comments: 0, tag: "공지", date: "2025-12-31", content: "개봉 후에는 반품이 불가하니 신중하게 구매 부탁드립니다. 상세 내용은 공지사항을 확인해주세요." },
    { id: 410, category: 'mall', title: "파트너사 모집합니다 (제조/도매)", author: "MD팀", likes: 45, comments: 15, tag: "제휴", date: "2025-12-30", content: "우수한 품질의 복지용구를 제조하시는 사장님들의 연락을 기다립니다. 입점 수수료 혜택 드려요." },
];

function ActivityIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}

// Post Item Component with hover and click animations
function PostItem({ post, onPostClick }) {
    const categoryColor = post.category === 'patient' ? 'text-rose-400' :
        post.category === 'caregiver' ? 'text-green-400' :
            post.category === 'hospital' ? 'text-blue-400' :
                'text-amber-400';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            <button
                type="button"
                onClick={() => onPostClick(post)}
                className="w-full text-left p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-purple-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-200"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-white/5 border border-white/10 ${categoryColor}`}>
                                {CATEGORIES.find(c => c.id === post.category)?.label}
                            </span>
                            <span className="text-xs text-gray-500">#{post.tag}</span>
                            <span className="text-xs text-gray-600 hidden md:inline-block">| {post.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-100 mb-3">
                            {post.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <User className="w-3 h-3" /> {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" /> {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" /> {post.comments}
                            </span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </button>
        </motion.div>
    );
}

// Post Detail Modal Component
function PostDetailModal({ post, onClose }) {
    if (!post) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-start justify-between bg-white/5">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`text-xs font-bold px-2 py-1 rounded-md bg-black/30 border border-white/10 ${post.category === 'patient' ? 'text-rose-400' :
                                post.category === 'caregiver' ? 'text-green-400' :
                                    post.category === 'hospital' ? 'text-blue-400' :
                                        'text-amber-400'
                                }`}>
                                {CATEGORIES.find(c => c.id === post.category)?.label}
                            </span>
                            <span className="text-xs text-gray-400">#{post.tag}</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {post.date}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold leading-tight">{post.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-300" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-200">{post.author}</p>
                            <p className="text-xs text-gray-500">Member</p>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none mb-8">
                        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                            <ThumbsUp className="w-5 h-5" />
                            <span>좋아요 {post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span>댓글 {post.comments}</span>
                        </button>
                    </div>
                </div>

                {/* Mock Comment Input Area */}
                <div className="p-4 bg-white/5 border-t border-white/5">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="따뜻한 댓글을 남겨주세요..."
                            className="w-full pl-4 pr-12 py-3 rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-purple-500/20 rounded-lg text-purple-400 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Community() {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedPost, setSelectedPost] = useState(null);

    const filteredPosts = activeTab === 'all'
        ? POSTS
        : POSTS.filter(post => post.category === activeTab);

    // Fallback for missing category content
    const activeFeatured = FEATURED_CONTENT[activeTab] || FEATURED_CONTENT['all'];

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Navbar />

            {/* Ambient Background */}
            <div className="fixed top-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-900 blur-[150px] opacity-20 rounded-full z-[-1] pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900 blur-[150px] opacity-20 rounded-full z-[-1] pointer-events-none" />

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="container text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-black mb-6">
                            함께 나누고, <br />
                            <span className="text-gradient-purple">함께 성장합니다</span>
                        </h1>
                        <p className="text-xl text-gray-400">
                            환자, 간병인, 병원, 그리고 스토어까지. <br />
                            서로의 경험을 공유하며 더 나은 돌봄 문화를 만들어가는 공간입니다.
                        </p>
                    </motion.div>
                </section>

                {/* Category Tabs */}
                <section className="container mb-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveTab(cat.id);
                                    // Reset visible items limits if we were paginating, but here we show all filtered
                                }}
                                className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all border ${activeTab === cat.id
                                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                    : 'glass text-gray-400 border-white/5 hover:bg-white/5'
                                    }`}
                            >
                                {cat.icon && <cat.icon className="w-4 h-4" />}
                                <span className="font-bold">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Featured Content Area */}
                <section className="container mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence mode="sync">
                            {activeFeatured.map((item, index) => (
                                <motion.div
                                    key={`${activeTab}-${index}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className="p-8 glass rounded-3xl border border-white/10 flex items-start gap-6 hover:bg-white/5 transition-colors"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${item.color}`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-400">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Discussion Feed */}
                <section className="container max-w-4xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-purple-400" />
                            최신 이야기 ({filteredPosts.length})
                        </h2>
                        <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="관심사 검색"
                                className="pl-10 pr-6 py-2 rounded-full glass border border-white/10 text-sm focus:outline-none focus:border-purple-500 transition-colors w-64"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post) => (
                                <PostItem
                                    key={post.id}
                                    post={post}
                                    onPostClick={setSelectedPost}
                                />
                            ))}
                        </AnimatePresence>

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-20 text-gray-500">
                                등록된 게시글이 없습니다.
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}
