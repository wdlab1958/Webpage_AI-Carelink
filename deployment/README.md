# 배포 — www.ai-carelink.co.kr (대문)

기준일 2026-09-23. PatentForge 와 같은 방식: **집/회사 → GitHub push → 가비아 서버에서 pull·빌드**.
(가비아 방화벽이 SSH 를 회사 IP 로만 허용하므로 GitHub Actions 가 서버로 직접 SSH 하는 방식은 쓰지 않는다.)

## 도메인 구성

| 호스트 | 역할 | 서빙 |
|---|---|---|
| `www.ai-carelink.co.kr` | 대문 · 소개 · 요양급여/시범사업 · 보훈공단 실증 제안 (본 저장소) | 정적 export → nginx `root` |
| `ai-carelink.co.kr` | → www 301 | nginx |
| `app.ai-carelink.co.kr` | 플랫폼 5개 도메인 + 환자·보호자 앱 + 간병인 앱 (AiCarelink/frontend) | Next.js :3001 프록시 |
| `api.ai-carelink.co.kr` | FastAPI 백엔드 (AiCarelink/backend) | :8001 프록시 (서버 실제 포트에 맞게 조정) |

DNS(가비아 DNS 관리): A 레코드 `@`, `www`, `app`, `api` → 서버 공인 IP.

## 최초 1회 (가비아 서버)

```bash
sudo mkdir -p /opt/aicarelink-webpage && sudo chown $USER /opt/aicarelink-webpage
git clone https://github.com/wdlab1958/Webpage_AI-Carelink.git /opt/aicarelink-webpage/repo
sudo cp /opt/aicarelink-webpage/repo/deployment/nginx/ai-carelink.co.kr.conf /etc/nginx/conf.d/
sudo certbot --nginx -d ai-carelink.co.kr -d www.ai-carelink.co.kr -d app.ai-carelink.co.kr -d api.ai-carelink.co.kr
bash /opt/aicarelink-webpage/repo/deployment/deploy-webpage.sh
```

compose 스택의 nginx 컨테이너(`ops/docker-compose.prod.yml`)를 쓰는 경우에는 conf 를 `AiCarelink/ops/nginx/` 에 두고
`/opt/aicarelink-webpage/current` 를 컨테이너에 `:ro` 볼륨으로 마운트한 뒤 업스트림 포트를 compose 포트(frontend 3000 / backend 5005)로 맞춘다.

## 매 배포

```bash
# 로컬 (집 192.168.45.206 / 회사 10.10.10.64)
git add -A && git commit -m "..." && git push origin main

# 가비아 (SSH: 회사 22 또는 우회 포트 2222)
bash /opt/aicarelink-webpage/repo/deployment/deploy-webpage.sh
```

롤백: `ln -sfn /opt/aicarelink-webpage/releases/<이전> /opt/aicarelink-webpage/current && sudo nginx -s reload`

## 로컬 개발

```bash
npm run dev              # http://localhost:3002  (LAN: http://192.168.45.206:3002)
npm run build:static     # out/ 생성 (운영과 동일한 정적 산출물 확인)
```

앱/백엔드 링크는 접속한 호스트 기준으로 자동 유도된다 (`src/lib/hosts.js`):
`localhost` → `:3001/:8001`, `192.168.45.206` → `192.168.45.206:3001/:8001`, `10.10.10.64` → `10.10.10.64:3001/:8001`,
`*.ai-carelink.co.kr` → `app.` / `api.`. 포트는 `.env.local` 의 `NEXT_PUBLIC_APP_PORT` / `NEXT_PUBLIC_API_PORT` 로 변경.
