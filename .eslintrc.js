const airbnbRules  = {
  'no-useless-return': 'off',
  'no-unsafe-finally': 'off',
  'no-fallthrough': 'off',
  'comma-dangle': ['error', 'never'],
  'import/prefer-default-export': 'off',
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
};

const reactRules = {
  'react/destructuring-assignment': [2, 'never'],
  'react/no-unused-prop-types': 'off',
  'react/jsx-uses-react': 'off', // only if using React version 17+
  'react/react-in-jsx-scope': 'off', // only if using React version 17+
  'react-hooks/rules-of-hooks': 'error', // if using hooks
  'react-hooks/exhaustive-deps': 'error', // if using hooks
};

const typescriptRules = {
  '@typescript-eslint/no-empty-interface': 'off',
  '@typescript-eslint/ban-ts-comment': process.env.NODE_ENV === 'production' ? 'error' : 'off'
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    ...airbnbRules,
    ...reactRules,
    ...typescriptRules
  }
};
