import Link from '@/components/Link';
import { PageSEO } from '@/components/SEO';
import Tag from '@/components/Tag';
import * as siteMetadata from '@/data/siteMetadata';
import { getAllTags } from '@/lib/tags';
import kebabCase from '@/lib/utils/kebabCase';
import { stagger, staggerItem } from '@/lib/motion';
import { motion } from 'motion/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export const getStaticProps: GetStaticProps<{
  tags: Record<string, number>;
}> = async () => {
  const tags = await getAllTags('blog');

  return { props: { tags } };
};

export default function Tags({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  return (
    <>
      <PageSEO
        title={`Tags - ${siteMetadata.author}`}
        description='Things I blog about'
      />
      <div className='flex flex-col items-start justify-start divide-y-2 divide-gray-100 dark:divide-gray-800 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0'>
        <div className='space-x-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-4xl leading-[1.05] font-bold tracking-apple-tight text-gray-900 sm:text-5xl md:border-r-2 md:border-gray-200 md:px-6 md:text-6xl dark:text-gray-100 md:dark:border-gray-700'>
            Tags
          </h1>
        </div>
        <motion.div
          variants={stagger(0.03)}
          initial='hidden'
          animate='show'
          className='flex max-w-lg flex-wrap'
        >
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map(t => (
            <motion.div
              key={t}
              variants={staggerItem}
              className='mt-2 mb-2 mr-5 flex items-baseline'
            >
              <Tag text={t} />
              <Link
                href={`/tags/${kebabCase(t)}`}
                className='pl-2 text-xs font-semibold text-gray-500 dark:text-gray-400'
                aria-label={`${tags[t]} posts tagged ${t}`}
              >
                {tags[t]}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
