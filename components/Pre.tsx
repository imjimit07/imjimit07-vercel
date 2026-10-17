import { useEffect, useRef, useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { spring } from '@/lib/motion';

interface Props {
  children: ReactNode;
}

const Pre = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const onCopy = async () => {
    const text = containerRef.current?.querySelector('pre')?.textContent ?? '';

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
    <div ref={containerRef} className='group relative'>
      {/* Revealed on hover, but always reachable by keyboard */}
      <motion.button
        aria-label={copied ? 'Code copied' : 'Copy code'}
        type='button'
        onClick={onCopy}
        whileTap={{ scale: 0.97 }}
        transition={spring.press}
        className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-apple-sm border backdrop-blur-md transition-[background-color,border-color,color,opacity] duration-200 ${
          copied
            ? 'border-green-400/40 bg-green-400/15 text-green-300'
            : 'border-white/15 bg-white/10 text-gray-300 opacity-0 hover:bg-white/20 hover:text-white group-hover:opacity-100 focus-visible:opacity-100'
        }`}
      >
        <AnimatePresence initial={false} mode='popLayout'>
          <motion.svg
            key={copied ? 'copied' : 'copy'}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            stroke='currentColor'
            fill='none'
            className='h-4 w-4'
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

      <pre>{children}</pre>
    </div>
  );
};

export default Pre;
