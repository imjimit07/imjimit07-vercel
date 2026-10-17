import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import { BlogSEO } from '@/components/SEO';
import Share from '@/components/Share';
import Tag from '@/components/Tag';
import TOCInline from '@/components/TOCInline';
import * as siteMetadata from '@/data/siteMetadata';
import { spring, stagger, staggerItem } from '@/lib/motion';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import { PostFrontMatter } from 'types/PostFrontMatter';
import { Toc } from 'types/Toc';

const editUrl = fileName =>
  `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`;
const discussUrl = slug =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`,
  )}`;

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface Props {
  frontMatter: PostFrontMatter;
  authorDetails: AuthorFrontMatter[];
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
  toc?: Toc;
  children: ReactNode;
}

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  toc,
  children,
}: Props) {
  const { slug, fileName, date, title, tags, readingTime, images } =
    frontMatter;

  const banner = images?.[0];

  const url = `${siteMetadata.siteUrl}/blog/${slug}`;

  // Reading progress: a spring-lagged line that tracks how far into the
  // article you are. It starts on the very first pixel of scroll.
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    mass: 0.4,
  });
  const progress = shouldReduceMotion ? scrollYProgress : smoothedProgress;

  return (
    <SectionContainer>
      <BlogSEO url={url} authorDetails={authorDetails} {...frontMatter} />
      <motion.div
        aria-hidden='true'
        style={{ scaleX: progress }}
        className='fixed inset-x-0 top-0 z-[45] h-0.5 origin-left bg-primary-500 md:left-72'
      />
      <ScrollTopAndComment />
      <article>
        <div className='xl:divide-y xl:divide-gray-100 xl:dark:divide-gray-800'>
          <motion.header
            variants={stagger(0.07)}
            initial='hidden'
            animate='show'
            className='pt-6 xl:pb-6'
          >
            <div className='space-y-3 text-center'>
              <motion.dl variants={staggerItem} className='space-y-10'>
                <div>
                  <dt className='sr-only'>Published on</dt>
                  <dd className='text-base leading-6 font-medium text-gray-500 dark:text-gray-400'>
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate,
                      )}
                    </time>
                  </dd>
                </div>
              </motion.dl>
              <motion.div variants={staggerItem}>
                <PageTitle>{title}</PageTitle>
              </motion.div>
              <motion.p
                variants={staggerItem}
                className='text-base leading-6 text-gray-500 dark:text-gray-400'
              >
                {readingTime?.text}
              </motion.p>
              <motion.div variants={staggerItem}>
                <Share title={title} url={url} />
              </motion.div>
            </div>
          </motion.header>
          <div
            className='divide-y divide-gray-100 pb-8 dark:divide-gray-800 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0'
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <motion.dl
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring.ui, delay: 0.15 }}
              className='pt-6 pb-10 xl:sticky xl:top-6 xl:rounded-apple-lg xl:border xl:border-gray-100 xl:bg-gray-50/60 xl:p-5 xl:pt-5 xl:dark:border-gray-800 xl:dark:bg-white/[0.03]'
            >
              <dt className='sr-only'>Authors</dt>
              <dd>
                <ul className='flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-6'>
                  {authorDetails.map(author => (
                    <li
                      className='flex items-center space-x-3'
                      key={author.name}
                    >
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt='avatar'
                          className='h-10 w-10 rounded-full ring-1 ring-black/5 dark:ring-white/10'
                        />
                      )}
                      <dl className='text-sm leading-5 font-medium whitespace-nowrap'>
                        <dt className='sr-only'>Name</dt>
                        <dd className='text-gray-900 dark:text-gray-100'>
                          {author.name}
                        </dd>
                        <dt className='sr-only'>Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className='link-underline text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                            >
                              {author.twitter.replace(
                                'https://twitter.com/',
                                '@',
                              )}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </motion.dl>
            <div className='divide-y-2 divide-gray-100 dark:divide-gray-800 xl:col-span-3 xl:row-span-2 xl:pb-0'>
              {banner && (
                <motion.img
                  src={banner}
                  className='object-cover object-center shadow-apple-md'
                  alt='banner'
                  initial={{ opacity: 0, y: 16, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={spring.soft}
                />
              )}
              <div className='prose max-w-none !border-t-0 pt-6 pb-8 dark:prose-dark'>
                <TOCInline toc={toc} asDisclosure />
                {children}
              </div>
              <div className='pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300'>
                <Link
                  href={discussUrl(slug)}
                  rel='nofollow'
                  className='link-underline text-primary-500'
                >
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link
                  href={editUrl(fileName)}
                  className='link-underline text-primary-500'
                >
                  {'View on GitHub'}
                </Link>
              </div>
            </div>
            <footer>
              <div className='xl:sticky xl:top-32'>
                <div className='divide-gray-100 text-sm leading-5 font-medium dark:divide-gray-800 xl:col-start-1 xl:row-start-2 xl:divide-y'>
                  {tags && (
                    <div className='py-4 xl:py-8'>
                      <h2 className='text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'>
                        Tags
                      </h2>
                      <div className='flex flex-wrap'>
                        {tags.map(tag => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  )}
                  {(next || prev) && (
                    <div className='flex justify-between py-4 xl:block xl:space-y-6 xl:py-8'>
                      {prev && (
                        <motion.div transition={spring.snappy}>
                          <h2 className='text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'>
                            Previous Article
                          </h2>
                          <div className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                            <Link href={`/blog/${prev.slug}`}>
                              &larr; {prev.title}
                            </Link>
                          </div>
                        </motion.div>
                      )}
                      {next && (
                        <motion.div transition={spring.snappy}>
                          <h2 className='text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'>
                            Next Article
                          </h2>
                          <div className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                            <Link href={`/blog/${next.slug}`}>
                              {next.title} &rarr;
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
                <div className='pt-4 xl:pt-8'>
                  <Link
                    href='/blog'
                    className='link-underline text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                  >
                    &larr; Back to the blog
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
