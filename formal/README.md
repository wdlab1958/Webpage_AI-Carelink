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

필요: Java 11+, `~/.cache/proof-skills/tla2tools.jar` (proof-skills `setup_tla.sh`). 버전은 `TOOLCHAIN.lock`.

## 파일

| 경로 | 내용 |
|---|---|
| `CANDIDATES.md` | G0 후보 6개·순위, L0 정적 점검(lint·build·링크·자산) 결과 |
| `deploy-release-atomicity/SCOPE.md` | 범위·추상화·경계·동결 속성 표(G1~G3) |
| `deploy-release-atomicity/CORRESPONDENCE.md` | 모델 action/변수 ↔ `file:line` (G4) |
| `deploy-release-atomicity/tla/` | `DeployRelease.tla`(fix toggle `UseLock`), `Properties.tla`(동결), `MC.cfg`·`MC_bug.cfg`·`MC_sanity.cfg`(+`MC_bug_current.cfg`) |
| `deploy-release-atomicity/repro/` | 결정적 재현 하네스(가짜 git/npm + 게이트 파일 barrier) |
| `deploy-release-atomicity/evidence/` | TLC 로그·트레이스, 수정 전/후 테스트 로그, mutation, L0 로그, `patches/` |
| `findings.json` | 기계 판독 결과(proof-skills 스키마 + `wdlab` 블록) |
| `reports/2026-10-29-deploy-release-atomicity.md` | 보고서 사본 (docx: `~/ai_project/Proof-Skills/AiCarelink-Webpage_ProofSkills_Report_2026-10-29.docx`) |

부수 발견(미수정, 기록만): F2 `src/lib/api.js` 토큰 갱신 경합(사장 코드, SUSPECTED), F3 `/images/og-image.png` 누락(CONFIRMED, HITL).
HITL pending: G2 속성 동결 승인, G7 수정 설계(`flock -n` 즉시 종료 vs `flock -w` 대기) 승인.
