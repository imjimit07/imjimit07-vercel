import Link from '@/components/Link';
import { memo } from 'react';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import { motion } from 'motion/react';
import { stagger, staggerItem } from '@/lib/motion';

interface BannerProps {
  frontMatter: AuthorFrontMatter;
}

function Banner(props: BannerProps): React.ReactElement {
  const { frontMatter } = props;

  // Lines enter together on a stagger — no artificial delay, the spring
  // starts as soon as the page paints.
  return (
    <motion.div
      variants={stagger(0.09, 0.1)}
      initial='hidden'
      animate='show'
      className='flex flex-1 flex-col justify-center px-6 py-apple-2xl lg:px-10'
    >
      <motion.h1
        variants={staggerItem}
        className='display-heading font-bold text-gray-900 dark:text-white'
      >
        Hi, I am {frontMatter.shortname}
      </motion.h1>
      <motion.p
        variants={staggerItem}
        className='text-heading mt-apple-sm text-gray-700 dark:text-gray-200 lg:mt-apple-md'
      >
        {frontMatter.occupation}
      </motion.p>
      <motion.p
        variants={staggerItem}
        className='text-body mt-apple-md font-light text-gray-600 dark:text-gray-300 lg:mt-apple-xl'
      >
        Read more{' '}
        <Link
          className='link-underline text-primary-600 dark:text-primary-400'
          href='/about'
        >
          about me
        </Link>{' '}
        or{' '}
        <Link
          className='link-underline text-primary-600 dark:text-primary-400'
          href='mailto:jimit0907@gmail.com'
        >
          contact me
        </Link>
      </motion.p>
    </motion.div>
  );
}

export default memo(Banner);
