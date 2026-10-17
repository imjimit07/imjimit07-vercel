import Link from '@/components/Link';
import { spring, stagger, staggerItem, useHoverCapable } from '@/lib/motion';
import { motion } from 'motion/react';

export default function FourZeroFour() {
  const canHover = useHoverCapable();

  return (
    <motion.div
      variants={stagger(0.08)}
      initial='hidden'
      animate='show'
      className='flex min-h-[60vh] flex-col items-start justify-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10'
    >
      <motion.h1
        variants={staggerItem}
        className='display-heading text-gray-900 dark:text-gray-100 md:border-r-2 md:border-gray-200 md:pr-10 dark:md:border-gray-700'
      >
        404
      </motion.h1>
      <motion.div variants={staggerItem} className='max-w-md space-y-4'>
        <p className='text-2xl font-semibold tracking-apple-tight text-gray-900 dark:text-gray-100'>
          This page doesn't exist.
        </p>
        <p className='text-gray-500 dark:text-gray-400'>
          The link may be broken, or the page may have moved. Everything else is
          exactly where you left it.
        </p>
        <motion.div
          className='inline-flex'
          whileHover={canHover ? { y: -2 } : undefined}
          whileTap={{ scale: 0.97 }}
          transition={spring.snappy}
        >
          <Link
            href='/'
            className='rounded-full bg-primary-500 px-5 py-2.5 text-sm font-medium text-white shadow-apple-sm hover:bg-primary-600'
          >
            Back to homepage
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
