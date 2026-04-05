# React Portfolio Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current VitePress site with a React + Tailwind CSS + Framer Motion portfolio site that uses the approved Cyber-Wave global layout, reorganizes the content into portfolio-first sections, and incorporates the user-provided SVG artwork.

**Architecture:** The site will move from a `docs/`-hosted VitePress app to a root-level Vite React TypeScript app. Content will live in typed `src/content/*.ts` modules instead of a docs-first directory tree, while a shared `Layout` component will provide the global midnight-blue theme, sticky glassmorphism navbar, and lightweight sine-wave background; optimized derivatives of `SVG1.svg` and `SVG2.svg` will be used for hero and section artwork while keeping the original files in the repo as source assets.

**Tech Stack:** Node.js 22, npm, Vite, React, React Router, TypeScript, Tailwind CSS, Framer Motion, Vitest, Testing Library, SVGO, GitHub Pages

---

## File Map

### Files to create

- `index.html`
- `vite.config.ts`
- `tsconfig.json`
- `src/vite-env.d.ts`
- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/router.tsx`
- `src/styles/globals.css`
- `src/components/layout/Layout.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/SineWaveBg.tsx`
- `src/components/ui/Container.tsx`
- `src/components/ui/GlassPanel.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/content/site.ts`
- `src/content/projects.ts`
- `src/content/writing.ts`
- `src/content/profile.ts`
- `src/pages/HomePage.tsx`
- `src/pages/ProjectsPage.tsx`
- `src/pages/ProjectDetailPage.tsx`
- `src/pages/WritingPage.tsx`
- `src/pages/WritingDetailPage.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/ContactPage.tsx`
- `src/pages/NotFoundPage.tsx`
- `src/test/setup.ts`
- `src/test/renderWithRouter.tsx`
- `src/app/App.test.tsx`
- `src/components/layout/Layout.test.tsx`
- `src/app/router.test.tsx`
- `src/pages/HomePage.test.tsx`
- `src/pages/ContentPages.test.tsx`
- `svgo.config.mjs`
- `src/assets/visuals/svg1-optimized.svg`
- `src/assets/visuals/svg2-optimized.svg`
- `public/CNAME`
- `public/serein.jpg`

### Files to modify

- `package.json`
- `package-lock.json`
- `.gitignore`
- `.github/workflows/deploy.yml`
- `README.md`

### Files to remove after the React build and preview pass

- `docs/index.md`
- `docs/about/index.md`
- `docs/guides/index.md`
- `docs/notes/index.md`
- `docs/opc/index.md`
- `docs/opc/roadmap/index.md`
- `docs/opc/glossary/index.md`
- `docs/updates/index.md`
- `docs/public/CNAME`
- `docs/public/serein.jpg`
- `docs/.vitepress/config.mts`
- `docs/.vitepress/theme/index.ts`
- `docs/.vitepress/theme/custom.css`

### Files to keep untouched

- `SVG1.svg`
- `SVG2.svg`
- `docs/superpowers/specs/2026-04-05-portfolio-react-migration-design.md`
- `docs/superpowers/plans/2026-04-05-react-portfolio-migration.md`

---

### Task 1: Replace the VitePress toolchain with a React/Vite/Tailwind testable app shell

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.gitignore`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `src/vite-env.d.ts`
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/test/setup.ts`
- Create: `src/app/App.test.tsx`
- Test: `npm run test -- src/app/App.test.tsx`
- Test: `npm run build`

- [ ] **Step 1: Rewrite `package.json` for the React app**

Replace the existing VitePress manifest with scripts and dependencies in this shape:

```json
{
  "name": "sine-io.github.io",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=22.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "assets:optimize": "mkdir -p src/assets/visuals && svgo --config=svgo.config.mjs SVG1.svg -o src/assets/visuals/svg1-optimized.svg && svgo --config=svgo.config.mjs SVG2.svg -o src/assets/visuals/svg2-optimized.svg"
  }
}
```

Install runtime deps:

- `react`
- `react-dom`
- `react-router-dom`
- `framer-motion`

Install dev deps:

- `vite`
- `@vitejs/plugin-react`
- `typescript`
- `@types/react`
- `@types/react-dom`
- `tailwindcss`
- `@tailwindcss/vite`
- `vitest`
- `jsdom`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `svgo`

- [ ] **Step 2: Update ignore rules for the new frontend build**

Replace VitePress-specific ignore rules with:

```gitignore
.worktrees/
node_modules/
dist/
coverage/
```

Do not ignore `public/`, `src/assets/visuals/`, or the root SVG source files.

- [ ] **Step 3: Create the base Vite and TypeScript config**

Create `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true
  }
})
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

Create `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 4: Create the HTML entrypoint and minimal app root**

Create `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>sine-io</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `src/main.tsx`:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/app/App'
import '@/styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

Create `src/app/App.tsx` as a temporary shell that will survive later refactors:

```tsx
export function App() {
  return <div className="min-h-screen bg-[#0A1128] text-[#A6B4CD]">sine-io</div>
}
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Write the first failing smoke test**

Create `src/app/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders the site brand', () => {
    render(<App />)
    expect(screen.getByText('sine-io')).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Install dependencies and verify the smoke test passes**

Run: `npm install`  
Expected: `package-lock.json` updated with React/Vite/Tailwind/Vitest dependencies

Run: `npm run test -- src/app/App.test.tsx`  
Expected: PASS

Run: `npm run build`  
Expected: PASS and `dist/` generated

- [ ] **Step 7: Commit the toolchain swap**

Run:

```bash
git add package.json package-lock.json .gitignore index.html vite.config.ts tsconfig.json src/vite-env.d.ts src/main.tsx src/app/App.tsx src/test/setup.ts src/app/App.test.tsx
git commit -m "chore: scaffold React portfolio app shell"
```

---

### Task 2: Implement the global Cyber-Wave layout, navbar, and sine-wave background

**Files:**
- Create: `src/styles/globals.css`
- Create: `src/components/layout/Layout.tsx`
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/SineWaveBg.tsx`
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/layout/Layout.test.tsx`
- Modify: `src/app/App.tsx`
- Test: `npm run test -- src/components/layout/Layout.test.tsx src/app/App.test.tsx`

- [ ] **Step 1: Write the failing layout test**

Create `src/components/layout/Layout.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Layout } from './Layout'

describe('Layout', () => {
  it('renders the sticky brand nav, background layer, and child content', () => {
    render(
      <Layout>
        <p>child content</p>
      </Layout>
    )

    expect(screen.getByRole('link', { name: /sine-io/i })).toBeInTheDocument()
    expect(screen.getByTestId('sine-wave-bg')).toBeInTheDocument()
    expect(screen.getByText('child content')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to confirm it fails**

Run: `npm run test -- src/components/layout/Layout.test.tsx`  
Expected: FAIL because `Layout` does not exist yet

- [ ] **Step 3: Add the global CSS and design tokens**

Create `src/styles/globals.css` using Tailwind v4 plus global theme rules:

```css
@import "tailwindcss";

:root {
  color: #a6b4cd;
  background-color: #0a1128;
  color-scheme: dark;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

html {
  background-color: #0a1128;
}

body {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(93, 227, 233, 0.09), transparent 30%),
    radial-gradient(circle at 80% 20%, rgba(133, 130, 225, 0.12), transparent 25%),
    #0a1128;
  color: #a6b4cd;
}

#root {
  min-height: 100vh;
}
```

This step is where the user's locked requirement is satisfied:

- `body` background `#0A1128`
- `body` text color `#A6B4CD`

- [ ] **Step 4: Implement `Navbar`, `SineWaveBg`, `Container`, and `Layout`**

Create `src/components/ui/Container.tsx`:

```tsx
import type { PropsWithChildren } from 'react'

export function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">{children}</div>
}
```

Create `src/components/layout/Navbar.tsx`:

```tsx
import { NavLink } from 'react-router-dom'
import { Container } from '@/components/ui/Container'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <NavLink to="/" className="text-sm font-semibold uppercase tracking-[0.35em] text-white">
            sine-io
          </NavLink>
          <div className="hidden gap-6 text-sm md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="text-[#A6B4CD] transition hover:text-white">
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  )
}
```

Create `src/components/layout/SineWaveBg.tsx`:

```tsx
export function SineWaveBg() {
  return (
    <div
      aria-hidden="true"
      data-testid="sine-wave-bg"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-15"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M-40 180C120 80 260 80 420 180C580 280 720 280 880 180C1040 80 1180 80 1340 180C1500 280 1640 280 1800 180" stroke="#5DE3E9" strokeWidth="2" />
        <path d="M-80 360C80 260 220 260 380 360C540 460 680 460 840 360C1000 260 1140 260 1300 360C1460 460 1600 460 1760 360" stroke="#75B3E1" strokeWidth="2" />
        <path d="M-20 580C140 480 280 480 440 580C600 680 740 680 900 580C1060 480 1200 480 1360 580C1520 680 1660 680 1820 580" stroke="#8582E1" strokeWidth="2" />
      </svg>
    </div>
  )
}
```

Create `src/components/layout/Layout.tsx`:

```tsx
import type { PropsWithChildren } from 'react'
import { Navbar } from './Navbar'
import { SineWaveBg } from './SineWaveBg'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SineWaveBg />
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
```

- [ ] **Step 5: Wrap the app shell in `Layout`**

Update `src/app/App.tsx`:

```tsx
import { Layout } from '@/components/layout/Layout'

export function App() {
  return (
    <Layout>
      <div className="py-24 text-center">sine-io</div>
    </Layout>
  )
}
```

- [ ] **Step 6: Run tests to verify the layout shell passes**

Run: `npm run test -- src/components/layout/Layout.test.tsx src/app/App.test.tsx`  
Expected: PASS

- [ ] **Step 7: Commit the global shell**

Run:

```bash
git add src/styles/globals.css src/components/layout/Layout.tsx src/components/layout/Navbar.tsx src/components/layout/SineWaveBg.tsx src/components/ui/Container.tsx src/components/layout/Layout.test.tsx src/app/App.tsx
git commit -m "feat: add Cyber-Wave global layout shell"
```

---

### Task 3: Define the typed content model and route structure

**Files:**
- Create: `src/content/site.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/writing.ts`
- Create: `src/content/profile.ts`
- Create: `src/app/router.tsx`
- Create: `src/test/renderWithRouter.tsx`
- Create: `src/app/router.test.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/ProjectsPage.tsx`
- Create: `src/pages/ProjectDetailPage.tsx`
- Create: `src/pages/WritingPage.tsx`
- Create: `src/pages/WritingDetailPage.tsx`
- Create: `src/pages/AboutPage.tsx`
- Create: `src/pages/ContactPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/components/layout/Layout.tsx`
- Test: `npm run test -- src/app/router.test.tsx`

- [ ] **Step 1: Write the failing router test**

Create `src/app/router.test.tsx`:

```tsx
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('router', () => {
  it('renders the home page at /', () => {
    renderWithRouter('/')
    expect(screen.getByRole('heading', { name: /Cyber-Wave/i })).toBeInTheDocument()
  })

  it('renders the OPC project page at /projects/opc', () => {
    renderWithRouter('/projects/opc')
    expect(screen.getByRole('heading', { name: 'OPC' })).toBeInTheDocument()
  })

  it('renders the writing index at /writing', () => {
    renderWithRouter('/writing')
    expect(screen.getByRole('heading', { name: 'Writing' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to confirm it fails**

Run: `npm run test -- src/app/router.test.tsx`  
Expected: FAIL because the router, pages, and content modules do not exist yet

- [ ] **Step 3: Create typed content modules**

Create `src/content/site.ts` with shared nav and hero copy:

```ts
export const siteMeta = {
  name: 'sine-io',
  title: 'Cyber-Wave Portfolio',
  description: 'Performance testing, tooling notes, and long-running technical projects.'
}
```

Create `src/content/projects.ts` with at least one internal project:

```ts
export type Project = {
  slug: string
  title: string
  summary: string
  tags: string[]
  sections: Array<{ title: string; body: string[] }>
}

export const projects: Project[] = [
  {
    slug: 'opc',
    title: 'OPC',
    summary: 'A long-running topic hub for glossary, roadmap, and design notes.',
    tags: ['Research', 'Roadmap', 'Glossary'],
    sections: [
      { title: 'Overview', body: ['这里作为 OPC 相关内容的入口，先建立统一语境，再逐步补上路线图、术语和专题拆解。'] },
      { title: 'Roadmap', body: ['近期：明确问题域和目标边界。', '中期：补齐核心专题与案例。', '后续：沉淀可复用的方法、术语和参考资料。'] },
      { title: 'Glossary', body: ['这页收集 OPC 相关术语的工作定义，先求统一理解，后续再逐步补充背景和示例。'] }
    ]
  }
]
```

Create `src/content/writing.ts` with a merged model:

```ts
export type WritingEntry = {
  slug: string
  title: string
  category: 'guide' | 'note' | 'update'
  summary: string
  externalUrl?: string
  body?: string[]
}

export const writingEntries: WritingEntry[] = [
  {
    slug: 'cosbench-guide',
    title: '简明 COSBench 教程',
    category: 'guide',
    summary: '外部教程站点，聚焦对象存储性能测试的部署、配置与结果理解。',
    externalUrl: 'https://sine-io.github.io/byte-of-cosbench/'
  },
  {
    slug: 'vdbench-guide',
    title: '简明 Vdbench 教程',
    category: 'guide',
    summary: '外部教程站点，整理文件存储性能测试中常用参数、模型和排查路径。',
    externalUrl: 'https://sine-io.github.io/byte-of-vdbench/'
  }
]
```

Create `src/content/profile.ts` with about/contact data and `src/content/site.ts` if additional CTA/nav metadata is needed.

- [ ] **Step 4: Create page components with stable headings**

Create page files with the minimum headings required by the tests:

- `HomePage.tsx` -> heading `Cyber-Wave`
- `ProjectsPage.tsx` -> heading `Projects`
- `ProjectDetailPage.tsx` -> lookup `projects` by `slug`
- `WritingPage.tsx` -> heading `Writing`
- `WritingDetailPage.tsx` -> only render entries that do not have `externalUrl`
- `AboutPage.tsx` -> heading `About`
- `ContactPage.tsx` -> heading `Contact`
- `NotFoundPage.tsx` -> heading `Page not found`

- [ ] **Step 5: Create the router and test helper**

Create `src/app/router.tsx` with:

```tsx
import { createBrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom'
```

Define:

- root route using `Layout`
- child routes for `/`, `/projects`, `/projects/:slug`, `/writing`, `/writing/:slug`, `/about`, `/contact`
- wildcard `*` -> `NotFoundPage`

Export:

- `router` for production
- `createTestRouter(initialEntries: string[])` for tests

Update `src/components/layout/Layout.tsx` so it can act as the router shell:

```tsx
import type { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { SineWaveBg } from './SineWaveBg'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SineWaveBg />
      <Navbar />
      <main>{children ?? <Outlet />}</main>
    </div>
  )
}
```

Create `src/test/renderWithRouter.tsx`:

```tsx
import { render } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'
import { createTestRouter } from '@/app/router'

export function renderWithRouter(path: string) {
  const router = createTestRouter([path])
  return render(<RouterProvider router={router} />)
}
```

Update `src/app/App.tsx` to:

```tsx
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export function App() {
  return <RouterProvider router={router} />
}
```

- [ ] **Step 6: Run the router tests**

Run: `npm run test -- src/app/router.test.tsx`  
Expected: PASS

- [ ] **Step 7: Commit the content model and routing skeleton**

Run:

```bash
git add src/content/site.ts src/content/projects.ts src/content/writing.ts src/content/profile.ts src/app/router.tsx src/test/renderWithRouter.tsx src/app/router.test.tsx src/pages/HomePage.tsx src/pages/ProjectsPage.tsx src/pages/ProjectDetailPage.tsx src/pages/WritingPage.tsx src/pages/WritingDetailPage.tsx src/pages/AboutPage.tsx src/pages/ContactPage.tsx src/pages/NotFoundPage.tsx src/app/App.tsx src/components/layout/Layout.tsx
git commit -m "feat: add portfolio routing and content model"
```

---

### Task 4: Build the actual portfolio pages and migrate the existing VitePress copy into them

**Files:**
- Modify: `src/content/projects.ts`
- Modify: `src/content/writing.ts`
- Modify: `src/content/profile.ts`
- Modify: `src/content/site.ts`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/ProjectsPage.tsx`
- Modify: `src/pages/ProjectDetailPage.tsx`
- Modify: `src/pages/WritingPage.tsx`
- Modify: `src/pages/WritingDetailPage.tsx`
- Modify: `src/pages/AboutPage.tsx`
- Modify: `src/pages/ContactPage.tsx`
- Create: `src/components/ui/GlassPanel.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/pages/HomePage.test.tsx`
- Create: `src/pages/ContentPages.test.tsx`
- Test: `npm run test -- src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx`

- [ ] **Step 1: Write the failing page tests**

Create `src/pages/HomePage.test.tsx`:

```tsx
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('HomePage', () => {
  it('shows the hero copy, featured projects, and selected writing sections', () => {
    renderWithRouter('/')
    expect(screen.getByText(/性能测试、工具拆解与 OPC 知识沉淀/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Featured Projects/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Selected Writing/i })).toBeInTheDocument()
  })
})
```

Create `src/pages/ContentPages.test.tsx`:

```tsx
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('content pages', () => {
  it('lists OPC on the projects page', () => {
    renderWithRouter('/projects')
    expect(screen.getByText('OPC')).toBeInTheDocument()
  })

  it('groups writing entries from guides, notes, and updates', () => {
    renderWithRouter('/writing')
    expect(screen.getByText('简明 COSBench 教程')).toBeInTheDocument()
    expect(screen.getByText('简明 Vdbench 教程')).toBeInTheDocument()
  })

  it('renders the about and contact pages', () => {
    renderWithRouter('/about')
    expect(screen.getByText(/SineCelia/)).toBeInTheDocument()
    renderWithRouter('/contact')
    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the page tests to verify they fail**

Run: `npm run test -- src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx`  
Expected: FAIL because the pages are still placeholders

- [ ] **Step 3: Add reusable presentation primitives**

Create `src/components/ui/GlassPanel.tsx`:

```tsx
import type { PropsWithChildren } from 'react'

export function GlassPanel({ children }: PropsWithChildren) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-md">
      {children}
    </div>
  )
}
```

Create `src/components/ui/SectionHeading.tsx`:

```tsx
type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-white">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-[#A6B4CD]">{description}</p> : null}
    </div>
  )
}
```

- [ ] **Step 4: Migrate the existing docs copy into typed content**

Populate the content modules with the approved mapping:

- `docs/index.md` -> homepage intro, hero, featured writing, photo caption
- `docs/guides/index.md` -> `guide` items in `writingEntries`
- `docs/notes/index.md` -> `note` items in `writingEntries`
- `docs/updates/index.md` -> `update` items in `writingEntries`
- `docs/about/index.md` -> `profile`
- `docs/opc/index.md`, `docs/opc/roadmap/index.md`, `docs/opc/glossary/index.md` -> `projects`

The migrated objects should be readable in code, for example:

```ts
export const homeContent = {
  eyebrow: 'Cyber-Wave',
  title: '性能测试、工具拆解与 OPC 知识沉淀',
  intro: '欢迎来到我的博客，我非常高兴你停留在这里！',
  featuredWritingSlugs: ['cosbench-guide', 'vdbench-guide'],
  featuredProjectSlugs: ['opc']
}
```

- [ ] **Step 5: Replace the placeholder pages with real section layouts**

Implement:

- `HomePage.tsx` with:
  - hero section
  - intro copy
  - featured projects
  - selected writing
  - photo callout
  - contact callout
- `ProjectsPage.tsx` with cards for `projects`
- `ProjectDetailPage.tsx` with section rendering from project content
- `WritingPage.tsx` with grouped cards by `category`
- `WritingDetailPage.tsx` for internal-only entries
- `AboutPage.tsx` from `profile`
- `ContactPage.tsx` with external links

Use `GlassPanel`, `SectionHeading`, and `Container` so the visual language stays consistent.

- [ ] **Step 6: Run the page tests**

Run: `npm run test -- src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx`  
Expected: PASS

- [ ] **Step 7: Run the full test suite**

Run: `npm run test`  
Expected: PASS

- [ ] **Step 8: Commit the migrated portfolio pages**

Run:

```bash
git add src/content/site.ts src/content/projects.ts src/content/writing.ts src/content/profile.ts src/components/ui/GlassPanel.tsx src/components/ui/SectionHeading.tsx src/pages/HomePage.tsx src/pages/ProjectsPage.tsx src/pages/ProjectDetailPage.tsx src/pages/WritingPage.tsx src/pages/WritingDetailPage.tsx src/pages/AboutPage.tsx src/pages/ContactPage.tsx src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx
git commit -m "feat: migrate VitePress content into portfolio pages"
```

---

### Task 5: Integrate the user-provided SVGs into the site and derive lighter production assets

**Files:**
- Create: `svgo.config.mjs`
- Create: `src/assets/visuals/svg1-optimized.svg`
- Create: `src/assets/visuals/svg2-optimized.svg`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/ProjectsPage.tsx`
- Modify: `src/pages/WritingPage.tsx`
- Modify: `src/pages/HomePage.test.tsx`
- Modify: `src/pages/ContentPages.test.tsx`
- Test: `npm run assets:optimize`
- Test: `npm run test -- src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx`
- Test: `npm run build`

- [ ] **Step 1: Write failing assertions for the visual assets**

Extend `src/pages/HomePage.test.tsx` with:

```tsx
expect(screen.getByTestId('hero-art')).toBeInTheDocument()
```

Extend `src/pages/ContentPages.test.tsx` with:

```tsx
renderWithRouter('/projects')
expect(screen.getByTestId('projects-art')).toBeInTheDocument()
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test -- src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx`  
Expected: FAIL because the visual assets are not rendered yet

- [ ] **Step 3: Add SVGO config and generate optimized derivatives**

Create `svgo.config.mjs`:

```js
export default {
  multipass: true,
  plugins: [
    'preset-default',
    {
      name: 'removeDimensions',
      active: true
    },
    {
      name: 'cleanupIds',
      active: true
    }
  ]
}
```

Run: `npm run assets:optimize`  
Expected: `src/assets/visuals/svg1-optimized.svg` and `src/assets/visuals/svg2-optimized.svg` created from `SVG1.svg` and `SVG2.svg`

Do not overwrite the originals in the repo root.

- [ ] **Step 4: Use the optimized SVGs in the page compositions**

Update `HomePage.tsx` to import `svg1-optimized.svg` and render it as hero artwork:

```tsx
import heroArt from '@/assets/visuals/svg1-optimized.svg'

<img
  data-testid="hero-art"
  src={heroArt}
  alt=""
  aria-hidden="true"
  className="pointer-events-none absolute inset-y-0 right-0 h-full max-w-[42rem] object-contain opacity-70"
/>
```

Update `ProjectsPage.tsx` or `WritingPage.tsx` to import `svg2-optimized.svg` and render a section/header artwork:

```tsx
import sectionArt from '@/assets/visuals/svg2-optimized.svg'

<img
  data-testid="projects-art"
  src={sectionArt}
  alt=""
  aria-hidden="true"
  className="pointer-events-none absolute right-0 top-0 h-56 object-contain opacity-50"
/>
```

This step satisfies the user requirement that the two SVGs be used in the project while still allowing file-size adjustment.

- [ ] **Step 5: Re-run tests and the production build**

Run: `npm run test -- src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx`  
Expected: PASS

Run: `npm run build`  
Expected: PASS and optimized SVG assets emitted into the build output

- [ ] **Step 6: Commit the SVG integration**

Run:

```bash
git add svgo.config.mjs src/assets/visuals/svg1-optimized.svg src/assets/visuals/svg2-optimized.svg src/pages/HomePage.tsx src/pages/ProjectsPage.tsx src/pages/WritingPage.tsx src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx
git commit -m "feat: integrate Cyber-Wave SVG artwork"
```

---

### Task 6: Wire Framer Motion into the final page shell and section transitions

**Files:**
- Modify: `src/components/layout/Layout.tsx`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/ProjectsPage.tsx`
- Modify: `src/pages/ProjectDetailPage.tsx`
- Modify: `src/pages/WritingPage.tsx`
- Modify: `src/pages/WritingDetailPage.tsx`
- Modify: `src/pages/AboutPage.tsx`
- Modify: `src/pages/ContactPage.tsx`
- Test: `npm run test`
- Test: `npm run build`

- [ ] **Step 1: Add a simple motion wrapper to the layout**

Update `Layout.tsx` to use `framer-motion` for page entry:

```tsx
import { motion } from 'framer-motion'
```

Wrap the `main` region:

```tsx
<main>
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
</main>
```

- [ ] **Step 2: Add restrained motion to hero and card sections**

Apply one of these patterns on page sections:

```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.2 }}
transition={{ duration: 0.5 }}
```

Do not add:

- continuous pulsing
- glitch effects
- aggressive looping

- [ ] **Step 3: Run regression checks**

Run: `npm run test`  
Expected: PASS

Run: `npm run build`  
Expected: PASS

- [ ] **Step 4: Commit the motion pass**

Run:

```bash
git add src/components/layout/Layout.tsx src/pages/HomePage.tsx src/pages/ProjectsPage.tsx src/pages/ProjectDetailPage.tsx src/pages/WritingPage.tsx src/pages/WritingDetailPage.tsx src/pages/AboutPage.tsx src/pages/ContactPage.tsx
git commit -m "feat: add restrained Cyber-Wave motion"
```

---

### Task 7: Update GitHub Pages deployment, move static assets, and remove VitePress leftovers

**Files:**
- Modify: `.github/workflows/deploy.yml`
- Modify: `README.md`
- Modify: `.gitignore`
- Create: `public/CNAME`
- Create: `public/serein.jpg`
- Remove: `docs/index.md`
- Remove: `docs/about/index.md`
- Remove: `docs/guides/index.md`
- Remove: `docs/notes/index.md`
- Remove: `docs/opc/index.md`
- Remove: `docs/opc/roadmap/index.md`
- Remove: `docs/opc/glossary/index.md`
- Remove: `docs/updates/index.md`
- Remove: `docs/public/CNAME`
- Remove: `docs/public/serein.jpg`
- Remove: `docs/.vitepress/config.mts`
- Remove: `docs/.vitepress/theme/index.ts`
- Remove: `docs/.vitepress/theme/custom.css`
- Test: `npm run build`
- Test: `find dist -maxdepth 2 -type f | sort`

- [ ] **Step 1: Move public assets out of `docs/public`**

Copy:

- `docs/public/CNAME` -> `public/CNAME`
- `docs/public/serein.jpg` -> `public/serein.jpg`

Keep the file contents unchanged:

- `public/CNAME` should still contain `sineio.top`

- [ ] **Step 2: Rewrite the Pages workflow for the Vite build**

Update `.github/workflows/deploy.yml` to:

- rename the workflow to something React/Vite-specific
- run `npm ci`
- run `npm run build`
- upload `dist` instead of `docs/.vitepress/dist`

The build job should end with:

```yaml
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
```

- [ ] **Step 3: Update the README for the new app**

Rewrite `README.md` so it describes:

- what the site is now
- `npm install`
- `npm run dev`
- `npm run test`
- `npm run build`
- where content and visual assets live

- [ ] **Step 4: Remove the old VitePress content and config**

Delete the files listed in the task header after confirming the React pages already contain the migrated content.

Keep:

- `docs/superpowers/specs/...`
- `docs/superpowers/plans/...`

- [ ] **Step 5: Run the final build verification**

Run: `npm run build`  
Expected: PASS

Run: `find dist -maxdepth 2 -type f | sort`  
Expected: includes at least:

- `dist/index.html`
- `dist/CNAME`
- emitted JS/CSS assets
- emitted optimized SVG assets and/or hashed asset equivalents

- [ ] **Step 6: Commit the deployment and cleanup work**

Run:

```bash
git add .github/workflows/deploy.yml README.md public/CNAME public/serein.jpg .gitignore
git rm docs/index.md docs/about/index.md docs/guides/index.md docs/notes/index.md docs/opc/index.md docs/opc/roadmap/index.md docs/opc/glossary/index.md docs/updates/index.md docs/public/CNAME docs/public/serein.jpg docs/.vitepress/config.mts docs/.vitepress/theme/index.ts docs/.vitepress/theme/custom.css
git commit -m "refactor: replace VitePress site with React portfolio"
```

---

### Task 8: Final verification and release-ready smoke check

**Files:**
- No source changes expected unless verification fails
- Test: `npm run test`
- Test: `npm run build`
- Test: `npm run preview -- --host 127.0.0.1 --port 4173`

- [ ] **Step 1: Run the complete automated verification**

Run: `npm run test`  
Expected: PASS

Run: `npm run build`  
Expected: PASS

- [ ] **Step 2: Run the local preview**

Run: `npm run preview -- --host 127.0.0.1 --port 4173`  
Expected: local preview starts without errors

Manual checks in the browser:

- homepage loads on midnight blue `#0A1128`
- body text renders in `#A6B4CD`
- navbar is sticky and glassmorphic
- `sine-io` text logo is visible
- `SineWaveBg` is low-opacity and non-distracting
- `SVG1` is visible on the homepage hero
- `SVG2` is visible on an inner list page
- content has been moved to `Home`, `Projects`, `Writing`, `About`, `Contact`

- [ ] **Step 3: If verification fails, fix the smallest failing surface and re-run checks**

Do not broaden scope. Fix only the failing area, then rerun:

```bash
npm run test
npm run build
```

- [ ] **Step 4: Commit the final verification pass if code changed**

If any verification fixes were needed, run:

```bash
git add <changed-files>
git commit -m "fix: polish React portfolio migration"
```

If no code changed, skip this commit.
