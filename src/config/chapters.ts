/**
 * Central configuration for all course chapters and their pages.
 *
 * To add a new chapter:   append a new object to the `chapters` array below.
 * To add a page to an existing chapter: push to that chapter's `pages` array.
 *
 * The navbar and home page are both driven entirely from this config — no
 * other files need to be touched to register new content.
 */

export interface ChapterPage {
  /** Display title in nav dropdown and chapter cards */
  title: string;
  /** Next.js route href, e.g. "/background-notes" */
  href: string;
  /** One-liner shown in the dropdown and on the home page card */
  description?: string;
  /** Optional topic tags shown on the home page */
  tags?: string[];
  /** Mark as work-in-progress — shown with a badge but still linkable */
  wip?: boolean;
}

export interface Chapter {
  /** Unique slug used as a React key */
  id: string;
  /** Displayed chapter number */
  number: number;
  /** Short title for the navbar button, e.g. "Fundamentals" */
  title: string;
  /** Longer description shown on the home page chapter card */
  description?: string;
  /** Ordered list of pages that belong to this chapter */
  pages: ChapterPage[];
}

export const chapters: Chapter[] = [
  {
    id: 'fundamentals',
    number: 1,
    title: 'Fundamentals',
    description: 'Core building blocks: scaling, storage, availability, reliability, and latency.',
    pages: [
      {
        title: 'Background Notes',
        href: '/background-notes',
        description: 'Scaling, availability, reliability, fault tolerance, throughput & latency',
        tags: ['scaling', 'latency', 'reliability'],
      },
    ],
  },
  {
    id: 'network-api',
    number: 2,
    title: 'Networks and APIs',
    description: 'OSI Layers, TCP & UDP, DNS, sockets, and API usage in system design and maintenance',
    pages: [
      {
        title: 'Networking',
        href: '/network-apis',
        description: 'Networking basics, TCP, UDP, HTTP, and DNS',
        tags: ['networking', 'sockets', 'http', 'network layers']
      },
    ],
  },
  // ─── Add future chapters below ────────────────────────────────────────────
  // {
  //   id: 'databases',
  //   number: 2,
  //   title: 'Databases',
  //   description: 'Relational vs. NoSQL, indexing, replication, and sharding.',
  //   pages: [
  //     { title: 'Relational Databases', href: '/databases/relational', description: '...' },
  //   ],
  // },
];
