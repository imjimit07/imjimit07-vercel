import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import SectionContainer from '@/components/SectionContainer';
import { BlogSEO } from '@/components/SEO';
import * as siteMetadata from '@/data/siteMetadata';
import formatDate from '@/lib/utils/formatDate';
import { spring, stagger, staggerItem } from '@/lib/motion';
import { motion } from 'motion/react';

import { ReactNode } from 'react';
import { PostFrontMatter } from 'types/PostFrontMatter';

interface Props {
  frontMatter: PostFrontMatter;
  children: ReactNode;
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
}

export default function PostSimple({
  frontMatter,
  next,
  prev,
  children,
}: Props) {
  const { slug, date, title } = frontMatter;

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} {...frontMatter} />
      <article>
        <div>
          <motion.header
            variants={stagger(0.07)}
            initial='hidden'
            animate='show'
          >
            <div className='space-y-3 border-b border-gray-100 pb-10 text-center dark:border-gray-800'>
              <motion.dl variants={staggerItem}>
                <div>
                  <dt className='sr-only'>Published on</dt>
                  <dd className='text-base leading-6 font-medium text-gray-500 dark:text-gray-400'>
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </div>
              </motion.dl>
              <motion.div variants={staggerItem} className='pt-2'>
                <PageTitle>{title}</PageTitle>
              </motion.div>
            </div>
          </motion.header>
          <div
            className='divide-y divide-gray-100 pb-8 dark:divide-gray-800 xl:divide-y-0'
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className='divide-y-2 divide-gray-100 dark:divide-gray-800 xl:col-span-3 xl:row-span-2 xl:pb-0'>
              <div className='prose max-w-none pt-10 pb-8 dark:prose-dark'>
                {children}
              </div>
            </div>
            <footer>
              <div className='flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base'>
                {next && (
                  <motion.div
                    className='pt-4 xl:pt-8'
                    transition={spring.snappy}
                  >
                    <Link
                      href={`/blog/${next.slug}`}
                      className='link-underline text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                    >
                      &larr; {next.title}
                    </Link>
                  </motion.div>
                )}
                {prev && (
                  <motion.div
                    className='pt-4 xl:pt-8'
                    transition={spring.snappy}
                  >
                    <Link
                      href={`/blog/${prev.slug}`}
                      className='link-underline text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                    >
                      {prev.title} &rarr;
                    </Link>
                  </motion.div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
