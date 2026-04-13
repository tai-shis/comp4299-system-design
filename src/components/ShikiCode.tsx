import { codeToHtml } from 'shiki';

interface Props {
  code: string;
  language: string;
}

export default async function ShikiCode({ code, language }: Props) {
  let html: string;
  try {
    html = await codeToHtml(code.trimEnd(), {
      lang: language,
      theme: 'one-dark-pro',
    });
  } catch {
    html = await codeToHtml(code.trimEnd(), {
      lang: 'plaintext',
      theme: 'one-dark-pro',
    });
  }

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-gray-700">
      {language !== 'plaintext' && (
        <div className="flex justify-end border-b border-gray-700/60 bg-gray-900 px-4 py-1.5">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-slate-500">
            {language}
          </span>
        </div>
      )}
      <div className="shiki-block" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
