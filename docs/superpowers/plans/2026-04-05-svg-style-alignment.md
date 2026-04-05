# SVG Style Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Push the migrated React portfolio closer to the original `SVG1.svg` / `SVG2.svg` mood by strengthening the starfield, constellation, cold-tech panel styling, and page-top composition while preserving readability.

**Architecture:** Keep the current React/Tailwind/Framer Motion structure intact and layer the new look through shared visual primitives plus page-level composition updates. Use one reusable constellation overlay component, strengthen global field/panel styling, and then apply those primitives to Home, Projects, Writing, About, Contact, and detail pages in a controlled way.

**Tech Stack:** Vite, React, React Router, Tailwind CSS, Framer Motion, Vitest, Testing Library

---

## File Map

### Files to create

- `src/components/ui/ConstellationField.tsx`

### Files to modify

- `src/styles/globals.css`
- `src/components/ui/GlassPanel.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/ProjectsPage.tsx`
- `src/pages/WritingPage.tsx`
- `src/pages/ProjectDetailPage.tsx`
- `src/pages/WritingDetailPage.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/ContactPage.tsx`
- `src/pages/HomePage.test.tsx`
- `src/pages/ContentPages.test.tsx`

### Files to keep unchanged

- `src/content/site.ts`
- `src/content/projects.ts`
- `src/content/writing.ts`
- `src/content/profile.ts`
- `src/assets/visuals/svg1-optimized.svg`
- `src/assets/visuals/svg2-optimized.svg`

---

### Task 1: Upgrade the shared cosmic field and panel language

**Files:**
- Create: `src/components/ui/ConstellationField.tsx`
- Modify: `src/styles/globals.css`
- Modify: `src/components/ui/GlassPanel.tsx`
- Modify: `src/components/ui/SectionHeading.tsx`
- Test: `npm run test -- src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx`

- [ ] **Step 1: Extend the failing page tests to look for the new shared visual language**

Update `src/pages/HomePage.test.tsx` to require a constellation layer on the homepage:

```tsx
expect(screen.getByTestId('home-constellation')).toBeInTheDocument()
```

Update `src/pages/ContentPages.test.tsx` to require a constellation layer on the Projects page:

```tsx
renderWithRouter('/projects')
expect(screen.getByTestId('projects-constellation')).toBeInTheDocument()
```

- [ ] **Step 2: Run the tests to confirm they fail**

Run: `npm run test -- src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx`  
Expected: FAIL because the constellation overlay does not exist yet

- [ ] **Step 3: Create a reusable constellation overlay**

Create `src/components/ui/ConstellationField.tsx` with a small typed API:

```tsx
type StarNode = {
  cx: number
  cy: number
  r?: number
}

type StarPath = {
  d: string
}

type ConstellationFieldProps = {
  className?: string
  nodes: StarNode[]
  paths: StarPath[]
  testId?: string
}
```

Implementation requirements:

- render a decorative `svg`
- keep `alt=""` by using `aria-hidden="true"`
- use low-opacity cyan/blue-white stars
- use thin connecting lines only
- no labels, no literal astronomy chart text

- [ ] **Step 4: Strengthen the global field**

Update `src/styles/globals.css` so the background is still `#0A1128` but layered with a much quieter astronomical field:

```css
body {
  min-height: 100vh;
  background:
    radial-gradient(circle at 18% 14%, rgba(79, 151, 220, 0.12), transparent 24%),
    radial-gradient(circle at 76% 18%, rgba(111, 102, 223, 0.13), transparent 20%),
    radial-gradient(circle at 55% 78%, rgba(83, 207, 233, 0.08), transparent 24%),
    #0A1128;
  color: #A6B4CD;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 8% 16%, rgba(255,255,255,0.35) 0 1px, transparent 2px),
    radial-gradient(circle at 22% 44%, rgba(166, 222, 252, 0.28) 0 1px, transparent 2px),
    radial-gradient(circle at 78% 30%, rgba(255,255,255,0.28) 0 1px, transparent 2px),
    radial-gradient(circle at 64% 72%, rgba(93, 227, 233, 0.22) 0 1px, transparent 2px);
  opacity: 0.35;
}
```

Keep the field subtle enough that body copy remains easy to read.

- [ ] **Step 5: Upgrade shared panel styling**

Update `src/components/ui/GlassPanel.tsx` so it supports a restrained variant prop:

```tsx
type GlassPanelProps = PropsWithChildren<{
  className?: string
  variant?: 'default' | 'hero' | 'dense'
}>
```

Use the variants to change:

- border brightness
- inner background depth
- outer shadow softness
- edge glow intensity

Keep all variants in the same visual family.

- [ ] **Step 6: Let `SectionHeading` support slightly stronger page-top headings**

Update `SectionHeading` so page-top headings can opt into a slightly brighter appearance without changing the heading API shape too much:

```tsx
type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  tone?: 'default' | 'hero'
}
```

- [ ] **Step 7: Run the tests**

Run: `npm run test -- src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx`  
Expected: PASS

- [ ] **Step 8: Commit the shared visual primitives**

Run:

```bash
git add src/components/ui/ConstellationField.tsx src/styles/globals.css src/components/ui/GlassPanel.tsx src/components/ui/SectionHeading.tsx src/pages/HomePage.test.tsx src/pages/ContentPages.test.tsx
git commit -m "feat: add shared svg-aligned visual primitives"
```

---

### Task 2: Recompose the homepage around the SVG1 starfield mood

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/HomePage.test.tsx`
- Test: `npm run test -- src/pages/HomePage.test.tsx`

- [ ] **Step 1: Write the failing homepage assertions**

Extend `src/pages/HomePage.test.tsx` to require:

```tsx
expect(screen.getByRole('heading', { name: /Featured Projects/i })).toBeInTheDocument()
expect(screen.getByText('OPC')).toBeInTheDocument()
expect(screen.getByText('简明 COSBench 教程')).toBeInTheDocument()
expect(screen.getByTestId('home-constellation')).toBeInTheDocument()
```

This ensures the stronger hero treatment does not break real homepage content.

- [ ] **Step 2: Run the homepage test to confirm it fails**

Run: `npm run test -- src/pages/HomePage.test.tsx`  
Expected: FAIL because the new constellation layer / stronger composition is not present yet

- [ ] **Step 3: Recompose the homepage hero**

Update `src/pages/HomePage.tsx` with these changes:

- keep current content order
- keep `hero-art`
- wrap the left hero panel in a more spatial composition
- add `ConstellationField` beside or behind the SVG art
- add a faint circular / arc / star-map treatment in the hero panel
- strengthen the panel variant for hero use

Implementation constraints:

- title remains readable over the art
- no literal star labels
- no centaur silhouette
- no extra top-level content section

- [ ] **Step 4: Strengthen the lower homepage blocks**

Tune the homepage cards so they feel more like suspended technical panels:

- Featured Projects card edges slightly cooler and sharper
- Selected Writing cards slightly more editorial/technical
- Photo + contact block remains readable, but its right panel should now visually read as contact-first with constellation-aware browse links

- [ ] **Step 5: Re-run homepage tests**

Run: `npm run test -- src/pages/HomePage.test.tsx`  
Expected: PASS

- [ ] **Step 6: Commit the homepage rework**

Run:

```bash
git add src/pages/HomePage.tsx src/pages/HomePage.test.tsx
git commit -m "feat: align homepage with svg starfield mood"
```

---

### Task 3: Turn Projects and Writing into SVG-native top sections

**Files:**
- Modify: `src/pages/ProjectsPage.tsx`
- Modify: `src/pages/WritingPage.tsx`
- Modify: `src/pages/ContentPages.test.tsx`
- Test: `npm run test -- src/pages/ContentPages.test.tsx`

- [ ] **Step 1: Extend failing content-page assertions**

Add or tighten assertions in `src/pages/ContentPages.test.tsx`:

```tsx
renderWithRouter('/projects')
expect(screen.getByTestId('projects-art')).toHaveAttribute('aria-hidden', 'true')
expect(screen.getByTestId('projects-constellation')).toBeInTheDocument()

renderWithRouter('/writing')
expect(screen.getByTestId('writing-art')).toHaveAttribute('aria-hidden', 'true')
expect(screen.getByTestId('writing-constellation')).toBeInTheDocument()
```

- [ ] **Step 2: Run the content-page tests to verify they fail**

Run: `npm run test -- src/pages/ContentPages.test.tsx`  
Expected: FAIL because the new top-section constellation layers are not present yet

- [ ] **Step 3: Strengthen `ProjectsPage`**

Update `ProjectsPage.tsx` so the page-top feels more like a technical topic cover:

- keep `svg2-optimized.svg` as visual anchor
- add `ConstellationField` in the header zone
- increase cover-like spatial layering
- keep project cards readable and restrained

Recommended structure:

```tsx
<section className="relative isolate overflow-hidden ...">
  <img data-testid="projects-art" ... />
  <ConstellationField testId="projects-constellation" ... />
  <motion.div ...><SectionHeading ... /></motion.div>
  <motion.div ...>{cards}</motion.div>
</section>
```

- [ ] **Step 4: Strengthen `WritingPage`**

Update `WritingPage.tsx` so grouped sections feel like distinct constellation bands:

- keep `#guides`, `#notes`, `#updates`
- keep hash scrolling behavior
- add `ConstellationField` in the page-top field
- make the grouped sections feel more visually distinct through spacing, panel treatment, and line/arc continuity

- [ ] **Step 5: Re-run content-page tests**

Run: `npm run test -- src/pages/ContentPages.test.tsx`  
Expected: PASS

- [ ] **Step 6: Commit the index-page visual alignment**

Run:

```bash
git add src/pages/ProjectsPage.tsx src/pages/WritingPage.tsx src/pages/ContentPages.test.tsx
git commit -m "feat: align project and writing pages with svg style"
```

---

### Task 4: Refine detail, About, and Contact pages without harming readability

**Files:**
- Modify: `src/pages/ProjectDetailPage.tsx`
- Modify: `src/pages/WritingDetailPage.tsx`
- Modify: `src/pages/AboutPage.tsx`
- Modify: `src/pages/ContactPage.tsx`
- Modify: `src/pages/ContentPages.test.tsx`
- Test: `npm run test -- src/pages/ContentPages.test.tsx`

- [ ] **Step 1: Add failing assertions where needed**

Extend `src/pages/ContentPages.test.tsx` to ensure these pages still expose their migrated content after the visual pass:

```tsx
renderWithRouter('/projects/opc')
expect(screen.getByText('计划术语：核心对象与角色。')).toBeInTheDocument()

renderWithRouter('/writing/vitepress-migration-progress')
expect(screen.getByText('当前计划：VitePress 迁移进度。')).toBeInTheDocument()
```

If these assertions already exist, tighten them by also checking a top-level page heading or section-heading survives.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test -- src/pages/ContentPages.test.tsx`  
Expected: FAIL if the upcoming visual framing has not been added yet

- [ ] **Step 3: Refine detail pages**

Update `ProjectDetailPage.tsx` and `WritingDetailPage.tsx`:

- keep body-copy readability first
- add subtle top framing / starline cues near the header
- do not add dense visual overlays inside paragraph-heavy regions

- [ ] **Step 4: Refine About and Contact**

Update `AboutPage.tsx` and `ContactPage.tsx`:

- preserve current migrated content
- make the panels feel more “observatory / analytical interface” than generic dark cards
- keep top-level page titles as `h1`

- [ ] **Step 5: Re-run content tests**

Run: `npm run test -- src/pages/ContentPages.test.tsx`  
Expected: PASS

- [ ] **Step 6: Commit the secondary page polish**

Run:

```bash
git add src/pages/ProjectDetailPage.tsx src/pages/WritingDetailPage.tsx src/pages/AboutPage.tsx src/pages/ContactPage.tsx src/pages/ContentPages.test.tsx
git commit -m "feat: polish secondary pages toward svg mood"
```

---

### Task 5: Final verification of the style-alignment pass

**Files:**
- No source changes expected unless verification fails
- Test: `npm run test`
- Test: `npm run build`

- [ ] **Step 1: Run the full test suite**

Run: `npm run test`  
Expected: PASS

- [ ] **Step 2: Run the production build**

Run: `npm run build`  
Expected: PASS

- [ ] **Step 3: Verify critical visual constraints manually**

Verify these outcomes in local preview:

- homepage hero feels more native to `SVG1`
- Projects/Writing top sections feel more native to `SVG2`
- starfield / constellation cues are visible but quiet
- mobile nav still works
- body copy remains readable on detail pages
- no literal centaur figure appears
- no glitch / pulse / noisy animation appears

- [ ] **Step 4: If verification reveals an issue, fix only the failing surface and re-run**

Run:

```bash
npm run test
npm run build
```

- [ ] **Step 5: Commit any final polish if code changed**

Run:

```bash
git add <changed-files>
git commit -m "fix: refine svg style alignment"
```

If no code changed, skip this step.
