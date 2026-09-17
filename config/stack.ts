import { Colors } from './colors';

export enum Stack {
  // Languages
  python,
  typescript,
  javascript,
  html,
  c,
  cpp,
  sql,
  machineLearning,

  // Frontend
  react,
  nextjs,
  reactnative,

  // Backend & APIs
  nodejs,
  fastapi,

  // Cloud & Infrastructure
  docker,
  aws,
  vercel,
  postgresql,

  // ML & AI
  pytorch,
  yolov8,
  opencv,
  huggingface,
  mlflow,
  scikitlearn,

  // Tools
  googlecolab,
  claudecode,
}

export const WorkStack = [
  Stack.python,
  Stack.typescript,
  Stack.sql,
  Stack.pytorch,
  Stack.fastapi,
  Stack.nextjs,
  Stack.react,
  Stack.docker,
  Stack.huggingface,
  Stack.yolov8,
  Stack.opencv,
  Stack.mlflow,
  Stack.scikitlearn,
  Stack.cpp,
  Stack.javascript,
  Stack.nodejs,
  Stack.postgresql,
  Stack.aws,
  Stack.vercel,
  Stack.googlecolab,
  Stack.claudecode,
];

type StackInfoMap = {
  value: string;
  color: string;
};

export const StackInfo: Record<Stack, StackInfoMap> = {
  [Stack.python]: {
    value: '🐍 Python',
    color: Colors.python,
  },
  [Stack.typescript]: {
    value: '📘 TypeScript',
    color: Colors.typescript,
  },
  [Stack.javascript]: {
    value: '🟨 JavaScript',
    color: Colors.javascript,
  },
  [Stack.html]: {
    value: 'HTML',
    color: Colors.html,
  },
  [Stack.c]: {
    value: 'C',
    color: Colors.c,
  },
  [Stack.cpp]: {
    value: '🔧 C++',
    color: Colors.cpp,
  },
  [Stack.sql]: {
    value: '🗄️ SQL',
    color: Colors.sql,
  },
  [Stack.machineLearning]: {
    value: '🤖 Machine Learning',
    color: Colors.machinelearning, // Use lowercase 'machinelearning'
  },
  [Stack.react]: {
    value: '⚛️ React',
    color: Colors.react,
  },
  [Stack.nextjs]: {
    value: '▲ Next.js',
    color: Colors.nextjs,
  },
  [Stack.reactnative]: {
    value: 'React Native',
    color: Colors.reactnative,
  },
  [Stack.nodejs]: {
    value: '🟢 Node.js',
    color: Colors.nodejs,
  },
  [Stack.fastapi]: {
    value: '⚡ FastAPI',
    color: Colors.fastapi,
  },
  [Stack.docker]: {
    value: '🐳 Docker',
    color: Colors.docker,
  },
  [Stack.aws]: {
    value: '☁️ AWS',
    color: Colors.aws,
  },
  [Stack.vercel]: {
    value: '▲ Vercel',
    color: Colors.vercel,
  },
  [Stack.postgresql]: {
    value: '🐘 PostgreSQL',
    color: Colors.postgresql,
  },
  [Stack.pytorch]: {
    value: '🔥 PyTorch',
    color: Colors.pytorch,
  },
  [Stack.yolov8]: {
    value: '👁️ YOLOv8',
    color: Colors.yolov8,
  },
  [Stack.opencv]: {
    value: '📷 OpenCV',
    color: Colors.opencv,
  },
  [Stack.huggingface]: {
    value: '🤗 HuggingFace',
    color: Colors.huggingface,
  },
  [Stack.mlflow]: {
    value: '📊 MLflow',
    color: Colors.mlflow,
  },
  [Stack.scikitlearn]: {
    value: '🧮 scikit-learn',
    color: Colors.scikitlearn,
  },
  [Stack.googlecolab]: {
    value: '📓 Google Colab',
    color: Colors.googlecolab,
  },
  [Stack.claudecode]: {
    value: '🤖 Claude Code',
    color: Colors.claudecode,
  },
};
