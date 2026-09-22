#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════
# AI CareLink — Local Development Environment Setup
# ═══════════════════════════════════════════════════════════════════════════
#
# 실행 방법:
#   chmod +x scripts/dev-setup.sh
#   bash scripts/dev-setup.sh
#
# 이 스크립트는:
#   1. /etc/hosts에 도메인을 추가합니다 (관리자 권한 필요)
#   2. 필요한 Node.js 버전을 확인합니다
#   3. 환경 변수 파일(.env.local)을 확인합니다
#   4. 로컬 개발 서버 실행 명령을 안내합니다
#
# ═══════════════════════════════════════════════════════════════════════════

set -euo pipefail

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     AI CareLink — Local Dev Environment Setup           ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# ── 1. Node.js 버전 확인 ───────────────────────────────────────────────

NODE_VERSION=$(node -v 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)
if [ -z "$NODE_VERSION" ]; then
  echo -e "${RED}[ERROR] Node.js가 설치되어 있지 않습니다.${NC}"
  echo "  Node.js 20+를 설치해주세요: https://nodejs.org/"
  exit 1
elif [ "$NODE_VERSION" -lt 20 ]; then
  echo -e "${YELLOW}[WARN] Node.js v${NODE_VERSION} — v20+가 필요합니다.${NC}"
  echo "  설치 방법:"
  echo "    curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n > /tmp/n"
  echo "    chmod +x /tmp/n && N_PREFIX=\$HOME/.n /tmp/n 22"
  echo "    export PATH=\$HOME/.n/bin:\$PATH"
else
  echo -e "${GREEN}[OK] Node.js v${NODE_VERSION}${NC}"
fi

# ── 2. /etc/hosts 확인 ─────────────────────────────────────────────────

echo ""
echo -e "${BLUE}── 도메인 호스트 설정 ──────────────────────────────────${NC}"

HOSTS_ENTRIES=(
  "127.0.0.1 www.ai-carelink.co.kr"
  "127.0.0.1 ai-carelink.co.kr"
  "127.0.0.1 app.ai-carelink.co.kr"
)

NEEDS_HOSTS=false
for entry in "${HOSTS_ENTRIES[@]}"; do
  if ! grep -q "$entry" /etc/hosts 2>/dev/null; then
    NEEDS_HOSTS=true
    break
  fi
done

if [ "$NEEDS_HOSTS" = true ]; then
  echo -e "${YELLOW}[INFO] /etc/hosts에 도메인을 추가해야 합니다.${NC}"
  echo ""
  echo "  아래 명령을 실행하세요 (sudo 필요):"
  echo ""
  for entry in "${HOSTS_ENTRIES[@]}"; do
    echo "  sudo bash -c 'echo \"$entry\" >> /etc/hosts'"
  done
  echo ""
  echo "  또는 직접 /etc/hosts 파일을 편집하세요:"
  echo "  sudo nano /etc/hosts"
else
  echo -e "${GREEN}[OK] /etc/hosts에 모든 도메인이 등록되어 있습니다.${NC}"
fi

# ── 3. 환경 변수 확인 ──────────────────────────────────────────────────

echo ""
echo -e "${BLUE}── 환경 변수 ───────────────────────────────────────────${NC}"

if [ -f .env.local ]; then
  echo -e "${GREEN}[OK] .env.local 존재${NC}"
  echo ""
  echo "  NEXT_PUBLIC_API_URL = ${NEXT_PUBLIC_API_URL:-http://localhost:8100}"
  echo "  NEXT_PUBLIC_APP_URL = ${NEXT_PUBLIC_APP_URL:-http://localhost:3001}"
  echo "  NEXT_PUBLIC_WWW_URL = ${NEXT_PUBLIC_WWW_URL:-http://localhost:3002}"
else
  echo -e "${YELLOW}[INFO] .env.local 자동 생성됨${NC}"
  cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:8100
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_WWW_URL=http://localhost:3002
NEXT_PUBLIC_ENV=development
NODE_ENV=development
EOF
fi

# ── 4. 서버 실행 안내 ──────────────────────────────────────────────────

echo ""
echo -e "${BLUE}── 서버 실행 방법 ──────────────────────────────────────${NC}"
echo ""
echo -e "  ${GREEN}# 1. 백엔드 서버 실행 (별도 터미널)${NC}"
echo -e "  cd ~/ai_project/AiCarelink/backend"
echo -e "  source venv/bin/activate"
echo -e "  uvicorn app.main:app --reload --host 0.0.0.0 --port 8100"
echo ""
echo -e "  ${GREEN}# 2. 메인 앱 실행 (별도 터미널)${NC}"
echo -e "  cd ~/ai_project/AiCarelink/frontend"
echo -e "  npm run dev  # → http://localhost:3001"
echo ""
echo -e "  ${GREEN}# 3. 대문 페이지 실행 (현재 프로젝트)${NC}"
echo -e "  cd $(pwd)"
echo -e "  npm run dev  # → http://localhost:3002"
echo ""

# ── 5. 접속 주소 안내 ──────────────────────────────────────────────────

echo -e "${BLUE}── 접속 주소 ───────────────────────────────────────────${NC}"
echo ""
echo "  로컬 개발 (포트 기반):"
echo -e "    ${GREEN}대문 페이지:${NC}  http://localhost:3002"
echo -e "    ${GREEN}메인 앱:${NC}      http://localhost:3001"
echo -e "    ${GREEN}백엔드 API:${NC}   http://localhost:8100/docs"
echo ""
echo "  로컬 개발 (도메인 기반 — /etc/hosts 설정 후):"
echo -e "    ${GREEN}대문 페이지:${NC}  http://www.ai-carelink.co.kr:3002"
echo -e "    ${GREEN}메인 앱:${NC}      http://app.ai-carelink.co.kr:3001"
echo ""
echo "  운영 환경 (계획):"
echo -e "    ${GREEN}대문 페이지:${NC}  https://www.ai-carelink.co.kr"
echo -e "    ${GREEN}메인 앱:${NC}      https://app.ai-carelink.co.kr"
echo -e "    ${GREEN}백엔드 API:${NC}   https://api.ai-carelink.co.kr"
echo ""

echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  Setup complete! npm run dev 로 시작하세요.             ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
