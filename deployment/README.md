# 배포 — www.ai-carelink.co.kr (대문)

기준일 2026-09-29. PatentForge 와 같은 방식: **집/회사 → GitHub push → 가비아 서버에서 pull·빌드**.
(가비아 방화벽이 SSH 를 회사 IP 로만 허용하므로 GitHub Actions 가 서버로 직접 SSH 하는 방식은 쓰지 않는다.)

## 도메인 구성 (목표)

| 호스트 | 역할 | 서빙 |
|---|---|---|
| `www.ai-carelink.co.kr` | 대문 · 소개 · 요양급여/시범사업 · 보훈공단 실증 제안 (본 저장소) | 정적 export → nginx `root` |
| `ai-carelink.co.kr` | → www 301 | nginx |
| `app.ai-carelink.co.kr` | 플랫폼 5개 도메인 + 환자·보호자 앱 + 간병인 앱 (AiCarelink/frontend) | 파일럿 frontend 컨테이너 127.0.0.1:3001 프록시 |
| `api.ai-carelink.co.kr` | FastAPI 백엔드 (AiCarelink/backend) | 파일럿 backend 컨테이너 127.0.0.1:8100 프록시 |

app/api 컨테이너 기동·배포 절차: AiCarelink 저장소 `docs/launch/PILOT_DEPLOY_GABIA.md` (`ops/deploy/deploy_pilot.sh`).
구버전 메인 앱(:3000, IP `default_server`)은 그대로 두어도 도메인 블록과 겹치지 않는다.

DNS(가비아 DNS 관리): A 레코드 `@`, `www`, `app`, `api` → 서버 공인 IP.

## 현재 서버 상태 (2026-09-29)

서버: 가비아 클라우드 103.55.190.5 · Ubuntu 22.04 · 호스트 nginx 1.18 (`sites-available` / `sites-enabled` 방식) · 계정 `wdlab`.
외부에서 열린 포트는 22 / 80 / 443 뿐이다 (3000 · 8100 은 방화벽 차단 → nginx 경유로만 접근).

| 접속 | 응답 | nginx 파일 |
|---|---|---|
| `https://www.ai-carelink.co.kr` | 대문 (정적) | `sites-available/ai-carelink.co.kr` ← [`nginx/ai-carelink.co.kr.conf`](nginx/ai-carelink.co.kr.conf) |
| `https://ai-carelink.co.kr` | → www 301 | 위와 같음 |
| `https://app.` / `https://api.ai-carelink.co.kr` | 플랫폼 / 백엔드 | 위와 같음 |
| `http://<도메인>` | → https 301 (ACME 챌린지 경로만 예외) | 위와 같음 |
| `http://<서버 공인 IP>` | 구버전 메인 앱 (:3000) | `sites-available/ai-carelink` (`default_server`, 아래 참고) |
| `ssh -p 443` | sshd (22 와 동일) | `stream.d/mux-443.conf` |

배포 경로는 홈 폴더다: `~/AiCarelink-Webpage/` = `repo/`(소스) · `releases/<sha>-<시각>/`(산출물) · `current`(심볼릭 링크).

HTTPS 는 2026-09-29 개통했다. **443 은 SSH 와 공유**한다 — nginx stream(`ssl_preread`)이 첫 패킷을 보고
TLS 는 `127.0.0.1:8443`(HTTPS server 블록), 그 외는 sshd 로 넘긴다. 그래서 이 서버에서는

- HTTPS server 블록에 `listen 443 ssl` 을 쓰지 않는다 → `include snippets/ai-carelink-ssl.conf;`
- `certbot --nginx` 를 쓰지 않는다 (`listen 443 ssl` 을 자동 삽입해 bind 충돌) → webroot(`/var/www/acme`) 발급,
  `certbot.timer` 자동 갱신, deploy hook 이 `/etc/nginx/ssl/` 로 복사 후 reload
- 443 경유 SSH 의 실제 접속 IP 는 sshd 로그가 아니라 `/var/log/nginx/mux-443.log` 에 남는다

구성 스크립트·스니펫은 AiCarelink 저장소 `ops/nginx/mux-443/` · `ops/nginx/https/` 에 있다.

메인 앱 블록 (`sites-available/ai-carelink`, AiCarelink 프로젝트 소유 — 참고용):

```nginx
server {
    listen 80 default_server;
    server_name <서버 공인 IP>;
    client_max_body_size 50m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 300;
    }
}
```

`server_name` 에 도메인(`ai-carelink.co.kr`, `www.`)을 넣지 않는다 — 대문 블록과 중복되면 nginx 가 뒤쪽을 무시한다.
수정 전 원본은 서버의 `sites-available/ai-carelink.bak-20260928` 에 있다.

## 최초 1회 (가비아 서버)

```bash
# 1. 소스 받기 + 첫 빌드 (repo/ 가 없으면 스크립트가 clone 한다)
curl -fsSL -o /tmp/deploy-webpage.sh https://raw.githubusercontent.com/wdlab1958/Webpage_AI-Carelink/main/deployment/deploy-webpage.sh
bash /tmp/deploy-webpage.sh

# 2. nginx 대문 블록 설치
sudo install -m 644 ~/AiCarelink-Webpage/repo/deployment/nginx/ai-carelink-www.conf /etc/nginx/sites-available/ai-carelink-www
sudo ln -sfn /etc/nginx/sites-available/ai-carelink-www /etc/nginx/sites-enabled/ai-carelink-www

# 3. nginx(www-data) 가 홈 아래 파일을 읽도록 홈 폴더 통과 권한 부여 (750 → 751)
chmod o+x /home/wdlab

sudo nginx -t && sudo systemctl reload nginx
```

배포 경로는 스크립트 기본값 `$HOME/AiCarelink-Webpage` 를 쓴다. 다른 위치에 배포할 때만 `DEPLOY_ROOT` 로 지정한다
(nginx `root` 도 함께 바꿔야 한다).

## 매 배포

```bash
# 로컬 (집 192.168.45.206 / 회사 10.10.10.64)
git add -A && git commit -m "..." && git push origin main

# 가비아 (SSH: 회사 22 또는 우회 포트 2222)
bash ~/AiCarelink-Webpage/repo/deployment/deploy-webpage.sh
```

롤백: `ln -sfn ~/AiCarelink-Webpage/releases/<이전> ~/AiCarelink-Webpage/current && sudo nginx -s reload`

## nginx 구성 갱신 (4개 호스트)

[`nginx/ai-carelink.co.kr.conf`](nginx/ai-carelink.co.kr.conf) 는 루트 · www · app · api 4개 호스트 전체의 정본이다.
인증서·443 공유 구성은 이미 서버에 있으므로 conf 를 바꾼 뒤에는 아래만 실행한다
(app/api 컨테이너가 떠 있어야 app/api 가 502 가 아니다 — 순서는 AiCarelink `docs/launch/PILOT_DEPLOY_GABIA.md`).

```bash
cd ~/AiCarelink-Webpage/repo && git pull --ff-only
sudo install -m 644 deployment/nginx/snippets/carelink-api-proxy.conf /etc/nginx/snippets/
sudo install -m 644 deployment/nginx/ai-carelink.co.kr.conf /etc/nginx/sites-available/ai-carelink.co.kr
sudo ln -sfn /etc/nginx/sites-available/ai-carelink.co.kr /etc/nginx/sites-enabled/ai-carelink.co.kr
sudo nginx -t && sudo systemctl reload nginx
```

서버를 새로 구성할 때(인증서·443 공유부터)는 AiCarelink 저장소의 `ops/nginx/https/run-all.sh` 를 먼저 실행한다.

compose 스택의 nginx 컨테이너(`ops/docker-compose.prod.yml`)를 쓰는 경우에는 conf 를 `AiCarelink/ops/nginx/` 에 두고
`~/AiCarelink-Webpage/current` 를 컨테이너에 `:ro` 볼륨으로 마운트한 뒤 업스트림 포트를 compose 포트(frontend 3000 / backend 5005)로 맞춘다.

## 로컬 개발

```bash
npm run dev              # http://localhost:3002  (LAN: http://192.168.45.206:3002)
npm run build:static     # out/ 생성 (운영과 동일한 정적 산출물 확인)
```

앱/백엔드 링크는 접속한 호스트 기준으로 자동 유도된다 (`src/lib/hosts.js`):
`localhost` → `:3001/:8100`, `192.168.45.206` → `192.168.45.206:3001/:8100`, `10.10.10.64` → `10.10.10.64:3001/:8100`,
`*.ai-carelink.co.kr` → `app.` / `api.`. 포트는 `.env.local` 의 `NEXT_PUBLIC_APP_PORT` / `NEXT_PUBLIC_API_PORT` 로 변경.

새 LAN IP 로 dev 서버에 접속하면 `next.config.mjs` 의 `allowedDevOrigins` 에 그 IP 를 추가해야 한다
(없으면 페이지는 열리지만 `/_next/*` 가 403 으로 막혀 스크립트가 동작하지 않는다).
