module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint',
    ecmaFeatures: {
      "jsx": true
    }
  },
  plugins: [
    'react',
    'react-native'
  ],
  rules: {
    'max-len': 'off',
    'linebreak-style': 'off',
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
    'no-new': 'off',
    'import/prefer-default-export': 'off',
    'indent': ['error', 2, {'SwitchCase': 1}],
  },
};
