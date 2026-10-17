import Card from '@/components/Card';
import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import * as siteMetadata from '@/data/siteMetadata';
import config from 'config';

export default function Projects() {
  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className='divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header
          title='Projects'
          subtitle='Things I have designed, built and shipped.'
        />
        {/* Each card animates in as it enters the viewport — the grid
            assembles itself as you scroll rather than all at once */}
        <div className='-m-4 flex flex-wrap pt-4'>
          {config.projects.map(({ slug, title, description, banner }) => (
            <Card
              key={slug}
              title={title}
              description={description}
              banner={banner}
              href={`/projects/${slug}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
