# 001 — Gate hover motion to capable pointers and restrain it

- **Status**: DONE — 2026-10-18
- **Commit**: 5b01a7c
- **Severity**: HIGH
- **Category**: Accessibility / Purpose & frequency
- **Estimated scope**: 1 shared helper + 9 files, small edits each (hover props and two CSS rules only)

## Problem

`whileHover` fires on touch devices when the user taps, and the hover state latches
until the next tap elsewhere — cards lift, icons grow, links slide, and they stay
wrong. None of the call sites is gated behind `(hover: hover) and (pointer: fine)`.
The repo already uses exactly this pattern to gate the custom cursor (`css/global.css:83-88`).

Affected sites (all verified at this commit):

- `components/Card.tsx:32` — `whileHover='hover'` (card lift `y: -4` at :36, banner zoom `scale: 1.04` at :46 and :54, arrow slide at :82)
- `components/Share.tsx:24` — `const hover = { y: -2, scale: 1.1 };` (applied at :37, :50, :63, :76, :89)
- `components/SocialIcons.tsx:73` — `whileHover={{ y: -3, scale: 1.12 }}`
- `layouts/PostLayout.tsx:213` and `:228` — `whileHover={{ x: -3 }}` / `whileHover={{ x: 3 }}`
- `layouts/PostSimple.tsx:66` and `:80` — same ±3 px nudges
- `layouts/AuthorLayout.tsx:44` — `whileHover={{ y: -3 }}`; `:80` — `whileHover={{ y: -2, scale: 1.02 }}`
- `pages/404.tsx:29` — `whileHover={{ y: -2 }}`
- `pages/projects/[slug].tsx:65` — `whileHover={{ y: -4, scale: 1.02 }}`
- CSS: `css/global.css:211-215` (`.link-underline:hover::after` grows and pins on tap); `components/Card.tsx:82` (`group-hover:translate-x-1`)

Frequency: the Share icons (five on every post), the SocialIcons row (sidebar on
every page) and the card lift are hover targets hit tens of times a day — the tier
that calls for removal or drastic reduction, not 1.1–1.12 scale blooms. The
prev/next nudges restate the direction the ← / → glyphs already encode.

## Target

1. Add a capability helper to `lib/motion.ts` (needs `useEffect`, `useState` from React):

```ts
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
```

2. In each component: import it, `const canHover = useHoverCapable();`, then gate and reduce:

| File                                 | Current                                | Target                                                                                       |
| ------------------------------------ | -------------------------------------- | -------------------------------------------------------------------------------------------- |
| `components/Card.tsx:32`             | `whileHover='hover'`                   | `whileHover={canHover ? 'hover' : undefined}`                                                |
| `components/Card.tsx:36`             | `hover: { y: -4 }`                     | `hover: { y: -2 }`                                                                           |
| `components/Card.tsx:46` / `:54`     | `hover: { scale: 1.04 }`               | `hover: { scale: 1.02 }`                                                                     |
| `components/Share.tsx:24`            | `const hover = { y: -2, scale: 1.1 };` | `const hover = { y: -1 };` and `whileHover={canHover ? hover : undefined}` at the five sites |
| `components/SocialIcons.tsx:73`      | `whileHover={{ y: -3, scale: 1.12 }}`  | `whileHover={canHover ? { y: -1 } : undefined}`                                              |
| `layouts/PostLayout.tsx:213`, `:228` | `whileHover={{ x: ∓3 }}`               | delete the prop (leave all other props/classes untouched)                                    |
| `layouts/PostSimple.tsx:66`, `:80`   | `whileHover={{ x: ∓3 }}`               | delete the prop                                                                              |
| `layouts/AuthorLayout.tsx:44`, `:80` | `{ y: -3 }` / `{ y: -2, scale: 1.02 }` | `whileHover={canHover ? { y: -1 } : undefined}`                                              |
| `pages/404.tsx:29`                   | `{ y: -2 }`                            | `whileHover={canHover ? { y: -2 } : undefined}` (rare page — value may stay)                 |
| `pages/projects/[slug].tsx:65`       | `{ y: -4, scale: 1.02 }`               | `whileHover={canHover ? { y: -2, scale: 1.01 } : undefined}`                                 |

3. CSS gating in `css/global.css` — wrap only the `:hover` rule of the underline:

```css
@media (hover: hover) and (pointer: fine) {
  .link-underline:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
}
.link-underline:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

4. Card arrow: at `components/Card.tsx:82` remove `group-hover:translate-x-1` from the
   class list (keep `inline-block transition-transform duration-200 ease-apple-out`)
   and add the class `card-arrow`; add to `css/global.css`:

```css
@media (hover: hover) and (pointer: fine) {
  .group:hover .card-arrow {
    transform: translateX(4px);
  }
}
```

## Repo conventions to follow

- Capability gating exemplar: `css/global.css:83-88`.
- matchMedia + listener pattern exemplar: `components/CustomCursor.tsx:35-48`.
- Springs and helpers live in `lib/motion.ts` — do not add new curves or durations.

## Steps

1. Add `useHoverCapable` to `lib/motion.ts`.
2. Apply the value/gating table to the eight component/layout/page files.
3. Wrap the underline `:hover` rule and add the `card-arrow` rule in `css/global.css`.
4. Swap the Card arrow class as in step 4 above.

## Boundaries

- Do NOT change any `whileTap` value or press transition — owned by plan 004.
- Do NOT touch opacity-only reveals (`components/Pre.tsx:39`, `layouts/ListLayout.tsx:177`) — no geometry moves, so no false-hover problem.
- No new dependencies; no markup changes other than adding the `card-arrow` class.
- If a file does not match the excerpts above (drift since 5b01a7c), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` passes (25 pages, no TypeScript errors).
- **Feel check**: in DevTools device emulation (touch), tap a card, a social icon and an
  underlined link — nothing lifts, grows, slides or stays stuck. Back on desktop, hover
  still shows the now-subtler lift.
- Keyboard-focus still grows the underline (`:focus-visible` is not gated).
- **Done when**: every geometry-changing `whileHover` in the repo is wrapped in
  `canHover`, and touch taps produce no latched hover states.
