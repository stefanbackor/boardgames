import { defineConfig } from 'i18next-cli'

export default defineConfig({
  locales: ['en', 'cs', 'de', 'hu', 'pl'],
  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'public/locales/{{language}}/{{namespace}}.json',
    defaultNS: 'translation',
    keySeparator: false,
    nsSeparator: false,
    // Support both t() and tContent() functions
    functions: ['t', 'tContent', '*.t'],
    transComponents: ['Trans'],
    // Sort keys alphabetically
    sort: true,
    // Use key as default value for English, empty string for other locales
    defaultValue: (locale, _namespace, key) => {
      return locale === 'en' ? key : ''
    },
  },
  types: {
    input: ['public/locales/{{language}}/{{namespace}}.json'],
    output: 'src/types/i18next.d.ts',
  },
})