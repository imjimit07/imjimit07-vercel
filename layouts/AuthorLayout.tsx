import { Header } from '@/components/Form';
import SocialIcons from '@/components/SocialIcons';
import StackList from '@/components/list/StackList';
import { PageSEO } from '@/components/SEO';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { WorkStack } from 'config/stack';
import Image from 'next/image';
import { ReactNode } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';

interface Props {
  children: ReactNode;
  frontMatter: AuthorFrontMatter;
}

export default function AuthorLayout({ children, frontMatter }: Props) {
  const { name, avatar, occupation, company, resume } = frontMatter;
  const [highlightColor, skillColor] = useRandomColorPair();

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title='About' />
        <div className='items-start space-y-8 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'>
          <div className='flex flex-col items-center pt-8 xl:sticky xl:top-24'>
            <div className='w-full rounded-xl border border-gray-100 p-6 dark:border-gray-800'>
              <div className='flex flex-col items-center'>
                <Image
                  src={avatar}
                  alt='avatar'
                  width={192}
                  height={192}
                  className='h-48 w-48 rounded-full'
                />
                <div className='mt-4 text-center'>
                  <RoughNotation
                    show
                    type='underline'
                    animationDuration={2000}
                    color={highlightColor}
                  >
                    <h3 className='text-2xl font-bold leading-8 tracking-tight'>
                      {name}
                    </h3>
                  </RoughNotation>
                </div>
                <div className='mt-2 text-center font-medium text-gray-500 dark:text-gray-400'>
                  {occupation}
                </div>
                <div className='text-center text-gray-500 dark:text-gray-400'>
                  {company}
                </div>
                <SocialIcons className='justify-center' />
                {resume && (
                  <a
                    href={resume}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80'
                    style={{ backgroundColor: highlightColor }}
                  >
                    Download CV
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className='prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2'>
            {children}
            <div className='mt-12 border-t border-gray-100 pt-8 dark:border-gray-800'>
              <RoughNotation
                show
                type='underline'
                animationDuration={2000}
                color={skillColor}
              >
                <h2 className='inline-block text-2xl font-semibold dark:text-white'>
                  Skills
                </h2>
              </RoughNotation>
              <div className='mt-4'>
                <StackList stack={WorkStack} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
