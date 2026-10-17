import { ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { spring } from '@/lib/motion';

interface Props {
  language?: string;
  filename?: string;
  children: ReactNode;
}

/**
 * Framed code block for short snippets passed as plain text. Prefer fenced
 * blocks (```lang or ```lang:title) when the code should be
 * syntax-highlighted — they run through the full prism pipeline.
 */
export default function CodeBlock({ language, filename, children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const isPlainText =
    typeof children === 'string' || typeof children === 'number';

  const onCopy = async () => {
    const text = contentRef.current?.textContent ?? '';

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (permissions or insecure context) — fail quietly
    }
  };

  return (
    <div className='my-6 overflow-hidden rounded-apple-md bg-gray-800 shadow-apple-md'>
      <div className='flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2'>
        <span className='truncate font-mono text-xs text-gray-400'>
          {filename ?? language ?? 'Code'}
        </span>
        <motion.button
          aria-label={copied ? 'Code copied' : 'Copy code'}
          type='button'
          onClick={onCopy}
          whileTap={{ scale: 0.97 }}
          transition={spring.press}
          className={`flex shrink-0 items-center justify-center rounded-apple-sm p-1 transition-colors ${
            copied ? 'text-green-300' : 'text-gray-400 hover:text-gray-100'
          }`}
        >
          <AnimatePresence initial={false} mode='popLayout'>
            <motion.svg
              key={copied ? 'copied' : 'copy'}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              stroke='currentColor'
              fill='none'
              className='h-3.5 w-3.5'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={spring.snappy}
            >
              {copied ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              )}
            </motion.svg>
          </AnimatePresence>
        </motion.button>
      </div>
      <div ref={contentRef}>
        {isPlainText ? (
          <pre className='m-0 overflow-x-auto rounded-none bg-transparent p-4 text-sm leading-6 shadow-none'>
            <code
              className={`font-mono text-gray-100 ${
                language ? `language-${language}` : ''
              }`}
            >
              {String(children).replace(/\n$/, '')}
            </code>
          </pre>
        ) : (
          <div className='not-prose px-4 py-4 font-mono text-sm leading-6 text-gray-100 [&_p]:m-0'>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
