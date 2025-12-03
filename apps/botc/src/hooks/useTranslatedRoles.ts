import { useState, useEffect, useMemo } from 'react'
import type { Role } from '@/types'
import { roles as baseRoles } from '@/data/roles.en'

/**
 * Type for role translation maps
 */
type RoleTranslationMap = Record<string, any>

/**
 * Cache for loaded translation modules to avoid re-fetching
 */
const translationCache = new Map<string, RoleTranslationMap>()

/**
 * Dynamically imports role translations for a specific language
 * @param language - The language code to load
 * @returns Promise resolving to the translation map, or empty object if language not supported
 */
async function loadRoleTranslations(
  language: string,
): Promise<RoleTranslationMap> {
  // Return from cache if already loaded
  if (translationCache.has(language)) {
    return translationCache.get(language)!
  }

  try {
    let module: any
    switch (language) {
      case 'cs':
        module = await import('@/data/roles.cs.overrides')
        break
      case 'de':
        module = await import('@/data/roles.de.overrides')
        break
      case 'hu':
        module = await import('@/data/roles.hu.overrides')
        break
      case 'pl':
        module = await import('@/data/roles.pl.overrides')
        break
      default:
        // Return empty object for unsupported languages (will use English)
        return {}
    }

    // Extract the translations (try default export first, then named export)
    const translations = module.default || module.roleTranslationsCs || {}

    // Cache the loaded translations
    translationCache.set(language, translations)
    return translations
  } catch (error) {
    console.error(`Failed to load translations for language: ${language}`, error)
    return {}
  }
}

/**
 * Applies translations to base roles
 */
function applyTranslations(
  roles: Role[],
  translationsMap: RoleTranslationMap,
): Role[] {
  return roles.map((role) => {
    const translation = translationsMap[role.id]
    if (!translation) return role

    // Merge role with available translations
    return {
      ...role,
      ...(translation.name && { name: translation.name }),
      ...(translation.ability && { ability: translation.ability }),
      ...(translation.reminders && { reminders: translation.reminders }),
      ...(translation.firstNightReminder && {
        firstNightReminder: translation.firstNightReminder,
      }),
      ...(translation.otherNightReminder && {
        otherNightReminder: translation.otherNightReminder,
      }),
      ...(translation.flavor && { flavor: translation.flavor }),
    }
  })
}

/**
 * Custom hook to apply language-specific translations to base roles.
 * Supports Czech (cs), German (de), Hungarian (hu), and Polish (pl) with fallback to English.
 * Translations are lazy-loaded to minimize initial bundle size.
 *
 * @param language - The current language code (e.g., 'cs', 'de', 'hu', 'pl')
 * @returns Array of roles with translations applied for the specified language
 *
 * @example
 * const roles = useTranslatedRoles('de') // Returns roles with German translations (lazy-loaded)
 */
export function useTranslatedRoles(language: string): Role[] {
  const [translations, setTranslations] = useState<RoleTranslationMap>({})
  const [loadedLanguage, setLoadedLanguage] = useState<string>('')

  // Load translations when language changes
  useEffect(() => {
    // Skip if already loaded or if English (no translations needed)
    if (loadedLanguage === language || language === 'en') {
      return
    }

    loadRoleTranslations(language).then((translationsMap) => {
      setTranslations(translationsMap)
      setLoadedLanguage(language)
    })
  }, [language, loadedLanguage])

  // Apply translations to base roles
  return useMemo(() => {
    // For English or while loading, return base roles
    if (language === 'en' || loadedLanguage !== language) {
      return baseRoles
    }

    return applyTranslations(baseRoles, translations)
  }, [language, loadedLanguage, translations])
}
