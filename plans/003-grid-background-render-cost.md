# 003 — Render the grid background on demand, not every frame

- **Status**: DONE — 2026-10-18
- **Commit**: 5b01a7c
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 file, one focused refactor of the draw loop

## Problem

`components/InteractiveGridBackground.tsx` repaints a full-viewport canvas ~60×/s
forever. The draw loop reschedules itself unconditionally at line 222:

```tsx
// Continue animation
animationFrameRef.current = requestAnimationFrame(draw);
```

and the idle interval (lines 256-262) keeps feeding cells every 150 ms whenever the
pointer has been still for 2 s — so even with zero active cells and no user input,
the component clears and redraws the entire grid (background fill + every grid line

- a radial gradient per active cell) on every frame. There is no
  `document.hidden`/visibility guard; the loop is started once at line 253 and only
  stopped on unmount. Mounted on the home page (`pages/index.tsx:36-43`), this is the
  site's single most expensive always-on animation.

## Target

Convert the loop to on-demand rendering: draw a frame only when something changed,
and keep drawing only while glow cells are still decaying.

1. Add refs near the other refs (around line 37):

```tsx
const runningRef = useRef(false);
const requestDrawRef = useRef<() => void>(() => {});
```

2. Split scheduling from drawing. Rename the current `draw` to `drawOnce`, make it
   non-self-rescheduling, and let it chain frames only while cells exist:

```tsx
const drawOnce = useCallback(() => {
  runningRef.current = false;
  const canvas = canvasRef.current;
  if (!canvas) return;

  // ...existing drawing body verbatim (grid + cells) ...

  // Keep animating while any glow cells are still decaying
  if (cellsRef.current.size > 0) requestDrawRef.current();
}, [cellSize, glowDuration, getColors, drawGrid]);
```

3. Define the scheduler and keep the ref pointed at it:

```tsx
const requestDraw = useCallback(() => {
  if (runningRef.current) return;
  runningRef.current = true;
  animationFrameRef.current = requestAnimationFrame(drawOnce);
}, [drawOnce]);

useEffect(() => {
  requestDrawRef.current = requestDraw;
}, [requestDraw]);
```

4. Request frames at every source of change:
   - `handleMouseMove` (line 123-130): after `createTrail(...)` add `requestDraw();`
   - initial start (line 253): replace `animationFrameRef.current = requestAnimationFrame(draw);` with `requestDraw();`
   - `resize` (line 231-234): after resizing, call `requestDraw();`
   - the idle interval (line 256-262): guard visibility and request a frame:

```tsx
idleAnimationRef.current = window.setInterval(() => {
  if (document.visibilityState !== 'visible') return;
  const now = Date.now();
  if (now - lastMouseMoveRef.current > 2000) {
    triggerIdleAnimation();
    requestDraw();
  }
}, idleAnimationInterval);
```

- theme changes: with on-demand rendering the grid would otherwise keep stale
  colors after a light/dark toggle — add:

```tsx
useEffect(() => {
  requestDraw();
}, [currentTheme, requestDraw]);
```

- visibility: repaint when the tab returns, so glow state is fresh:

```tsx
const onVisibility = () => {
  if (document.visibilityState === 'visible') requestDraw();
};
document.addEventListener('visibilitychange', onVisibility);
```

and remove it in the existing cleanup alongside the other listeners.

5. Keep the reduced-motion early-return path (lines 239-248) exactly as it is —
   it already paints once and skips the loop.

## Repo conventions to follow

- The reduced-motion one-shot paint (lines 239-248) is the pattern to imitate: paint
  from state, don't run a loop you don't need.
- Keep all existing props/defaults (`cellSize`, `glowDuration`, `idleAnimationInterval`…)
  and visuals identical — only _when_ frames run changes.

## Steps

1. Add `runningRef` and `requestDrawRef`.
2. Convert `draw` → `drawOnce` (remove the self-reschedule; add the tail call).
3. Add `requestDraw` + the ref-sync effect.
4. Wire the five sources: mousemove, initial, resize, idle interval, visibility,
   plus the theme-repaint effect.
5. Update the cleanup for the new listener; adjust dependency arrays so the mount
   effect still re-runs only on the same inputs as today.

## Boundaries

- No visual or prop changes; do not touch `drawGrid`, colors, or the glow math.
- Do not add dependencies or `IntersectionObserver` — visibility + on-demand covers it.
- If line numbers have drifted since 5b01a7c, match on the code, not the numbers.

## Verification

- **Mechanical**: `npm run build` passes; run `npm run dev` and confirm the home page
  renders the grid.
- **Feel check**:
  - DevTools → Performance → record 10 s idle on `/`: no continuous scripting/frames.
  - Move the pointer: trail glows exactly as before for ~1 s after the last move.
  - Toggle the theme on `/`: the grid repaints in the new palette immediately.
  - Switch tabs for 30 s and return: grid is fresh; no stale glow stuck on screen.
- **Done when**: idle home page schedules zero frames, and every trail/idle pulse
  still paints.
