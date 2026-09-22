/** @type {import('next').NextConfig} */

// 운영(가비아) 배포는 정적 export(out/) → Caddy file_server 가 www.ai-carelink.co.kr 로 서빙.
//   npm run build:static   (STATIC_EXPORT=1)
// 개발(next dev)·일반 build 는 서버 모드.
const isStaticExport = process.env.STATIC_EXPORT === '1';

// GitHub Pages(임시 미리보기) 배포: https://wdlab1958.github.io/Webpage_AI-Carelink/
//   GITHUB_PAGES=1 → 하위 경로(basePath) 로 빌드. 운영(www.ai-carelink.co.kr)은 루트 경로라 미설정.
const isGithubPages = process.env.GITHUB_PAGES === '1';
const GH_BASE_PATH = '/Webpage_AI-Carelink';

import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  images: { unoptimized: true },

  // 워크스페이스 루트를 본 프로젝트로 고정 — 상위(~/ai_project) 락파일 때문에 Turbopack 이
  // 형제 프로젝트 디렉터리까지 스캔하다 권한 오류(EACCES)를 내는 것을 방지
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,

  // 정적 export 시 /pilot-2026/ → out/pilot-2026/index.html 로 생성되어 file_server 가 그대로 서빙
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),
  ...(isGithubPages ? { basePath: GH_BASE_PATH, assetPrefix: GH_BASE_PATH } : {}),

  // LAN(집 192.168.45.206 / 회사 10.10.10.64)에서 dev 서버 접속 시 Next 16 cross-origin 허용
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '192.168.45.206',
    '10.10.10.64',
    '*.ai-carelink.co.kr',
  ],

  // 정적 export 에서는 headers() 가 적용되지 않으므로(nginx 가 담당) 서버 모드에서만 정의
  ...(isStaticExport
    ? {}
    : {
        async headers() {
          return [{ source: '/:path*', headers: [{ key: 'X-DNS-Prefetch-Control', value: 'on' }] }];
        },
      }),
};

export default nextConfig;
