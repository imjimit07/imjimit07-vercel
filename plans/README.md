# Animation improvement plans

Written by the `improve-animations` audit at commit **5b01a7c**. Each plan is
self-contained — an executor with zero context can implement it from the file alone.
Source files were not modified by the audit; only this directory was created.

| #                                            | Plan                                                       | Severity | Status            |
| -------------------------------------------- | ---------------------------------------------------------- | -------- | ----------------- |
| [001](001-hover-capability-and-restraint.md) | Gate hover motion to capable pointers and restrain it      | HIGH     | DONE — 2026-10-18 |
| [002](002-reduced-motion-integrity.md)       | Reduced-motion integrity (CSS keep-fades + JS branches)    | HIGH     | DONE — 2026-10-18 |
| [003](003-grid-background-render-cost.md)    | Render the grid background on demand, not every frame      | HIGH     | DONE — 2026-10-18 |
| [004](004-unify-press-feedback.md)           | Unify press feedback on one scale, one curve, one budget   | MEDIUM   | DONE — 2026-10-18 |
| [005](005-condensing-header-transform.md)    | Condense the mobile header with transform and opacity only | MEDIUM   | DONE — 2026-10-18 |

## Implementation log (2026-10-18)

All five plans implemented in the working tree — no commits were made. Mechanical
verification: `npm run build` passes (25/25 pages, TypeScript clean); ESLint on
all touched files reports 0 errors (3 pre-existing unused-var warnings elsewhere
in those files). Feel checks below are still open — they need a real browser.

Notes / small deviations:

- **001**: in `SocialIcons.tsx` the hook lives in the `SocialIcons` component and
  `canHover` is passed into the plain `resolveIcon` helper (hooks cannot live in
  a non-component function).
- **003**: the mount-effect cleanup additionally resets `runningRef` so an effect
  re-run (theme change) can reschedule the first frame; the theme-repaint effect
  also covers the reduced-motion path (one frame per theme toggle).

## Recommended execution order

001 → 002 → 003 → 004 → 005 (leverage order: accessibility first, then the
always-on render cost, then feel, then polish).

## Dependencies & overlaps

- **001 and 004 share files** (`Share.tsx`, `SocialIcons.tsx`, `Card.tsx`,
  `TOCInline.tsx`, `LayoutWrapper.tsx`) but own different props: 001 owns
  `whileHover` (+ the Card arrow CSS), 004 owns `whileTap` and press transitions.
  Any order works — keep the edits disjoint.
- **002 and 005 both concern reduced motion in `LayoutWrapper.tsx`**: 005 ships
  that branch inside its rewrite; 002 deliberately excludes the file.
- **`css/global.css` regions**: 002 edits the reduced-motion block, 004 edits
  `:root` + `.pressable`, 001 edits `.link-underline` + the card-arrow rule.

## Backlog (audited, not planned)

- Search-filter continuity: `ListLayout.tsx` unmounts the whole `<motion.ul>` to
  show the empty state (entrance replay + truncated exits), animates on every
  keystroke, and pops the pagination block.
- Token cleanup: align `tailwind.config.js` curves to the canonical set; delete the
  three unused entrance definitions (`fadeUp`, `.fade-in`, `fade-up` keyframe) and
  the unused `spring.momentum` / duration tokens; consolidate the six ad-hoc stagger
  values (0.03–0.1) into the 30–80 ms band.
- Motion shorthand props on continuous paths (`CustomCursor.tsx:114/122`,
  `PostLayout.tsx:70`, `ListLayout.tsx:143`) — measure with DevTools before converting.
- `ScrollTopAndComment.tsx:48` entrance `scale: 0.8` → `0.95` (entrance band 0.9–0.97).
- Dead `components/MobileNav.tsx` (unreferenced; off-token motion) + `duration-333`.

## Missed opportunities (additive — from the audit)

1. Theme flip teleports the whole page (`ThemeSwitch.tsx:25` → no bridge).
2. First-visit hero entrance plays behind the opaque preloader (`Banner.tsx:18-20`).
3. Project gallery drag stops dead on release (`pages/projects/[slug].tsx:135-140`).
4. Mobile drawer can't be swiped away (`components/SidebarNav.tsx:213-226`).
