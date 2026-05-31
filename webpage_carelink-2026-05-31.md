# webpage_carelink 엔지니어링 감사 보고서

- 일자: 2026-05-31
- 대상: `/home/ubuntu-02/ai_project/webpage_carelink`
- 수신: Brian

## 개요 (범위 + 한계)

본 보고서는 단일 웹 프로젝트 `webpage_carelink`에 대한 읽기 전용 정적 검사와 시간 제한 빌드/린트 실행 결과를 기록한다.

확인된 스택 (확인):
- 프레임워크: Next.js 16.1.1 (App Router, Turbopack)
- 런타임 라이브러리: React 19.2.3, framer-motion, lucide-react, clsx, tailwind-merge
- 언어: JavaScript (`.js` 전용, TypeScript 파일 및 `tsconfig.json` 없음)
- 스타일: 자체 작성 `src/app/globals.css`(943행)에 유틸리티 클래스를 수작업 정의. Tailwind 패키지/설정은 미설치(아래 문제점 참조)
- 엔트리포인트: `src/app/layout.js`(루트 레이아웃), `src/app/page.js`(메인), 그 외 9개 라우트 페이지
- 빌드 환경: Node v22.22.2, npm 10.9.7 (확인)
- CI: `.github/workflows/deploy.yml` — main 푸시 시 `npm ci && npm run build` 후 `out` 디렉터리를 GitHub Pages 아티팩트로 업로드 (Node 20 지정)

한계:
- 테스트 프레임워크가 프로젝트에 존재하지 않으므로(아래 참조) 기능 테스트는 수행하지 못했다.
- 지시에 따라 `data/`, `.git/` 작업 트리 변경은 하지 않았고, 장시간 서버 구동(`next dev`/`next start`)은 수행하지 않았다. 따라서 런타임 페이지 렌더링 및 외부 리다이렉트 동작은 정적 코드 기준 추정이다.
- 브랜드 치환('WDLAB@2023-2026'/'WDLAB@2023-2026' → 'WDLAB@2023-2026') 관련: src/public 및 git 추적 파일 전체에서 'WDLAB@2023-2026', 'WDLAB@2023-2026', 'WDLAB' 문자열을 검색한 결과 **어느 것도 발견되지 않았다(확인)**. 즉 본 프로젝트 소스에는 해당 브랜드 흔적도 치환 마커도 없으며, 치환으로 인한 레이아웃/문구 손상도 발견되지 않았다(확인). 치환 작업이 본 프로젝트 소스에는 적용 대상이 없었던 것으로 추정한다.

## 실행 · 테스트 결과

| 항목 | 명령 | 결과 | 비고 |
|------|------|------|------|
| 프로덕션 빌드 | `npm run build` (timeout 600) | **성공, exit 0** (확인) | 13개 라우트 전부 정적 프리렌더(○ Static). 약 2.9s 컴파일. 빌드 중 `next/font/google`(Noto Sans KR) 네트워크 페치 성공 |
| 린트(초기) | `npm run lint` (timeout 300) | **실패, exit 1, 18 errors** (확인) | 전부 `react/no-unescaped-entities` (4개 파일) |
| 린트(조치 후) | `npm run lint` | **성공, exit 0** (확인) | 아래 조치 참조 |
| 빌드(조치 후) | `npm run build` | **성공, exit 0** (확인) | 조치가 빌드를 깨뜨리지 않음 확인 |
| 타입체크 | `tsc --noEmit` | **해당 없음(N/A)** (확인) | JS 전용 프로젝트, TS 파일·tsconfig 부재 |
| 단위 테스트 | — | **존재하지 않음** (확인) | 테스트 스크립트·테스트 파일·테스트 러너 의존성 없음 |

런 가능성 종합: 개발/프로덕션 빌드는 **현재 환경에서 실행 가능(확인)**. 단, 배포 파이프라인(CI)은 아래 사유로 정상 동작하지 않을 것으로 판단(추정 강함).

## 발견된 문제점 (확인 vs 추정, 심각도)

### 1. CI 배포와 빌드 산출물 불일치 — 심각도: 높음 (확인)
`next.config.mjs`의 작업 트리 현재 상태에는 `output: 'export'`가 **제거**되어 있다. git 비교(`git diff HEAD`) 결과 직전 커밋(5c019ff)에 있던 다음 두 줄이 커밋되지 않은 채 삭제된 상태다(확인):
```
-  output: 'export',
-  basePath: '/Webpage_AI-Carelink',
```
결과적으로 `npm run build`는 `.next/`(서버 빌드)만 생성하고 `out/`(정적 export)는 **생성하지 않는다**(확인: 빌드 후 `out/index.html` mtime이 2026-02-18로 변동 없음). 그러나 CI(`deploy.yml`)는 여전히 `path: out`을 업로드한다. 따라서 깨끗한 체크아웃에서 CI는 `out`이 없어 실패하거나(추정), 리포에 잔존하는 구버전 `out/`을 올리게 된다. 즉 현재 코드와 배포 산출물이 어긋난다.

### 2. basePath 제거에 따른 배포 경로 전환 미완료 — 심각도: 중간 (확인)
직전 커밋은 GitHub Pages 프로젝트 하위 경로(`/Webpage_AI-Carelink`)용으로 `basePath`와 이미지 경로 접두사를 추가했으나, 작업 트리에서 `basePath`와 이미지 경로 접두사(`/Webpage_AI-Carelink/images/...` → `/images/...`)가 모두 되돌려졌다(확인). 이는 루트 도메인(예: `ai-carelink.kr`) 서빙으로의 전환을 의미하나, CI는 여전히 GitHub Pages를 대상으로 한다. 소스 내 `Webpage_AI-Carelink` 잔존 참조는 없고 7개 이미지 파일 모두 `public/images/`에 존재함은 확인했다. 배포 타깃 일관성 결여가 핵심 문제다.

### 3. 외부 앱 리다이렉트가 평문 HTTP + 하드코딩 IP — 심각도: 중간 (확인)
`src/lib/constants.js`:
```
export const AI_CARELINK_SERVER_URL = 'http://54.252.51.208:3000';
```
이 값이 `Navbar.js`, `page.js`의 로그인/시작 버튼 `window.location.href`에 사용된다(확인). HTTPS 사이트에서 평문 HTTP로 이동 시 혼합 콘텐츠/신뢰 경고 우려, 고정 IP·비표준 포트는 가용성·이전성 리스크(추정). 기능 자체는 정적 코드상 정상.

### 4. 린트 오류 18건 (`react/no-unescaped-entities`) — 심각도: 낮음 (확인, 조치 완료)
`src/app/page.js`, `src/app/privacy/page.js`, `src/app/service-intro/page.js`, `src/components/DailyReportPreview.js`의 JSX 텍스트 내 미이스케이프 `'`/`"`. 빌드는 막지 않으나 `npm run lint`(따라서 별도 린트 게이트가 있다면 CI도) 실패. `eslint --fix`로는 해결 불가(해당 룰에 자동 수정기 없음 — 확인).

### 5. README 기술 스택 표기 부정확 — 심각도: 낮음 (확인)
README가 "스타일링: Tailwind CSS"로 명시하나 `package.json`/`node_modules`에 `tailwindcss` 없음, `tailwind.config.*`·`postcss.config.*` 없음, CSS에 `@tailwind`/`@apply` 없음(확인). 실제로는 `globals.css`에 동등 유틸리티 클래스를 수작업 정의하여 동작하므로 빌드/렌더에는 영향 없으나 문서가 사실과 다르다.

### 6. 대용량 산출물·로그가 리포에 잔존 — 심각도: 낮음 (확인)
`deploy.zip`(238MB), `source_code.zip`(244MB), 다수 `*.log`, 문서 파일이 작업 트리에 untracked로 존재. 저장소 위생 문제(추정 영향: 클론 용량·실수 커밋 가능성).

### 7. dev 서버 cross-origin 경고 — 심각도: 정보성 (확인, 로그 기준)
`dev.log`/`server.log`에 `Cross origin request detected ... configure allowedDevOrigins` 경고. 향후 Next 메이저에서 명시 설정 필요. 빌드/프로덕션에는 무관.

## 조치한 내용

저위험·검증 가능한 항목만 적용했다.

1. **린트 오류 18건 수정 (문제점 4)** — 4개 파일의 JSX 텍스트 내 `'`/`"`를 의미를 보존하는 HTML 엔티티(`&lsquo;`/`&rsquo;`/`&ldquo;`/`&rdquo;`)로 치환. 변경 위치:
   - `src/app/page.js` L124
   - `src/app/privacy/page.js` L309
   - `src/app/service-intro/page.js` L55, L103, L130, L169
   - `src/components/DailyReportPreview.js` L24
   - 검증: `npm run lint` → **exit 0, 0 errors** (확인), `npm run build` → **exit 0** (확인). 렌더 텍스트 의미는 동일(따옴표 글리프 유지).

그 외 항목은 배포 정책 판단이 필요하거나(1, 2, 3) 문서/위생 사안(5, 6, 7)으로, 임의 변경 대신 권고만 한다.

## 미해결 · 위험 항목

- **(1) CI/빌드 산출물 불일치 [높음]**: 권고 — 배포 타깃을 확정할 것. (a) GitHub Pages 정적 호스팅 유지 시 `next.config.mjs`에 `output: 'export'` 복구 후 CI 산출물 일치 여부 재확인, (b) 루트 도메인/동적 서버 호스팅 전환 시 `deploy.yml`을 해당 호스팅에 맞게 교체. 현 상태로 main 푸시 시 배포 실패 또는 구버전 배포 가능성 높음. 정책 결정이 필요하여 본 감사에서는 변경하지 않음.
- **(2) basePath 전환 미완료 [중간]**: (1)과 연동. 루트 도메인 서빙이 의도라면 CI를 그에 맞춰야 함. 현재 소스/설정은 루트 서빙에 일관됨(확인).
- **(3) 평문 HTTP + 고정 IP 리다이렉트 [중간]**: 권고 — HTTPS 도메인 기반 URL로 교체. 외부 백엔드 구성/가용성 확인 불가하여 추정 영역이며 임의 변경 미수행.
- **(5) README 스택 표기 [낮음]**: 권고 — "Tailwind CSS" 표기 정정 또는 실제 Tailwind 도입. 코드 동작에는 영향 없어 문서 변경은 보류.
- **(6) 대용량 zip/로그 잔존 [낮음]**: 권고 — `.gitignore` 반영 및 제거 검토. 데이터/이력 영향 우려로 미삭제.

## 종합 판단

- 애플리케이션 코드 자체는 **빌드 가능하고 정적 프리렌더가 정상 동작한다(확인)**. 13개 라우트 모두 빌드 통과.
- 가장 큰 리스크는 코드가 아니라 **배포 파이프라인 불일치(문제점 1·2)** 다. 현재 `next.config.mjs` 작업 트리 상태(미커밋)와 CI(`deploy.yml`)가 서로 다른 배포 모델을 전제하여, 그대로 배포 시 실패 또는 구버전 배포가 예상된다(확인 근거 기반의 강한 추정). 배포 타깃 확정이 선행되어야 한다.
- 본 감사에서 적용·검증한 조치는 린트 오류 18건 수정 1건이며, 린트·빌드 재실행으로 회귀 없음을 확인했다.
- 브랜드 치환 손상: 발견되지 않음(확인). 본 프로젝트 소스에는 치환 대상 문자열이 애초에 부재.
