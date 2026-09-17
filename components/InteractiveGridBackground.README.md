# Interactive Grid Background Component

A fully interactive grid background component for React/Next.js with glowing trails and idle animations. The grid reacts to mouse movement, creating smooth trail effects, and automatically animates random cells when idle.

## Features

- ✨ **Mouse-reactive trails** - Smooth glowing effect that follows cursor movement
- 🎨 **Theme support** - Automatically adapts to light/dark mode using next-themes
- 🌈 **Customizable glow** - Adjust intensity, duration, colors, and trail length
- ⚡ **Performance optimized** - Canvas-based rendering with requestAnimationFrame
- 🎭 **Idle animations** - Random cells glow when no mouse activity detected
- 🎚️ **Fade overlays** - Optional gradient overlays for visual depth
- 📱 **Responsive** - Automatically resizes to viewport dimensions

## Installation

The component is already included in your project at:

```
components/InteractiveGridBackground.tsx
```

## Usage

### Basic Usage

```tsx
import InteractiveGridBackground from '@/components/InteractiveGridBackground';

export default function MyPage() {
  return (
    <div className='relative'>
      <InteractiveGridBackground />
      <div className='relative z-10'>{/* Your content here */}</div>
    </div>
  );
}
```

### With Custom Configuration

```tsx
<InteractiveGridBackground
  cellSize={40}
  glowDuration={800}
  maxIntensity={0.8}
  trailLength={3}
  idleAnimationInterval={200}
  fadeOverlay={true}
  className='opacity-50'
/>
```

## Props

| Prop                    | Type      | Default | Description                                             |
| ----------------------- | --------- | ------- | ------------------------------------------------------- |
| `cellSize`              | `number`  | `50`    | Size of each grid cell in pixels                        |
| `glowDuration`          | `number`  | `1000`  | Duration of glow effect in milliseconds                 |
| `maxIntensity`          | `number`  | `1`     | Maximum glow intensity (0-1)                            |
| `trailLength`           | `number`  | `5`     | Radius of cells affected by mouse (creates trail width) |
| `idleAnimationInterval` | `number`  | `150`   | How often idle animations trigger in milliseconds       |
| `fadeOverlay`           | `boolean` | `true`  | Enable gradient fade overlays at top/bottom             |
| `className`             | `string`  | `''`    | Additional CSS classes for the container                |

## How It Works

1. **Grid Rendering**: Uses HTML5 Canvas to draw a grid of cells
2. **Mouse Tracking**: Listens to mouse movement and calculates which grid cells are near the cursor
3. **Trail Effect**: Activates cells in a radius around the mouse position with intensity falloff
4. **Glow Animation**: Each activated cell fades out over time using radial gradients
5. **Idle Mode**: After 2 seconds of no mouse movement, randomly activates cells for ambient animation
6. **Theme Integration**: Reads current theme from next-themes and adjusts colors accordingly

## Theme Colors

The component automatically adapts colors based on the active theme:

**Light Mode:**

- Background: White (#ffffff)
- Grid lines: Black with 5% opacity
- Glow color: Cyan blue (0, 150, 255)

**Dark Mode:**

- Background: Black (#000000)
- Grid lines: White with 5% opacity
- Glow color: Bright cyan (0, 200, 255)

## Performance Considerations

- Uses `requestAnimationFrame` for smooth 60fps animation
- Efficiently manages active cells with a Map data structure
- Automatically removes expired cells to prevent memory leaks
- Canvas rendering is more performant than DOM-based solutions for this use case

## Demo Page

A demo page is included at:

```
pages/grid-demo.tsx
```

Visit `/grid-demo` in your browser to see the component in action with full documentation.

## Browser Support

Works in all modern browsers that support:

- HTML5 Canvas
- ES6+ JavaScript
- CSS custom properties

## Examples

### Subtle Background

```tsx
<InteractiveGridBackground
  cellSize={60}
  glowDuration={1500}
  maxIntensity={0.4}
  trailLength={3}
  fadeOverlay={true}
/>
```

### Intense Effect

```tsx
<InteractiveGridBackground
  cellSize={40}
  glowDuration={600}
  maxIntensity={1}
  trailLength={8}
  idleAnimationInterval={100}
/>
```

### Large Cells, Slow Fade

```tsx
<InteractiveGridBackground
  cellSize={100}
  glowDuration={2000}
  maxIntensity={0.6}
  trailLength={4}
/>
```

## License

Part of the portfolio project.
