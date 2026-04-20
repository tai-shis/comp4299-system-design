'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: 'md' | 'lg';
}

const maxWidthClass = {
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
};

function SidebarToggleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
}

export default function PageLayout({ children, maxWidth = 'md' }: PageLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0a0a0f] text-gray-100">
      {/* Top bar */}
      <header className="shrink-0 h-13 border-b border-gray-800/80 bg-[#0a0a0f] flex items-center px-4 gap-3 z-10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 text-gray-600 hover:text-gray-300 hover:bg-gray-800/60 rounded transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <SidebarToggleIcon />
        </button>

        <Link
          href="/"
          className="group flex items-center gap-2"
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

        <div className="ml-auto">
          <a
            href="https://neetcode.io/courses/system-design-for-beginners/0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Neetcode ↗
          </a>
        </div>
      </header>

      {/* Body: relative container so sidebar can overlay */}
      <div className="relative flex-1 overflow-hidden">
        <Navbar collapsed={collapsed} />

        {/* Scrollable content area — always full width */}
        <div className="h-full overflow-y-auto flex flex-col">
          <main className={`${maxWidthClass[maxWidth]} mx-auto w-full px-6 py-14 flex-1`}>
            {children}
          </main>

          <footer className="shrink-0 border-t border-gray-800/60 py-8 text-center text-gray-600 text-sm">
            <p>
              COMP 4299 System Design &mdash; Winter 2026 &middot;{' '}
              <a
                href="https://neetcode.io/courses/system-design-for-beginners/0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                Neetcode System Design for Beginners
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
