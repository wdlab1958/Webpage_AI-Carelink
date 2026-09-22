#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════
# 대문(www.ai-carelink.co.kr) 배포 — 가비아 서버에서 실행
#
#   집/회사  →  git commit & push (GitHub: wdlab1958/Webpage_AI-Carelink)
#   가비아   →  bash /opt/aicarelink-webpage/repo/deployment/deploy-webpage.sh
#
# 동작: git pull → npm ci → 정적 export(out/) → /opt/aicarelink-webpage/releases/<sha> →
#       current 심볼릭 링크 교체(원자적) → nginx reload → 이전 릴리스 5개만 보존
# 롤백: ln -sfn /opt/aicarelink-webpage/releases/<이전 sha> /opt/aicarelink-webpage/current && nginx -s reload
#
# 환경변수: DEPLOY_ROOT(기본 /opt/aicarelink-webpage), BRANCH(기본 main),
#           NEXT_PUBLIC_APP_URL / NEXT_PUBLIC_API_URL (기본: 도메인 자동 유도 → 생략 가능)
# ═══════════════════════════════════════════════════════════════════════════
set -euo pipefail

DEPLOY_ROOT="${DEPLOY_ROOT:-/opt/aicarelink-webpage}"
REPO_DIR="$DEPLOY_ROOT/repo"
BRANCH="${BRANCH:-main}"
REPO_URL="${REPO_URL:-https://github.com/wdlab1958/Webpage_AI-Carelink.git}"

log() { printf '\033[0;32m[deploy]\033[0m %s\n' "$*"; }

mkdir -p "$DEPLOY_ROOT/releases"

# 1. 소스 동기화
if [[ ! -d "$REPO_DIR/.git" ]]; then
  log "clone $REPO_URL → $REPO_DIR"
  git clone --branch "$BRANCH" "$REPO_URL" "$REPO_DIR"
fi
cd "$REPO_DIR"
git fetch origin "$BRANCH"
git checkout -q "$BRANCH"
git reset -q --hard "origin/$BRANCH"
SHA=$(git rev-parse --short HEAD)
log "HEAD = $SHA ($(git log -1 --format='%s'))"

# 2. 빌드 (정적 export)
log "npm ci"
npm ci --no-audit --no-fund
log "next build (STATIC_EXPORT=1)"
rm -rf out
STATIC_EXPORT=1 NODE_ENV=production npm run build:static
test -f out/index.html || { echo "out/index.html 없음 — export 실패" >&2; exit 1; }

# 3. 릴리스 배치 + current 교체
RELEASE="$DEPLOY_ROOT/releases/$SHA-$(date +%Y%m%d%H%M%S)"
mkdir -p "$RELEASE"
cp -a out/. "$RELEASE/"
ln -sfn "$RELEASE" "$DEPLOY_ROOT/current.tmp"
mv -Tf "$DEPLOY_ROOT/current.tmp" "$DEPLOY_ROOT/current"
log "current → $RELEASE"

# 4. nginx reload (호스트 nginx 또는 compose nginx 컨테이너)
if command -v nginx >/dev/null 2>&1 && sudo -n nginx -t >/dev/null 2>&1; then
  sudo -n nginx -s reload && log "nginx reloaded"
elif docker ps --format '{{.Names}}' 2>/dev/null | grep -q nginx; then
  docker exec "$(docker ps --format '{{.Names}}' | grep nginx | head -1)" nginx -s reload && log "nginx(container) reloaded"
else
  log "nginx reload 생략 (정적 파일만 교체됨)"
fi

# 5. 이전 릴리스 정리 (최근 5개 보존)
ls -1dt "$DEPLOY_ROOT"/releases/* | tail -n +6 | xargs -r rm -rf

log "done: https://www.ai-carelink.co.kr  (sha $SHA)"
