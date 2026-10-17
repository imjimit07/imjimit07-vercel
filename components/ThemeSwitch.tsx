'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'motion/react';
import { IoMdMoon as MoonIcon } from 'react-icons/io';
import { IoSunnyOutline as SunIcon } from 'react-icons/io5';
import { spring, whileTap } from '@/lib/motion';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // resolvedTheme is only known on the client; keep SSR and first paint
  // identical by holding the sun icon until mounted.
  const isDark = mounted && resolvedTheme === 'dark';

  useEffect(() => setMounted(true), []);

  return (
    <motion.button
      type='button'
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={mounted ? isDark : undefined}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      whileTap={whileTap}
      transition={spring.press}
      className='material-thin relative flex h-10 w-10 items-center justify-center rounded-apple-base text-gray-900 transition-colors duration-150 hover:bg-gray-200/50 dark:text-gray-100 dark:hover:bg-gray-800/50'
    >
      {/* Sun and moon crossfade with a spring — no hard cut between states */}
      <AnimatePresence initial={false} mode='popLayout'>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={spring.snappy}
          className='absolute inset-0 flex items-center justify-center'
        >
          {isDark ? (
            <MoonIcon className='h-5 w-5' />
          ) : (
            <SunIcon className='h-5 w-5' />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeSwitch;
