import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import WSDemonstration from '@/markdown/networking/ws-example-page.mdx';

export const metadata: Metadata = {
  title: 'Networking',
  description: 'HTTP, Sockets, Encryption, and Network Layers involved in API usage.',
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
        <WSDemonstration />
      </article>
    </PageLayout>
  );
}