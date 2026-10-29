-------------------------- MODULE DeployRelease --------------------------
(* AiCarelink-Webpage — deployment/deploy-webpage.sh 의 릴리스 교체 프로토콜.   *)
(*                                                                            *)
(* 운영자가 가비아 서버에서 deploy-webpage.sh 를 실행하면                          *)
(*   git reset → npm ci → rm -rf out → next build(out/) → test -f out/index.html *)
(*   → cp -a out/. releases/<sha> → ln/mv 로 current 교체 → nginx reload       *)
(* 순서로 진행된다. 모든 실행이 같은 작업 디렉터리 repo/out 을 공유한다.            *)
(*                                                                            *)
(* 모델링 질문: 두 실행이 겹치면(집·회사 두 터미널, 재실행, 자동화) 미완성 out/ 이    *)
(* 릴리스로 복사되어 current 가 깨진 사이트를 가리킬 수 있는가?                     *)
(*                                                                            *)
(* UseLock = TRUE  : 수정 — 스크립트 시작 시 flock -n 으로 배타 실행, 실패 시 즉시 종료 *)
(* UseLock = FALSE : 수정 전 코드 (잠금 없음)                                      *)
(*                                                                            *)
(* 원자성 규칙: 셸 한 줄(또는 외부 명령 하나)이 한 action. next build 만 두 단계로    *)
(* 나눈다(index.html 이 먼저 생기고 나머지 자산이 뒤에 생기는 비원자적 산출).          *)
EXTENDS Naturals, FiniteSets

CONSTANTS Deployers,   \* 동시에 스크립트를 실행하는 운영자/터미널, 예 {d1, d2}
          UseLock,     \* fix toggle
          None         \* model value

VARIABLES
    pc,       \* 각 배포 실행의 프로그램 카운터
    out,      \* 공유 작업 디렉터리 repo/out 의 상태: "absent" | "partial" | "complete"
    rel,      \* 각 배포가 만든 releases/<sha-시각>/ 의 내용: "none" | "partial" | "complete"
    current,  \* current 심볼릭 링크가 가리키는 릴리스(배포 id) 또는 None
    lock      \* flock 보유자 (UseLock 일 때만 의미), 또는 None

vars == <<pc, out, rel, current, lock>>

PCs == {"start", "sync", "building", "built", "checked", "copied", "done", "aborted"}

TypeOK ==
    /\ pc \in [Deployers -> PCs]
    /\ out \in {"absent", "partial", "complete"}
    /\ rel \in [Deployers -> {"none", "partial", "complete"}]
    /\ current \in Deployers \cup {None}
    /\ lock \in Deployers \cup {None}

Init ==
    /\ pc = [d \in Deployers |-> "start"]
    /\ out = "absent"
    /\ rel = [d \in Deployers |-> "none"]
    /\ current = None
    /\ lock = None

----------------------------------------------------------------------------
\* src: deployment/deploy-webpage.sh:28-33 (fix: exec 9>"$LOCK_FILE"; flock -n 9 || exit 1), :41-44 (git fetch/checkout/reset, SHA)  [수정 전: :32-35, 잠금 없음]
\* 잠금이 켜져 있고 다른 실행이 보유 중이면 flock -n 이 실패 → exit 1 (aborted).
Acquire(d) ==
    /\ pc[d] = "start"
    /\ IF UseLock
         THEN IF lock = None
                THEN /\ lock' = d
                     /\ pc' = [pc EXCEPT ![d] = "sync"]
                ELSE /\ pc' = [pc EXCEPT ![d] = "aborted"]
                     /\ UNCHANGED lock
         ELSE /\ pc' = [pc EXCEPT ![d] = "sync"]
              /\ UNCHANGED lock
    /\ UNCHANGED <<out, rel, current>>

\* src: deployment/deploy-webpage.sh:49-51 (npm ci; rm -rf out)  [수정 전: :40-42]
Clean(d) ==
    /\ pc[d] = "sync"
    /\ out' = "absent"
    /\ pc' = [pc EXCEPT ![d] = "building"]
    /\ UNCHANGED <<rel, current, lock>>

\* src: deployment/deploy-webpage.sh:52 (STATIC_EXPORT=1 npm run build:static — 전반: out/index.html 등 일부 파일 생성)  [수정 전: :43]
BuildStart(d) ==
    /\ pc[d] = "building"
    /\ out' = "partial"
    /\ pc' = [pc EXCEPT ![d] = "built"]
    /\ UNCHANGED <<rel, current, lock>>

\* src: deployment/deploy-webpage.sh:52 (npm run build:static — 후반: 나머지 _next/static 자산까지 모두 생성되어 명령 종료)  [수정 전: :43]
\* 추상화: 다른 실행이 중간에 rm -rf out 을 했더라도 "자기 파일을 모두 썼다"는 뜻으로 complete 로 둔다
\* (두 빌드 산출물이 섞이는 손상은 모델 밖 — CORRESPONDENCE.md A3).
BuildEnd(d) ==
    /\ pc[d] = "built"
    /\ out' = "complete"
    /\ pc' = [pc EXCEPT ![d] = "checked"]
    /\ UNCHANGED <<rel, current, lock>>

\* src: deployment/deploy-webpage.sh:53 (test -f out/index.html || exit 1) — index.html 만 본다: partial 도 통과한다  [수정 전: :44]
\* src: deployment/deploy-webpage.sh:56-58 (RELEASE=…; mkdir -p; cp -a out/. RELEASE/) — 그 순간의 out/ 스냅숏이 릴리스가 된다  [수정 전: :47-49]
Copy(d) ==
    /\ pc[d] = "checked"
    /\ IF out = "absent"
         THEN /\ pc' = [pc EXCEPT ![d] = "aborted"]          \* set -e: test -f 실패로 종료
              /\ lock' = (IF lock = d THEN None ELSE lock)   \* 프로세스 종료 → flock fd 해제
              /\ UNCHANGED rel
         ELSE /\ rel' = [rel EXCEPT ![d] = out]
              /\ pc' = [pc EXCEPT ![d] = "copied"]
              /\ UNCHANGED lock
    /\ UNCHANGED <<out, current>>

\* src: deployment/deploy-webpage.sh:59-60 (ln -sfn RELEASE current.tmp; mv -Tf current.tmp current) — 원자적 교체  [수정 전: :50-51]
\* src: deployment/deploy-webpage.sh:63-75 (nginx reload, 릴리스 5개 보존 정리, 종료 → flock fd 해제)  [수정 전: :55-66]
Swap(d) ==
    /\ pc[d] = "copied"
    /\ current' = d
    /\ pc' = [pc EXCEPT ![d] = "done"]
    /\ lock' = (IF lock = d THEN None ELSE lock)
    /\ UNCHANGED <<out, rel>>

Step == \E d \in Deployers : Acquire(d) \/ Clean(d) \/ BuildStart(d) \/ BuildEnd(d) \/ Copy(d) \/ Swap(d)
Terminated == (\A d \in Deployers : pc[d] \in {"done", "aborted"}) /\ UNCHANGED vars
Next == Step \/ Terminated
Spec == Init /\ [][Next]_vars /\ WF_vars(Step)

----------------------------------------------------------------------------
INSTANCE Properties
=============================================================================
