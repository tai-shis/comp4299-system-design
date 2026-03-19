# COMP 4299 — System Design Notes

Collaborative system design learning notes for COMP 4299, Winter 2026.  
Built with **Next.js 16**, **MDX**, and **Tailwind CSS**.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How to Add Content](#how-to-add-content)
  - [Step 1 — Write the MDX file](#step-1--write-the-mdx-file)
  - [Step 2 — Create a page route](#step-2--create-a-page-route)
  - [Step 3 — Register in chapters config](#step-3--register-in-chapters-config)
  - [Adding a whole new chapter](#adding-a-whole-new-chapter)
- [MDX Component Reference](#mdx-component-reference)
  - [Callout](#callout)
  - [MermaidDiagram](#mermaiddiagram)
- [MDX Writing Guide](#mdx-writing-guide)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server at http://localhost:3000
npm run dev

# Type-check and build (run this before pushing to catch errors)
npm run build
```

---

## Project Structure

```
src/
├── config/
│   └── chapters.ts          ← THE ONLY FILE you need to edit to register new content
│
├── components/
│   ├── Navbar.tsx            ← Navigation bar (auto-populated from chapters.ts)
│   ├── PageLayout.tsx        ← Shared page wrapper (navbar + content + footer)
│   ├── Callout.tsx           ← Highlighted info/tip/warning boxes for MDX
│   └── MermaidDiagram.tsx    ← Renders Mermaid flowchart diagrams in MDX
│
├── markdown/
│   ├── background-notes.mdx  ← Chapter 1 notes content
│   └── docs.mdx              ← Home page resource list
│
└── app/
    ├── page.tsx              ← Home / landing page (auto-generated from chapters.ts)
    ├── layout.tsx            ← Root HTML layout (fonts, metadata template)
    ├── globals.css           ← Tailwind base styles
    ├── background-notes/
    │   └── page.tsx          ← Route: /background-notes
    └── docs/
        └── page.tsx          ← Route: /docs
```

> **The golden rule:** The navbar and home page chapter cards are driven entirely by `src/config/chapters.ts`.
> You never need to touch the navbar or home page to add new content — just register it in the config.

---

## How to Add Content

Adding a new notes page is always the same three steps.

### Step 1 — Write the MDX file

Create a new `.mdx` file in `src/markdown/`. The filename should be a short slug.

```
src/markdown/databases-sql.mdx
```

MDX is Markdown + JSX. You can use all standard Markdown syntax, and also import and use React components directly. Start every file with the component imports you need:

```mdx
import MermaidDiagram from '@/components/MermaidDiagram';
import Callout from '@/components/Callout';

# SQL & Relational Databases

Your notes go here...
```

See the [MDX Writing Guide](#mdx-writing-guide) and [Component Reference](#mdx-component-reference) below for full details.

---

### Step 2 — Create a page route

Create a folder under `src/app/` matching the URL you want, and add a `page.tsx` inside it.

For a page at `/databases/sql`, you would create:

```
src/app/databases/sql/page.tsx
```

Every notes page follows the same boilerplate — copy this exactly and change the two highlighted parts:

```tsx
import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import YourNotesMDX from '@/markdown/your-file-name.mdx'; // ← change this

export const metadata: Metadata = {
  title: 'Your Page Title',                               // ← change this
  description: 'A short description for search engines.',
};

export default function YourPage() {
  return (
    <PageLayout>
      <article
        className={[
          'prose prose-invert max-w-none',
          'prose-p:text-gray-300 prose-p:leading-relaxed',
          'prose-headings:font-bold prose-headings:tracking-tight',
          'prose-h1:text-4xl prose-h1:font-extrabold prose-h1:mb-2 prose-h1:text-white',
          'prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-5 prose-h2:pt-8 prose-h2:border-t prose-h2:border-gray-800 prose-h2:text-white',
          'prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-blue-300',
          'prose-h4:text-base prose-h4:mt-6 prose-h4:text-gray-300',
          'prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline',
          'prose-strong:text-white prose-strong:font-semibold',
          'prose-code:bg-gray-800 prose-code:text-blue-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.85em] prose-code:font-mono prose-code:before:content-none prose-code:after:content-none',
          'prose-li:text-gray-300 prose-li:leading-relaxed',
          'prose-table:text-sm prose-table:border-collapse',
          'prose-th:text-gray-200 prose-th:font-semibold prose-th:px-4 prose-th:py-2.5 prose-th:border prose-th:border-gray-700',
          'prose-td:text-gray-400 prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-gray-800',
          'prose-tr:even:bg-gray-900/30',
          'prose-hr:border-gray-800 prose-hr:my-12',
        ].join(' ')}
      >
        <YourNotesMDX />
      </article>
    </PageLayout>
  );
}
```

> **Tip:** If you need a wider layout (e.g. for a page with side-by-side diagrams), pass `maxWidth="lg"` to `<PageLayout>`.

---

### Step 3 — Register in chapters config

Open `src/config/chapters.ts` and add your page to the relevant chapter's `pages` array:

```ts
{
  id: 'databases',
  number: 2,
  title: 'Databases',
  description: 'Relational vs. NoSQL, indexing, replication, and sharding.',
  pages: [
    {
      title: 'SQL & Relational Databases',  // shown in navbar dropdown + home card
      href: '/databases/sql',               // must match the folder path from Step 2
      description: 'ACID, normalization, indexing, and query planning.',
      tags: ['sql', 'indexing', 'acid'],    // optional — shown as chips on home page
    },
  ],
},
```

That's it. The navbar dropdown and home page chapter card update automatically — no other files to touch.

---

### Adding a whole new chapter

1. Append a new object to the `chapters` array in `src/config/chapters.ts`.  
   Give it a unique `id`, the next sequential `number`, and a short `title`.

2. Add one or more pages to its `pages` array, following Step 1–2 above for each page.

```ts
// src/config/chapters.ts

export const chapters: Chapter[] = [
  {
    id: 'fundamentals',
    number: 1,
    title: 'Fundamentals',
    // ...existing chapter...
  },

  // ── New chapter ──────────────────────────────────────────
  {
    id: 'networking',
    number: 2,
    title: 'Networking',
    description: 'DNS, CDNs, TCP vs UDP, and HTTP deep dive.',
    pages: [
      {
        title: 'DNS & CDNs',
        href: '/networking/dns',
        description: 'How domain resolution and content delivery networks work.',
        tags: ['dns', 'cdn'],
      },
      {
        title: 'TCP vs UDP',
        href: '/networking/tcp-udp',
        description: 'Transport protocols and when to use each.',
        tags: ['tcp', 'udp'],
        wip: true,  // shows a "WIP" badge — good for placeholder pages
      },
    ],
  },
];
```

---

## MDX Component Reference

These components are available to import in any `.mdx` file.

### Callout

A highlighted box for emphasizing key points. Use it to surface important takeaways, warnings, or tips.

```mdx
import Callout from '@/components/Callout';

<Callout type="tip" title="Why This Matters">
  Horizontal scaling adds redundancy — if one server fails, the others keep running.
</Callout>
```

**`type` options:**

| Type | Color | Icon | Use for |
|---|---|---|---|
| `info` | Blue | ℹ️ | General supplementary information |
| `tip` | Green | 💡 | Best practices, preferred approaches |
| `warning` | Amber | ⚠️ | Gotchas, tradeoffs, things to watch out for |
| `note` | Purple | 📝 | Tangential context, side observations |
| `important` | Red | 🔑 | Critical concepts, things not to get wrong |

The `title` prop is optional — it defaults to the type name (e.g. `"Tip"`) if omitted.

You can include bullet lists inside a Callout:

```mdx
<Callout type="note" title="Questions to Ask in an Interview">
  <ul>
    <li>What are the read vs. write patterns?</li>
    <li>What consistency guarantees does the client need?</li>
    <li>What is the expected scale (users, requests/sec)?</li>
  </ul>
</Callout>
```

---

### MermaidDiagram

Renders a [Mermaid](https://mermaid.js.org) diagram from a text definition. Supports flowcharts, sequence diagrams, entity-relationship diagrams, and more.

```mdx
import MermaidDiagram from '@/components/MermaidDiagram';

<MermaidDiagram
  chart={`flowchart LR
    Client --> LoadBalancer
    LoadBalancer --> Server1
    LoadBalancer --> Server2
    Server1 & Server2 --> Database`}
  caption="Optional caption shown below the diagram"
/>
```

**Props:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `chart` | `string` | Yes | Mermaid diagram definition (use a template literal) |
| `caption` | `string` | No | Italic caption rendered below the diagram |

**Diagram types you can use:**

```
flowchart LR / TB / TD    — flowcharts (most common)
sequenceDiagram           — sequence/interaction diagrams
erDiagram                 — entity-relationship diagrams
classDiagram              — class/object diagrams
stateDiagram-v2           — state machines
```

**Tips for writing Mermaid:**
- Use `subgraph Name[Label]` to group nodes into labelled boxes
- Use `A & B --> C` as shorthand for `A --> C` and `B --> C`
- Use `A -. label .-> B` for dashed arrows
- Use `A[("text")]` for cylinder shapes (databases)
- Use `A(["text"])` for stadium/pill shapes

---

## MDX Writing Guide

### File structure

Every notes page should follow this general structure:

```mdx
import MermaidDiagram from '@/components/MermaidDiagram';
import Callout from '@/components/Callout';

# Page Title

**Resource:** [Link to source material](https://...)

One or two sentence intro explaining what this page covers.

---

## 1. First Major Topic

### Subtopic

Content...

<MermaidDiagram chart={`...`} caption="..." />

<Callout type="tip" title="Key insight">
  ...
</Callout>

## 2. Second Major Topic

...

---

## Summary

| Concept | Key Takeaway |
|---|---|
| ... | ... |
```

### Markdown cheatsheet

```md
# H1 — page title (use once)
## H2 — major section
### H3 — subsection (renders in blue)
#### H4 — minor heading

**bold text**
*italic text*
`inline code`

- unordered list item
  - nested item

1. ordered list item

| Col A | Col B |
|---|---|
| cell | cell |

> blockquote

---   (horizontal rule / section divider)
```

### Things to avoid

- **Don't nest block-level components** (like `<Callout>`) inside Markdown lists — put them between paragraphs instead.
- **Don't use `\n` for line breaks in Mermaid node labels** — use `<br>` inside quoted strings: `A["Line one<br>Line two"]`.
- **Don't skip registering the page** in `chapters.ts` — the page will still be accessible by URL, but it won't appear in the nav or home page.
