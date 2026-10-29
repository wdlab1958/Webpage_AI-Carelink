# Correspondence: deploy-release-atomicity

Spec commit: `07e4dfc` + 본 검증의 수정 패치(`evidence/patches/F1-deploy-webpage-flock.diff`). 줄번호는 **수정 후** `deployment/deploy-webpage.sh`(75줄) 기준, `[전: n]` 은 수정 전(66줄) 줄번호.

## Map

| Model element | Code | Kind | Abstraction | Notes |
|---|---|---|---|---|
| `Deployers` | 스크립트를 실행하는 셸 프로세스(터미널/운영자) | constant | 2개로 제한 | `{d1, d2}` |
| `UseLock` | `deployment/deploy-webpage.sh:28-33` `exec 9>"$LOCK_FILE"; flock -n 9 \|\| exit 1` | constant (fix toggle) | TRUE = 수정 후, FALSE = 수정 전(잠금 코드 없음) | |
| `pc[d]` | 스크립트의 실행 위치 | variable | 8개 값으로 축약 | start/sync/building/built/checked/copied/done/aborted |
| `out` | `$REPO_DIR/out` 디렉터리 내용 | variable | absent / partial(index.html 만) / complete | SCOPE A1·A3 |
| `rel[d]` | `$DEPLOY_ROOT/releases/<sha>-<시각>/` 내용 | variable | none / partial / complete | 실행별 1개 (SCOPE A7) |
| `current` | `$DEPLOY_ROOT/current` 심볼릭 링크 대상 | variable | 실행 id 또는 None | |
| `lock` | `$DEPLOY_ROOT/.deploy.lock` 의 flock 보유자 | variable | 프로세스 id → 실행 id | fd 9 |
| `Acquire(d)` | `:28-33` flock, `:41-44` `git fetch/checkout/reset`, `SHA=` `[전: 32-35]` | action | git 충돌은 흡수(A4); flock 실패 → `aborted` | 잠금 OFF 면 무조건 진행 |
| `Clean(d)` | `:49` `npm ci`, `:51` `rm -rf out` `[전: 40, 42]` | action | npm ci 효과 무시 | `out' = "absent"` |
| `BuildStart(d)` | `:52` `npm run build:static` 전반 `[전: 43]` | action | index.html 이 먼저 생김(A1) | `out' = "partial"` |
| `BuildEnd(d)` | `:52` 같은 명령 후반·종료 `[전: 43]` | action | 혼합 트리 무시(A3) | `out' = "complete"` |
| `Copy(d)` | `:53` `test -f out/index.html \|\| exit 1`, `:56-58` `RELEASE=…; mkdir -p; cp -a out/. "$RELEASE/"` `[전: 44, 47-49]` | action | 스냅숏 복사 원자(A2); `out=absent` → set -e 종료 | `rel'[d] = out` |
| `Swap(d)` | `:59-60` `ln -sfn … current.tmp; mv -Tf current.tmp current` `[전: 50-51]`, `:63-75` nginx reload·정리·종료 `[전: 55-66]` | action | reload·정리 무시(A5·A6); 종료 시 flock 해제 | `current' = d` |
| `Terminated` | 모든 프로세스 종료 | action | 교착 검사용 명시적 종료 | |
| `CurrentComplete` (P1) | `deploy-webpage.sh:8-9`, `README.md:24`, `nginx/ai-carelink-www.conf:29` | invariant (frozen) | | `Properties.tla` |
| `ReleasesComplete` (P2) | `deploy-webpage.sh:10`, `deployment/README.md:101` | invariant (frozen) | | `Properties.tla` |
| `SomeoneDeploys` (P3) | `deploy-webpage.sh:8` | liveness (frozen) | WF_vars(Step) — 운영자가 시작한 스크립트는 멈추지 않고 진행한다는 가정 | |
| `LockReleasedWhenDone` (C1) | `deploy-webpage.sh:28-33` | invariant (code) | | |
| `NeverBothDone` | — | sanity (must fail) | | |

## Assumptions

- **A1** `next build` 의 파일 생성은 비원자적이며 `index.html` 이 모든 자산보다 먼저 존재할 수 있다(또는 역순이어도 `test -f index.html` 은 완성 여부를 보증하지 못한다).
- **A2** `cp -a` 는 그 순간의 `out/` 스냅숏을 복사한다(실제로는 더 나쁜 부분 복사도 가능).
- **A3** 다른 실행의 `rm -rf out` 뒤에도 내 빌드 프로세스는 계속 파일을 쓴다(Next 는 디렉터리를 다시 만든다). 혼합 트리는 "complete" 로 간주 — 보수적 추상화.
- **A4** `git`·`npm ci` 동시 실행 충돌은 `set -e` 로 종료되어 `current` 를 건드리지 않는다.
- **A5** 릴리스 정리(최근 5개 보존)는 2개 실행 범위에서 발동하지 않는다.
- **A6** `mv -Tf` 심볼릭 링크 교체는 원자적이다(같은 파일시스템, rename(2)).
- **A7** `flock(2)` 는 같은 호스트의 프로세스 간 배타를 보장하고 프로세스 종료(fd 닫힘)로 해제된다 — util-linux `flock -n`.
- **A8** 재현 하네스의 가짜 `npm` 은 실제 `next build` 가 아니라 A1 을 그대로 구현한 2단계 쓰기다 — 하네스가 증명하는 것은 "스크립트 로직이 A1 하에서 미완성 산출물을 배포한다" 이다.

## Granularity

셸 한 줄(또는 외부 명령 하나)을 1 action 으로 둔다. 예외: `npm run build:static` 은 2 action(BuildStart/BuildEnd)으로 쪼갰다 — 다른 실행의 `rm -rf out` 이 그 사이에 끼어드는 것이 핵심 인터리빙이기 때문.
`test -f` 와 `cp -a` 는 하나의 action(Copy)으로 합쳤다: 둘 사이에 다른 실행의 Clean 이 끼면 cp 가 실패하여 종료(set -e)하거나 더 적은 파일을 복사하므로, 합친 모델은 P1·P2 에 대해 **더 약한(관대한) 모델**이다 — 그래도 반례가 나온다.
