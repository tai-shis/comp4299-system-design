import Docs from '../markdown/docs.mdx'
import BackgroundNotes from '../markdown/background-notes.mdx'

export default function Home() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">System Design Dashboard</h1>

      {/* Prose adds spacing/sizes, 'prose-invert' makes text white */}
      
      <article className="prose prose-invert max-w-none">
        <Docs />
      </article>

      <article className="prose prose-invert max-w-none">
        <BackgroundNotes />
      </article>
    </main>
  );
}
