---
title: feat: Add OPC observation console
type: feat
status: active
date: 2026-04-11
origin: docs/brainstorms/2026-04-11-opc-observation-console-requirements.md
---

# feat: Add OPC observation console

## Overview

Replace the current generic OPC project detail page with a dedicated observation console at `projects/opc`. The new page keeps the existing canonical route, introduces a typed OPC-specific content source, surfaces a compact `Now` state, and lets users move from stage-level timeline signals into `Topics`, `Terms`, and `Cases` without turning v1 into a mini-docs system.

## Problem Frame

The approved requirements define OPC as a stage-first observation console, not a static topic page and not an event log. The current implementation in `src/content/projects.ts` and `src/pages/ProjectDetailPage.tsx` cannot express stage-level signals, mixed global/local judgments, or action-oriented fan-out targets without turning the generic project detail path into a special-case mess.

This plan keeps the product behavior from the origin document intact:
- first screen answers "where are we now" and "what changed recently"
- timeline is stage-led, not event-led
- `Topics` is the primary deep-reading layer
- `Terms` and `Cases` support understanding and evidence
- the first release is medium-complete, not a shell

## Requirements Trace

- R1-R3, R16: `projects/opc` must read as a dedicated control surface with a visible `Now` state for both first-time and returning readers.
- R4-R9: the console must present 3-5 stages, 1-3 signals per stage, mixed global/local judgment, and forward navigation from each major stage.
- R10-R13: the page must expose `Topics`, `Terms`, and `Cases` in-page, with `Topics` as the strongest reading path and `Cases` backed by existing writing content.
- R14-R15: the first release must ship with enough curated content to feel real, including 4-5 stages, about 5 topics, core terms, and 2-3 cases.

## Scope Boundaries

- No new canonical `/opc` route in this iteration.
- No child routes for `Topics`, `Terms`, or `Cases`.
- No second content store for Cases.
- No backend, loader, CMS, or external data ingestion.
- No Playwright or other new E2E infrastructure.

### Deferred to Separate Tasks

- Revisit whether `projects/opc` should also gain `/opc` or another cleaner alias after the control surface proves itself.
- Revisit whether `Topics`, `Terms`, and `Cases` should eventually split into dedicated child pages.
- Revisit whether `src/content/opc.ts` should later outgrow into `src/content/opc/`.

## Context & Research

### Relevant Code and Patterns

- `src/app/router.tsx` already has a generic `projects/:slug` route and is the place to add a static `projects/opc` route ahead of it.
- `src/content/projects.ts` currently supplies project teaser metadata to `src/pages/HomePage.tsx` and `src/pages/ProjectsPage.tsx`.
- `src/content/writing.ts` already models typed internal/external entries and is the boring source of truth for v1 Cases.
- `src/pages/WritingPage.tsx` already contains hash-scroll behavior that can be extracted and reused rather than copied.
- `src/components/layout/Layout.tsx` already preserves hash-only navigation by skipping scroll-to-top when `location.hash` is present.

### Institutional Learnings

- `opc-v1-boring-boundaries`: keep v1 boring with a dedicated static route, a single OPC content file, same-page anchors, and writing-entry reuse.
- `opc-timeline-query-surface`: treat timeline entries as the primary query surface that fans out into judgment, terms, topics, and cases.
- No matching `docs/solutions/` entries were found for this topic, so plan guidance comes from the current repo and prior session learnings.

### External References

- The prior engineering review confirmed React Router route matching can safely support a static `projects/opc` route alongside `projects/:slug` without relying on brittle special casing.

## Key Technical Decisions

- **Use a static `projects/opc` route plus a dedicated `OpcPage`**: avoids poisoning `ProjectDetailPage` with one-off behavior and keeps the blast radius small.
- **Create `src/content/opc.ts` as the single source of truth**: keeps teaser metadata, stage content, and typed link targets aligned instead of splitting truth between multiple files.
- **Keep v1 page-specific composition in one page component**: `src/pages/OpcPage.tsx` can iterate quickly while the IA is still settling; reusable atoms stay in existing shared UI components.
- **Model targets as discriminated unions, not raw href strings**: catches invalid topic/term/case wiring earlier and supports content validation tests.
- **Reuse existing writing entries for Cases**: keeps evidence links DRY and avoids introducing a second editorial workflow.
- **Extract a small shared hash-scroll hook**: removes duplication between Writing and OPC while preserving current behavior.

## Open Questions

### Resolved During Planning

- **Should OPC keep `projects/opc` as the canonical route?** Yes, for v1. It is already linked from current site surfaces and keeps link churn low.
- **Should v1 use separate child routes for `Topics`, `Terms`, and `Cases`?** No. Keep one page with stable anchors first.
- **Should Cases have their own content source?** No. Use `writingEntries` as the initial evidence layer.

### Deferred to Implementation

- Which exact 4-5 stage names, 5 topic entries, and 2-3 case links should ship first. The implementation should derive them from existing OPC and Writing material without inventing a second content backlog.
- Whether the compact `Now` block visually sits inside the hero cluster or immediately below it. This is a page composition choice that can be settled while building the first pass.

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

```text
site entry points
  |
  +--> Home featured project / Browse link
  |
  +--> Projects teaser card
  |
  '--> direct visit to /projects/opc
            |
            v
        OpcPage
          |
          +--> hero + compact Now
          |      - current stage
          |      - global judgment
          |      - recent change
          |
          +--> stage timeline (3-5 stages)
          |      |
          |      '--> signals (what / meaning / next)
          |                |
          |                +--> topic anchor
          |                +--> term anchor
          |                '--> case destination
          |
          '--> anchored sections
                 +--> Topics (primary deep-read layer)
                 +--> Terms (context support)
                 '--> Cases (existing writing destinations)
```

## Implementation Units

- [x] **Unit 1: Introduce the OPC content model**

**Goal:** Create one typed content source for the OPC console and its teaser metadata.

**Requirements:** R1-R3, R4-R9, R10-R15

**Dependencies:** None

**Files:**
- Create: `src/content/opc.ts`
- Modify: `src/content/projects.ts`
- Test: `src/content/opc.test.ts`

**Approach:**
- Define repo-local types for the compact `Now` block, stage entries, signal entries, local judgments, topic items, term items, and case targets.
- Export `opcProjectMeta` so teaser title, summary, and tags live in one place and `projects.ts` simply projects that metadata into the existing `Project` list shape.
- Represent fan-out targets with a discriminated union such as topic id, term id, or case slug so wiring is explicit and verifiable.
- Add content-level invariants in tests: unique ids, valid case slugs, and stage/signal counts within the planned release bar.

**Patterns to follow:**
- `src/content/writing.ts` for typed content unions and section metadata
- `src/content/projects.ts` for aggregator exports consumed by page surfaces

**Test scenarios:**
- Happy path: importing `opcProjectMeta` and `opcContent` yields the expected top-level structures for teaser metadata, `Now`, stages, and fan-out sections.
- Edge case: duplicate stage ids, signal ids, or anchor ids are rejected by content validation tests.
- Edge case: every stage contains 1-3 signals and total stage count stays within the first-release range.
- Error path: a case target pointing to a missing `writingEntries` slug fails the content-model test.
- Integration: the projected `Project` entry for OPC preserves the teaser contract required by Home and Projects pages.

**Verification:**
- An implementer can update OPC teaser copy and control-console content in one source file without hand-syncing metadata elsewhere.

- [x] **Unit 2: Split routing and shared hash navigation**

**Goal:** Introduce a dedicated OPC page path while preserving generic project detail behavior and shared hash-scroll behavior.

**Requirements:** R1-R3, R9-R13, R16

**Dependencies:** Unit 1

**Files:**
- Create: `src/hooks/useHashScroll.ts`
- Modify: `src/app/router.tsx`
- Modify: `src/pages/WritingPage.tsx`
- Test: `src/app/router.test.tsx`
- Test: `src/hooks/useHashScroll.test.tsx`

**Approach:**
- Add a static `projects/opc` route that renders the new `OpcPage` before the generic `projects/:slug` route.
- Keep `projects/:slug` intact for non-OPC slugs so the blast radius stays limited to the dedicated console path.
- Move the existing hash-scroll behavior out of `WritingPage` into a small shared hook that reads `location.hash`, resolves the element id, and scrolls if present.
- Reuse the shared hook in both Writing and OPC so same-page anchor behavior stays consistent.

**Execution note:** Start with the routing regression tests first so the static-vs-dynamic route split is locked before page work begins.

**Patterns to follow:**
- `src/components/layout/Layout.tsx` for pathname-vs-hash scroll handling
- `src/pages/WritingPage.tsx` for the current anchor-scroll behavior

**Test scenarios:**
- Happy path: `/projects/opc` renders the dedicated OPC route instead of the generic project detail page.
- Regression: `/projects/non-existent` still lands in the existing not-found behavior for unknown project slugs.
- Regression: the static `projects/opc` route wins over `projects/:slug`.
- Happy path: `/writing#notes` still scrolls to the notes section after the hook extraction.
- Edge case: a hash pointing to a missing element does not throw and does not remount the page shell.

**Verification:**
- The route map clearly separates the dedicated OPC page from generic project details, and Writing hash navigation still behaves the same as before.

- [x] **Unit 3: Build the OPC observation console page**

**Goal:** Implement the dedicated control-surface page with a compact `Now` block, stage-led timeline, mixed judgments, and anchored fan-out sections.

**Requirements:** R1-R13, R16

**Dependencies:** Unit 1, Unit 2

**Files:**
- Create: `src/pages/OpcPage.tsx`
- Test: `src/pages/ContentPages.test.tsx`

**Approach:**
- Compose the page with existing shared UI building blocks (`Container`, `GlassPanel`, `SectionHeading`, `ConstellationField`) while keeping page-specific structure in `OpcPage`.
- Treat `Now` as a compact, explicit state block that sits near the top and gives the fastest "where are we / what changed" answer.
- Render stages as the primary timeline spine. Each stage shows its own signals and optional local judgment, with signals carrying the three required semantics: what happened, what it means, and where to go next.
- Render `Topics`, `Terms`, and `Cases` as anchored sections on the same page, with `Topics` visually and structurally strongest.
- Use the shared hash-scroll hook so direct links like `projects/opc#topics` and `projects/opc#cases` land on the right section.

**Patterns to follow:**
- `src/pages/ProjectsPage.tsx` for hero and card composition on a page-scoped entry surface
- `src/pages/WritingPage.tsx` for anchored sections and in-page navigation
- `src/pages/ProjectDetailPage.tsx` only for overall page shell rhythm, not for content shape

**Test scenarios:**
- Happy path: the page renders a top-level OPC heading, a compact `Now` block, and the current judgment.
- Happy path: the page renders 3-5 stages and each stage exposes 1-3 signals.
- Happy path: the page renders `Topics`, `Terms`, and `Cases` sections with stable anchor ids.
- Edge case: a stage without a local judgment still renders correctly while the global judgment remains visible.
- Edge case: optional fan-out sections with fewer items still render without broken headings or dead placeholder cards.
- Integration: navigating directly to `projects/opc#topics`, `#terms`, or `#cases` triggers the expected scroll behavior.

**Verification:**
- A reader can arrive at `projects/opc`, identify the current stage, and continue to a deeper section without first reading a wall of prose.

- [x] **Unit 4: Rewire entry points and evidence links**

**Goal:** Keep existing site entry points working while turning OPC into a real observation console with evidence links.

**Requirements:** R1-R3, R10-R16

**Dependencies:** Unit 1, Unit 3

**Files:**
- Modify: `src/content/site.ts`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/OpcPage.tsx`
- Test: `src/pages/HomePage.test.tsx`
- Test: `src/pages/ContentPages.test.tsx`

**Approach:**
- Keep the Home featured project and browse links pointing at `projects/opc`, but update any surrounding copy that still frames OPC as a static topic page instead of an observation console.
- Ensure the Projects page teaser card reflects metadata from `opcProjectMeta` so Home and Projects stay aligned.
- In the Cases section, branch cleanly between internal writing routes and external writing URLs using the same pattern already used on writing list surfaces.
- Make `Topics` the strongest reading path in page hierarchy and interaction copy, with `Terms` and `Cases` clearly framed as support layers.

**Patterns to follow:**
- `src/pages/HomePage.tsx` browse cards and featured project rendering
- `src/pages/WritingPage.tsx` internal/external destination branching

**Test scenarios:**
- Happy path: the home featured project card still links to `projects/opc`.
- Happy path: the Home browse link for OPC still lands on the canonical route.
- Happy path: Projects page teaser card still shows OPC and routes to `projects/opc`.
- Happy path: internal Cases open the existing writing detail route, and external Cases open the configured external URL.
- Edge case: if a Case is internal, the UI does not render external-link attributes; if external, it does.

**Verification:**
- Existing site entry points keep working, and Cases reuse current writing destinations instead of duplicating article storage.

- [x] **Unit 5: Refresh regression coverage for the replaced OPC behavior**

**Goal:** Replace old OPC detail-page assertions with control-console regression coverage and lock the new interaction seams.

**Requirements:** R1-R16

**Dependencies:** Unit 2, Unit 3, Unit 4

**Files:**
- Modify: `src/app/router.test.tsx`
- Modify: `src/pages/ContentPages.test.tsx`
- Modify: `src/components/layout/Layout.test.tsx`

**Approach:**
- Remove test expectations that assert the old overview/roadmap/glossary detail-page layout and replace them with control-console expectations.
- Add direct regression coverage for route precedence, same-page hash behavior, and Cases-to-writing navigation so the replacement is intentional rather than incidental.
- Use the content-model invariants from Unit 1 as the earliest failure point for invalid ids or broken case wiring; use route/page tests for the user-visible behavior above that layer.

**Execution note:** Write regression tests before deleting old OPC detail assertions so the replacement behavior is explicit rather than implied by snapshot drift.

**Patterns to follow:**
- `src/pages/ContentPages.test.tsx` for page-level integration coverage
- `src/components/layout/Layout.test.tsx` for hash-only navigation behavior

**Test scenarios:**
- Regression: `/projects/opc` no longer renders `Project Entry` framing or the old section titles from the generic detail page.
- Regression: `/projects/opc` renders the new `Now` block, current judgment, stage timeline, and anchored fan-out sections.
- Regression: route precedence still preserves not-found behavior for unknown project slugs.
- Integration: hash-only navigation on the OPC page does not trigger scroll-to-top behavior from the layout shell.
- Integration: at least one full reader path is covered, stage -> signal -> target section or case destination.

**Verification:**
- The test suite clearly describes the new control-console contract and would fail if the page regressed back toward the old generic project-detail shape.

## System-Wide Impact

- **Interaction graph:** Home featured project, Home browse link, Projects teaser card, static OPC route, shared hash-scroll hook, and Writing destinations all participate in the same reader journey.
- **Error propagation:** Broken target wiring should fail first in content-model tests, then in page integration tests if the visual wiring drifts.
- **State lifecycle risks:** hash-only navigation must not trigger layout scroll-to-top; duplicated metadata must not drift between teaser surfaces and the console.
- **API surface parity:** generic project detail behavior for non-OPC slugs and existing Writing routes remain unchanged.
- **Integration coverage:** route precedence, hash scroll, and case-link branching need integration tests because unit tests alone would not prove the reader journey.
- **Unchanged invariants:** `src/pages/ProjectDetailPage.tsx` continues to serve non-OPC projects only; `src/content/writing.ts` remains the only article/evidence content source; `src/components/layout/Layout.tsx` keeps current pathname/hash scroll semantics.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| OPC teaser metadata drifts from console metadata | Store teaser metadata in `src/content/opc.ts` and project it into `src/content/projects.ts` instead of duplicating strings |
| Static route split accidentally breaks non-OPC project detail routes | Add route-precedence and unknown-slug regression tests before landing the split |
| Hash links feel flaky or silently fail | Reuse a tested shared hook and validate section ids/content targets in content and page tests |
| Cases become a shadow content system | Restrict v1 Cases to writing-entry destinations and keep standalone case content out of scope |

## Documentation / Operational Notes

- If the teaser copy in `src/content/site.ts` changes meaningfully, refresh any nearby wording in the homepage and Projects surfaces so they all describe OPC as a control surface, not a static topic hub.
- No deployment, monitoring, or rollout changes are required beyond the existing static site build.

## Sources & References

- **Origin document:** `docs/brainstorms/2026-04-11-opc-observation-console-requirements.md`
- Related code: `src/app/router.tsx`, `src/content/projects.ts`, `src/content/writing.ts`, `src/pages/WritingPage.tsx`, `src/pages/ProjectDetailPage.tsx`
- Related tests: `src/app/router.test.tsx`, `src/pages/ContentPages.test.tsx`, `src/components/layout/Layout.test.tsx`
