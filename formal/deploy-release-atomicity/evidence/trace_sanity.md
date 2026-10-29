| # | Action | Code | Changed |
|---|---|---|---|
| 1 | `Init` |  | `out` = "absent"; `lock` = None; `rel` = (d1 :> "none" @@ d2 :> "none"); `current` = None; `pc` = (d1 :> "start" @@ d2 :> "start") |
| 2 | `Acquire(d1)` | deployment/deploy-webpage.sh:28-33 | `lock` = d1; `pc` = (d1 :> "sync" @@ d2 :> "start") |
| 3 | `Clean(d1)` | deployment/deploy-webpage.sh:49-51 | `pc` = (d1 :> "building" @@ d2 :> "start") |
| 4 | `BuildStart(d1)` | deployment/deploy-webpage.sh:52 | `out` = "partial"; `pc` = (d1 :> "built" @@ d2 :> "start") |
| 5 | `BuildEnd(d1)` | deployment/deploy-webpage.sh:52 | `out` = "complete"; `pc` = (d1 :> "checked" @@ d2 :> "start") |
| 6 | `Copy(d1)` | deployment/deploy-webpage.sh:56-58 | `rel` = (d1 :> "complete" @@ d2 :> "none"); `pc` = (d1 :> "copied" @@ d2 :> "start") |
| 7 | `Swap(d1)` | deployment/deploy-webpage.sh:63-75 | `lock` = None; `current` = d1; `pc` = (d1 :> "done" @@ d2 :> "start") |
| 8 | `Acquire(d2)` | deployment/deploy-webpage.sh:28-33 | `lock` = d2; `pc` = (d1 :> "done" @@ d2 :> "sync") |
| 9 | `Clean(d2)` | deployment/deploy-webpage.sh:49-51 | `out` = "absent"; `pc` = (d1 :> "done" @@ d2 :> "building") |
| 10 | `BuildStart(d2)` | deployment/deploy-webpage.sh:52 | `out` = "partial"; `pc` = (d1 :> "done" @@ d2 :> "built") |
| 11 | `BuildEnd(d2)` | deployment/deploy-webpage.sh:52 | `out` = "complete"; `pc` = (d1 :> "done" @@ d2 :> "checked") |
| 12 | `Copy(d2)` | deployment/deploy-webpage.sh:56-58 | `rel` = (d1 :> "complete" @@ d2 :> "complete"); `pc` = (d1 :> "done" @@ d2 :> "copied") |
| 13 | `Swap(d2)` ⚠ | deployment/deploy-webpage.sh:63-75 | `lock` = None; `current` = d2; `pc` = (d1 :> "done" @@ d2 :> "done") |
