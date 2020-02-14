module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'standard', 'prettier'],
}
