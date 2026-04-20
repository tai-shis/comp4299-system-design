'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { chapters, type Chapter, type ChapterPage } from '@/config/chapters';

function ArrowRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

interface NavbarProps {
  collapsed: boolean;
}

export default function Navbar({ collapsed }: NavbarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`absolute left-0 top-0 h-full w-64 z-20 border-r border-gray-800 flex flex-col bg-[#0a0a0f] overflow-hidden transition-transform duration-200 ${collapsed ? '-translate-x-full' : 'translate-x-0'}`}
    >
      <nav className="flex-1 overflow-y-auto py-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
        {chapters.map((chapter: Chapter) => {
          const isChapterActive = chapter.pages.some((p) => p.href === pathname);
          return (
            <div key={chapter.id} className="border-b border-gray-800/60 last:border-0">
              <div className="px-5 pt-4 pb-2">
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.12em] font-semibold mb-0.5">
                  Chapter {chapter.number}
                </p>
                <p className={`text-sm font-semibold ${isChapterActive ? 'text-blue-400' : 'text-gray-100'}`}>
                  {chapter.title}
                </p>
              </div>

              <ul className="pb-3">
                {chapter.pages.map((page: ChapterPage) => {
                  const isActive = pathname === page.href;
                  return (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        className={`group flex items-center justify-between gap-3 px-5 py-2 transition-colors ${
                          isActive
                            ? 'bg-blue-950/40 text-blue-400'
                            : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2 text-sm">
                          {page.title}
                          {page.wip && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-900/50 text-amber-400 border border-amber-700/50">
                              WIP
                            </span>
                          )}
                        </span>
                        <span
                          className={`shrink-0 transition-colors ${
                            isActive ? 'text-blue-400' : 'text-gray-700 group-hover:text-gray-400'
                          }`}
                        >
                          <ArrowRight />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
