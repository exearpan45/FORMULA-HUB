import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
  fontSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const MathView: React.FC<MathViewProps> = ({
  latex,
  displayMode = true,
  className = '',
  fontSize = 'base',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return `<code class="font-mono text-xs text-rose-400">${latex}</code>`;
    }
  }, [latex, displayMode]);

  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl md:text-2xl',
    '2xl': 'text-2xl md:text-3xl',
    '3xl': 'text-3xl md:text-4xl',
  }[fontSize];

  return (
    <div
      className={`katex-wrapper overflow-x-auto max-w-full text-slate-100 ${sizeClasses} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
