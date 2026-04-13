# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:3000
npm run build      # type-check and build (run before pushing)
npm run lint       # run ESLint
```

There are no automated tests.

## Architecture

This is a **Next.js 16 + MDX + Tailwind CSS** notes site for a university system design course.

### Content data flow

All navigation and home page content is driven by a single config file:

**`src/config/chapters.ts`** → consumed by **`src/app/page.tsx`** (home page chapter cards) and **`src/components/Navbar.tsx`** (nav dropdowns).

To add a new notes page, three things are always required together:
1. Create an `.mdx` file in `src/markdown/`
2. Create a `page.tsx` route under `src/app/` (copy the boilerplate from any existing page — they're all identical except for the import and `metadata.title`)
3. Register the page in `src/config/chapters.ts`

Skipping step 3 means the page exists at its URL but won't appear in the nav or home page.

### Page layout

All notes pages use `<PageLayout>` which wraps content in the shared navbar + footer. The `<article>` inside each page carries a long Tailwind `prose prose-invert` className that controls all typography — this is copied verbatim across every page route and should not be changed per-page.

Pass `maxWidth="lg"` to `<PageLayout>` for pages with wide diagrams that need more horizontal space.

### MDX components

Two custom components are available for use in `.mdx` files:

- **`<Callout type="..." title="...">`** — highlighted callout boxes. Types: `info`, `tip`, `warning`, `note`, `important`.
- **`<MermaidDiagram chart={`...`} caption="...">`** — renders Mermaid diagrams client-side (lazy-loaded, dark theme pre-configured).

`MermaidDiagram` is a `'use client'` component. It dynamically imports mermaid on mount to avoid SSR issues. Do not nest `<Callout>` inside Markdown lists — place it between paragraphs.

### Route structure

Content pages live under two different path patterns depending on when they were added:
- `/docs/background-notes`, `/docs/apis/paradigms` — older pages nested under `/docs/`
- `/networking` — newer pages at the root level

New pages should generally follow the root-level pattern unless they logically belong under an existing `/docs/` subtree.
