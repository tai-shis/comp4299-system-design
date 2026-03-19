import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import DocsMDX from '@/markdown/docs.mdx';

export const metadata: Metadata = {
  title: 'Docs',
  description: 'COMP 4299 System Design course documentation and resource overview.',
};

export default function DocsPage() {
  return (
    <PageLayout>
      <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:font-bold prose-a:text-blue-400 prose-strong:text-white prose-li:text-gray-300">
        <DocsMDX />
      </article>
    </PageLayout>
  );
}
