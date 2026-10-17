# 004 — Unify press feedback on one scale, one curve, one budget

- **Status**: DONE — 2026-10-18
- **Commit**: 5b01a7c
- **Severity**: MEDIUM
- **Category**: Physicality & origin / Cohesion & tokens
- **Estimated scope**: 1 CSS block + 7 files, small edits

## Problem

Press feedback is the most frequent motion in the app and it is inconsistent and,
in one place, wrong:

1. `.pressable` in `css/global.css:65-74` uses an **overshoot** curve for the press
   transition — a bouncy pop on tags, pagination and every pressable link, while
   `lib/motion.ts:23` defines press as bounce-free (`press: { type: 'spring', bounce: 0, duration: 0.15 }`)
   and the house rule is "bounce only when the gesture carried momentum":

```css
.pressable {
  transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
  -webkit-tap-highlight-color: transparent;
}
```

2. Press scales are spread across 0.9 / 0.92 / 0.99 — three of four values sit
   outside the subtle band (0.95–0.98):

| File:line                                             | Current                      |
| ----------------------------------------------------- | ---------------------------- |
| `components/LayoutWrapper.tsx:49`                     | `whileTap={{ scale: 0.9 }}`  |
| `components/SidebarNav.tsx:115`                       | `whileTap={{ scale: 0.9 }}`  |
| `components/Share.tsx:38`, `:51`, `:64`, `:77`, `:90` | `whileTap={{ scale: 0.92 }}` |
| `components/SocialIcons.tsx:74`                       | `whileTap={{ scale: 0.92 }}` |
| `components/Card.tsx:33`                              | `whileTap={{ scale: 0.99 }}` |
| `components/TOCInline.tsx:73`                         | `whileTap={{ scale: 0.99 }}` |

3. Two pressable controls have **no** press feedback at all, and one animates with
   `transition-all` (an off-GPU, unbounded property list):

`components/Pre.tsx:32-40`:

```tsx
<button
  aria-label={copied ? 'Code copied' : 'Copy code'}
  type='button'
  onClick={onCopy}
  className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-apple-sm border backdrop-blur-md transition-all duration-200 ${...}`}
>
```

`layouts/ListLayout.tsx:75-84` (clear-search button, no `whileTap`):

```tsx
<motion.button
  key='clear'
  type='button'
  aria-label='Clear search'
  onClick={() => setSearchValue('')}
  initial={{ opacity: 0, scale: 0.7 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.7 }}
  transition={spring.snappy}
```

## Target

One press language: `scale(0.97)`, `160ms`, strong `ease-out`
(`cubic-bezier(0.23, 1, 0.32, 1)`), no overshoot — matching the house press rule
("transform: scale(0.97) on :active, transition: transform 160ms ease-out").

1. Add the canonical curves to the existing `:root` block in `css/global.css`
   (after the `--hairline` line):

```css
/* Canonical motion curves — copy these values, never approximate. */
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

2. Fix `.pressable` (keep the `:active` rule as is):

```css
.pressable {
  transition: transform 160ms var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}
```

3. Normalize the component values to `scale: 0.97`:
   - `LayoutWrapper.tsx:49` → `whileTap={{ scale: 0.97 }}` (its `transition={spring.press}` at :50 stays)
   - `SidebarNav.tsx:115` → `whileTap={{ scale: 0.97 }}` (keep its existing transition prop)
   - `Share.tsx` (:38, :51, :64, :77, :90) and `SocialIcons.tsx:74` → `whileTap={{ scale: 0.97, transition: spring.press }}` (per-target transition so the shared `spring.snappy` :39/:75 keeps governing hover)
   - `Card.tsx:33` → `whileTap={{ scale: 0.97, transition: spring.press }}`
   - `TOCInline.tsx:73` → `whileTap={{ scale: 0.97 }}` (its `transition={spring.press}` at :74 already applies)

4. `components/Pre.tsx` — make the button a `motion.button` (import `motion` already
   exists at line 2), add press feedback, and scope the transitions:

```tsx
<motion.button
  aria-label={copied ? 'Code copied' : 'Copy code'}
  type='button'
  onClick={onCopy}
  whileTap={{ scale: 0.97 }}
  transition={spring.press}
  className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-apple-sm border backdrop-blur-md transition-[background-color,border-color,color,opacity] duration-200 ${...}`}
>
```

5. `layouts/ListLayout.tsx:75` — add press feedback without disturbing enter/exit:

```tsx
whileTap={{ scale: 0.97, transition: spring.press }}
```

## Repo conventions to follow

- Springs come from `lib/motion.ts` only (`spring.press` is the press token).
- CSS motion tokens live in `css/global.css`; the values above are the canonical set.
- `whileHover` is owned by plan 001 — do not touch it here.

## Steps

1. `:root` curves + `.pressable` fix in `css/global.css`.
2. The six value edits in components/layouts.
3. Pre.tsx button conversion + class change.
4. ListLayout clear-button `whileTap`.

## Boundaries

- Keep every color/shadow/label behavior identical; only press motion changes.
- Do NOT touch `tailwind.config.js` ease tokens (separate token-cleanup backlog item).
- Do NOT change `whileHover` props or `.link-underline`.
- No new dependencies. Drift since 5b01a7c → STOP and report.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**:
  - In DevTools slow motion (Animations panel at 10%), press a tag and a pagination
    link: clean dip to 0.97, no overshoot wobble.
  - Press: sidebar links, mobile menu button, share icons, social icons, cards,
    TOC button, copy-code button, clear-search button — all dip the same amount.
  - With `prefers-reduced-motion: reduce`, presses snap instantly (no transition).
- **Done when**: no `whileTap` value other than 0.97 remains, and `.pressable`
  transitions with the canonical ease-out.
