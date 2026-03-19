import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { chapters } from '@/config/chapters';

export const metadata: Metadata = {
  title: 'COMP 4299 System Design',
  description:
    'Collaborative system design learning notes for COMP 4299, Winter 2026.',
};

const resources = [
  { title: 'Neetcode System Design for Beginners', hours: '~10 hrs', href: 'https://neetcode.io/courses/system-design-for-beginners/0' },
  { title: 'Neetcode System Design for Interviews', hours: '~10 hrs', href: 'https://neetcode.io/courses/system-design-interview/0' },
  { title: 'Neetcode OOD Interview Patterns', hours: '~8 hrs', href: 'https://neetcode.io/courses/ood-interview/0' },
  { title: 'Neetcode OD Interviews Course', hours: '~8 hrs', href: '#' },
];

export default function HomePage() {
  const totalPages = chapters.reduce((sum, ch) => sum + ch.pages.length, 0);
  const wipPages = chapters
    .flatMap((ch) => ch.pages)
    .filter((p) => p.wip).length;

  return (
    <PageLayout maxWidth="lg">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="mb-20">
        <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">
          COMP 4299 &middot; Winter 2026
        </p>
        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
          System Design
          <br />
          <span className="text-gray-500 font-normal text-4xl">Notes &amp; Documentation</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
          Collaborative learning notes for system design concepts, built throughout the Winter 2026
          semester. Topics are organized into chapters following the Neetcode curriculum.
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-6 mt-8">
          <Stat value={chapters.length} label="Chapter" plural="Chapters" />
          <div className="h-8 w-px bg-gray-800" />
          <Stat value={totalPages} label="Note" plural="Notes" />
          {wipPages > 0 && (
            <>
              <div className="h-8 w-px bg-gray-800" />
              <Stat value={wipPages} label="In Progress" plural="In Progress" accent="amber" />
            </>
          )}
        </div>
      </section>

      {/* ── Chapters ──────────────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeading>Chapters</SectionHeading>

        <div className="flex flex-col gap-5">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="border border-gray-800/80 rounded-2xl overflow-hidden bg-gray-900/10 hover:bg-gray-900/30 transition-colors"
            >
              {/* Chapter header */}
              <div className="flex items-start gap-5 px-6 pt-5 pb-4 border-b border-gray-800/60">
                <span className="font-mono text-3xl font-black text-gray-800 leading-none select-none mt-0.5">
                  {String(chapter.number).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-white">{chapter.title}</h2>
                  {chapter.description && (
                    <p className="text-sm text-gray-500 mt-0.5">{chapter.description}</p>
                  )}
                </div>
              </div>

              {/* Page list */}
              <ul className="divide-y divide-gray-800/40">
                {chapter.pages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="group flex items-center gap-4 px-6 py-4 hover:bg-gray-800/30 transition-colors"
                    >
                      {/* Arrow icon */}
                      <span className="shrink-0 w-6 h-6 rounded-md bg-gray-800/60 flex items-center justify-center text-gray-500 group-hover:bg-blue-900/40 group-hover:text-blue-400 transition-colors">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </span>

                      {/* Text */}
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                            {page.title}
                          </span>
                          {page.wip && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-900/40 text-amber-400 border border-amber-800/60">
                              WIP
                            </span>
                          )}
                        </span>
                        {page.description && (
                          <span className="block text-xs text-gray-500 mt-0.5 truncate">
                            {page.description}
                          </span>
                        )}
                      </span>

                      {/* Tags */}
                      {page.tags && page.tags.length > 0 && (
                        <span className="hidden sm:flex items-center gap-1.5 shrink-0">
                          {page.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-500 border border-gray-700/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Resources ─────────────────────────────────────────────────────── */}
      <section>
        <SectionHeading>Resources</SectionHeading>
        <ul className="grid sm:grid-cols-2 gap-3">
          {resources.map((r) => (
            <li key={r.title}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-gray-800/80 bg-gray-900/10 hover:bg-gray-900/40 hover:border-gray-700 transition-all"
              >
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors leading-snug pr-3">
                  {r.title}
                </span>
                <span className="text-xs font-mono text-gray-600 shrink-0">{r.hours}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
}

// ─── Local sub-components ──────────────────────────────────────────────────

function Stat({
  value,
  label,
  plural,
  accent = 'blue',
}: {
  value: number;
  label: string;
  plural: string;
  accent?: 'blue' | 'amber';
}) {
  const colorClass = accent === 'amber' ? 'text-amber-400' : 'text-blue-400';
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`text-2xl font-bold font-mono ${colorClass}`}>{value}</span>
      <span className="text-sm text-gray-500">{value === 1 ? label : plural}</span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-4 text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
      <span>{children}</span>
      <span className="flex-1 h-px bg-gray-800" aria-hidden />
    </h2>
  );
}
