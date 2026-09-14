import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export type Deployment = {
  web?: string;
  android?: string;
  ios?: string;
};

export interface SubProject {
  title: string;
  description: string;
  repository: Maybe<string>;
  deployment: Deployment;
}

export const defaultDimensions: Tuple<number> = [450, 220];

export interface Project {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository: Maybe<string>;
  stack: Stack[];
  dimensions?: Tuple<number>; // Tuple of [height, width]
  screenshots: string[];
  deployment: Deployment;
  subProjects: SubProject[];
}

export const projects: Project[] = [
  {
    title: 'Document Scanner',
    slug: 'document-scanner',
    banner: '/static/projects/Document Scanner/Banner.png',
    website: 'https://github.com/imjimit07/document-scanner',
    description:
      'This is a document scanner app made using python and opencv. It can scan documents, images and can also detect edges of the document.',
    shortDescription: 'Document Scanner made using Python and OpenCV!',
    repository: 'https://github.com/imjimit07/document-scanner',
    stack: [Stack.python, Stack.opencv],
    dimensions: [832, 802],
    screenshots: ['/static/projects/Document Scanner/Banner.png'],
    deployment: {
      web: 'https://github.com/imjimit07/document-scanner',
    },
    subProjects: [],
  },
  {
    title: 'JimitGPT',
    slug: 'jimitGPT',
    banner: '/static/projects/JimitGPT/banner.jpg',
    website: 'https://github.com/imjimit07/jimitGPT',
    description:
      'This is a jupyter notebook based project which is a mini version of ChatGPT.',
    shortDescription: 'An LLM made from scratch in Python!',
    repository: 'https://github.com/imjimit07/jimitGPT',
    stack: [Stack.python, Stack.machineLearning],
    dimensions: [139, 902],
    screenshots: ['/static/projects/JimitGPT/image.png'],
    deployment: {
      web: 'https://github.com/imjimit07/jimitGPT',
    },
    subProjects: [],
  },
  {
    title: 'Object Detection System',
    slug: 'object-detection',
    banner: '/static/projects/Object Detection/banner.jpg',
    website: 'https://github.com/imjimit07/Object-Detection-System',
    description:
      'This is a program that can detect objects in images and videos using python and machine learning.',
    shortDescription: 'Detects objects using Python!',
    repository: 'https://github.com/imjimit07/Object-Detection-System',
    stack: [Stack.python, Stack.machineLearning, Stack.opencv],
    dimensions: [600, 1280],
    screenshots: ['/static/projects/Object Detection/banner.jpg'],
    deployment: {
      web: 'https://github.com/imjimit07/Object-Detection-System',
    },
    subProjects: [],
  },
  {
    title: 'Chess Engine',
    slug: 'chess-engine',
    banner: '/static/projects/Chess Engine/banner.jpg',
    website: 'https://github.com/imjimit07/Chess-Engine',
    description:
      'A fully-featured UCI-compatible chess engine of ~2500 Elo ± 100 ELO estimated rating.',
    shortDescription: 'A 2500 Elo Chess Engine',
    repository: 'https://github.com/imjimit07/Chess-Engine',
    stack: [Stack.c],
    dimensions: [600, 1280],
    screenshots: ['/static/projects/Chess Engine/banner.jpg'],
    deployment: {
      web: 'https://github.com/imjimit07/Chess-Engine',
    },
    subProjects: [],
  },
];
