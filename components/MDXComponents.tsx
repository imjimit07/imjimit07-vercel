/* eslint-disable react/display-name */
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
  const Layout = require(`../layouts/${layout}`).default;
  return <Layout {...rest} />;
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