// eslint-disable-next-line @typescript-eslint/no-var-requires
const prettier = require('./.prettierrc');

/** @type {import('eslint').ESLint.Options} */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': ['warn', prettier],
    'react/prop-types': 0,
    'react/jsx-uses-vars': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx', '.stories.tsx', '.mjs', 'mts'] },
    ], //should add ".ts" if typescript project
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
        },
      },
    ],
    'no-console': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
  ignorePatterns: ['*.config.js', 'node_modules/'],
};
