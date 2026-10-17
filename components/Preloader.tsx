import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { spring } from '@/lib/motion';

const STORAGE_KEY = 'preloader-seen';
/** Kept deliberately short: this is latency we're spending on purpose. */
const DURATION = 900;
const HOLD_AFTER = 120;

type PreloaderState = 'idle' | 'loading' | 'done';

/**
 * First-visit intro. Repeat visitors (same session) and reduced-motion
 * users go straight to the content — no artificial wait.
 */
const Preloader = () => {
  const [state, setState] = useState<PreloaderState>('idle');
  const labelRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Progress drives a clip-path straight from a motion value, so the
  // counter never re-renders React 60 times a second.
  const progress = useMotionValue(0);
  const clipPath = useTransform(
    progress,
    latest => `inset(0 ${100 - latest * 100}% 0 0)`,
  );

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      // Storage unavailable (private mode): fall through and play it once
    }

    if (seen || shouldReduceMotion) {
      setState('done');
      return;
    }

    setState('loading');
    document.body.style.overflow = 'hidden';

    const start = performance.now();
    let raf = 0;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        // Ignore — worst case it plays again next load
      }
      document.body.style.overflow = '';
      setState('done');
    };

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      progress.set(t);

      if (labelRef.current) {
        labelRef.current.textContent = `loading... ${Math.round(t * 100)}%`;
      }

      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      holdTimer = setTimeout(finish, HOLD_AFTER);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (holdTimer) clearTimeout(holdTimer);
      document.body.style.overflow = '';
    };
  }, [progress, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {state === 'loading' && (
        <motion.div
          key='preloader'
          aria-hidden='true'
          className='fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black'
          initial={false}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={spring.soft}
        >
          <div className='relative' style={{ lineHeight: 1 }}>
            <span className='display-heading whitespace-nowrap text-white/15'>
              Jimit Patel
            </span>
            <motion.span
              className='display-heading absolute left-0 top-0 whitespace-nowrap text-white'
              style={{ clipPath }}
            >
              Jimit Patel
            </motion.span>
            <span
              ref={labelRef}
              className='absolute right-0 -bottom-10 text-xs font-light tracking-[0.2em] text-white/50 uppercase'
            >
              loading... 0%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
