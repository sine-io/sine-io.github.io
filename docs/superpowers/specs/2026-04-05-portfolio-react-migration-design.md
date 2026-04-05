# React Portfolio Migration Design

Date: 2026-04-05
Repository: `sine-io.github.io`
Status: Approved in conversation

## Supersedes Prior Plan

This design supersedes `docs/superpowers/specs/2026-03-26-vitepress-migration-design.md`.

The repository currently contains a VitePress site, but the approved direction is now:

- migrate the site to `Vite + React`
- style it with `Tailwind CSS`
- animate it with `Framer Motion`
- reorganize the information architecture into a portfolio-oriented site
- incorporate the user-provided `SVG1.svg` and `SVG2.svg` into the visual system

## Summary

The site will become a portfolio-first static React site with a Cyber-Wave visual identity.

The design goal is not a generic docs site. It is a personal portfolio and writing hub with:

- a strong visual identity based on midnight blue, electric cyan, ice blue, and blue-violet accents
- a lightweight but noticeable motion system
- a reusable global layout with a glassmorphism navbar and abstract sine-wave background
- content reorganized around `Home`, `Projects`, `Writing`, `About`, and `Contact`

The current VitePress content is small enough to be migrated and rewritten into this new structure without preserving the VitePress information architecture.

## Current Context

Current repository state:

- package manager: `npm`
- framework: `VitePress`
- content lives in `docs/`
- public image: `docs/public/serein.jpg`
- current sections: `guides`, `notes`, `updates`, `about`, `opc`
- two new visual source assets were added at repo root:
  - `SVG1.svg`
  - `SVG2.svg`

Observed SVG characteristics:

- both files are large, roughly 6-7 MB each
- both use deep navy backgrounds and dense blue/cyan/purple line work
- both contain very large path counts and are too heavy to use as-is for persistent page background layers

This means the migration should preserve and use them as source artwork, but derive lighter web-facing assets from them.

## Goals

- Replace the VitePress site with a React portfolio site
- Match the overall look and mood of `SVG1.svg` and `SVG2.svg`
- Use those SVGs directly in the project, while allowing optimization or simplification when needed
- Create a reusable global layout that establishes the Cyber-Wave identity
- Preserve the useful content already in the repository, but reorganize it into portfolio-oriented sections
- Keep deployment suitable for GitHub Pages
- Keep the site static and simple to host

## Non-Goals

- Adding a backend, database, or CMS
- Recreating the old VitePress docs experience inside React
- Preserving the old URL and section structure exactly
- Shipping the original 6-7 MB SVG files directly as always-on full-page backgrounds

## Chosen Stack

- Build tool: `Vite`
- UI: `React`
- Routing: `React Router`
- Styling: `Tailwind CSS`
- Motion: `Framer Motion`

Rationale:

- `Vite` keeps the static site fast and simple
- `React` fits the requested component-driven portfolio architecture
- `Tailwind CSS` is a good match for a layered glassmorphism UI
- `Framer Motion` supports subtle page and component transitions without custom animation plumbing

## Audience

Priority order:

1. Potential employers, collaborators, and recruiters
2. Engineers interested in performance testing and storage tooling
3. Readers following OPC-related notes and project progress

This audience mix justifies a portfolio-first homepage with a writing section rather than a docs-first landing page.

## Brand and Visual Direction

The approved visual identity is `Cyber-Wave`.

Core characteristics:

- midnight-blue base
- low-saturation cold text
- electric cyan and blue-violet highlights
- layered wave-like or contour-like line art
- translucent glass panels over a dark field
- subtle motion rather than aggressive cyberpunk noise

### Locked global theme values

- `body` background: `#0A1128`
- default text color: `#A6B4CD`

Recommended accent palette, derived from the two SVGs:

- electric cyan: `#5DE3E9`
- ice blue: `#75B3E1`
- blue-violet: `#8582E1`
- soft highlight: `#A6DEFC`
- deep panel tones: `#111936`, `#0F1730`

## SVG Integration Strategy

The user explicitly wants the overall site to match the style of the two SVGs and wants the SVGs used in the project.

Approved strategy:

- keep `SVG1.svg` and `SVG2.svg` in the repository as source artwork
- generate lighter derived assets from them for production usage when necessary
- do not use the raw originals as persistent full-screen page backgrounds

Recommended usage:

- `SVG1.svg`: homepage hero artwork or large focal composition
- `SVG2.svg`: section header or inner-page decorative artwork
- a separate lightweight `SineWaveBg` component: an abstract background layer inspired by the line language of the source SVGs

Performance rule:

- if the raw SVGs are too heavy for a specific page context, optimize, crop, or simplify them before use
- the requirement is to use them in the project and align the whole site style to them, not to ship them untouched at all times

## Information Architecture

Top-level navigation:

- `Home`
- `Projects`
- `Writing`
- `About`
- `Contact`

Rationale:

- more suitable for a personal portfolio than the current docs taxonomy
- keeps writing visible without letting the whole site feel like documentation
- makes personal identity and project work easier to understand at a glance

## Content Migration Strategy

Existing content will be migrated into the new structure instead of preserving the old categories as first-class navigation items.

### Mapping

- `docs/index.md` -> `Home`
- `docs/guides/index.md` -> `Writing` entries tagged as guides
- `docs/notes/index.md` -> `Writing` entries tagged as notes
- `docs/updates/index.md` -> `Writing` entries tagged as updates
- `docs/about/index.md` -> `About`
- `docs/opc/index.md` -> `Projects` overview entry for the OPC topic
- `docs/opc/roadmap/index.md` -> nested OPC project detail content
- `docs/opc/glossary/index.md` -> nested OPC project detail content

### Content model

Initial migration should favor a lightweight static content model:

- structured data modules for metadata and page assembly
- Markdown or MDX-backed long-form content where useful

The key requirement is that the content be easy to migrate now and easy to extend later. The implementation may begin with typed data modules for smaller pages and selectively use Markdown/MDX for detail pages.

## Route Structure

Recommended routes:

- `/`
- `/projects`
- `/projects/:slug`
- `/writing`
- `/writing/:slug`
- `/about`
- `/contact`

If a more lightweight first iteration is needed, the initial milestone may ship with a narrower set of detail pages as long as the structure is ready for expansion.

## Global Layout Design

The reusable application shell should include:

- global body colors
- a background layer component
- a sticky navigation bar
- a centered content container
- page-level motion wrappers

### `SineWaveBg`

Requirements locked in from the user request:

- component name: `SineWaveBg`
- abstract sine-wave visualization
- may use SVG or pure CSS
- positioned absolutely
- `z-index: -1`
- low visual weight, around `15%` opacity

Design intent:

- reference the flowing line language of the two SVGs
- remain subtle enough to avoid competing with text
- work across the whole site, not just the homepage

### `Navbar`

Requirements locked in from the user request:

- sticky to the top
- glassmorphism effect
- use Tailwind classes equivalent to:
  - `backdrop-blur-md`
  - `bg-black/30`
  - a subtle bottom border
- include the text logo `sine-io`

Recommended navbar behavior:

- keep the brand at the left
- keep primary nav links at the right on desktop
- collapse cleanly on small screens if needed
- remain visually lightweight so the hero section still dominates the first screen

### Layout tone

The layout should feel:

- dark
- cold
- clean
- slightly luminous
- technical, but not noisy

## Homepage Design

The homepage should act as the strongest expression of the Cyber-Wave brand.

Recommended sections:

1. Hero
   - personal positioning
   - CTA into projects and writing
   - optimized use of `SVG1.svg`
2. Featured Projects
   - include OPC as a flagship topic/project
3. Selected Writing
   - guides, notes, and recent updates in one unified stream or grouped preview
4. Short About preview
5. Contact callout

## Projects Design

`Projects` should hold:

- portfolio projects
- long-running technical initiatives
- OPC as a project/topic hub rather than a standalone top-nav docs section

The OPC project detail can include subsections or child links for:

- overview
- roadmap
- glossary

## Writing Design

`Writing` consolidates the content that is currently split across:

- guides
- notes
- updates

The distinction should remain visible through labels, tags, or section grouping rather than through separate top-level navigation.

## About and Contact

`About` should evolve from the current repository copy into a more portfolio-oriented page with:

- a concise self-introduction
- focus areas
- tools and domains
- writing and project interests

`Contact` should include:

- GitHub
- X
- email or placeholder for later email addition

## Motion System

Motion should support the brand without distracting from readability.

Recommended motion style:

- gentle fade and rise on section entry
- slow background drift or parallax on visual layers
- subtle hover elevation for cards
- restrained highlight sweeps or glow shifts

Avoid:

- flashy glitch effects
- high-frequency motion
- constant pulsing across many elements at once

## Suggested Source Layout

```text
src/
  app/
    router.tsx
  assets/
    visuals/
      svg1-optimized.svg
      svg2-optimized.svg
  components/
    layout/
      Layout.tsx
      Navbar.tsx
      SineWaveBg.tsx
    ui/
  content/
    projects/
    writing/
    profile/
  pages/
    HomePage.tsx
    ProjectsPage.tsx
    ProjectDetailPage.tsx
    WritingPage.tsx
    WritingDetailPage.tsx
    AboutPage.tsx
    ContactPage.tsx
  styles/
    globals.css
```

This is directional, not mandatory, but the final implementation should keep layout, page, and content concerns clearly separated.

## Migration Phases

### Phase 1: Replace the framework shell

- remove VitePress-specific app structure
- install React, Tailwind CSS, Framer Motion, and router dependencies
- establish the Vite React entrypoint

### Phase 2: Establish the global design system

- implement global theme tokens and base styles
- implement `Layout`
- implement `Navbar`
- implement `SineWaveBg`
- wire in page transitions

### Phase 3: Build primary pages

- `Home`
- `Projects`
- `Writing`
- `About`
- `Contact`

### Phase 4: Migrate existing content

- port current homepage copy where still relevant
- convert guides, notes, and updates into `Writing`
- convert OPC content into project-oriented detail content
- migrate the photo asset

### Phase 5: Integrate optimized SVG artwork

- inspect raw SVGs
- optimize or crop them if needed
- integrate them into hero and section compositions
- verify that the result stays performant on typical laptop and mobile viewport sizes

### Phase 6: Final polish

- responsive adjustments
- motion refinement
- accessibility review
- deployment verification

## Acceptance Criteria

- the repository no longer depends on VitePress for the site frontend
- the site runs on React, Tailwind CSS, and Framer Motion
- global body styling uses `#0A1128` background and `#A6B4CD` text
- a `SineWaveBg` component exists and is used in the layout
- a sticky glassmorphism `Navbar` exists and includes the `sine-io` logo text
- the overall visual system clearly reflects the mood and palette of `SVG1.svg` and `SVG2.svg`
- both SVG source files are used in the project directly or through optimized derivatives
- current repository content is migrated into the new portfolio-oriented information architecture
- the result remains suitable for static deployment

## Risks

- the raw SVGs may remain too heavy unless carefully simplified
- content migration can become inconsistent if the new labels and page types are not defined clearly
- a visually strong homepage can reduce readability if the background and hero art are not layered carefully

## Decisions Locked In

- migrate away from VitePress
- use `Vite + React + Tailwind CSS + Framer Motion`
- portfolio-first structure, not docs-first structure
- navigation: `Home`, `Projects`, `Writing`, `About`, `Contact`
- `body` background `#0A1128`
- default text color `#A6B4CD`
- include `SineWaveBg`
- include sticky glassmorphism `Navbar` with `sine-io`
- use `SVG1.svg` and `SVG2.svg` as real visual sources in the final site
- optimize those SVGs when necessary for web performance

## Next Step

After user review of this document, write a detailed implementation plan for the migration and then execute the work in phases.
