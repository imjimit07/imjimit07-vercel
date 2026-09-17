import InteractiveGridBackground from '@/components/InteractiveGridBackground';
import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';

export default function GridDemo() {
  return (
    <>
      <PageSEO
        title={`Interactive Grid Demo - ${siteMetadata.author}`}
        description='Interactive grid background with glowing trails and idle animations'
      />
      <InteractiveGridBackground
        cellSize={50}
        glowDuration={1000}
        maxIntensity={1}
        trailLength={5}
        idleAnimationInterval={150}
        fadeOverlay={true}
      />
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-center px-4'>
        <div className='max-w-3xl rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-sm dark:bg-black/80'>
          <h1 className='mb-6 text-center text-5xl font-bold text-gray-900 dark:text-gray-100'>
            Interactive Grid Background
          </h1>

          <div className='space-y-6 text-gray-700 dark:text-gray-300'>
            <p className='text-lg'>
              Move your mouse around to create glowing trails across the grid.
              The component features:
            </p>

            <ul className='list-inside list-disc space-y-2 pl-4'>
              <li>
                <strong>Smooth mouse trails</strong> - Cells light up as you
                move, creating a flowing effect
              </li>
              <li>
                <strong>Idle animations</strong> - Random cells glow
                automatically when you're not moving
              </li>
              <li>
                <strong>Dark/Light mode support</strong> - Adapts colors based
                on your theme preference
              </li>
              <li>
                <strong>Customizable glow effects</strong> - Adjust intensity,
                duration, and trail length
              </li>
              <li>
                <strong>Fade overlays</strong> - Optional gradient overlays for
                depth
              </li>
              <li>
                <strong>Performance optimized</strong> - Uses canvas and
                requestAnimationFrame for smooth 60fps
              </li>
            </ul>

            <div className='mt-8 rounded-lg bg-gray-100 p-6 dark:bg-gray-800'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100'>
                Configuration Options
              </h2>
              <div className='space-y-3 text-sm'>
                <div>
                  <code className='rounded bg-gray-200 px-2 py-1 dark:bg-gray-700'>
                    cellSize
                  </code>
                  <span className='ml-2'>
                    - Grid cell size in pixels (default: 50)
                  </span>
                </div>
                <div>
                  <code className='rounded bg-gray-200 px-2 py-1 dark:bg-gray-700'>
                    glowDuration
                  </code>
                  <span className='ml-2'>
                    - How long cells glow in ms (default: 1000)
                  </span>
                </div>
                <div>
                  <code className='rounded bg-gray-200 px-2 py-1 dark:bg-gray-700'>
                    maxIntensity
                  </code>
                  <span className='ml-2'>
                    - Maximum glow intensity 0-1 (default: 1)
                  </span>
                </div>
                <div>
                  <code className='rounded bg-gray-200 px-2 py-1 dark:bg-gray-700'>
                    trailLength
                  </code>
                  <span className='ml-2'>
                    - Number of cells in trail radius (default: 5)
                  </span>
                </div>
                <div>
                  <code className='rounded bg-gray-200 px-2 py-1 dark:bg-gray-700'>
                    idleAnimationInterval
                  </code>
                  <span className='ml-2'>
                    - Idle animation frequency in ms (default: 150)
                  </span>
                </div>
                <div>
                  <code className='rounded bg-gray-200 px-2 py-1 dark:bg-gray-700'>
                    fadeOverlay
                  </code>
                  <span className='ml-2'>
                    - Enable fade gradients top/bottom (default: true)
                  </span>
                </div>
              </div>
            </div>

            <div className='mt-6 rounded-lg border-2 border-primary-500 bg-primary-50 p-4 dark:bg-primary-900/20'>
              <p className='text-center font-semibold text-primary-700 dark:text-primary-400'>
                💡 Try moving your mouse across the screen or wait a moment to
                see the idle animation!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
