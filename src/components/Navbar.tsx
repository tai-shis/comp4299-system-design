'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { chapters, type Chapter, type ChapterPage } from '@/config/chapters';

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

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

// ─── Chapter Dropdown Panel ───────────────────────────────────────────────────

function ChapterDropdown({
  chapter,
  currentPath,
  onClose,
}: {
  chapter: Chapter;
  currentPath: string;
  onClose: () => void;
}) {
  return (
    <div className="absolute top-full left-0 mt-2 min-w-[300px] bg-[#0e0e16] border border-gray-700/80 rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
      {/* Chapter header */}
      <div className="px-4 py-3.5 border-b border-gray-800">
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.12em] font-semibold mb-0.5">
          Chapter {chapter.number}
        </p>
        <p className="text-sm font-semibold text-gray-100">{chapter.title}</p>
        {chapter.description && (
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{chapter.description}</p>
        )}
      </div>

      {/* Page list */}
      <ul className="py-1.5" role="menu">
        {chapter.pages.map((page: ChapterPage) => {
          const isActive = currentPath === page.href;
          return (
            <li key={page.href} role="none">
              <Link
                href={page.href}
                onClick={onClose}
                role="menuitem"
                className={`group flex items-start justify-between gap-3 px-4 py-2.5 transition-colors ${
                  isActive
                    ? 'bg-blue-950/40 text-blue-400'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium flex items-center gap-2">
                    {page.title}
                    {page.wip && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-900/50 text-amber-400 border border-amber-700/50">
                        WIP
                      </span>
                    )}
                  </span>
                  {page.description && (
                    <span className="text-xs text-gray-500 leading-snug">{page.description}</span>
                  )}
                </span>
                <span
                  className={`mt-1 shrink-0 transition-colors ${
                    isActive ? 'text-blue-400' : 'text-gray-600 group-hover:text-gray-400'
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
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenId(null);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenId(null);
  }, [pathname]);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 border-b border-gray-800/80 bg-[#0a0a0f]/90 backdrop-blur-md"
    >
      <div className="max-w-5xl mx-auto px-6 h-13 flex items-center gap-4">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="COMP 4299 System Design Home"
        >
          <span className="font-mono text-sm font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
            COMP 4299
          </span>
          <span className="text-gray-700 text-xs select-none">|</span>
          <span className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">
            System Design
          </span>
        </Link>

        {/* Divider */}
        <div className="h-5 w-px bg-gray-800 shrink-0" aria-hidden />

        {/* Chapter dropdowns */}
        <div className="flex items-center gap-0.5" role="menubar">
          {chapters.map((chapter) => {
            const isOpen = openId === chapter.id;
            const isActive = chapter.pages.some((p) => p.href === pathname);

            return (
              <div key={chapter.id} className="relative" role="none">
                <button
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => toggle(chapter.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    isOpen || isActive
                      ? 'bg-gray-800/80 text-white'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono font-semibold ${
                      isActive ? 'text-blue-400' : 'text-gray-600'
                    }`}
                  >
                    Ch.{chapter.number}
                  </span>
                  <span>{chapter.title}</span>
                  <ChevronDown open={isOpen} />
                </button>

                {isOpen && (
                  <ChapterDropdown
                    chapter={chapter}
                    currentPath={pathname}
                    onClose={() => setOpenId(null)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          <a
            href="https://neetcode.io/courses/system-design-for-beginners/0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors hidden sm:block"
          >
            Neetcode ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
