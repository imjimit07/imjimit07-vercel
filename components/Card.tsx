import Image from 'next/image';
import { motion } from 'motion/react';
import { spring, useHoverCapable } from '@/lib/motion';
import Link from './Link';

function Card({ title, description, banner, href }): React.ReactElement {
  const canHover = useHoverCapable();

  const image = (
    <Image
      alt={title}
      src={banner}
      className='object-cover object-center md:h-36 lg:h-48'
      width={544}
      height={306}
    />
  );

  return (
    <motion.div
      className='md:w-1/2 md:p-4'
      style={{ maxWidth: '544px' }}
      // Cards animate in as they scroll into view, once
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={spring.soft}
    >
      {/* Hover lifts the card and zooms the banner in one gesture; the
          variant label propagates to children so both stay in step */}
      <motion.article
        initial='rest'
        animate='rest'
        whileHover={canHover ? 'hover' : undefined}
        whileTap={{ scale: 0.97, transition: spring.press }}
        variants={{
          rest: { y: 0 },
          hover: { y: -2 },
        }}
        transition={spring.ui}
        className='group h-full overflow-hidden rounded-apple-lg border border-gray-100/80 bg-white shadow-apple-sm transition-shadow duration-300 hover:shadow-apple-lg dark:border-gray-800 dark:bg-gray-900/40'
      >
        {banner && (
          <div className='overflow-hidden'>
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
                  transition={spring.soft}
                >
                  {image}
                </motion.div>
              </Link>
            ) : (
              <motion.div
                variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
                transition={spring.soft}
              >
                {image}
              </motion.div>
            )}
          </div>
        )}
        <div className='p-6'>
          <h2 className='mb-3 text-2xl leading-8 font-semibold tracking-apple-tight'>
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className='prose mb-3 line-clamp-2 max-w-none text-gray-500 dark:text-gray-400'>
            {description}
          </p>
          {href && (
            <Link
              href={href}
              className='text-base leading-6 font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
              aria-label={`Link to ${title}`}
            >
              Learn more{' '}
              <span className='card-arrow inline-block transition-transform duration-200 ease-apple-out'>
                &rarr;
              </span>
            </Link>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}

export default Card;
