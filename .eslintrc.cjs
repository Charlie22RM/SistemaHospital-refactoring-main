module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    ignorePatterns: ['**/*.spec.ts'],
    rules: {
      // Reglas de espaciado
      'array-bracket-spacing': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'computed-property-spacing': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      semi: ['error', 'always'],
      'space-infix-ops': 'error',
  
      // Reglas de estilo
      camelcase: 'error',
      'comma-style': ['error', 'last'],
      'eol-last': 'error',
      'no-multiple-empty-lines': ['error', { max: 2 }],
      quotes: ['error', 'single'],
      'quote-props': ['error', 'as-needed'],
      'semi-spacing': ['error', { before: false, after: true }],
      'semi-style': ['error', 'last'],
      'space-in-parens': ['error', 'never'],
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'spaced-comment': ['error', 'always'],
  
      // Reglas adicionales según tus preferencias
  
      // ...
    },
  };
  