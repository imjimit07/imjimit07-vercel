 
import React, { useMemo } from 'react';
// 1. Remove ComponentMap from here
import { getMDXComponent } from 'mdx-bundler/client';
import Image from 'next/image';
import CustomLink from './Link';
import TOCInline from './TOCInline';
import Pre from './Pre';
import { BlogNewsletterForm } from './NewsletterForm';

// 2. Define a custom type for your components to replace ComponentMap
// We use 'any' for the component values to maintain compatibility with your @ts-ignores
export type MDXComponentsType = Record<string, React.ComponentType<any>>;

const Wrapper: React.FC<{ layout: string; children: React.ReactNode }> = ({
  layout,
  ...rest
}) => {
  // Dynamically import the layout component
  const Layout = React.lazy(() => import(`../layouts/${layout}`));
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Layout {...rest} />
    </React.Suspense>
  );
};

// 3. Apply the new type here
export const MDXComponents: MDXComponentsType = {
  Image: Image as any,
  //@ts-ignore
  TOCInline,
  a: CustomLink as any,
  pre: Pre as any,
  wrapper: Wrapper as any,
  //@ts-ignore
  BlogNewsletterForm,
};

interface Props {
  layout: string;
  mdxSource: string;
  [key: string]: unknown;
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  // 4. Use standard React component typing for the result of getMDXComponent
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};