# VitePress Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Hugo site with a VitePress site on GitHub Pages while preserving the existing homepage tone, image, and public guide URLs through compatibility pages.

**Architecture:** The site will move to a `docs/`-based VitePress structure with a lightweight custom theme layer for homepage styling and navigation. GitHub Actions will build `docs/.vitepress/dist` and deploy it to GitHub Pages, while legacy guide URLs will remain as redirect pages that point to the canonical `guides/` routes.

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
- `docs/guides/byte-of-cosbench.md`
- `docs/guides/byte-of-vdbench.md`
- `docs/notes/index.md`
- `docs/opc/index.md`
- `docs/opc/roadmap/index.md`
- `docs/opc/glossary/index.md`
- `docs/updates/index.md`
- `docs/byte-of-cosbench.md`
- `docs/byte-of-vdbench.md`
- `docs/public/serein.jpg`
- `docs/public/CNAME`
- `docs/.vitepress/config.mts`
- `docs/.vitepress/theme/index.ts`
- `docs/.vitepress/theme/custom.css`

### Files to modify

- `.gitignore`

### Files to remove after VitePress build passes

- `archetypes/default.md`
- `assets/img/index.jpg`
- `config/_default/config.toml`
- `config/_default/languages.zh-cn.toml`
- `config/_default/markup.toml`
- `config/_default/menus.zh-cn.toml`
- `config/_default/module.toml`
- `content/_index.md`
- `content/serein.jpg`
- `go.mod`
- `go.sum`
- `hugo.toml`
- `resources/_gen/`

### Existing content dependency

The repository currently does **not** contain the source body for `byte-of-cosbench` or `byte-of-vdbench`. Execution must pause at Task 3 if those guide sources cannot be recovered from local files, git history, or user-provided exports.

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

### Task 3: Recover or import the existing guide sources before canonical migration

**Files:**
- Inspect: repository working tree and git history
- Potential Create/Modify: `docs/guides/byte-of-cosbench.md`, `docs/guides/byte-of-vdbench.md`
- Test: source discovery commands and a successful `npm run docs:build`

- [ ] **Step 1: Search the repository for existing guide source**

Run:

```bash
rg --files -g '*byte-of-cosbench*' -g '*byte-of-vdbench*' .
find . -maxdepth 4 \( -path '*/public*' -o -path '*/byte-of-cosbench*' -o -path '*/byte-of-vdbench*' \) -print
git log --all --stat -- '*byte-of-cosbench*' '*byte-of-vdbench*'
```

Expected: either source files are found, or the search confirms the guides are absent from the repository history available locally.

- [ ] **Step 2: Stop if the guide source is still unavailable**

If Step 1 does not produce guide source bodies:

- do **not** invent or paraphrase the missing guide content
- ask the user for exported Markdown/HTML/plaintext source for both guides
- do **not** continue to Tasks 4-6 until the source is available or the user explicitly approves shipping placeholder guides

- [ ] **Step 3: Normalize recovered guide content into canonical Markdown files**

Once source is available, create:

- `docs/guides/byte-of-cosbench.md`
- `docs/guides/byte-of-vdbench.md`

Each file should include:

- a title
- a short description
- cleaned headings
- normalized Markdown links
- no Hugo shortcode dependencies

- [ ] **Step 4: Build after importing guide content**

Run: `npm run docs:build`
Expected: PASS with both guides included in the output

- [ ] **Step 5: Commit the recovered guides**

Run:

```bash
git add docs/guides/byte-of-cosbench.md docs/guides/byte-of-vdbench.md
git commit -m "feat: import guide content into VitePress"
```

---

### Task 4: Migrate the homepage content, image, and site metadata

**Files:**
- Create: `docs/public/serein.jpg`
- Create: `docs/public/CNAME`
- Modify: `docs/index.md`
- Modify: `docs/about.md`
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
git add docs/index.md docs/about.md docs/public/serein.jpg docs/public/CNAME docs/.vitepress/config.mts
git commit -m "feat: migrate homepage and site metadata"
```

---

### Task 5: Add legacy URL compatibility pages and guide indexes

**Files:**
- Modify: `docs/guides/index.md`
- Create: `docs/byte-of-cosbench.md`
- Create: `docs/byte-of-vdbench.md`
- Test: `npm run docs:build`

- [ ] **Step 1: Finish the Guides index**

Update `docs/guides/index.md` to link to:

- `/guides/byte-of-cosbench`
- `/guides/byte-of-vdbench`

Use short descriptions for each guide rather than a bare link list.

- [ ] **Step 2: Create legacy compatibility page for COSBench**

Create `docs/byte-of-cosbench.md` with this pattern:

```md
---
title: 页面已迁移
head:
  - - meta
    - http-equiv: refresh
      content: 0; url=/guides/byte-of-cosbench/
  - - link
    - rel: canonical
      href: https://sineio.top/guides/byte-of-cosbench/
---

# 页面已迁移

新版地址：[/guides/byte-of-cosbench/](/guides/byte-of-cosbench/)
```

- [ ] **Step 3: Create legacy compatibility page for Vdbench**

Create `docs/byte-of-vdbench.md` using the same pattern, pointing to `/guides/byte-of-vdbench/`.

- [ ] **Step 4: Verify compatibility routes build**

Run: `npm run docs:build`
Expected: PASS and output includes:

- `byte-of-cosbench/index.html`
- `byte-of-vdbench/index.html`
- `guides/byte-of-cosbench/index.html`
- `guides/byte-of-vdbench/index.html`

- [ ] **Step 5: Commit the compatibility pages**

Run:

```bash
git add docs/guides/index.md docs/byte-of-cosbench.md docs/byte-of-vdbench.md
git commit -m "feat: preserve legacy guide URLs"
```

---

### Task 6: Remove Hugo-specific files and verify the replacement end to end

**Files:**
- Delete: `archetypes/default.md`
- Delete: `assets/img/index.jpg`
- Delete: `config/_default/config.toml`
- Delete: `config/_default/languages.zh-cn.toml`
- Delete: `config/_default/markup.toml`
- Delete: `config/_default/menus.zh-cn.toml`
- Delete: `config/_default/module.toml`
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
- legacy compatibility pages
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
- Verify `docs/.vitepress/dist/byte-of-cosbench/index.html` exists
- Verify `docs/.vitepress/dist/guides/byte-of-cosbench/index.html` exists
- Verify `docs/.vitepress/dist/byte-of-vdbench/index.html` exists
- Verify `docs/.vitepress/dist/guides/byte-of-vdbench/index.html` exists

## Execution Notes

- Execute Tasks 1 and 2 first; they are independent of guide source recovery
- Task 3 is the hard gate for the canonical guide content
- Do not delete Hugo files until Tasks 1-5 have passed build verification
- If the guide source remains unavailable, stop after Task 2 and ask the user how they want to proceed
