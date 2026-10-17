import { useEffect, useState } from 'react';
import type { Transition } from 'motion/react';

/**
 * Apple house spring style.
 *
 * Apple describes springs with two designer-friendly parameters:
 *   - damping ratio: 1.0 = critically damped (no overshoot), < 1.0 = bounce
 *   - response: how quickly the value reaches the target (seconds)
 *
 * Motion's `bounce` + `duration` maps onto those parameters directly, so we
 * express everything in that vocabulary here instead of stiffness/damping.
 *
 * Rule of thumb: bounce only when the gesture itself carried momentum
 * (a flick, a drag release, a sheet being thrown). Everything else settles
 * with bounce 0 so the interface stays calm.
 */
export const spring = {
  /** Default UI motion — damping 1.0, response ~0.4. No overshoot. */
  ui: { type: 'spring', bounce: 0, duration: 0.4 },
  /** Small elements (icons, chips, tooltips) — damping 1.0, response ~0.25. */
  snappy: { type: 'spring', bounce: 0, duration: 0.25 },
  /** Press feedback — fast enough to feel attached to the pointer-down. */
  press: { type: 'spring', bounce: 0, duration: 0.15 },
  /** Sheets / drawers / sidebars — damping ~0.8, response ~0.3. */
  drawer: { type: 'spring', bounce: 0.2, duration: 0.3 },
  /** Momentum interactions: flicks, throws, items snapping home. */
  momentum: { type: 'spring', bounce: 0.2, duration: 0.4 },
  /** Soft, larger surfaces (cards, images) — a long, gentle settle. */
  soft: { type: 'spring', bounce: 0, duration: 0.55 },
} satisfies Record<string, Transition>;

/**
 * Standard entrance for content blocks: a short fade-up.
 * Motion automatically degrades this for `prefers-reduced-motion: reduce`
 * when the app is wrapped in `<MotionConfig reducedMotion="user">`.
 */
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { ...spring.ui, delay },
});

/** Parent container that staggers its children's entrance. */
export const stagger = (staggerChildren = 0.06, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: spring.ui },
};

/** Shared press feedback for pointer-driven elements. */
export const whileTap = { scale: 0.97 };
export const whileHover = { scale: 1.02 };

/**
 * True only where a pointer can actually hover: `whileHover` states latch
 * after a tap on touch devices, so every hover animation gates on this.
 * SSR-safe — starts false and resolves in an effect.
 */
export function useHoverCapable() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return canHover;
}
