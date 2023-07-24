module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  root: true,
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  rules: {
    camelcase: 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-redeclare': 'off',
    'import/export': 'off',
    'node/no-path-concat': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'no-console': ['error', { allow: ['table', 'debug', 'error'] }],
  },
};
