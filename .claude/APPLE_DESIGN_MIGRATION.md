# Apple Design Migration — status

Implementation is complete across the site. Everything below is in the codebase.

## Foundation

- **`lib/motion.ts`** — the single source of springs, expressed in Apple's vocabulary
  (`bounce` + `duration` ≈ damping ratio + response):
  - `spring.ui` (bounce 0, 0.4) — default UI motion, damping 1.0
  - `spring.snappy` (bounce 0, 0.25) — icons, chips, small elements
  - `spring.press` (bounce 0, 0.15) — press feedback
  - `spring.drawer` (bounce 0.2, 0.3) — sheets/sidebars, momentum-driven
  - `spring.momentum` / `spring.soft` — flicks and larger surfaces
  - `fadeUp()`, `stagger()`, `staggerItem`, `whileTap`, `whileHover`
- **`css/global.css`** — materials (`--material-*` vars, `.material`, `.material-thin`,
  `.material-thick`, `.material-text`), `prefers-reduced-transparency` and
  `prefers-contrast` fallbacks, `.pressable` (CSS press feedback), `.link-underline`
  (opt-in), size-specific typography (`.display-heading`, `.text-heading`, `.text-body`),
  `::selection`, system font stack, `has-custom-cursor` rule.
- **`tailwind.config.js`** — Apple easing curves (`ease-apple-*`), elevation scale
  (`shadow-apple-sm/md/lg`), `fade-up` keyframe, prose refinements (image/pre radius,
  tighter heading leading, non-italic blockquotes with a 3px accent border).
- **`pages/_app.tsx`** — `<MotionConfig reducedMotion="user">` so springs degrade to
  opacity-only for reduced-motion users; dropped the unused IBM Plex webfont imports.
- **`pages/_document.tsx`** — removed the blocking Google Fonts stylesheet (system
  fonts now), split `theme-color` for light/dark browser chrome.

## Components

| Component                                                                  | What changed                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CustomCursor`                                                             | Native cursor hidden only on fine pointers without reduced-motion; dot tracks 1:1, ring follows on a spring (velocity-aware, no rAF loop); blooms on interactive targets, dips on press; parked off-canvas with an instant re-entry jump; z-index above the intro overlay |
| `Preloader`                                                                | First-visit-per-session only, 900ms, system font, motion-value progress (no re-renders), spring exit; skipped entirely for reduced motion                                                                                                                                 |
| `SidebarNav`                                                               | Rebuilt: persistent desktop sidebar (was invisible — `md:translate-x-0` lost to Motion's inline transform) + mobile drawer with backdrop, Escape-to-close, scroll lock, focus move; `layoutId` capsule springs between active links; theme-aware materials                |
| `LayoutWrapper`                                                            | `md:ml-72` matches the sidebar width; sticky translucent mobile toolbar that condenses and grows a shadow/hairline on scroll                                                                                                                                              |
| `ThemeSwitch`                                                              | Sun/moon crossfade with spring rotate+scale; correct spring params; press feedback; proper aria-pressed                                                                                                                                                                   |
| `Card`                                                                     | Scroll-in entrance, hover lift with propagating image zoom, press feedback, Apple radius/shadow, arrow nudge                                                                                                                                                              |
| `Banner`                                                                   | Removed the setTimeout delay; variant stagger with Apple springs; `.link-underline` links                                                                                                                                                                                 |
| `Tag`, `Pagination`, `SocialIcons`, `Share`, `StackList`, `DeploymentList` | Capsule/pill treatments, spring hover + press feedback; pagination no longer nests buttons inside anchors and disables ends as inert spans                                                                                                                                |
| `PageTitle`, `Form`                                                        | Display typography: clamped sizes, negative tracking, tight leading, balanced wrapping; fixed the `lg:text-5x` typo                                                                                                                                                       |
| `ScrollTopAndComment`                                                      | AnimatePresence entrance from the bottom-right origin, glass buttons, comment button only renders when a comments section exists; now mounted in `PostLayout`                                                                                                             |
| `Pre`                                                                      | Copy button revealed on hover/focus, spring icon swap, clipboard failure handling, timer cleanup                                                                                                                                                                          |
| `TOCInline`                                                                | Geist `Collapse` replaced with a Motion disclosure (spring chevron, height auto)                                                                                                                                                                                          |
| `NewsletterForm`                                                           | Apple form styling, spring submit, completion + error feedback via AnimatePresence                                                                                                                                                                                        |
| `Footer`                                                                   | Mobile-only closure (socials + year); desktop keeps socials in the sidebar                                                                                                                                                                                                |
| `InteractiveGridBackground`                                                | Reduced-motion path paints a static grid — no rAF loop, no idle pulses                                                                                                                                                                                                    |

## Layouts & pages

- `ListLayout` — staggered rows, `AnimatePresence` + layout for search filtering,
  clear button, live result count, row hover fill + affordance arrow, no `<p>` inside `<ul>`.
- `PostLayout` — scroll-linked reading progress bar (spring-lagged, offset past the
  sidebar), staggered header entrance, sticky author card, animated banner, hoverable
  prev/next.
- `PostSimple`, `AuthorLayout` — staggered entrances; RoughNotation duration respects
  reduced motion; spring CV button.
- `pages/tags.tsx`, `pages/404.tsx`, `pages/projects/index.tsx`,
  `pages/projects/[slug].tsx` — display typography, staggered pills, spring buttons,
  hover-lifting screenshot gallery.

## Notes / follow-ups

- `components/MobileNav.tsx` is now unreferenced (the sidebar drawer replaced it) and
  safe to delete.
- `components/comments/*` remains unmounted; `ScrollTopAndComment` only shows the
  comment button when a `#comment` element exists.
- No new dependencies: everything uses `motion` (already installed).
