# AI CareLink - AI 기반 노인 돌봄 매칭 플랫폼

> 최종 수정일: 2026년 1월 10일

## 프로젝트 소개

AI CareLink는 AI 기반 노인 돌봄 매칭 플랫폼입니다. 환자/보호자, 간병인, 병원 관리자, 쇼핑몰, 플랫폼 관리자 5개 이해관계자를 연결합니다.

- 웹사이트: [ai-carelink.kr](https://ai-carelink.kr)
- 2026년 하반기 정부 시범사업 200개 병원 타겟

## 기술 스택

- **프레임워크**: Next.js 16.1.1
- **라이브러리**: React 19.2.3
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React

## 주요 기능

- 반응형 디자인 (모바일/태블릿/데스크톱)
- 애니메이션 및 글래스모피즘 UI
- 접근성 도구 (글꼴 크기, 고대비 모드)
- 쿠키 동의 시스템

## 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 메인 랜딩 페이지 |
| `/service-intro` | 서비스 소개 |
| `/ai-matching` | AI 매칭 설명 |
| `/community` | 커뮤니티 |
| `/login` | 로그인 |
| `/signup` | 회원가입 |
| `/mypage` | 마이페이지 |
| `/terms` | 이용약관 |
| `/privacy` | 개인정보처리방침 |
| `/ai-ethics` | AI 윤리 및 투명성 |

## 시작하기

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 빌드

```bash
npm run build
npm run start
```

## 법적 컴플라이언스

- 인공지능 기본법 (2026.1.22 시행) 준수
- 개인정보보호법 준수
- KWCAG 2.2 웹 접근성 표준 준수

## 참고 문서

- `Carelink 2026.txt` - 프로젝트 개선 계획서
- `update_carelink_소비자보호.txt` - 홈페이지 업데이트 보고서

---

© 2026 AI CareLink. All rights reserved.
