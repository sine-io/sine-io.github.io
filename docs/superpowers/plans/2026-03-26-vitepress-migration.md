# VitePress Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Hugo site with a VitePress site on GitHub Pages while preserving the existing homepage tone, image, and external guide entry points.

**Architecture:** The site will move to a `docs/`-based VitePress structure with a lightweight custom theme layer for homepage styling and navigation. GitHub Actions will build `docs/.vitepress/dist` and deploy it to GitHub Pages, while the COSBench and Vdbench tutorials remain in their dedicated external repositories and are linked from this site as external guides.

**Tech Stack:** Node.js 22, npm, VitePress 1.6.4, GitHub Actions, GitHub Pages

---

## File Map

### Files to create

- `.github/workflows/deploy.yml`
- `package.json`
- `package-lock.json`
- `docs/index.md`
- `docs/about/index.md`
- `docs/guides/index.md`
- `docs/notes/index.md`
- `docs/opc/index.md`
- `docs/opc/roadmap/index.md`
- `docs/opc/glossary/index.md`
- `docs/updates/index.md`
- `docs/public/serein.jpg`
- `docs/public/CNAME`
- `docs/.vitepress/config.mts`
- `docs/.vitepress/theme/index.ts`
- `docs/.vitepress/theme/custom.css`

### Files to modify

- `.gitignore`

### Files to remove after VitePress build passes

- `.github/workflows/hugo.yaml`
- `.hugo_build.lock`
- `archetypes/default.md`
- `assets/img/index.jpg`
- `config/_default/config.toml`
- `config/_default/languages.zh-cn.toml`
- `config/_default/markup.toml`
- `config/_default/menus.zh-cn.toml`
- `config/_default/module.toml`
- `config/_default/params.toml`
- `content/_index.md`
- `content/serein.jpg`
- `go.mod`
- `go.sum`
- `hugo.toml`
- `resources/_gen/`

### External guide dependency

The COSBench and Vdbench tutorials live in dedicated external repositories and published documentation sites:

- `https://github.com/sine-io/byte-of-cosbench`
- `https://github.com/sine-io/byte-of-vdbench`
- `https://sine-io.github.io/byte-of-cosbench/`
- `https://sine-io.github.io/byte-of-vdbench/`

This repository should link to those external guides rather than duplicating or importing their full bodies.

---

### Task 1: Scaffold the VitePress toolchain and deployment pipeline

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `.github/workflows/deploy.yml`
- Modify: `.gitignore`
- Test: local install and build commands from repository root

- [ ] **Step 1: Create the npm package manifest**

Create `package.json` with:

```json
{
  "name": "sine-io.github.io",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=22.0.0"
  },
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "1.6.4"
  }
}
```

- [ ] **Step 2: Update ignore rules for the Node/VitePress toolchain**

Append these entries to `.gitignore` if they are not already present:

```gitignore
node_modules/
docs/.vitepress/cache/
docs/.vitepress/dist/
```

- [ ] **Step 3: Install dependencies and generate the lockfile**

Run: `npm install`
Expected: `package-lock.json` created and `vitepress` installed successfully

- [ ] **Step 4: Add the GitHub Pages workflow**

Create `.github/workflows/deploy.yml` using the official Pages action flow with these key sections:

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - uses: actions/configure-pages@v5
      - run: npm ci
      - run: npm run docs:build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 5: Verify the skeleton install works**

Run: `npm run docs:build`
Expected: PASS using VitePress default configuration because `docs/` exists, even though `docs/.vitepress/config.mts` has not been added yet

- [ ] **Step 6: Commit the scaffold**

Run:

```bash
git add .gitignore package.json package-lock.json .github/workflows/deploy.yml
git commit -m "chore: scaffold VitePress toolchain"
```

---

### Task 2: Create the VitePress site shell and section landing pages

**Files:**
- Create: `docs/.vitepress/config.mts`
- Create: `docs/.vitepress/theme/index.ts`
- Create: `docs/.vitepress/theme/custom.css`
- Create: `docs/index.md`
- Create: `docs/about/index.md`
- Create: `docs/guides/index.md`
- Create: `docs/notes/index.md`
- Create: `docs/opc/index.md`
- Create: `docs/opc/roadmap/index.md`
- Create: `docs/opc/glossary/index.md`
- Create: `docs/updates/index.md`
- Test: `npm run docs:build`

- [ ] **Step 1: Add the VitePress config**

Create `docs/.vitepress/config.mts` with this starter shape:

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'SineIO',
  description: '重要的东西用眼睛是看不见的，只有用心才能看得清楚。',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://sineio.top'
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/guides/' },
      { text: '笔记', link: '/notes/' },
      { text: 'OPC', link: '/opc/' },
      { text: '更新', link: '/updates/' },
      { text: '关于', link: '/about/' }
    ],
    sidebar: {
      '/guides/': [
        {
          text: '教程',
          items: []
        }
      ],
      '/opc/': [
        {
          text: 'OPC',
          items: [
            { text: '总览', link: '/opc/' },
            { text: '路线图', link: '/opc/roadmap/' },
            { text: '术语表', link: '/opc/glossary/' }
          ]
        }
      ],
      '/updates/': [
        {
          text: '更新',
          items: [{ text: '更新索引', link: '/updates/' }]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sine-io' },
      { icon: 'x', link: 'https://x.com/SineCelia' }
    ]
  }
})
```

Use GitHub Pages-safe directory routes for non-root landing pages so links like `/about/`, `/opc/roadmap/`, and `/opc/glossary/` resolve on a plain static host.

- [ ] **Step 2: Add a minimal theme entry**

Create `docs/.vitepress/theme/index.ts` as:

```ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

- [ ] **Step 3: Add light custom styling**

Create `docs/.vitepress/theme/custom.css` for:

- a compact homepage hero
- content cards or callouts for featured sections
- consistent spacing for the landing page sections

Keep the styling light; do not turn the site into a heavily bespoke frontend.

- [ ] **Step 4: Create section landing pages**

Create these files with short, useful intros and placeholder indexes:

- `docs/guides/index.md`
- `docs/notes/index.md`
- `docs/opc/index.md`
- `docs/opc/roadmap/index.md`
- `docs/opc/glossary/index.md`
- `docs/updates/index.md`
- `docs/about/index.md`

Each page should have:

- a top-level title
- one short paragraph describing the section
- a minimal list of current or planned content

- [ ] **Step 5: Create the new homepage shell**

Create `docs/index.md` using VitePress frontmatter such as:

```md
---
layout: home

hero:
  name: SineIO
  text: 性能测试、工具拆解与 OPC 知识沉淀
  tagline: 保留现有站点的个人语气，但把首页重构为知识入口页
  actions:
    - theme: brand
      text: 查看教程
      link: /guides/
    - theme: alt
      text: 关注 OPC
      link: /opc/
---
```

Below the hero, add sections for:

- current intro copy
- featured guides
- OPC focus
- recent updates
- about / external links

- [ ] **Step 6: Verify the site shell builds**

Run: `npm run docs:build`
Expected: PASS with generated files under `docs/.vitepress/dist`

- [ ] **Step 7: Commit the site shell**

Run:

```bash
git add docs/.vitepress docs/index.md docs/about docs/guides docs/notes docs/opc docs/updates
git commit -m "feat: create VitePress site shell"
```

---

### Task 3: Confirm external guide mode and published URLs

**Files:**
- Inspect: repository working tree and git history
- Modify: `docs/superpowers/plans/2026-03-26-vitepress-migration.md`
- Test: source discovery commands and validation of external tutorial URLs

- [ ] **Step 1: Search the repository for local guide source**

Run:

```bash
rg --files -g '*byte-of-cosbench*' -g '*byte-of-vdbench*' .
find . -maxdepth 4 \( -path '*/public*' -o -path '*/byte-of-cosbench*' -o -path '*/byte-of-vdbench*' \) -print
git log --all --stat -- '*byte-of-cosbench*' '*byte-of-vdbench*'
```

Expected: search confirms the guide bodies are absent from this repository history.

- [ ] **Step 2: Confirm the external-guide decision with the user**

If Step 1 confirms the source bodies are absent:

- do **not** invent or paraphrase the missing guide content
- confirm whether the guides should remain external
- if the user confirms external-guide mode, proceed without importing guide bodies

- [ ] **Step 3: Record the external guide URLs in the plan and implementation context**

Record these as the canonical guide destinations for this site:

- `https://sine-io.github.io/byte-of-cosbench/`
- `https://sine-io.github.io/byte-of-vdbench/`

- `docs/guides/index.md` and `docs/index.md` should link to those external URLs
- this repository should not create local duplicates or redirect pages for those guides
- the existing project-page URLs should remain owned by their dedicated repositories

- [ ] **Step 4: Commit the plan adjustment if needed**

Run:

```bash
git add docs/superpowers/plans/2026-03-26-vitepress-migration.md
git commit -m "docs: record external guide mode"
```

---

### Task 4: Migrate the homepage content, image, and site metadata

**Files:**
- Create: `docs/public/serein.jpg`
- Create: `docs/public/CNAME`
- Modify: `docs/index.md`
- Modify: `docs/about/index.md`
- Modify: `docs/.vitepress/config.mts`
- Test: `npm run docs:build`

- [ ] **Step 1: Move the homepage image into VitePress public assets**

Copy `content/serein.jpg` to `docs/public/serein.jpg`.

- [ ] **Step 2: Preserve the current homepage copy**

Move the human-facing text from `content/_index.md` into the VitePress homepage sections.

Keep:

- the welcome tone
- the COSBench/Vdbench explanation
- the photo credit

Convert Hugo shortcode usage into standard Markdown or HTML supported by VitePress.

- [ ] **Step 3: Pull across author metadata that still matters**

From the existing Hugo config, carry over:

- site title `SineIO`
- site description
- GitHub link
- X link

Do **not** attempt to replicate every Hugo theme toggle or menu behavior.

- [ ] **Step 4: Preserve the custom domain**

Create `docs/public/CNAME` containing:

```text
sineio.top
```

- [ ] **Step 5: Verify homepage and metadata migration**

Run: `npm run docs:build`
Expected: PASS and output includes:

- `index.html`
- `about/index.html`
- `_headers`-style VitePress assets
- copied `serein.jpg`
- copied `CNAME`

- [ ] **Step 6: Commit the migrated homepage**

Run:

```bash
git add docs/index.md docs/about docs/public/serein.jpg docs/public/CNAME docs/.vitepress/config.mts
git commit -m "feat: migrate homepage and site metadata"
```

---

### Task 5: Link external tutorial sites from the homepage and guide index

**Files:**
- Modify: `docs/guides/index.md`
- Modify: `docs/index.md`
- Test: `npm run docs:build`

- [ ] **Step 1: Finish the Guides index**

Update `docs/guides/index.md` to link to:

- `https://sine-io.github.io/byte-of-cosbench/`
- `https://sine-io.github.io/byte-of-vdbench/`

Use short descriptions for each guide rather than a bare link list, and clearly mark them as external tutorial sites.

- [ ] **Step 2: Update homepage featured-guide links**

Update `docs/index.md` so the featured-guide section links directly to the external tutorial sites rather than placeholder internal routes.

- [ ] **Step 3: Verify external-guide links build cleanly**

Run: `npm run docs:build`
Expected: PASS and output includes:

- `guides/index.html`
- homepage and guide index pages with outbound links to the external tutorial URLs
- no locally generated `guides/byte-of-cosbench` or `guides/byte-of-vdbench` pages

- [ ] **Step 4: Commit the external guide links**

Run:

```bash
git add docs/guides/index.md docs/index.md
git commit -m "feat: link external guide sites"
```

---

### Task 6: Remove Hugo-specific files and verify the replacement end to end

**Files:**
- Delete: `.github/workflows/hugo.yaml`
- Delete: `.hugo_build.lock`
- Delete: `archetypes/default.md`
- Delete: `assets/img/index.jpg`
- Delete: `config/_default/config.toml`
- Delete: `config/_default/languages.zh-cn.toml`
- Delete: `config/_default/markup.toml`
- Delete: `config/_default/menus.zh-cn.toml`
- Delete: `config/_default/module.toml`
- Delete: `config/_default/params.toml`
- Delete: `content/_index.md`
- Delete: `content/serein.jpg`
- Delete: `go.mod`
- Delete: `go.sum`
- Delete: `hugo.toml`
- Delete: `resources/_gen/`
- Test: `npm run docs:build`

- [ ] **Step 1: Remove obsolete Hugo source files**

Delete the Hugo config, content, and generated image assets listed above after the VitePress build is already green.

- [ ] **Step 2: Confirm no Hugo-specific references remain**

Run:

```bash
rg -n "hugo|shortcode|Congo|jpanther" .
```

Expected: only plan/spec/history references remain, not live site files.

- [ ] **Step 3: Run the final site build**

Run: `npm run docs:build`
Expected: PASS with no dependency on Hugo or Go modules

- [ ] **Step 4: Inspect the built output**

Run:

```bash
find docs/.vitepress/dist -maxdepth 3 | sort
```

Expected: output includes:

- top-level homepage
- guides, notes, opc, updates, about sections
- `assets/`
- `CNAME`
- `serein.jpg`

- [ ] **Step 5: Commit the migration cleanup**

Run:

```bash
git add -A
git commit -m "refactor: replace Hugo site with VitePress"
```

---

## Verification Checklist

- `npm install`
- `npm run docs:build`
- Inspect `docs/.vitepress/dist`
- Verify `docs/.vitepress/dist/CNAME` exists
- Verify `docs/.vitepress/dist/guides/index.html` exists
- Verify `docs/.vitepress/dist/about/index.html` exists
- Verify `docs/.vitepress/dist/opc/roadmap/index.html` exists
- Verify `docs/.vitepress/dist/opc/glossary/index.html` exists
- Verify `docs/.vitepress/dist/serein.jpg` exists

## Execution Notes

- Execute Tasks 1 and 2 first; they are independent of the external guide links
- Task 3 records the external-guide decision and URLs
- Do not delete Hugo files until Tasks 1-5 have passed build verification
