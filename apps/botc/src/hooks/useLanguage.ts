import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Supported languages in the app
 */
const SUPPORTED_LANGUAGES = ['en', 'cs'] as const
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

/**
 * Custom hook to manage language initialization and persistence
 * 
 * Features:
 * - Initializes language from localStorage or browser settings
 * - Persists language changes to localStorage
 * - Provides language change callback
 * 
 * @returns Language state and change handler
 */
export function useLanguage() {
  const { i18n } = useTranslation()

  // Initialize language from localStorage or browser settings on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const saved = localStorage.getItem('language')
    
    if (saved && SUPPORTED_LANGUAGES.includes(saved as SupportedLanguage)) {
      i18n.changeLanguage(saved)
    } else {
      // Fallback to browser language
      const browserLang = navigator.language.split('-')[0]
      const defaultLang = SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)
        ? browserLang
        : 'cs' // Default to Czech
      i18n.changeLanguage(defaultLang)
    }
  }, [i18n])

  // Persist language changes to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('language', i18n.language)
  }, [i18n.language])

  return {
    language: i18n.language,
    changeLanguage: (lang: string) => i18n.changeLanguage(lang),
  }
}

