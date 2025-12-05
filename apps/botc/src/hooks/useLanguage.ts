import { useTranslation } from 'react-i18next'
import { sendEvent } from '@/utils/analytics'

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
    changeLanguage: (lang: string) => {
      /**
       * Analytics: Track language changes
       * Purpose: Understand internationalization usage and language preferences
       * Key insights: Popular languages, language switching patterns, i18n ROI
       */
      sendEvent('change_language', {
        from_language: i18n.language,
        to_language: lang,
      })

      i18n.changeLanguage(lang)
    },
  }
}
