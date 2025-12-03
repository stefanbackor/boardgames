import { useState, useEffect } from 'react'
import type { Jinx } from '@/types/jinx'
import { jinxes } from '@/data/jinxes.en'

/**
 * Cache for loaded jinx translation modules to avoid re-fetching
 */
const jinxCache = new Map<string, Jinx[]>()

/**
 * Dynamically imports jinx translations for a specific language
 * @param language - The language code to load
 * @returns Promise resolving to the jinx array, or null if not found
 */
async function loadJinxTranslations(language: string): Promise<Jinx[] | null> {
  // Return from cache if already loaded
  if (jinxCache.has(language)) {
    return jinxCache.get(language)!
  }

  try {
    let module: any
    switch (language) {
      case 'cs':
        module = await import('@/data/jinxes.cs.overrides')
        break
      case 'de':
        module = await import('@/data/jinxes.de.overrides')
        break
      case 'hu':
        module = await import('@/data/jinxes.hu.overrides')
        break
      case 'pl':
        module = await import('@/data/jinxes.pl.overrides')
        break
      default:
        // Return null for unsupported languages
        return null
    }

    // Extract the jinxes (default export)
    const jinxData = module.default || null

    if (jinxData) {
      // Cache the loaded jinxes
      jinxCache.set(language, jinxData)
    }

    return jinxData
  } catch (error) {
    console.error(`Failed to load jinxes for language: ${language}`, error)
    return null
  }
}

/**
 * Custom hook that returns language-appropriate jinx data.
 * Jinx translations are lazy-loaded to minimize initial bundle size.
 * Falls back to English jinxes if the language is not supported.
 *
 * @param language - The current language code (e.g., 'cs', 'de', 'hu', 'pl')
 * @returns Array of jinx data for the specified language
 *
 * @example
 * const activeJinxes = useActiveJinxes('de') // Returns German jinxes (lazy-loaded)
 */
export function useActiveJinxes(language: string): Jinx[] {
  const [jinxData, setJinxData] = useState<Jinx[]>(jinxes)
  const [loadedLanguage, setLoadedLanguage] = useState<string>('en')

  useEffect(() => {
    // Skip if already loaded or if English (no translations needed)
    if (loadedLanguage === language || language === 'en') {
      if (language === 'en' && loadedLanguage !== 'en') {
        // Reset to English when switching back
        setJinxData(jinxes)
        setLoadedLanguage('en')
      }
      return
    }

    loadJinxTranslations(language).then((loadedJinxes) => {
      if (loadedJinxes) {
        setJinxData(loadedJinxes)
        setLoadedLanguage(language)
      } else {
        // Fallback to English if loading failed
        setJinxData(jinxes)
        setLoadedLanguage(language)
      }
    })
  }, [language, loadedLanguage])

  return jinxData
}
