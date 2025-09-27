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
    title: 'HTML Calculator',
    slug: 'html-calc',
    banner: '/static/projects/HTML Calculator/banner.png',
    website: 'https://html-calc.netlify.app/',
    description:
      'This scientific calculator can solve complex equations, show graphs and can do math fuctions using python!',
    shortDescription: 'Scientific Calculator made in HTML!',
    repository: 'https://github.com/imjimit07/HTML-Calculator',
    stack: [Stack.python, Stack.html],
    dimensions: [360, 640],
    screenshots: ['/static/projects/HTML Calculator/banner.png'],
    deployment: {
      web: 'https://html-calc.netlify.app/',
    },
    subProjects: [],
  },
  {
    title: 'Document Scanner',
    slug: 'document-scanner',
    banner: '/static/projects/Document Scanner/banner.png',
    website: 'https://github.com/imjimit07/document-scanner',
    description:
      'This is a document scanner app made using python and opencv. It can scan documents, images and can also detect edges of the document.',
    shortDescription: 'Document Scanner made using Python and OpenCV!',
    repository: 'https://github.com/imjimit07/document-scanner',
    stack: [Stack.python, Stack.opencv],
    dimensions: [832, 802],
    screenshots: ['/static/projects/Document Scanner/banner.png'],
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
];
