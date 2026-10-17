import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { spring } from '@/lib/motion';
import { Toc } from 'types/Toc';

interface TOCInlineProps {
  toc: Toc;
  indentDepth?: number;
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  exclude?: string | string[];
}

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 */
const TOCInline = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
}: TOCInlineProps) => {
  const [open, setOpen] = useState(false);

  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i');

  const filteredToc = toc.filter(
    heading =>
      heading.depth >= fromHeading &&
      heading.depth <= toHeading &&
      !re.test(heading.value),
  );

  const tocList = (
    <ul>
      {filteredToc.map(heading => (
        <li
          key={heading.value}
          className={`${heading.depth >= indentDepth && 'ml-6'}`}
        >
          <a
            className='!no-underline transition-colors duration-150 hover:!text-primary-500'
            href={heading.url}
          >
            {heading.value}
          </a>
        </li>
      ))}
    </ul>
  );

  const renderTOC = toc.length >= 1;

  if (!asDisclosure || !renderTOC) {
    return tocList;
  }

  // Disclosure: the chevron springs over and the list expands to its
  // natural height — content stays reachable either way.
  return (
    <div className='not-prose mb-8'>
      <motion.button
        type='button'
        onClick={() => setOpen(previous => !previous)}
        aria-expanded={open}
        whileTap={{ scale: 0.97 }}
        transition={spring.press}
        className='material-thin flex w-full items-center justify-between rounded-apple-base px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-100'
      >
        Table of Contents
        <motion.span
          aria-hidden='true'
          animate={{ rotate: open ? 180 : 0 }}
          transition={spring.snappy}
          className='text-gray-400'
        >
          <svg viewBox='0 0 20 20' fill='currentColor' className='h-4 w-4'>
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key='toc'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring.ui}
            className='overflow-hidden'
          >
            <div className='px-4 pt-3 pb-1 text-sm text-gray-600 dark:text-gray-300'>
              {tocList}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TOCInline;
