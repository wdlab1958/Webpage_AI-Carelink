---------------------------- MODULE Properties ----------------------------
(* 동결 속성 (G2) — AiCarelink-Webpage / deploy-release-atomicity                *)
(* 출처는 SCOPE.md §속성 표 참조. 이 파일은 HITL 승인 없이 약화하지 않는다.         *)
(* DeployRelease 의 변수·상수를 INSTANCE 로 공유한다.                             *)
EXTENDS Naturals
CONSTANTS Deployers, UseLock, None
VARIABLES pc, out, rel, current, lock

\* P1 (protocol, frozen) — current 가 가리키는 릴리스는 항상 완전한 산출물이다.
\*   출처: deployment/deploy-webpage.sh:8-9 ("current 심볼릭 링크 교체(원자적)"),
\*         README.md:24 ("검사 … 실패 시 산출물을 배포하지 않습니다"), deployment/nginx/ai-carelink-www.conf:29 (root = current)
CurrentComplete == current # None => rel[current] = "complete"

\* P2 (protocol, frozen) — releases/ 아래 모든 릴리스는 완전하다 (롤백 후보가 깨져 있으면 안 된다).
\*   출처: deployment/deploy-webpage.sh:10 (롤백: ln -sfn releases/<이전 sha> current), deployment/README.md:101
ReleasesComplete == \A d \in Deployers : rel[d] \in {"none", "complete"}

\* P3 (liveness) — 어떤 배포 실행은 결국 끝까지 간다 (잠금 추가가 교착·기아를 만들지 않는다).
\*   출처: deployment/deploy-webpage.sh:8 (동작 설명), 표준 §2 "Hard real-time 규율"
SomeoneDeploys == <>(\E d \in Deployers : pc[d] = "done")

\* C1 (code-level) — 끝난 실행은 잠금을 쥐고 있지 않다 (flock fd 는 프로세스 종료로 해제).
LockReleasedWhenDone == \A d \in Deployers : pc[d] \in {"done", "aborted"} => lock # d

\* Sanity (반드시 FAIL) — 두 실행이 모두 끝까지 가는 상태가 도달 가능해야 한다 (잠금이 순차 실행을 허용함을 증명).
NeverBothDone == ~(\A d \in Deployers : pc[d] = "done")
=============================================================================
