module.exports = {
  // Basic formatting
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,

  // JSX specific
  jsxSingleQuote: false,
  jsxBracketSameLine: false,

  // Other
  arrowParens: 'always',
  endOfLine: 'lf',
  bracketSpacing: true,

  // File specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
      },
    },
  ],
};
