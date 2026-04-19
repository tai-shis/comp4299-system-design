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
        href: '/docs/background-notes',
        description: 'Scaling, availability, reliability, fault tolerance, throughput & latency',
        tags: ['scaling', 'latency', 'reliability'],
      },
    ],
  },
  {
    id: 'networking',
    number: 2,
    title: 'Networking',
    description: 'OSI Layers, TCP & UDP, DNS, sockets, and API usage in system design and maintenance',
    pages: [
      {
        title: 'Networking Basics',
        href: '/docs/networking/basics',
        description: 'Networking basics, TCP, UDP, HTTP, and DNS',
        tags: ['networking', 'sockets', 'http', 'network layers']
      },
      {
        title: 'Web Sockets in Action',
        href: '/docs/networking/ws-demonstration',
        description: 'Web socket bi-directional communication video demonstration.',
        tags: ['web sockets', 'example', 'stock ticker'],
        wip: true
      }
    ],
  },
  {
    id: 'apis',
    number: 3,
    title: 'APIs',
    description: 'Designing APIs: REST, GraphQL, gRPC, versioning, and documentation.',
    pages: [
      {
        title: 'API Paradigms',
        href: '/docs/apis/paradigms',
        description: 'REST, GraphQL, gRPC: paradigms, pros & cons, and use cases',
        tags: ['rest', 'graphql', 'grpc'],
      },
      {
        title: 'API Design Principles',
        href: '/docs/apis/design-principles',
        description: 'CRUD, backwards compatibility, versioning, pagination, idempotency, and rate limiting.',
        tags: ['crud', 'versioning', 'pagination', 'idempotency', 'rate-limiting'],
      },
      {
        title: 'Serverless Functions',
        href: '/docs/apis/serverless-functions',
        description: 'Statelessness, cold starts, provider differences, and when to use serverless.',
        tags: ['serverless', 'vercel', 'aws-lambda', 'cold-starts'],
      },
    ]
  },
  {
    id: 'proxies',
    number: 4,
    title: 'Proxies',
    description: 'Forward proxies, reverse proxies, load balancers, and how they fit into scalable system design.',
    pages: [
      {
        title: 'Proxies and Load Balancing',
        href: '/proxies',
        description: 'Forward vs. reverse proxies, load balancing algorithms, and layer 4 vs. layer 7.',
        tags: ['proxy', 'load-balancing', 'reverse-proxy'],
      },
      {
        title: 'Consistent Hashing',
        href: '/proxies/consistent-hashing',
        description: 'The hash ring, minimal remapping on node changes, and virtual nodes.',
        tags: ['consistent-hashing', 'hash-ring', 'caching'],
      },
    ],
  },
  {
    id: 'storage',
    number: 5,
    title: 'Storage',
    description: 'Relational databases, ACID properties, and how data is stored and queried at scale.',
    pages: [
      {
        title: 'Relational Databases',
        href: '/sql',
        description: 'B+ trees, schemas, foreign keys, joins, and ACID: atomicity, consistency, isolation, durability.',
        tags: ['sql', 'rdbms', 'acid', 'transactions'],
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
