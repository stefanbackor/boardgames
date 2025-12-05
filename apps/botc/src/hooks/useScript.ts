import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { ScriptData } from '@/types'
import { compressForUrl, decompressFromUrl } from '@/utils/urlCompression'
import { extractMeta } from '@/utils/parseScript'
import {
  setOriginalScriptCache,
  clearOriginalScriptCache,
} from '@/stores/scriptModificationStore'
import { sendEvent } from '@/utils/analytics'

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
  const { t } = useTranslation()
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
        setError(t('Invalid script format: expected an array'))
        clearOriginalScriptCache()
        if (resetModifications) resetModifications()
        return false
      }

      const meta = extractMeta(parsed)
      const name = meta?.name || fallbackName

      setScriptData(parsed as ScriptData)
      setScriptName(name)
      setError(null)

      // Update URL with compressed script data
      const content = JSON.stringify(parsed)
      const encoded = compressForUrl(content)

      const params = new URLSearchParams()
      params.set('script', encoded)

      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.pushState({}, '', newUrl)

      // Populate cache so store can access original script synchronously
      setOriginalScriptCache(parsed as ScriptData)

      // Update source URL if provided, otherwise clear it
      setCurrentScriptUrl(sourceUrl || '')

      // Reset modifications if callback provided
      if (resetModifications) resetModifications()

      return true
    },
    [t],
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
          throw new Error(t('Invalid URL format'))
        }

        const scriptParam = parsedUrl.searchParams.get('script')

        // If there's a script parameter, try to decode it instead of fetching
        // This handles both official BOTC tool URLs and any other tool using the same format
        if (scriptParam) {
          // Decode the script parameter from URL
          const decoded = decompressFromUrl(scriptParam)
          const parsed = JSON.parse(decoded)

          if (!Array.isArray(parsed)) {
            throw new Error(t('Invalid script format: expected an array'))
          }

          const name = extractMeta(parsed)?.name || t('Script from URL')

          /**
           * Analytics: Track script loaded from encoded URL parameter
           * Purpose: Understand usage of script-sharing feature and traffic sources
           * Key insights: Which domains are sharing scripts, success rate of shared links
           */
          sendEvent('load_script', {
            source: 'url',
            url_type: 'encoded_tool_url',
            domain: parsedUrl.hostname,
            has_meta: !!extractMeta(parsed),
            script_name: name,
          })

          await parseAndSetScript(parsed, name, url, resetModifications)
        } else {
          // No script parameter - fetch from direct JSON URL
          const response = await fetch(url)

          if (!response.ok) {
            throw new Error(
              t('Failed to fetch script: {{statusText}}', {
                statusText: response.statusText,
              }),
            )
          }

          const parsed = await response.json()

          // Extract name from meta or use filename from URL
          const urlName =
            extractMeta(parsed)?.name ||
            url
              .split('/')
              .pop()
              ?.replace(/\.[^/.]+$/, '') ||
            t('Script from URL')

          /**
           * Analytics: Track script loaded from direct JSON URL
           * Purpose: Understand how users discover and load scripts from external sources
           * Key insights: Popular script repositories, direct JSON file usage patterns
           */
          sendEvent('load_script', {
            source: 'url',
            url_type: 'direct_json',
            domain: parsedUrl.hostname,
            has_meta: !!extractMeta(parsed),
            script_name: urlName,
          })

          await parseAndSetScript(parsed, urlName, url, resetModifications)
        }
      } catch (err) {
        console.error('Failed to load script from URL:', err)

        /**
         * Analytics: Track script loading errors from URLs
         * Purpose: Monitor and debug issues with script loading from external sources
         * Key insights: Common error patterns, problematic domains, URL format issues
         */
        sendEvent('script_error', {
          error_type: 'load_failed',
          source: 'url',
          error_message: err instanceof Error ? err.message : 'Unknown error',
          url: url,
        })

        setError(
          t('Failed to load script from URL: {{error}}', {
            error: err instanceof Error ? err.message : t('Unknown error'),
          }),
        )
        clearOriginalScriptCache()
        if (resetModifications) resetModifications()
      } finally {
        setIsLoading(false)
      }
    },
    [parseAndSetScript, t],
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

          /**
           * Analytics: Track script loaded from file upload
           * Purpose: Understand local file usage patterns and file sizes
           * Key insights: Average file sizes, file naming patterns, upload success rate
           */
          sendEvent('load_script', {
            source: 'file',
            file_name: file.name,
            file_size: file.size,
            script_name: name,
            has_meta: !!extractMeta(parsed),
          })

          parseAndSetScript(parsed, name, undefined, resetModifications)
        } catch (err) {
          /**
           * Analytics: Track JSON parsing errors from file uploads
           * Purpose: Identify common issues with user-provided JSON files
           * Key insights: Malformed JSON patterns, file encoding issues
           */
          sendEvent('script_error', {
            error_type: 'parse_failed',
            source: 'file',
            file_name: file.name,
            file_size: file.size,
          })

          setError(t('Failed to parse JSON file'))
          if (resetModifications) resetModifications()
        }
      }
      reader.readAsText(file)
    },
    [parseAndSetScript, t],
  )

  /**
   * Loads a script from JSON string
   */
  const loadFromJson = useCallback(
    (jsonContent: string, resetModifications?: () => void) => {
      try {
        const parsed = JSON.parse(jsonContent)
        const name = extractMeta(parsed)?.name || t('Pasted Script')

        /**
         * Analytics: Track script loaded from JSON paste
         * Purpose: Understand clipboard usage and manual JSON entry patterns
         * Key insights: Content length patterns, paste feature adoption
         */
        sendEvent('load_script', {
          source: 'paste',
          content_length: jsonContent.length,
          script_name: name,
          has_meta: !!extractMeta(parsed),
        })

        parseAndSetScript(parsed, name, undefined, resetModifications)
      } catch (err) {
        /**
         * Analytics: Track JSON parsing errors from paste
         * Purpose: Identify issues with pasted content
         * Key insights: Common JSON syntax errors, clipboard formatting issues
         */
        sendEvent('script_error', {
          error_type: 'parse_failed',
          source: 'paste',
          content_length: jsonContent.length,
        })

        setError(t('Failed to parse JSON'))
        if (resetModifications) resetModifications()
        console.error(err)
      }
    },
    [parseAndSetScript, t],
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
          const decoded = decompressFromUrl(encodedScript)
          const parsed = JSON.parse(decoded)

          if (Array.isArray(parsed)) {
            const name = extractMeta(parsed)?.name || t('Shared Script')
            setScriptData(parsed as ScriptData)
            setScriptName(name)
            // Populate cache so store can access original script synchronously
            setOriginalScriptCache(parsed as ScriptData)
            if (resetModifications) resetModifications()
            setError(null)
          }
        } catch (err) {
          console.error('Failed to load script from URL:', err)
          setError(t('Failed to load script from URL'))
          clearOriginalScriptCache()
          if (resetModifications) resetModifications()
        }
      } else {
        // No script in URL - clear everything
        setScriptData(null)
        setScriptName('')
        setCurrentScriptUrl('')
        setError(null)
        clearOriginalScriptCache()
        if (resetModifications) resetModifications()
      }
    },
    [loadFromUrl, t],
  )

  /**
   * Clears the current script and resets state
   */
  const clearScript = useCallback((resetModifications?: () => void) => {
    setScriptData(null)
    setScriptName('')
    setCurrentScriptUrl('')
    setError(null)
    clearOriginalScriptCache()
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
