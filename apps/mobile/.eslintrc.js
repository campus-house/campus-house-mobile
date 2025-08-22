module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', 'react-native', 'prettier'],
  rules: {
    // Prettier 통합
    'prettier/prettier': 'error',

    // 기본 JavaScript/TypeScript 규칙
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'no-trailing-spaces': 'error',

    // React 규칙
    'react/prop-types': 'off', // TypeScript 사용시 불필요
    'react/react-in-jsx-scope': 'off', // React 17+ 자동 import
    'react/jsx-uses-react': 'off', // React 17+ 자동 import
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-key': 'error',

    // React Hooks 규칙
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // React Native 특화 규칙
    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-raw-text': 'off', // Expo에서는 유연하게
  },
  env: {
    'react-native/react-native': true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
