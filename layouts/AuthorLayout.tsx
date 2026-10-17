import { Header } from '@/components/Form';
import SocialIcons from '@/components/SocialIcons';
import StackList from '@/components/list/StackList';
import { PageSEO } from '@/components/SEO';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { spring, stagger, staggerItem, useHoverCapable } from '@/lib/motion';
import { WorkStack } from 'config/stack';
import { motion, useReducedMotion } from 'motion/react';
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
  const shouldReduceMotion = useReducedMotion();
  const canHover = useHoverCapable();

  // RoughNotation animates in JS, so it needs the preference passed in
  // rather than the global CSS reduced-motion rules.
  const notationDuration = shouldReduceMotion ? 0 : 2000;

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className='divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title='About' />
        <motion.div
          variants={stagger(0.1, 0.05)}
          initial='hidden'
          animate='show'
          className='items-start space-y-8 pt-8 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'
        >
          <motion.div
            variants={staggerItem}
            className='flex flex-col items-center xl:sticky xl:top-6'
          >
            <motion.div
              whileHover={canHover ? { y: -1 } : undefined}
              transition={spring.ui}
              className='w-full rounded-apple-lg border border-gray-100 bg-white/60 p-6 shadow-apple-sm backdrop-blur-sm dark:border-gray-800 dark:bg-white/[0.03]'
            >
              <div className='flex flex-col items-center'>
                <Image
                  src={avatar}
                  alt='avatar'
                  width={192}
                  height={192}
                  className='h-48 w-48 rounded-full ring-1 ring-black/5 dark:ring-white/10'
                />
                <div className='mt-4 text-center'>
                  <RoughNotation
                    show
                    type='underline'
                    animationDuration={notationDuration}
                    color={highlightColor}
                  >
                    <h3 className='text-2xl leading-8 font-bold tracking-apple-tight'>
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
                  <motion.a
                    href={resume}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={canHover ? { y: -1 } : undefined}
                    whileTap={{ scale: 0.97 }}
                    transition={spring.snappy}
                    className='mt-4 inline-flex items-center gap-2 rounded-apple-base px-4 py-2 text-sm font-medium text-white shadow-apple-sm'
                    style={{ backgroundColor: highlightColor }}
                  >
                    Download CV
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className='prose max-w-none pb-8 dark:prose-dark xl:col-span-2'
          >
            {children}
            <div className='mt-12 border-t border-gray-100 pt-8 dark:border-gray-800'>
              <RoughNotation
                show
                type='underline'
                animationDuration={notationDuration}
                color={skillColor}
              >
                <h2 className='inline-block text-2xl font-semibold tracking-apple-tight dark:text-white'>
                  Skills
                </h2>
              </RoughNotation>
              <div className='mt-4'>
                <StackList stack={WorkStack} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
