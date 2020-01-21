module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:node/recommended',
    'plugin:security/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
  ],
  rules: {
    'no-console': 1,
    'react/prop-types': 0,
    'unicorn/filename-case': 0,
    'unicorn/prevent-abbreviations': 0,
  },
}
