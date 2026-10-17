import PageTitle from '@/components/PageTitle';
import SectionContainer from '@/components/SectionContainer';
import { PageSEO } from '@/components/SEO';
import { ReactNode } from 'react';

interface Props {
  frontMatter: { title: string; description?: string };
  children: ReactNode;
}

/** Minimal layout for the /mdx-demo page — no dates, authors or tags. */
export default function DemoLayout({ frontMatter, children }: Props) {
  return (
    <SectionContainer>
      <PageSEO
        title={`${frontMatter.title} — Demo`}
        description={frontMatter.description || 'MDX UI component preview'}
      />
      <article>
        <header className='border-b border-gray-100 pt-12 pb-8 dark:border-gray-800'>
          <PageTitle>{frontMatter.title}</PageTitle>
        </header>
        <div className='prose max-w-none pt-8 pb-16 dark:prose-dark'>
          {children}
        </div>
      </article>
    </SectionContainer>
  );
}
