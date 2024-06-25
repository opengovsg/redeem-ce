// TODO(ts): Remove eslint rule for import/no-unresolved

module.exports = {
  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'react-hooks',
    'prettier',
    'chakra-ui',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {es6: true},
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['build', 'tsconfig.json', '.eslintrc.js'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    camelcase: 'off',
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {devDependencies: ['e2e/**/*.ts', 'playwright.config.ts', 'src/setupTests.js']},
    ],
    'chakra-ui/props-order': [
      'error',
      {
        firstProps: ['filter'], // Prop filter='auto' must be before related props to work.
      },
    ],
    'chakra-ui/props-shorthand': [
      'error',
      {
        noShorthand: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  globals: {
    JSX: 'readonly',
  },
}
