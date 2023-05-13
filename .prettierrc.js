module.exports = {
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 80,
  importOrder: ['^[./]'],
  importOrderSeparation: true,
  pluginSearchDirs: ['.'],
  plugins: ['@trivago/prettier-plugin-sort-imports']
};
