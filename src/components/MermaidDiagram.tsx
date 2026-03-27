'use client';

import { useEffect, useId, useRef, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
}

export default function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const id = rawId.replace(/:/g, '').replace(/^-/, 'md');
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;

    import('mermaid').then(async ({ default: mermaid }) => {
      if (cancelled) return;

      mermaid.initialize({
        startOnLoad: true,
        flowchart: { useMaxWidth: true, htmlLabels: true},
        sequence: {useMaxWidth: true},
        theme: 'dark',
        darkMode: true,
        fontFamily: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
        themeVariables: {
          background: 'transparent',
          mainBkg: '#1e293b',
          primaryColor: '#1e3a5f',
          primaryTextColor: '#e2e8f0',
          primaryBorderColor: '#3b82f6',
          lineColor: '#475569',
          secondaryColor: '#1e293b',
          tertiaryColor: '#0f172a',
          edgeLabelBackground: '#1e293b',
          clusterBkg: '#0f172a',
          clusterBorder: '#334155',
          titleColor: '#94a3b8',
          nodeTextColor: '#e2e8f0',
        },
      });

      try {
        const uniqueId = `mermaid${id}${Date.now()}`;
        const { svg } = await mermaid.render(uniqueId, chart.trim());
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setLoaded(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(String(err));
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="bg-red-950/40 border border-red-700 rounded-xl p-4 my-6 text-red-400 text-sm font-mono">
        <span className="font-bold">Diagram error:</span> {error}
      </div>
    );
  }

  return (
    <figure className="my-8 not-prose">
      <div
        className={`border border-gray-700/60 rounded-xl p-6 flex justify-center items-center min-h-[120px] overflow-x-auto transition-all duration-300 ${
          loaded ? 'bg-gray-900/30' : 'bg-gray-900/10'
        }`}
      >
        {!loaded && (
          <div className="text-gray-600 text-sm animate-pulse">Rendering diagram…</div>
        )}
        <div ref={ref} className={loaded ? 'block' : 'hidden'} />
      </div>
      {caption && (
        <figcaption className="text-center text-gray-500 text-sm mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
