export default {
  locales: ['en', 'cs'],
  output: 'public/locales/$LOCALE.json',
  input: ['src/**/*.{ts,tsx}'],
  defaultNamespace: 'translation',
  keySeparator: false,
  namespaceSeparator: false,
  createOldCatalogs: false,
  keepRemoved: false,
  sort: true,
  useKeysAsDefaultValue: true,
  defaultValue: (locale, namespace, key) => {
    return locale === 'en' ? key : ''
  },
}
