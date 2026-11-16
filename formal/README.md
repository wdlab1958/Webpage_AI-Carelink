# formal/ — AiCarelink-Webpage 형식 검증 (WDLAB-STD-VERIFY-001 v1.0)

검사일 2026-10-29 · 기준 commit `07e4dfc` · 달성 레벨 **L2** (TLA+/TLC bounded model check) · Lean 미설치(L3 미주장)

## 무엇을 모델링했나

이 저장소는 정적 export 마케팅/법적 고지 웹페이지라 서버·DB·폼 로직이 없다. 유일하게 운영 상태를 바꾸는 로직인
**`deployment/deploy-webpage.sh`(가비아 서버 배포 스크립트)의 릴리스 교체 프로토콜**을 concern 으로 선정했다 (`CANDIDATES.md`).

- concern: `deploy-release-atomicity` — 두 배포 실행이 겹치면 공유 `repo/out` 의 미완성 산출물이 `releases/` 로 복사되고 `current` 가 그것을 가리킬 수 있는가
- 결과: **F1 FIXED** — TLC 반례(depth 9/10) → bash 하네스로 결정적 재현(`evidence/test_before.log`) → `flock -n` 배타 실행 추가(`evidence/patches/`) → 재현 테스트 통과·모델 PASS·mutation(fix OFF) 재실패 확인
- 경계: `Deployers={d1,d2}`, 빌드 2단계, fix ON **49 states / 37 distinct / depth 13**
- 신뢰 기반: TLC 2026.10.28, `SCOPE.md` 의 추상화 A1~A7 (특히 `cp -a` 원자 스냅숏, 혼합 트리 미모델)

## 실행

```bash
bash formal/run_all.sh                       # MC=PASS, MC_bug=FAIL(12), MC_sanity=FAIL(12), repro=PASS 를 모두 단언 (TLC_WORKERS 존중)
bash formal/deploy-release-atomicity/repro/test_F1_concurrent_deploy.sh            # 현재 스크립트: PASS
bash formal/deploy-release-atomicity/repro/test_F1_concurrent_deploy.sh <(git show 07e4dfc:deployment/deploy-webpage.sh)   # 수정 전: FAIL
```

필요: Java 11+, `${PROOF_SKILLS_TOOLS:-~/.cache/proof-skills}/tla2tools.jar` (`bash formal/ci/setup_tla.sh`). 버전은 `TOOLCHAIN.lock`.

## CI (W5/W6) — 회귀 가드 · 드리프트 검사 (2026-11-16 등록)

워크플로 `.github/workflows/formal.yml` (`formal-verification`, 기존 `deploy.yml` 과 별도) — 정책 **fail-closed**, 예산 30분.

- 트리거: `formal/**`·`deployment/**`·`README.md` 변경 PR/push(main), nightly 03:17 KST, 수동(workflow_dispatch).
- job `three-config-gate`: `formal/ci/setup_tla.sh` 로 tla2tools v1.8.0 을 받아 `bash formal/run_all.sh` — **MC=PASS(0) / MC_bug=FAIL(12) / MC_sanity=FAIL(12)** 와 F1 bash 재현 테스트 PASS 를 모두 단언. 하나라도 어긋나면 PR 차단. TLC 로그·evidence 를 artifact 로 14일 보존.
- job `drift-check`: `python3 formal/tools/correspondence_check.py formal/ --root .` — 스펙의 `src:` 태그·`CORRESPONDENCE.md` 의 `file:line` 포인터가 현재 코드에 실제로 존재하는지(파일 유무, 줄 범위) 확인. 포인터가 깨지면 모델이 코드와 멀어졌다는 신호 → **스펙·CORRESPONDENCE 를 갱신해야 통과**(포인터 삭제로 통과시키지 않음). PR 에서는 매핑된 소스 파일이 바뀌었는지도 나열한다(리뷰 안내).
- 로컬 재실행(CI 와 동일):
  ```bash
  export PROOF_SKILLS_TOOLS=$(mktemp -d) && bash formal/ci/setup_tla.sh
  TLC_WORKERS=2 FORMAL_SKIP_TESTS=1 bash formal/run_all.sh      # 3-config 게이트만 (재현 테스트 생략)
  TLC_WORKERS=2 bash formal/run_all.sh                            # + F1 재현 테스트 (기본)
  /usr/bin/python3 formal/tools/correspondence_check.py formal/ --root .   # 0 broken 이어야 함
  ```
- 증거: `deploy-release-atomicity/evidence/ci_sim_run_all.log`(로컬 CI 시뮬레이션), `evidence/ci_drift_check.log`(16 pointers / 0 broken).
- 도구 출처: `formal/ci/setup_tla.sh`, `formal/tools/{tlc.sh,parse_tlc_trace.py,correspondence_check.py}` — proof-skills v0.1.1 (MIT) 사본.

## 파일

| 경로 | 내용 |
|---|---|
| `CANDIDATES.md` | G0 후보 6개·순위, L0 정적 점검(lint·build·링크·자산) 결과 |
| `deploy-release-atomicity/SCOPE.md` | 범위·추상화·경계·동결 속성 표(G1~G3) |
| `deploy-release-atomicity/CORRESPONDENCE.md` | 모델 action/변수 ↔ `file:line` (G4) |
| `deploy-release-atomicity/tla/` | `DeployRelease.tla`(fix toggle `UseLock`), `Properties.tla`(동결), `MC.cfg`·`MC_bug.cfg`·`MC_sanity.cfg`(+`MC_bug_current.cfg`) |
| `deploy-release-atomicity/repro/` | 결정적 재현 하네스(가짜 git/npm + 게이트 파일 barrier) |
| `deploy-release-atomicity/evidence/` | TLC 로그·트레이스, 수정 전/후 테스트 로그, mutation, L0 로그, `patches/` |
| `ci/setup_tla.sh`, `tools/` | CI 용 TLA+ 툴체인 설치·TLC 래퍼·트레이스 파서·드리프트 검사(`correspondence_check.py`) — proof-skills v0.1.1 (MIT) 사본 |
| `findings.json` | 기계 판독 결과(proof-skills 스키마 + `wdlab` 블록) |
| `reports/2026-10-29-deploy-release-atomicity.md` | 보고서 사본 (docx: `~/ai_project/Proof-Skills/AiCarelink-Webpage_ProofSkills_Report_2026-10-29.docx`) |

부수 발견(미수정, 기록만): F2 `src/lib/api.js` 토큰 갱신 경합(사장 코드, SUSPECTED), F3 `/images/og-image.png` 누락(CONFIRMED, HITL).
HITL pending: G2 속성 동결 승인, G7 수정 설계(`flock -n` 즉시 종료 vs `flock -w` 대기) 승인.
