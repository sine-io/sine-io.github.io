# VitePress Migration Design

Date: 2026-03-26
Repository: `sine-io.github.io`
Status: Approved in conversation, pending user review of written spec

## Summary

This repository will migrate from Hugo to VitePress and continue deploying through GitHub Pages with a custom GitHub Actions workflow.

The new site is a knowledge-first personal site:

- Primary goal: publish and maintain technical knowledge efficiently
- Secondary goal: preserve a light personal-brand presence
- Content focus: tutorials, notes, OPC project documentation, progress updates, and case studies

The migration should preserve the current homepage tone and existing content where practical, while reorganizing the site into a cleaner, more maintainable information architecture.

## Current Context

The current Hugo site is small and lightly coupled:

- Site config is minimal
- Homepage content lives in `content/_index.md`
- A homepage image lives in `content/serein.jpg`
- Existing public tutorial paths include `byte-of-cosbench` and `byte-of-vdbench`

This makes migration feasible without a large content-conversion project.

## Goals

- Replace Hugo with a framework better suited to a knowledge-centered site on GitHub Pages
- Keep authoring simple and Markdown-first
- Preserve existing homepage content and overall tone as much as possible
- Keep content organized by stable sections instead of a generic blog stream
- Prefer a clean content directory structure over a flat URL layout
- Preserve legacy tutorial links through compatibility pages

## Non-Goals

- Building a highly custom application-style frontend
- Introducing server-side rendering or backend dependencies
- Rewriting all existing content during the initial migration
- Designing a large tag or taxonomy system in the first iteration

## Framework Decision

Chosen framework: `VitePress`

Reasoning:

- It best matches the primary requirement: simple, efficient maintenance for a knowledge-heavy site
- It is Markdown-first and well suited to documentation, tutorials, and structured technical writing
- It has an official GitHub Pages deployment path
- It leaves room for light homepage and theme customization without forcing a fully custom frontend architecture

Alternatives considered:

- `Astro`: stronger layout freedom, but higher setup and maintenance cost than needed for the current priority
- `Eleventy`: lightweight and stable, but less ergonomic than VitePress for a documentation-centered technical knowledge site

## Audience

Priority order:

1. General technical readers and engineers
2. Storage and performance-testing practitioners
3. Potential employers or collaborators

This audience mix supports a knowledge-first structure with a modest personal layer rather than a portfolio-first design.

## Content Model

The initial site should support these content types:

- Tutorials and long-form guides
- Notes and short-form technical fragments
- OPC documentation and roadmap content
- Weekly, monthly, or milestone-based updates
- Case studies, experiment writeups, and retrospectives

## Site Structure

Top navigation:

- Home
- Guides
- Notes
- OPC
- Updates
- About

Rationale:

- Keep navigation compact and readable
- Avoid overly generic names such as `Docs`
- Make `OPC` a first-class section because it is the central subject area
- Keep `About` present but secondary

## Information Architecture

Recommended source layout:

```text
docs/
  index.md
  about.md
  guides/
    index.md
    byte-of-cosbench.md
    byte-of-vdbench.md
  notes/
    index.md
  opc/
    index.md
    roadmap.md
    glossary.md
  updates/
    index.md
  public/
    serein.jpg
  .vitepress/
    config.mts
    theme/
```

Section intent:

- `index.md`: homepage with retained introduction, photo, featured guides, OPC focus, and recent updates
- `guides/`: long-form tutorial content
- `notes/`: short technical notes and fragments
- `opc/`: structured OPC project knowledge, roadmap, terminology, and design records
- `updates/`: progress logs, weekly notes, milestone updates
- `about.md`: personal summary and external links

## Homepage Direction

The homepage should not remain a simple reverse-chronological blog page.

Instead, it should become a lightweight knowledge hub with the existing human tone preserved:

1. Intro section with current greeting, short positioning, and photo
2. Featured tutorials section highlighting core guides
3. OPC focus section describing current work
4. Recent updates section
5. About / external links section

The existing copy should be reused where possible and edited only as needed for structure.

## URL Strategy

Primary rule: prefer a clean directory structure for canonical content locations.

Canonical tutorial paths:

- `/guides/byte-of-cosbench`
- `/guides/byte-of-vdbench`

Compatibility paths to preserve old links:

- `/byte-of-cosbench`
- `/byte-of-vdbench`

Compatibility handling:

- Keep a lightweight compatibility page at each legacy path
- Each compatibility page should redirect visitors to the new canonical path
- The canonical guide content should live only once, inside `guides/`

This balances clean structure with backward compatibility.

## Content Preservation Rules

- Preserve the homepage greeting and overall tone
- Preserve the homepage photo
- Preserve the existing COSBench and Vdbench guide content
- Avoid aggressive rewriting during initial migration
- Focus first on structural migration, then on later editorial refinement

## Deployment Design

Deployment target: GitHub Pages

Deployment method:

- GitHub Actions custom workflow
- Build command: `vitepress build docs`
- Output directory: `docs/.vitepress/dist`
- Deploy from the repository default branch through the official GitHub Pages Actions flow

Repository considerations:

- This is a user site repository (`sine-io.github.io`)
- If the site continues using the custom domain `sineio.top`, the base path should remain simple
- The workflow should remain framework-agnostic and not depend on Hugo

## Migration Phases

### Phase 1: Framework skeleton

- Add `package.json`
- Add VitePress dependencies and scripts
- Add `.vitepress/config.mts`
- Add GitHub Pages deployment workflow

### Phase 2: Core content migration

- Move homepage content into `docs/index.md`
- Move image asset into `docs/public/`
- Create `guides/`, `notes/`, `opc/`, `updates/`, and `about.md`

### Phase 3: URL compatibility

- Create compatibility pages for old tutorial paths
- Ensure the new canonical paths are linked from navigation and index pages

### Phase 4: Visual refinement

- Add a lightly customized homepage
- Preserve simplicity over visual complexity
- Improve section landing pages as content indexes

## Initial Content Priorities

The first migrated content should be:

1. Homepage
2. About page
3. COSBench guide
4. Vdbench guide
5. OPC section skeleton
6. Notes and Updates section indexes

This order preserves current public value before expanding the site.

## Risks

- Legacy links could break if compatibility pages are omitted or misconfigured
- VitePress content organization can drift if too many sections are introduced early
- Recreating the homepage too aggressively could remove the personal tone that currently works

## Decisions Locked In

- Use `VitePress`
- Knowledge-first site, personal branding secondary
- Navigation: Home, Guides, Notes, OPC, Updates, About
- Clean content directories preferred over flat paths
- Preserve old tutorial links using compatibility pages
- Preserve existing homepage content and image where practical
- Deploy with GitHub Actions to GitHub Pages

## Next Step

After user review of this document, create a detailed implementation plan for the migration and then execute it in phases.
