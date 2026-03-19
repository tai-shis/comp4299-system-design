import type { ReactNode } from 'react';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: ReactNode;
  /**
   * Controls the max-width of the content column.
   * - "md" (default) suits prose-heavy notes pages
   * - "lg" suits wider layouts with sidebars or grids
   */
  maxWidth?: 'md' | 'lg';
}

const maxWidthClass = {
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
};

export default function PageLayout({ children, maxWidth = 'md' }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 flex flex-col">
      <Navbar />

      <main className={`${maxWidthClass[maxWidth]} mx-auto w-full px-6 py-14 flex-1`}>
        {children}
      </main>

      <footer className="border-t border-gray-800/60 py-8 text-center text-gray-600 text-sm">
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
  );
}
