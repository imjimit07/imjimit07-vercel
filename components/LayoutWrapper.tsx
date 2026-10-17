import { ReactNode, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import { spring, whileTap } from '@/lib/motion';
import Footer from './Footer';
import SectionContainer from './SectionContainer';
import SidebarNav from './SidebarNav';
import ThemeSwitch from './ThemeSwitch';

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Large title -> compact toolbar, the way iOS headers behave on scroll.
  useMotionValueEvent(scrollY, 'change', latest => {
    const next = latest > 8;
    setCondensed(previous => (previous === next ? previous : next));
  });

  return (
    <div className='flex'>
      {/* Drawer state lives here; the sidebar itself is present from md up */}
      <SidebarNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className='flex min-h-screen flex-1 flex-col md:ml-72'>
        {/* Mobile toolbar — a translucent layer that content scrolls under.
            Everything squeezes with transform/opacity so scroll never touches
            the layout engine, and the header's box height stays constant. */}
        <header className='sticky top-0 z-30 md:hidden'>
          {/* Shadow fades in as content slides under — opacity only */}
          <motion.div
            aria-hidden='true'
            initial={false}
            animate={{ opacity: condensed ? 1 : 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : spring.ui}
            className='pointer-events-none absolute inset-0 shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
          />
          {/* Glass squeezes with transform, never with padding/height:
              52 / 64 px row = scaleY(0.8125) */}
          <motion.div
            aria-hidden='true'
            initial={false}
            animate={{
              transform: condensed ? 'scaleY(0.8125)' : 'scaleY(1)',
            }}
            transition={shouldReduceMotion ? { duration: 0 } : spring.ui}
            className='material-thin pointer-events-none absolute inset-0 origin-top'
          />
          <motion.div
            initial={false}
            animate={{
              transform: condensed ? 'translateY(-6px)' : 'translateY(0px)',
            }}
            transition={shouldReduceMotion ? { duration: 0 } : spring.ui}
            className='relative flex w-full items-center justify-between px-4 py-3'
          >
            <motion.button
              type='button'
              aria-label='Open menu'
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(true)}
              whileTap={{ scale: 0.97 }}
              transition={spring.press}
              className='rounded-apple-sm p-1.5 text-gray-900 dark:text-gray-100'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='h-6 w-6'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            </motion.button>
            <ThemeSwitch />
          </motion.div>
        </header>

        <SectionContainer>
          <div className='flex min-h-screen flex-1 flex-col'>
            <main className='flex flex-1 flex-col'>{children}</main>
            <Footer />
          </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default LayoutWrapper;
