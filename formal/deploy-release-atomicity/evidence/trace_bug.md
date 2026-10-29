| # | Action | Code | Changed |
|---|---|---|---|
| 1 | `Init` |  | `out` = "absent"; `lock` = None; `rel` = (d1 :> "none" @@ d2 :> "none"); `current` = None; `pc` = (d1 :> "start" @@ d2 :> "start") |
| 2 | `Acquire(d2)` | deployment/deploy-webpage.sh:28-33 | `pc` = (d1 :> "start" @@ d2 :> "sync") |
| 3 | `Acquire(d1)` | deployment/deploy-webpage.sh:28-33 | `pc` = (d1 :> "sync" @@ d2 :> "sync") |
| 4 | `Clean(d1)` | deployment/deploy-webpage.sh:49-51 | `pc` = (d1 :> "building" @@ d2 :> "sync") |
| 5 | `Clean(d2)` | deployment/deploy-webpage.sh:49-51 | `pc` = (d1 :> "building" @@ d2 :> "building") |
| 6 | `BuildStart(d1)` | deployment/deploy-webpage.sh:52 | `out` = "partial"; `pc` = (d1 :> "built" @@ d2 :> "building") |
| 7 | `BuildEnd(d1)` | deployment/deploy-webpage.sh:52 | `out` = "complete"; `pc` = (d1 :> "checked" @@ d2 :> "building") |
| 8 | `BuildStart(d2)` | deployment/deploy-webpage.sh:52 | `out` = "partial"; `pc` = (d1 :> "checked" @@ d2 :> "built") |
| 9 | `Copy(d1)` ⚠ | deployment/deploy-webpage.sh:56-58 | `rel` = (d1 :> "partial" @@ d2 :> "none"); `pc` = (d1 :> "copied" @@ d2 :> "built") |
