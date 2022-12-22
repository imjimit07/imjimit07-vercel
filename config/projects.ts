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
    slug: 'htmlcalc',
    banner: '/static/projects/HTML Calculator/banner.png',
    website: 'https://replit.com/@Imjimit07/HTML-Calculator',
    description:
      'This scientific calculator can solve complex equations, show graphs and can do math fuctions using python!',
    shortDescription:
      'Scientific Calculator made in HTML!',
    repository: 'https://github.com/karanpratapsingh/HyperTrade',
    stack: [
      Stack.python,
      Stack.html,
    ],
    dimensions: [360, 640],
    screenshots: [
      '/static/projects/HTML Calculator/banner.png',
    ],
    deployment: {
      web: 'https://html-calculator.imjimit07.repl.co/',
    },
    subProjects: [],
  },
];
