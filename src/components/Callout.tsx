import { ReactNode } from 'react';

type CalloutType = 'info' | 'warning' | 'tip' | 'note' | 'important';

const variants: Record<
  CalloutType,
  { container: string; header: string; body: string; icon: string; defaultTitle: string }
> = {
  info: {
    container: 'bg-blue-950/40 border-blue-500/60',
    header: 'text-blue-400',
    body: 'text-blue-100/75',
    icon: 'ℹ️',
    defaultTitle: 'Info',
  },
  warning: {
    container: 'bg-amber-950/40 border-amber-500/60',
    header: 'text-amber-400',
    body: 'text-amber-100/75',
    icon: '⚠️',
    defaultTitle: 'Warning',
  },
  tip: {
    container: 'bg-emerald-950/40 border-emerald-500/60',
    header: 'text-emerald-400',
    body: 'text-emerald-100/75',
    icon: '💡',
    defaultTitle: 'Tip',
  },
  note: {
    container: 'bg-violet-950/40 border-violet-500/60',
    header: 'text-violet-400',
    body: 'text-violet-100/75',
    icon: '📝',
    defaultTitle: 'Note',
  },
  important: {
    container: 'bg-rose-950/40 border-rose-500/60',
    header: 'text-rose-400',
    body: 'text-rose-100/75',
    icon: '🔑',
    defaultTitle: 'Important',
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const v = variants[type];
  return (
    <div className={`not-prose ${v.container} border-l-4 rounded-r-xl px-5 py-4 my-6`}>
      <p className={`font-semibold text-sm mb-2 ${v.header} flex items-center gap-1.5`}>
        <span>{v.icon}</span>
        <span>{title ?? v.defaultTitle}</span>
      </p>
      <div className={`text-sm leading-relaxed ${v.body} [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:mt-0`}>
        {children}
      </div>
    </div>
  );
}
