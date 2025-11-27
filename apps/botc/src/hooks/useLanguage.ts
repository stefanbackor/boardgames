import { useTranslation } from 'react-i18next'

/**
 * Custom hook to access language state and change handler
 *
 * Note: Language initialization and persistence are handled by i18next
 * configuration (see i18n.ts) which uses custom detectors for:
 * - Detecting language from localStorage ('i18nextLng') or browser settings
 * - Normalizing Slovak (sk) to Czech (cs)
 * - Persisting language changes automatically
 *
 * @returns Language state and change handler
 */
export function useLanguage() {
  const { i18n } = useTranslation()

  return {
    language: i18n.language,
    changeLanguage: (lang: string) => i18n.changeLanguage(lang),
  }
}
