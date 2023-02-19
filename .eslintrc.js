module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['simple-import-sort', 'unused-imports'],
  rules: {
    'no-console': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    curly: ['off']
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          app: './src/'
        }
      }
    }
  }
};
