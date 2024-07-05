module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    'build',
    'tsconfig.json',
    'playwright.config.ts',
    '.eslintrc.js',
  ],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:playwright/playwright-test',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    'prettier',
    'react-hooks',
    '@typescript-eslint',
    'chakra-ui',
  ],
  rules: {
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-children-prop': 'off',
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
      {
        devDependencies: [
          'tests/**/*.ts',
          'playwright.config.ts',
          'src/setupTests.js',
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    // note you must disable the base rule as it can report incorrect errors
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-shadow.md#how-to-use
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'no-restricted-exports': 'off',
    // TODO: find out why this plugin is broken :(
    // 'chakra-ui/props-order': 'error',
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
        paths: ['src', 'tests'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
