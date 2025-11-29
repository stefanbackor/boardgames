import { useState, useEffect, useCallback } from 'react'
import type { ScriptData } from '@/types'
import { compressForUrl, decompressFromUrl } from '../utils/urlCompression'

/**
 * Extracts metadata from script data
 */
function extractMeta(parsed: unknown[]) {
  const metaItem = parsed.find(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      (item as { id?: string }).id === '_meta',
  )
  return metaItem as { name?: string; author?: string } | undefined
}

/**
 * Custom hook to manage script loading, parsing, and URL synchronization
 *
 * Features:
 * - Load scripts from URL, file upload, or JSON paste
 * - Automatically sync script to URL parameters
 * - Handle browser navigation (back/forward)
 * - Unified error handling
 *
 * @returns Script state and loading functions
 */
export function useScript() {
  const [scriptData, setScriptData] = useState<ScriptData | null>(null)
  const [scriptName, setScriptName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentScriptUrl, setCurrentScriptUrl] = useState<string>('')

  /**
   * Parses and sets script data, updating URL
   */
  const parseAndSetScript = useCallback(
    async (
      parsed: unknown[],
      fallbackName: string,
      sourceUrl?: string,
      resetModifications?: () => void,
    ): Promise<boolean> => {
      if (!Array.isArray(parsed)) {
        setError('Invalid script format: expected an array')
        if (resetModifications) resetModifications()
        return false
      }

      const meta = extractMeta(parsed)
      const name = meta?.name || fallbackName

      setScriptData(parsed as ScriptData)
      setScriptName(name)
      setError(null)

      // Update URL with compressed script data (lazy-loaded pako)
      const content = JSON.stringify(parsed)
      const encoded = await compressForUrl(content)

      const params = new URLSearchParams()
      params.set('script', encoded)

      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.pushState({}, '', newUrl)

      // Update source URL if provided, otherwise clear it
      setCurrentScriptUrl(sourceUrl || '')

      // Reset modifications if callback provided
      if (resetModifications) resetModifications()

      return true
    },
    [],
  )

  /**
   * Loads a script from a URL
   * Supports both:
   * 1. Direct JSON URLs (e.g., https://example.com/script.json)
   * 2. Script tool URLs with encoded script parameter (e.g., https://script.bloodontheclocktower.com/?script=...)
   */
  const loadFromUrl = useCallback(
    async (url: string, resetModifications?: () => void) => {
      try {
        setError(null)
        setIsLoading(true)

        // Check if this is a URL with an encoded script parameter
        let parsedUrl: URL
        try {
          parsedUrl = new URL(url)
        } catch {
          throw new Error('Invalid URL format')
        }

        const scriptParam = parsedUrl.searchParams.get('script')

        // If there's a script parameter, try to decode it instead of fetching
        // This handles both official BOTC tool URLs and any other tool using the same format
        if (scriptParam) {
          // Decode the script parameter from URL
          const decoded = await decompressFromUrl(scriptParam)
          const parsed = JSON.parse(decoded)

          if (!Array.isArray(parsed)) {
            throw new Error('Invalid script format: expected an array')
          }

          const name = extractMeta(parsed)?.name || 'Script from URL'
          await parseAndSetScript(parsed, name, url, resetModifications)
        } else {
          // No script parameter - fetch from direct JSON URL
          const response = await fetch(url)

          if (!response.ok) {
            throw new Error(`Failed to fetch script: ${response.statusText}`)
          }

          const parsed = await response.json()

          // Extract name from meta or use filename from URL
          const urlName =
            extractMeta(parsed)?.name ||
            url
              .split('/')
              .pop()
              ?.replace(/\.[^/.]+$/, '') ||
            'Script from URL'

          await parseAndSetScript(parsed, urlName, url, resetModifications)
        }
      } catch (err) {
        console.error('Failed to load script from URL:', err)
        setError(
          `Failed to load script from URL: ${err instanceof Error ? err.message : 'Unknown error'}`,
        )
        if (resetModifications) resetModifications()
      } finally {
        setIsLoading(false)
      }
    },
    [parseAndSetScript],
  )

  /**
   * Loads a script from a File object
   */
  const loadFromFile = useCallback(
    (file: File, resetModifications?: () => void) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const parsed = JSON.parse(content)
          const fileName = file.name.replace(/\.[^/.]+$/, '')
          const name = extractMeta(parsed)?.name || fileName

          parseAndSetScript(parsed, name, undefined, resetModifications)
        } catch (err) {
          setError('Failed to parse JSON file')
          if (resetModifications) resetModifications()
          console.error(err)
        }
      }
      reader.readAsText(file)
    },
    [parseAndSetScript],
  )

  /**
   * Loads a script from JSON string
   */
  const loadFromJson = useCallback(
    (jsonContent: string, resetModifications?: () => void) => {
      try {
        const parsed = JSON.parse(jsonContent)
        const name = extractMeta(parsed)?.name || 'Pasted Script'

        parseAndSetScript(parsed, name, undefined, resetModifications)
      } catch (err) {
        setError('Failed to parse JSON')
        if (resetModifications) resetModifications()
        console.error(err)
      }
    },
    [parseAndSetScript],
  )

  /**
   * Loads script from URL parameters (on mount or navigation)
   */
  const loadFromUrlParams = useCallback(
    async (resetModifications?: () => void) => {
      const params = new URLSearchParams(window.location.search)
      const encodedScript = params.get('script')
      const scriptUrlParam = params.get('script_url')

      // Prioritize script_url over encoded script
      if (scriptUrlParam) {
        setCurrentScriptUrl(scriptUrlParam)
        await loadFromUrl(scriptUrlParam, resetModifications)
      } else if (encodedScript) {
        try {
          // Decompress from URL (handles both compressed and legacy uncompressed formats)
          // pako is lazy-loaded here
          const decoded = await decompressFromUrl(encodedScript)
          const parsed = JSON.parse(decoded)

          if (Array.isArray(parsed)) {
            const name = extractMeta(parsed)?.name || 'Shared Script'
            setScriptData(parsed as ScriptData)
            setScriptName(name)
            if (resetModifications) resetModifications()
            setError(null)
          }
        } catch (err) {
          console.error('Failed to load script from URL:', err)
          setError('Failed to load script from URL')
          if (resetModifications) resetModifications()
        }
      } else {
        // No script in URL - clear everything
        setScriptData(null)
        setScriptName('')
        setCurrentScriptUrl('')
        setError(null)
        if (resetModifications) resetModifications()
      }
    },
    [loadFromUrl],
  )

  /**
   * Clears the current script and resets state
   */
  const clearScript = useCallback((resetModifications?: () => void) => {
    setScriptData(null)
    setScriptName('')
    setCurrentScriptUrl('')
    setError(null)
    if (resetModifications) resetModifications()
  }, [])

  // Load script from URL on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return
    loadFromUrlParams()
  }, [loadFromUrlParams])

  // Listen for browser back/forward navigation
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handlePopState = () => {
      loadFromUrlParams()
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [loadFromUrlParams])

  return {
    // State
    scriptData,
    scriptName,
    error,
    isLoading,
    currentScriptUrl,
    // Actions
    loadFromUrl,
    loadFromFile,
    loadFromJson,
    loadFromUrlParams,
    clearScript,
    // State setters (for advanced use cases)
    setScriptData,
    setScriptName,
    setCurrentScriptUrl,
  }
}
