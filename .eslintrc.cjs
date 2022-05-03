module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'import/extensions': ['error', 'never', {
      ts: 'allways',
      js: 'allways',
    }],
  },
  globals: {
    app: false,
  },
};
