import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { spring, whileTap } from '@/lib/motion';

const buttonClass =
  'material-thin flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white';

/**
 * Floating accessory buttons. They grow out of the bottom-right corner they
 * live in (origin-aware) instead of fading in from nowhere, and can be
 * grabbed and dismissed mid-animation.
 */
const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false);
  const [hasComments, setHasComments] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      setShow(previous => {
        const next = window.scrollY > 50;
        return previous === next ? previous : next;
      });
    };

    handleWindowScroll();
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Only offer the comment button if this page actually has a comments
  // section — no dead controls.
  useEffect(() => {
    setHasComments(Boolean(document.getElementById('comment')));
  }, [show]);

  const shouldReduceMotion = useReducedMotion();

  const handleScrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  }, [shouldReduceMotion]);

  const handleScrollToComment = useCallback(() => {
    document
      .getElementById('comment')
      ?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={spring.ui}
          style={{ transformOrigin: 'bottom right' }}
          className='fixed right-6 bottom-6 z-30 hidden flex-col items-center gap-3 md:flex'
        >
          <motion.button
            aria-label='Scroll to comments'
            type='button'
            onClick={handleScrollToComment}
            whileTap={whileTap}
            transition={spring.press}
            className={buttonClass}
          >
            <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z'
                clipRule='evenodd'
              />
            </svg>
          </motion.button>
          <motion.button
            aria-label='Scroll back to top'
            type='button'
            onClick={handleScrollTop}
            whileTap={whileTap}
            transition={spring.press}
            className={buttonClass}
          >
            <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollTopAndComment;
