module.exports = {
  root: true,
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'react-hooks'],
  parser: '@babel/eslint-parser',
  env: {
    jest: true,
  },
  rules: {
    semi: ['error', 'never'],
    'jsx-quotes': ['error', 'prefer-single'],
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': 'off', // See https://stackoverflow.com/a/44662845
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: './',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src', 'tests'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        project: ['@redeem/merchant'],
      },
    },
  },
}
