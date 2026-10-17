'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { spring } from '@/lib/motion';

/**
 * Interactive targets that make the cursor bloom. Cheap to check with
 * `closest()` on pointerover (which only fires when the target changes).
 */
const INTERACTIVE_SELECTOR =
  'a, button, [role="link"], [role="button"], input, textarea, select, summary, label, [data-cursor="hover"]';

/** Park the cursor off-canvas when the pointer leaves the window. */
const PARKED = -100;

function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  // The dot tracks the pointer 1:1; the ring lags on a spring. Motion's
  // springs are velocity-aware and interruptible, so the ring never
  // "brick walls" when you change direction mid-flight.
  const x = useMotionValue(PARKED);
  const y = useMotionValue(PARKED);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });
  // True while the cursor is parked off-canvas, so the first move after
  // re-entering the window lands instantly instead of swooping in.
  const parkedRef = useRef(true);

  // Only run on fine pointers, and never for reduced-motion users —
  // for them the native cursor is the accessible equivalent.
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(fine.matches && !reduced.matches);

    sync();
    fine.addEventListener('change', sync);
    reduced.addEventListener('change', sync);

    return () => {
      fine.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const move = (e: PointerEvent) => {
      if (parkedRef.current) {
        // Land on the pointer immediately rather than springing in from
        // the parked position (start from the presentation value)
        x.jump(e.clientX);
        y.jump(e.clientY);
        ringX.jump(e.clientX);
        ringY.jump(e.clientY);
        parkedRef.current = false;
        return;
      }
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)));
    };
    const park = () => {
      x.jump(PARKED);
      y.jump(PARKED);
      ringX.jump(PARKED);
      ringY.jump(PARKED);
      parkedRef.current = true;
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    // Feedback belongs to the pointer-down, not the release (§1 Response)
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('blur', up);
    document.documentElement.addEventListener('mouseleave', park);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('blur', up);
      document.documentElement.removeEventListener('mouseleave', park);
      root.classList.remove('has-custom-cursor');
    };
  }, [enabled, x, y, ringX, ringY]);

  // Nothing renders until we know a custom cursor is appropriate, so
  // touch devices and reduced-motion users get zero overhead.
  if (!enabled) return null;

  return (
    <>
      {/* Dot — exact position, shrinks over interactive targets.
          Sits above the intro overlay so the pointer is never hidden. */}
      <motion.span
        aria-hidden='true'
        className='pointer-events-none fixed top-0 left-0 z-[81] h-1 w-1 rounded-full bg-white mix-blend-difference'
        style={{ x, y, marginLeft: -2, marginTop: -2 }}
        animate={{ scale: pressed ? 1.8 : hovering ? 0.5 : 1 }}
        transition={spring.press}
      />
      {/* Ring — spring-lagged, blooms on hover, dips on press */}
      <motion.span
        aria-hidden='true'
        className='pointer-events-none fixed top-0 left-0 z-[80] h-8 w-8 rounded-full border border-white/60 mix-blend-difference'
        style={{ x: ringX, y: ringY, marginLeft: -16, marginTop: -16 }}
        animate={{
          scale: pressed ? 0.85 : hovering ? 1.5 : 1,
          opacity: hovering ? 1 : 0.7,
        }}
        transition={spring.snappy}
      />
    </>
  );
}

export default CustomCursor;
