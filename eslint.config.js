import react from 'eslint-plugin-react';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'public/',
      'data/',
      '**/dist/',
      '**/build/',
      '**/coverage/',
      '**/.webpack/',
      'next.config.js',
      'tailwind.config.js',
      'scripts/**/*.js',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      react,
      '@typescript-eslint': typescript,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'react/prop-types': 'off',
      'no-undef': 'off',
      'import/no-anonymous-default-export': 'off', // <-- add this
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
