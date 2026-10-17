# 002 — Reduced-motion integrity

- **Status**: DONE — 2026-10-18
- **Commit**: 5b01a7c
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 3 files, small edits

## Problem

1. The global reduced-motion block deletes **all** feedback, not just movement.
   `css/global.css:239-250`:

```css
/* Reduced motion: keep comprehension-friendly opacity changes, drop
   slides / springs / parallax. */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The comment promises opacity changes survive; the code zeroes every transition —
hover color changes, opacity reveals and shadow feedback all snap for these users.
Reduced motion means fewer and gentler animations, **not zero**.

2. JS scroll paths override the preference with explicit `behavior: 'smooth'` and
   spring lag. `components/ScrollTopAndComment.tsx:36-42`:

```tsx
const handleScrollTop = useCallback(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, []);

const handleScrollToComment = useCallback(() => {
  document.getElementById('comment')?.scrollIntoView({ behavior: 'smooth' });
}, []);
```

`layouts/PostLayout.tsx:58-63` has no preference branch either:

```tsx
const { scrollYProgress } = useScroll();
const progress = useSpring(scrollYProgress, {
  stiffness: 260,
  damping: 30,
  mass: 0.4,
});
```

(`components/LayoutWrapper.tsx`'s condensing header is handled by plan 005.)

## Target

1. Replace the block in `css/global.css` with movement-scoped suppression plus a
   keep-list for color/opacity feedback:

```css
/* Reduced motion: motion is reduced, not removed — position/scale changes
   snap, while comprehension-friendly color and opacity fades survive. */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  a,
  button,
  [role='button'],
  summary,
  input,
  textarea,
  select,
  .material,
  .material-thin,
  .material-thick {
    transition-duration: 150ms !important;
    transition-property:
      color, background-color, border-color, opacity, box-shadow !important;
  }
}
```

(Transform-based transitions — e.g. `.pressable`, `.link-underline` — stay at
0.01ms, so they snap: movement dropped, feedback kept.)

2. `components/ScrollTopAndComment.tsx` — add the branch (import `useReducedMotion`
   from `motion/react` alongside the existing imports):

```tsx
const shouldReduceMotion = useReducedMotion();

const handleScrollTop = useCallback(() => {
  window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
}, [shouldReduceMotion]);

const handleScrollToComment = useCallback(() => {
  document
    .getElementById('comment')
    ?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
}, [shouldReduceMotion]);
```

3. `layouts/PostLayout.tsx` — drop the spring lag under the preference (import
   `useReducedMotion`; keep the bar itself):

```tsx
const shouldReduceMotion = useReducedMotion();
const { scrollYProgress } = useScroll();
const smoothedProgress = useSpring(scrollYProgress, {
  stiffness: 260,
  damping: 30,
  mass: 0.4,
});
const progress = shouldReduceMotion ? scrollYProgress : smoothedProgress;
```

`style={{ scaleX: progress }}` at line 70 stays unchanged.

## Repo conventions to follow

- `useReducedMotion` branching exemplar: `layouts/AuthorLayout.tsx:22-26`.
- matchMedia branching exemplar: `components/CustomCursor.tsx:35-48`.
- Do not invent new media queries — reuse `prefers-reduced-motion: reduce`.

## Steps

1. Replace the reduced-motion block in `css/global.css`.
2. Add the branches in `ScrollTopAndComment.tsx`.
3. Add the branch in `PostLayout.tsx`.

## Boundaries

- Do NOT touch `LayoutWrapper.tsx` — its reduce handling ships with plan 005's rewrite.
- Do NOT alter `MotionConfig reducedMotion='user'` in `pages/_app.tsx` — it is correct.
- No new dependencies. No component behavior changes other than the preference branch.
- If the code does not match the excerpts (drift since 5b01a7c), STOP and report.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check** (DevTools → Rendering → emulate `prefers-reduced-motion: reduce`):
  - Hover a tag/button: background and color still ease (~150ms), nothing slides.
  - Press a `.pressable` element: it snaps to 0.97 instantly (movement dropped).
  - Click "back to top": the page jumps instantly, no smooth glide.
  - Read an article: the progress bar tracks scroll without spring lag.
- **Done when**: with the preference on, no position/scale animation runs, and
  color/opacity feedback is still visible.
