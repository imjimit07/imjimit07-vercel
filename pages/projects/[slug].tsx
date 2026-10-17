import Conditional from '@/components/Conditional';
import { H1, H2, H3 } from '@/components/Form';
import DeploymentList from '@/components/list/DeploymentList';
import StackList from '@/components/list/StackList';
import { PageSEO } from '@/components/SEO';
import { spring, stagger, staggerItem, useHoverCapable } from '@/lib/motion';
import config from 'config';
import type { Project, SubProject } from 'config/projects';
import { defaultDimensions } from 'config/projects';
import { motion } from 'motion/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import React, { useCallback } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

const { projects } = config;

export async function getStaticPaths() {
  return {
    paths: projects.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<{
  project: Project;
}> = async ({ params }) => {
  const project = projects.find(project => project.slug === params.slug);

  return {
    props: {
      project,
    },
  };
};

export default function Project({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    title,
    description,
    shortDescription,
    banner,
    dimensions,
    stack,
    deployment,
    screenshots,
    subProjects,
  } = project;

  const [height, width] = dimensions ?? defaultDimensions;
  const canHover = useHoverCapable();

  const renderScreenShotList = useCallback(
    (screenshot: string) => {
      const style: React.CSSProperties = {
        height,
        width,
      };

      return (
        <motion.div
          className='mr-3 flex-shrink-0 cursor-grab overflow-hidden rounded-apple-md bg-placeholder-light shadow-apple-sm active:cursor-grabbing dark:bg-placeholder-dark'
          style={style}
          whileHover={canHover ? { y: -2, scale: 1.01 } : undefined}
          transition={spring.snappy}
        >
          <Image
            loading='eager'
            src={screenshot}
            height={height}
            width={width}
            style={{ objectFit: 'contain' }}
            alt=''
            draggable={false}
          />
        </motion.div>
      );
    },
    [height, width, canHover],
  );

  const renderSubProjectList = useCallback(
    ({ title, deployment, description }: SubProject) => (
      <motion.div variants={staggerItem}>
        <H3>{title}</H3>
        <Conditional condition={!!deployment}>
          <DeploymentList deployment={deployment} />
        </Conditional>
        <p className='mt-2 mb-4 font-light'>{description}</p>
      </motion.div>
    ),
    [],
  );

  const hasDeployments = !!deployment;
  const hasScreenshots = !!screenshots.length;
  const hasSubProjects = !!subProjects.length;

  return (
    <>
      <PageSEO
        title={title}
        description={shortDescription || description}
        imageUrl={banner}
      />
      <motion.div
        variants={stagger(0.08)}
        initial='hidden'
        animate='show'
        className='pt-8'
      >
        <motion.div variants={staggerItem}>
          <H1 className='mb-4'>{title}</H1>
          <p className='mb-2 font-light text-gray-600 dark:text-gray-300'>
            {description}
          </p>
        </motion.div>

        <motion.div variants={staggerItem} className='mt-6'>
          <H2>Stack</H2>
          <StackList stack={stack} />
        </motion.div>

        <Conditional condition={hasDeployments}>
          <motion.div variants={staggerItem} className='mt-6'>
            <H2>Deployments</H2>
            <DeploymentList deployment={deployment} />
          </motion.div>
        </Conditional>

        <Conditional condition={hasScreenshots}>
          <motion.div variants={staggerItem} className='mt-6'>
            <H2 className='my-4'>Screenshots</H2>
            <ScrollContainer
              className='list mt-4 mb-1 flex select-none overflow-auto pb-2'
              hideScrollbars={false}
            >
              {React.Children.toArray(screenshots.map(renderScreenShotList))}
            </ScrollContainer>
          </motion.div>
        </Conditional>

        <Conditional condition={hasSubProjects}>
          <motion.div variants={staggerItem} className='mt-6'>
            <H2 className='mt-4'>More Products</H2>
            <p className='mt-1 mb-4 font-light'>Some additional products</p>
          </motion.div>
          {React.Children.toArray(subProjects.map(renderSubProjectList))}
        </Conditional>
      </motion.div>
    </>
  );
}
