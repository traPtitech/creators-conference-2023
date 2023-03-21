module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  plugins: ['import', 'promise', 'compat'],
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      sourceType: 'module'
    }
  },
  rules: {
    'promise/avoid-new': 0,
    'compat/compat': 1,
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'curly': [2, 'multi-line']
  }
}
