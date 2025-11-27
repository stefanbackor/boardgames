import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

// Normalize language code (Slovak -> Czech)
const /* `normalizeLanguage` is a function that takes a language code as input and returns a normalized
version of that code. In this specific implementation, it splits the input language code by
'-' and takes the first part. If the normalized code is 'sk', it returns 'cs' (Czech) instead.
This function is used to ensure consistent language code handling throughout the application. */
  normalizeLanguage = (lang: string | undefined): string | undefined => {
    if (!lang) return undefined
    const normalized = lang.split('-')[0]
    return normalized === 'sk' ? 'cs' : normalized
  }

// Custom detector that wraps localStorage and normalizes the value
const localStorageDetector = {
  name: 'localStorage-normalized',
  lookup() {
    if (typeof window === 'undefined') return undefined
    const stored = window.localStorage.getItem('i18nextLng')
    return normalizeLanguage(stored || undefined)
  },
  cacheUserLanguage(lng: string) {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('i18nextLng', lng)
  },
}

// Custom detector that wraps navigator and normalizes the value
const navigatorDetector = {
  name: 'navigator-normalized',
  lookup() {
    if (typeof navigator === 'undefined') return undefined

    if (navigator.languages && navigator.languages.length) {
      return normalizeLanguage(navigator.languages[0])
    }

    if (navigator.language) {
      return normalizeLanguage(navigator.language)
    }

    return undefined
  },
}

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['localStorage-normalized', 'navigator-normalized'],
      caches: ['localStorage-normalized'],
    },
    defaultNS: 'translation',
    ns: ['translation', 'content'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  })

// Add custom detectors after initialization
const languageDetector = i18n.services.languageDetector as LanguageDetector
if (languageDetector) {
  languageDetector.addDetector(localStorageDetector)
  languageDetector.addDetector(navigatorDetector)
}

export default i18n
