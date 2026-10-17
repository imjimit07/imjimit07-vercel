# 005 — Condense the mobile header with transform and opacity only

- **Status**: DONE — 2026-10-18
- **Commit**: 5b01a7c
- **Severity**: MEDIUM
- **Category**: Performance / Interruptibility
- **Estimated scope**: 1 file, rewrite of the header block

## Problem

The scroll-driven mobile toolbar animates layout properties every frame of its
spring — and reflows the page below it as the threshold is crossed.
`components/LayoutWrapper.tsx:32-42`:

```tsx
<motion.header
  initial={false}
  animate={{
    paddingTop: condensed ? 6 : 12,
    paddingBottom: condensed ? 6 : 12,
    boxShadow: condensed
      ? '0 4px 16px rgba(0,0,0,0.08)'
      : '0 4px 16px rgba(0,0,0,0)',
  }}
  transition={spring.ui}
  className='material-thin sticky top-0 z-30 flex items-center justify-between px-4 md:hidden'
>
```

`padding` triggers layout + paint + composite on each frame of the spring, and
`box-shadow` is paint-heavy; the height change also shifts everything below the
header mid-scroll. Threshold crossing happens on every scroll direction change —
a high-frequency path that must stay off the layout engine.

## Target

Keep the same visual squeeze, expressed with compositor-only properties:
the glass layer scales, the content row translates, the shadow crossfades via
opacity, and the header box height stays constant (no reflow of the page below).

Geometry at this commit: row height 40 px (ThemeSwitch `h-10`) + 2 × 12 px
padding = 64 px; condensed visual = 52 px → `scaleY(52 / 64) = 0.8125`;
content shift = −6 px.

Replace the opening `<motion.header …>` block and close it after the inner row
(the hamburger button and `<ThemeSwitch />` move inside the row wrapper, unchanged):

```tsx
<header className='sticky top-0 z-30 md:hidden'>
  {/* Shadow fades in as content slides under — opacity only */}
  <motion.div
    aria-hidden='true'
    initial={false}
    animate={{ opacity: condensed ? 1 : 0 }}
    transition={shouldReduceMotion ? { duration: 0 } : spring.ui}
    className='pointer-events-none absolute inset-0 shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
  />
  {/* Glass squeezes with transform, never with padding/height */}
  <motion.div
    aria-hidden='true'
    initial={false}
    animate={{ transform: condensed ? 'scaleY(0.8125)' : 'scaleY(1)' }}
    transition={shouldReduceMotion ? { duration: 0 } : spring.ui}
    className='material-thin pointer-events-none absolute inset-0 origin-top'
  />
  <motion.div
    initial={false}
    animate={{ transform: condensed ? 'translateY(-6px)' : 'translateY(0px)' }}
    transition={shouldReduceMotion ? { duration: 0 } : spring.ui}
    className='relative flex w-full items-center justify-between px-4 py-3'
  >
    {/* existing hamburger motion.button (lines 44-65) goes here, unchanged */}
    <ThemeSwitch />
  </motion.div>
</header>
```

Also required:

- `const shouldReduceMotion = useReducedMotion();` — add the import to the
  existing `motion/react` import at line 2.
- Keep `const [condensed, setCondensed] = useState(false);` and the
  `useMotionValueEvent` threshold logic (lines 16-22) exactly as they are.
- The `.material-thin` class moves from the (now plain) `<header>` to the glass
  layer. Padding moves from the header to the inner row.

## Repo conventions to follow

- Springs from `lib/motion.ts` (`spring.ui`) — do not invent new ones.
- Reduced-motion branch pattern exemplar: `layouts/AuthorLayout.tsx:22-26`.
- Percent-free, hardcoded transform values are acceptable here because the
  geometry (40 px row, 12 px padding) is fixed by the design; the ratio is written
  as `scaleY(0.8125)` and commented.

## Steps

1. Add `useReducedMotion` import + `shouldReduceMotion`.
2. Replace the `<motion.header>` open/close with `<header>` + the three layers above.
3. Move the hamburger button markup and `<ThemeSwitch />` inside the row wrapper
   (no changes to either component).
4. Confirm nothing else referenced the header's previous classes.

## Boundaries

- Do NOT touch the scroll threshold, `SidebarNav`, `ThemeSwitch`, or `Footer`.
- Do NOT animate `height`, `padding`, `margin`, or `box-shadow` in the result.
- If visual parity fails on the feel check, the acceptable fallback is deleting the
  squeeze (fixed 64 px header, shadow opacity only). Never restore a padding or
  height animation.
- Drift since 5b01a7c → STOP and report.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**:
  - Scroll slowly across the threshold on a phone (or touch emulation): the glass
    bottom edge and the buttons move smoothly; nothing below the header jumps.
  - `document.querySelector('header').offsetHeight` stays 64 in both states
    (paste in DevTools console).
  - DevTools → Rendering → Paint flashing: no layout/paint storm while scrolling.
  - Emulate `prefers-reduced-motion: reduce`: the state change is instant, no movement.
- **Done when**: no layout property is animated by this component, and the header
  looks and behaves like the previous design while scrolling.
