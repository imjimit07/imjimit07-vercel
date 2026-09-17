// Example usage of InteractiveGridBackground component

import InteractiveGridBackground from '@/components/InteractiveGridBackground';

// Example 1: Basic usage with default settings
export function Example1() {
  return (
    <div className='relative min-h-screen'>
      <InteractiveGridBackground />
      <div className='relative z-10 p-8'>
        <h1>Your content here</h1>
      </div>
    </div>
  );
}

// Example 2: Customized subtle background
export function Example2() {
  return (
    <div className='relative min-h-screen'>
      <InteractiveGridBackground
        cellSize={60}
        glowDuration={1500}
        maxIntensity={0.4}
        trailLength={3}
        fadeOverlay={true}
      />
      <div className='relative z-10 p-8'>
        <h1>Subtle grid background</h1>
      </div>
    </div>
  );
}

// Example 3: Intense interactive effect
export function Example3() {
  return (
    <div className='relative min-h-screen'>
      <InteractiveGridBackground
        cellSize={40}
        glowDuration={600}
        maxIntensity={1}
        trailLength={8}
        idleAnimationInterval={100}
        fadeOverlay={false}
      />
      <div className='relative z-10 p-8'>
        <h1>Intense grid effect</h1>
      </div>
    </div>
  );
}

// Example 4: Large cells with slow fade
export function Example4() {
  return (
    <div className='relative min-h-screen'>
      <InteractiveGridBackground
        cellSize={100}
        glowDuration={2000}
        maxIntensity={0.6}
        trailLength={4}
        idleAnimationInterval={200}
      />
      <div className='relative z-10 p-8'>
        <h1>Large grid cells</h1>
      </div>
    </div>
  );
}

// Example 5: With custom className for opacity
export function Example5() {
  return (
    <div className='relative min-h-screen'>
      <InteractiveGridBackground cellSize={50} className='opacity-50' />
      <div className='relative z-10 p-8'>
        <h1>Semi-transparent grid</h1>
      </div>
    </div>
  );
}
