'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  ChevronRight,
  ChevronLeft,
  Heart,
  Smartphone,
  Building2,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  Check,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    birthDate: '',
    gender: '',
    // 동의 항목
    agreeTerms: false,
    agreePrivacy: false,
    agreeSensitive: false,
    agreeMarketing: false,
  });
  const [errors, setErrors] = useState({});

  const userTypes = [
    {
      id: 'guardian',
      icon: <Heart className="w-8 h-8" />,
      title: '환자 / 보호자',
      desc: '간병 서비스를 찾고 계신 분',
      color: 'rose',
    },
    {
      id: 'caregiver',
      icon: <Smartphone className="w-8 h-8" />,
      title: '전문 간병인',
      desc: '간병 서비스를 제공하시는 분',
      color: 'green',
    },
    {
      id: 'hospital',
      icon: <Building2 className="w-8 h-8" />,
      title: '병원 / 요양기관',
      desc: '기관 관리자로 가입하시는 분',
      color: 'blue',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // 입력 시 해당 필드 에러 제거
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAllAgree = (e) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      agreeTerms: checked,
      agreePrivacy: checked,
      agreeSensitive: checked,
      agreeMarketing: checked,
    }));
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.phone) {
      newErrors.phone = '휴대폰 번호를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '이용약관에 동의해주세요.';
    }
    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = '개인정보처리방침에 동의해주세요.';
    }
    if (!formData.agreeSensitive) {
      newErrors.agreeSensitive = '민감정보(건강정보) 수집에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && userType) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep3()) {
      // 가입 처리 (목업)
      alert('회원가입이 완료되었습니다! (목업)');
    }
  };

  const isAllAgreed = formData.agreeTerms && formData.agreePrivacy && formData.agreeSensitive && formData.agreeMarketing;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background - simplified for performance */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 z-[-1]" />

      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="text-white w-7 h-7" />
              </div>
              <span className="text-2xl font-bold">AI CareLink</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">회원가입</h1>
            <p className="text-gray-400">AI CareLink와 함께 시작하세요</p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  step >= s
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-500'
                }`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-0.5 ${step > s ? 'bg-purple-600' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-3xl border border-white/10 p-8"
          >
            {/* Step 1: 회원 유형 선택 */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-2">회원 유형 선택</h2>
                <p className="text-gray-400 text-sm mb-6">가입하실 회원 유형을 선택해주세요</p>

                <div className="space-y-4">
                  {userTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setUserType(type.id)}
                      className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center gap-4 ${
                        userType === type.id
                          ? `border-${type.color}-500 bg-${type.color}-500/10`
                          : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl bg-${type.color}-500/10 flex items-center justify-center ${
                        userType === type.id ? `text-${type.color}-400` : 'text-gray-400'
                      }`}>
                        {type.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{type.title}</h3>
                        <p className="text-gray-400 text-sm">{type.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        userType === type.id
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-600'
                      }`}>
                        {userType === type.id && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!userType}
                  className="w-full mt-6 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl font-bold text-white transition-colors flex items-center justify-center gap-2"
                >
                  다음 <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Step 2: 기본 정보 입력 */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-2">기본 정보</h2>
                <p className="text-gray-400 text-sm mb-6">회원 정보를 입력해주세요</p>

                <form className="space-y-4">
                  {/* 이메일 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">이메일 <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder:text-gray-500"
                      />
                    </div>
                    {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* 비밀번호 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">비밀번호 <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="8자 이상 입력해주세요"
                        className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder:text-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
                  </div>

                  {/* 비밀번호 확인 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">비밀번호 확인 <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="비밀번호를 다시 입력해주세요"
                        className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder:text-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-rose-400 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>

                  {/* 이름 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">이름 <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="실명을 입력해주세요"
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder:text-gray-500"
                      />
                    </div>
                    {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* 휴대폰 번호 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">휴대폰 번호 <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="01012345678"
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder:text-gray-500"
                      />
                    </div>
                    {errors.phone && <p className="text-rose-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* 생년월일 & 성별 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">생년월일</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">성별</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white"
                      >
                        <option value="" className="bg-gray-900 text-gray-400">선택</option>
                        <option value="male" className="bg-gray-900 text-white">남성</option>
                        <option value="female" className="bg-gray-900 text-white">여성</option>
                      </select>
                    </div>
                  </div>
                </form>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border border-white/20 rounded-xl font-medium text-gray-300 hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={20} /> 이전
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-white transition-colors flex items-center justify-center gap-2"
                  >
                    다음 <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: 약관 동의 */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-2">약관 동의</h2>
                <p className="text-gray-400 text-sm mb-6">서비스 이용을 위한 약관에 동의해주세요</p>

                <form onSubmit={handleSubmit}>
                  {/* 전체 동의 */}
                  <label className="flex items-center gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAllAgreed}
                      onChange={handleAllAgree}
                      className="w-5 h-5 rounded accent-purple-500"
                    />
                    <span className="font-bold">전체 동의하기</span>
                  </label>

                  <div className="space-y-3">
                    {/* 이용약관 */}
                    <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded accent-purple-500"
                        />
                        <span className="text-sm">
                          <span className="text-rose-400">[필수]</span> 이용약관 동의
                        </span>
                      </div>
                      <Link href="/terms" target="_blank" className="text-gray-400 text-xs hover:text-purple-400">
                        보기
                      </Link>
                    </label>
                    {errors.agreeTerms && (
                      <p className="text-rose-400 text-xs flex items-center gap-1 ml-2">
                        <AlertCircle size={12} /> {errors.agreeTerms}
                      </p>
                    )}

                    {/* 개인정보처리방침 */}
                    <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="agreePrivacy"
                          checked={formData.agreePrivacy}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded accent-purple-500"
                        />
                        <span className="text-sm">
                          <span className="text-rose-400">[필수]</span> 개인정보처리방침 동의
                        </span>
                      </div>
                      <Link href="/privacy" target="_blank" className="text-gray-400 text-xs hover:text-purple-400">
                        보기
                      </Link>
                    </label>
                    {errors.agreePrivacy && (
                      <p className="text-rose-400 text-xs flex items-center gap-1 ml-2">
                        <AlertCircle size={12} /> {errors.agreePrivacy}
                      </p>
                    )}

                    {/* 민감정보 수집 동의 */}
                    <label className="flex items-center justify-between p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="agreeSensitive"
                          checked={formData.agreeSensitive}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded accent-purple-500"
                        />
                        <div>
                          <span className="text-sm">
                            <span className="text-rose-400">[필수]</span> 민감정보(건강정보) 수집 동의
                          </span>
                          <p className="text-gray-500 text-xs mt-1">
                            간병 서비스 제공을 위해 건강정보를 수집합니다
                          </p>
                        </div>
                      </div>
                      <Link href="/privacy#privacy-section-2" target="_blank" className="text-gray-400 text-xs hover:text-purple-400">
                        보기
                      </Link>
                    </label>
                    {errors.agreeSensitive && (
                      <p className="text-rose-400 text-xs flex items-center gap-1 ml-2">
                        <AlertCircle size={12} /> {errors.agreeSensitive}
                      </p>
                    )}

                    {/* 마케팅 동의 */}
                    <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="agreeMarketing"
                          checked={formData.agreeMarketing}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded accent-purple-500"
                        />
                        <span className="text-sm">
                          <span className="text-gray-400">[선택]</span> 마케팅 정보 수신 동의
                        </span>
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 py-4 border border-white/20 rounded-xl font-medium text-gray-300 hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <ChevronLeft size={20} /> 이전
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-white transition-colors"
                    >
                      가입하기
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>

          {/* Login Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-purple-400 hover:underline font-medium">
              로그인
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
