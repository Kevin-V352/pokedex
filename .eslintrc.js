const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error'
};

module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/recommended',
    'airbnb'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'no-extra-semi': RULES.OFF,
    'linebreak-style': RULES.OFF,
    'import/no-unresolved': RULES.OFF,
    'no-use-before-define': RULES.OFF,
    'react/require-default-props': RULES.OFF,
    'comma-dangle': [RULES.ERROR, 'never'],
    'object-curly-newline': [RULES.ERROR, { multiline: true }],
    '@typescript-eslint/no-unused-vars': [RULES.ERROR, { argsIgnorePattern: '^_' }],
    'import/extensions': [RULES.ERROR,
      'never',
      { json: 'always' }
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react+(|-native)',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
};
