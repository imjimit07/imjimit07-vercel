import { Colors } from './colors';

export enum Stack {
  // Languages
  typescript,
  javascript,
  python,
  html,

  // Frontend
  reactnative,

  // Tools
  docker,
}

export const WorkStack = [
  Stack.typescript,
  Stack.python,
  Stack.html,
  Stack.docker,
  Stack.reactnative,
];

type StackInfoMap = {
  value: string;
  color: string;
};

export const StackInfo: Record<Stack, StackInfoMap> = {
  [Stack.javascript]: {
    value: 'JavaScript',
    color: Colors.javascript,
  },
  [Stack.html]: {
    value: 'HTML',
    color: Colors.html,
  },
  [Stack.reactnative]: {
    value: 'React Native',
    color: Colors.reactnative,
  },
  [Stack.python]: {
    value: 'Python',
    color: Colors.python,
  },
  [Stack.docker]: {
    value: 'Docker',
    color: Colors.docker,
  },
  [Stack.typescript]: {
    value: 'Typescript',
    color: Colors.typescript,
  },
};
