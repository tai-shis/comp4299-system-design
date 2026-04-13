import type { MDXComponents } from 'mdx/types'
import type { ReactElement } from 'react';
import ShikiCode from '@/components/ShikiCode';

export function useMDXComponents(): MDXComponents {
  return {
    pre(props) {
      const codeEl = props.children as ReactElement<{ className?: string; children?: string }>;
      const className = codeEl?.props?.className ?? '';
      const language = className.replace('language-', '') || 'plaintext';
      const code = String(codeEl?.props?.children ?? '');
      // ShikiCode is an async server component — React RSC handles resolution
      return <ShikiCode code={code} language={language} /> as unknown as JSX.Element;
    },
  }
}
