import { Header } from '@/components/Form';
import Link from '@/components/Link';
import Pagination from '@/components/Pagination';
import Tag from '@/components/Tag';
import formatDate from '@/lib/utils/formatDate';
import { spring, stagger, staggerItem } from '@/lib/motion';
import { AnimatePresence, motion } from 'motion/react';
import { ComponentProps, useMemo, useState } from 'react';
import { BsFilterLeft as FilterIcon } from 'react-icons/bs';
import { PostFrontMatter } from 'types/PostFrontMatter';

interface Props {
  posts: PostFrontMatter[];
  title: string;
  initialDisplayPosts?: PostFrontMatter[];
  pagination?: ComponentProps<typeof Pagination>;
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: Props) {
  const [searchValue, setSearchValue] = useState('');

  const filteredBlogPosts = useMemo(
    () =>
      posts.filter(frontMatter => {
        const searchContent =
          frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ');
        return searchContent.toLowerCase().includes(searchValue.toLowerCase());
      }),
    [posts, searchValue],
  );

  const searching = searchValue.length > 0;

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searching
      ? initialDisplayPosts
      : filteredBlogPosts;

  return (
    <>
      <div className='divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title={title}>
          <div className='relative max-w-lg'>
            <svg
              className='pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <input
              aria-label='Search articles'
              type='text'
              value={searchValue}
              onChange={({ target }) => setSearchValue(target.value)}
              placeholder='Search articles'
              className='w-full rounded-apple-base border border-gray-200/80 bg-white/60 py-2.5 pr-20 pl-10 text-sm text-gray-900 transition-shadow duration-150 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-100'
            />
            {/* Clear control appears only when there's something to clear */}
            <AnimatePresence>
              {searching && (
                <motion.button
                  key='clear'
                  type='button'
                  aria-label='Clear search'
                  onClick={() => setSearchValue('')}
                  whileTap={{ scale: 0.97, transition: spring.press }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={spring.snappy}
                  className='absolute top-1/2 right-11 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                >
                  <svg
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='h-3 w-3'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
            <Link
              href='/tags'
              aria-label='Browse all tags'
              className='absolute top-1/2 right-3 -translate-y-1/2 rounded-apple-sm p-1 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200'
            >
              <FilterIcon size={18} />
            </Link>
          </div>
          {/* Status feedback: users always know what the filter did */}
          <p
            role='status'
            aria-live='polite'
            className='text-sm text-gray-500 dark:text-gray-400'
          >
            {searching
              ? `${displayPosts.length} ${
                  displayPosts.length === 1 ? 'article' : 'articles'
                } found`
              : ''}
          </p>
        </Header>

        {displayPosts.length === 0 ? (
          <p className='mt-8 pb-8 text-center text-gray-500 dark:text-gray-400'>
            No posts found
          </p>
        ) : (
          <motion.ul
            variants={stagger(0.05, 0.05)}
            initial='hidden'
            animate='show'
            className='divide-y divide-gray-100/80 pt-2 dark:divide-gray-800/80'
          >
            <AnimatePresence mode='popLayout' initial={false}>
              {displayPosts.map(frontMatter => {
                const { slug, date, title, summary, tags } = frontMatter;
                return (
                  <motion.li
                    key={slug}
                    layout
                    variants={staggerItem}
                    exit={{
                      opacity: 0,
                      scale: 0.98,
                      transition: spring.snappy,
                    }}
                    className='group relative px-3 py-5 transition-colors duration-150 hover:bg-gray-50/80 dark:hover:bg-white/[0.04] xl:grid xl:grid-cols-4 xl:items-baseline xl:gap-x-4'
                  >
                    <dl>
                      <dt className='sr-only'>Published on</dt>
                      <dd className='text-base leading-6 font-medium text-gray-500 dark:text-gray-400'>
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className='space-y-3 xl:col-span-3'>
                      <div>
                        <h3 className='text-xl leading-8 font-semibold tracking-apple-tight sm:text-2xl'>
                          <Link
                            href={`/blog/${slug}`}
                            className='text-gray-900 dark:text-gray-100'
                          >
                            {title}
                          </Link>
                        </h3>
                        <div className='flex flex-wrap'>
                          {tags.map(tag => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className='prose line-clamp-2 max-w-none text-gray-500 dark:text-gray-400'>
                        {summary}
                      </div>
                    </div>
                    {/* Row affordance, revealed on hover (and focus within) */}
                    <span
                      aria-hidden='true'
                      className='absolute top-1/2 right-4 hidden -translate-y-1/2 text-gray-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 xl:block dark:text-gray-600'
                    >
                      &rarr;
                    </span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
      {pagination && pagination.totalPages > 1 && !searching && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
}
