import { MDXLayoutRenderer } from '@/components/MDXComponents';
import { getFileBySlug } from '@/lib/mdx';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { PostFrontMatter } from 'types/PostFrontMatter';

const DEFAULT_LAYOUT = 'DemoLayout';
const DEMO_SLUG = 'mdx-ui';

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  demo: { mdxSource: string; frontMatter: PostFrontMatter };
}> = async () => {
  const demo = await getFileBySlug<PostFrontMatter>('demo', DEMO_SLUG);
  return { props: { demo } };
};

export default function MdxDemo({
  demo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, frontMatter } = demo;

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  );
}
