/** @type {import('stylelint').Config} */
export default {
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-prettier'],
  overrides: [
    {
      files: ['**/*.(vue|html|css)'],
      customSyntax: 'postcss-html',
      extends: ['stylelint-config-recommended-vue'],
    },
    {
      files: ['**/*.less', '*.less'],
      customSyntax: 'postcss-less',
    },
  ],
};
