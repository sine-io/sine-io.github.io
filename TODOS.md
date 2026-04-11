# TODOS

## Architecture

### Revisit OPC canonical route after the control surface stabilizes

**What:** Re-evaluate whether the mature OPC control console should keep `/projects/opc` as its canonical URL or gain a cleaner `/opc` route or alias.

**Why:** Keeping `/projects/opc` is the right v1 decision because it minimizes link churn and keeps the blast radius small, but a dedicated control-surface page may deserve first-class URL semantics once the information architecture settles.

**Context:** The plan-eng review locked `/projects/opc` as the v1 entry point. This item exists so the team does not forget to revisit the URL shape after 2-3 iterations, when the page has proven whether it is still a project detail variant or has become a standalone site primitive with external references.

**Effort:** S
**Priority:** P3
**Depends on:** OPC control console survives multiple iterations with stable IA and active external linking needs

### Revisit whether OPC fan-out sections should become dedicated child pages

**What:** Re-evaluate whether `Topics`, `Terms`, and `Cases` should remain same-page anchored sections or graduate into dedicated child pages under the OPC experience.

**Why:** Single-page anchors are the right v1 shape because they prove the control-console information architecture with the smallest diff, but they may become a bottleneck once each section accumulates enough depth and navigational weight.

**Context:** The plan-eng review explicitly locked v1 to a single `OpcPage` with in-page anchors. This item preserves the future branch point so the site can upgrade its IA intentionally instead of drifting into an oversized one-page document.

**Effort:** S
**Priority:** P3
**Depends on:** OPC content volume grows enough that same-page anchor navigation starts to hurt scanability or maintenance

### Revisit whether `src/content/opc.ts` should split into a dedicated content directory

**What:** Re-evaluate whether the OPC content model should remain in a single `src/content/opc.ts` file or graduate into a multi-file `src/content/opc/` directory.

**Why:** A single file is the right v1 boundary because it keeps the diff small and the schema explicit, but timeline events, signals, terms, and linked cases may eventually outgrow a single clear file.

**Context:** The plan-eng review explicitly chose a single dedicated content file for v1 and rejected early directory splitting as over-engineering. This item keeps the future split intentional, based on content size and maintenance pain rather than aesthetic preference.

**Effort:** S
**Priority:** P3
**Depends on:** `src/content/opc.ts` grows enough that schema clarity or editing ergonomics start to degrade

## Completed
