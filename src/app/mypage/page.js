'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Settings,
  Shield,
  Bell,
  FileText,
  LogOut,
  ChevronRight,
  Edit3,
  Check,
  X,
  AlertTriangle,
  Download,
  Trash2,
  History
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // 목업 사용자 데이터
  const [userData, setUserData] = useState({
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    birthDate: '1970-05-15',
    gender: '남성',
    userType: '보호자',
    joinDate: '2025-12-20',
  });

  // 목업 동의 내역
  const [consents, setConsents] = useState({
    terms: { agreed: true, date: '2025-12-20' },
    privacy: { agreed: true, date: '2025-12-20' },
    sensitive: { agreed: true, date: '2025-12-20' },
    marketing: { agreed: false, date: null },
  });

  // 목업 서비스 이용 내역
  const serviceHistory = [
    { id: 1, type: '매칭 요청', status: '완료', date: '2025-12-28', caregiver: '김지영' },
    { id: 2, type: 'AI 리포트', status: '조회', date: '2025-12-27', caregiver: '김지영' },
    { id: 3, type: '매칭 요청', status: '취소', date: '2025-12-15', caregiver: '-' },
  ];

  const tabs = [
    { id: 'profile', icon: <User size={20} />, label: '내 정보' },
    { id: 'consent', icon: <Shield size={20} />, label: '동의 관리' },
    { id: 'history', icon: <History size={20} />, label: '이용 내역' },
    { id: 'settings', icon: <Settings size={20} />, label: '설정' },
  ];

  const handleConsentToggle = (key) => {
    if (key === 'terms' || key === 'privacy' || key === 'sensitive') {
      alert('필수 동의 항목은 철회할 수 없습니다. 동의를 철회하려면 회원 탈퇴를 진행해주세요.');
      return;
    }
    setConsents(prev => ({
      ...prev,
      [key]: {
        agreed: !prev[key].agreed,
        date: !prev[key].agreed ? new Date().toISOString().split('T')[0] : null
      }
    }));
  };

  const handleDataExport = () => {
    alert('개인정보 전송 요청이 접수되었습니다. 3영업일 이내에 이메일로 전송됩니다.');
  };

  const handleWithdraw = () => {
    if (confirm('정말로 회원 탈퇴하시겠습니까? 모든 데이터가 삭제되며 복구할 수 없습니다.')) {
      alert('회원 탈퇴가 완료되었습니다. (목업)');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background - simplified for performance */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 z-[-1]" />

      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">마이페이지</h1>
            <p className="text-gray-400">회원 정보 및 서비스 설정을 관리합니다</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:w-64 flex-shrink-0"
            >
              <div className="glass rounded-2xl border border-white/10 p-4">
                {/* User Info */}
                <div className="p-4 text-center border-b border-white/10 mb-4">
                  <div className="w-20 h-20 rounded-full bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center mx-auto mb-3">
                    <User className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="font-bold text-lg">{userData.name}</h3>
                  <p className="text-gray-400 text-sm">{userData.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                    {userData.userType}
                  </span>
                </div>

                {/* Tabs */}
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                        activeTab === tab.id
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Logout */}
                <button className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-gray-400 hover:text-rose-400 transition-colors">
                  <LogOut size={20} />
                  <span>로그아웃</span>
                </button>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="glass rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">내 정보</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                    >
                      {isEditing ? (
                        <>
                          <X size={16} /> 취소
                        </>
                      ) : (
                        <>
                          <Edit3 size={16} /> 수정
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">이름</label>
                        <input
                          type="text"
                          value={userData.name}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">이메일</label>
                        <input
                          type="email"
                          value={userData.email}
                          disabled
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">휴대폰 번호</label>
                        <input
                          type="tel"
                          value={userData.phone}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">생년월일</label>
                        <input
                          type="date"
                          value={userData.birthDate}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">성별</label>
                        <input
                          type="text"
                          value={userData.gender}
                          disabled
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">가입일</label>
                        <input
                          type="text"
                          value={userData.joinDate}
                          disabled
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl opacity-50"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition-colors mt-4">
                        저장하기
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Consent Management Tab */}
              {activeTab === 'consent' && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl border border-white/10 p-6">
                    <h2 className="text-xl font-bold mb-6">동의 내역 관리</h2>

                    <div className="space-y-4">
                      {/* 이용약관 */}
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">이용약관</span>
                            <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 text-xs rounded">필수</span>
                          </div>
                          <p className="text-gray-500 text-xs mt-1">
                            동의일: {consents.terms.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link href="/terms" className="text-purple-400 text-sm hover:underline">
                            보기
                          </Link>
                          <div className="w-12 h-6 bg-purple-500 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>

                      {/* 개인정보처리방침 */}
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">개인정보처리방침</span>
                            <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 text-xs rounded">필수</span>
                          </div>
                          <p className="text-gray-500 text-xs mt-1">
                            동의일: {consents.privacy.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link href="/privacy" className="text-purple-400 text-sm hover:underline">
                            보기
                          </Link>
                          <div className="w-12 h-6 bg-purple-500 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>

                      {/* 민감정보 수집 */}
                      <div className="flex items-center justify-between p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">민감정보(건강정보) 수집</span>
                            <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 text-xs rounded">필수</span>
                          </div>
                          <p className="text-gray-500 text-xs mt-1">
                            동의일: {consents.sensitive.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link href="/privacy#privacy-section-2" className="text-purple-400 text-sm hover:underline">
                            보기
                          </Link>
                          <div className="w-12 h-6 bg-purple-500 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>

                      {/* 마케팅 동의 */}
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">마케팅 정보 수신</span>
                            <span className="px-2 py-0.5 bg-gray-500/20 text-gray-300 text-xs rounded">선택</span>
                          </div>
                          <p className="text-gray-500 text-xs mt-1">
                            {consents.marketing.agreed
                              ? `동의일: ${consents.marketing.date}`
                              : '미동의'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleConsentToggle('marketing')}
                          className="ml-4"
                        >
                          <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                            consents.marketing.agreed ? 'bg-purple-500 justify-end' : 'bg-gray-600 justify-start'
                          }`}>
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 개인정보 전송 요구 */}
                  <div className="glass rounded-2xl border border-white/10 p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Download size={20} className="text-blue-400" />
                      개인정보 전송 요구권
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      개인정보보호법에 따라 본인의 개인정보를 전송받을 수 있습니다.
                      요청 시 3영업일 이내에 등록된 이메일로 전송됩니다.
                    </p>
                    <button
                      onClick={handleDataExport}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-colors"
                    >
                      내 정보 내려받기
                    </button>
                  </div>
                </div>
              )}

              {/* Service History Tab */}
              {activeTab === 'history' && (
                <div className="glass rounded-2xl border border-white/10 p-6">
                  <h2 className="text-xl font-bold mb-6">서비스 이용 내역</h2>

                  <div className="space-y-3">
                    {serviceHistory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            item.status === '완료' ? 'bg-green-500/20 text-green-400' :
                            item.status === '취소' ? 'bg-rose-500/20 text-rose-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {item.status === '완료' ? <Check size={20} /> :
                             item.status === '취소' ? <X size={20} /> :
                             <FileText size={20} />}
                          </div>
                          <div>
                            <p className="font-medium">{item.type}</p>
                            <p className="text-gray-500 text-sm">
                              {item.date} {item.caregiver !== '-' && `• 간병인: ${item.caregiver}`}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === '완료' ? 'bg-green-500/20 text-green-300' :
                          item.status === '취소' ? 'bg-rose-500/20 text-rose-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {serviceHistory.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>이용 내역이 없습니다</p>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  {/* 알림 설정 */}
                  <div className="glass rounded-2xl border border-white/10 p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Bell size={20} className="text-purple-400" />
                      알림 설정
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <p className="font-medium">이메일 알림</p>
                          <p className="text-gray-500 text-xs">매칭 결과, 리포트 등</p>
                        </div>
                        <div className="w-12 h-6 bg-purple-500 rounded-full flex items-center justify-end px-1">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <p className="font-medium">SMS 알림</p>
                          <p className="text-gray-500 text-xs">긴급 알림만</p>
                        </div>
                        <div className="w-12 h-6 bg-purple-500 rounded-full flex items-center justify-end px-1">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <p className="font-medium">카카오톡 알림</p>
                          <p className="text-gray-500 text-xs">알림톡 수신</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-600 rounded-full flex items-center justify-start px-1">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 비밀번호 변경 */}
                  <div className="glass rounded-2xl border border-white/10 p-6">
                    <h3 className="font-bold mb-4">비밀번호 변경</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      정기적인 비밀번호 변경으로 계정을 안전하게 보호하세요.
                    </p>
                    <button className="px-6 py-3 border border-white/20 hover:bg-white/5 rounded-xl font-medium transition-colors">
                      비밀번호 변경
                    </button>
                  </div>

                  {/* 회원 탈퇴 */}
                  <div className="glass rounded-2xl border border-rose-500/30 p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-rose-400">
                      <AlertTriangle size={20} />
                      회원 탈퇴
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      회원 탈퇴 시 모든 데이터가 삭제되며, 복구할 수 없습니다.
                      동의 철회를 원하시는 경우 먼저 동의 관리 탭에서 선택 동의 항목을 해제해주세요.
                    </p>
                    <button
                      onClick={handleWithdraw}
                      className="px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl font-medium transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      회원 탈퇴
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
