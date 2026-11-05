import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { ScriptData, SavedScript } from '@/types'
import { compressForUrl } from '@/utils/urlCompression'
import {
  readScript,
  type IntakeError,
  type IntakeScript,
} from '@/utils/scriptIntake'
import { readScriptFile, readScriptUrl } from '@/services/scriptSources'
import {
  setOriginalScriptCache,
  clearOriginalScriptCache,
  syncScriptKey,
} from '@/stores/scriptModificationStore'
import { sendEvent } from '@/utils/analytics'
import { useSavedScriptsStore } from '@/stores/savedScriptsStore'

/**
 * Where a load came from, as far as its error message is concerned: a URL the
 * user gave, a file, a paste, or the `?script=` link the page was opened on
 */
type ScriptSourceKind = 'url' | 'file' | 'paste' | 'link'

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
  const [currentScriptId, setCurrentScriptId] = useState<string | null>(null)

  /**
   * Says what was wrong with a script intake rejected, on its own. The reason
   * a failed load reports to analytics, and the part of the user's message
   * that varies - see describeIntakeError, which decides the rest.
   */
  const intakeReason = useCallback(
    (error: IntakeError): string => {
      switch (error.kind) {
        case 'decode-failed':
          return t('Failed to load script from URL')
        case 'invalid-json':
          return t('Failed to parse JSON')
        case 'not-array':
          return t('Invalid script format: expected an array')
        case 'invalid-url':
          return t('Invalid URL format')
        case 'fetch-failed':
          return t('Failed to fetch script: {{statusText}}', {
            statusText: error.statusText,
          })
        case 'network':
          return error.message
        case 'read-failed':
          return t('Failed to parse JSON file')
      }
    },
    [t],
  )

  /**
   * Says why a load failed, in the words the user sees. Every failure message
   * is decided here: the same rejection reads differently depending on where
   * the script came from.
   *
   * - A `?script=` link the page opened (`link`) says only that it did not
   *   load: the user did not type it, so the reason would mean nothing to them
   * - A URL the user gave (`url`) says loading failed and why, except for an
   *   encoded value that does not decode, which says so on its own
   * - A file is "a JSON file" to the user, so bad JSON in one says so
   * - A paste says only what was wrong with it
   */
  const describeIntakeError = useCallback(
    (error: IntakeError, source: ScriptSourceKind): string => {
      switch (source) {
        case 'link':
          return t('Failed to load script from URL')
        case 'url':
          return error.kind === 'decode-failed'
            ? intakeReason(error)
            : t('Failed to load script from URL: {{error}}', {
                error: intakeReason(error),
              })
        case 'file':
          return error.kind === 'invalid-json'
            ? t('Failed to parse JSON file')
            : intakeReason(error)
        case 'paste':
          return intakeReason(error)
      }
    },
    [intakeReason, t],
  )

  /**
   * Shows why a load failed and drops the diff, keeping as much of the script
   * that was open as the source calls for:
   *
   * - `script-and-cache` (paste, file): the previous script stays on screen,
   *   and so does its original-script cache. The diff is reset against that
   *   cache, so it has to keep describing the script still being shown.
   * - `script` (a URL the user gave): the previous script stays on screen but
   *   the cache is cleared, as it always has been for this path. The cache
   *   refills from the address bar on the next read.
   * - `nothing` (a `?script=` link the page opened): a broken link shows no
   *   script, rather than whichever was open, and no cache either.
   */
  const failLoad = useCallback(
    (
      message: string,
      keep: 'script-and-cache' | 'script' | 'nothing',
      resetModifications?: () => void,
    ): void => {
      setError(message)
      if (keep === 'nothing') {
        setScriptData(null)
        setScriptName('')
        setCurrentScriptId(null)
        setCurrentScriptUrl('')
      }
      if (keep !== 'script-and-cache') clearOriginalScriptCache()
      if (resetModifications) resetModifications()
    },
    [],
  )

  /**
   * Puts a script on screen as the original its edits are measured against,
   * and clears any error.
   *
   * The address and the diff are left to the caller, because loads differ
   * there: a new script pushes its own address, one opened from the address
   * bar leaves it alone. The cache is keyed by the address as it stands, so a
   * caller that rewrites the address does so before calling this.
   */
  const showScript = useCallback(
    (data: ScriptData, name: string, sourceUrl: string): void => {
      setScriptData(data)
      setScriptName(name)
      setCurrentScriptUrl(sourceUrl)
      // Populate cache so store can access original script synchronously
      setOriginalScriptCache(data)
      setError(null)
    },
    [],
  )

  /**
   * Sets a script that passed intake, updating URL
   */
  const setLoadedScript = useCallback(
    (
      script: IntakeScript,
      fallbackName: string,
      sourceUrl?: string,
      resetModifications?: () => void,
    ): void => {
      // Update URL with compressed script data
      const content = JSON.stringify(script.data)
      const encoded = compressForUrl(content)

      const params = new URLSearchParams()
      params.set('script', encoded)

      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.pushState({}, '', newUrl)

      // Source URL if provided, otherwise cleared
      showScript(script.data, script.name || fallbackName, sourceUrl || '')

      if (resetModifications) {
        // A reset picks the key of the URL written above up on its own
        resetModifications()
      } else {
        /**
         * No reset, so the diff on hand is the one belonging to the script just
         * loaded - loading a script_url rewrites the URL to the encoded script
         * without touching the diff, and a stale key would have the next reload
         * throw it away. Only the key has to follow.
         *
         * This runs in the else branch on purpose: re-keying a diff that is
         * about to be reset would, for a caller that skips the reset, hand the
         * previous script's diff to the new one instead.
         */
        syncScriptKey()
      }
    },
    [showScript],
  )

  /**
   * Loads a script from a URL
   * Supports both:
   * 1. Direct JSON URLs (e.g., https://example.com/script.json)
   * 2. Script tool URLs with encoded script parameter (e.g., https://script.bloodontheclocktower.com/?script=...)
   */
  const loadFromUrl = useCallback(
    async (url: string, resetModifications?: () => void) => {
      setError(null)
      setIsLoading(true)

      try {
        const result = await readScriptUrl(url)

        if (result.ok) {
          const name = result.script.name || t('Script from URL')

          /**
           * Analytics: Track script loaded from a URL
           * Purpose: Understand usage of script-sharing and how users discover
           * scripts from external sources
           * Key insights: Which domains are sharing scripts, popular script
           * repositories, success rate of shared links
           */
          sendEvent('load_script', {
            source: 'url',
            url_type: result.urlKind,
            domain: new URL(url).hostname,
            has_meta: result.script.meta.present,
            script_name: name,
          })

          setLoadedScript(result.script, name, url, resetModifications)
        } else {
          console.error('Failed to load script from URL:', result.error)

          /**
           * Analytics: Track script loading errors from URLs
           * Purpose: Monitor and debug issues with script loading from external sources
           * Key insights: Common error patterns, problematic domains, URL format issues
           */
          sendEvent('script_error', {
            error_type: 'load_failed',
            source: 'url',
            error_message: intakeReason(result.error),
            url: url,
          })

          failLoad(
            describeIntakeError(result.error, 'url'),
            'script',
            resetModifications,
          )
        }
      } finally {
        setIsLoading(false)
      }
    },
    [describeIntakeError, failLoad, intakeReason, setLoadedScript, t],
  )

  /**
   * Loads a script from a File object
   */
  const loadFromFile = useCallback(
    async (file: File, resetModifications?: () => void) => {
      const result = await readScriptFile(file)

      if (result.ok) {
        /**
         * Analytics: Track script loaded from file upload
         * Purpose: Understand local file usage patterns and file sizes
         * Key insights: Average file sizes, file naming patterns, upload success rate
         */
        sendEvent('load_script', {
          source: 'file',
          file_name: file.name,
          file_size: file.size,
          script_name: result.script.name,
          has_meta: result.script.meta.present,
        })

        // The name already falls back to the file name without its extension,
        // and a file with no stem (".json") stays unnamed rather than ".json"
        setLoadedScript(result.script, '', undefined, resetModifications)
      } else {
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

        failLoad(
          describeIntakeError(result.error, 'file'),
          'script-and-cache',
          resetModifications,
        )
      }
    },
    [describeIntakeError, failLoad, setLoadedScript],
  )

  /**
   * Loads a script from JSON string
   */
  const loadFromJson = useCallback(
    (jsonContent: string, resetModifications?: () => void) => {
      const result = readScript({ kind: 'text', text: jsonContent })

      if (result.ok) {
        const name = result.script.name || t('Pasted Script')

        /**
         * Analytics: Track script loaded from JSON paste
         * Purpose: Understand clipboard usage and manual JSON entry patterns
         * Key insights: Content length patterns, paste feature adoption
         */
        sendEvent('load_script', {
          source: 'paste',
          content_length: jsonContent.length,
          script_name: name,
          has_meta: result.script.meta.present,
        })

        setLoadedScript(result.script, name, undefined, resetModifications)
      } else {
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

        failLoad(
          describeIntakeError(result.error, 'paste'),
          'script-and-cache',
          resetModifications,
        )
      }
    },
    [describeIntakeError, failLoad, setLoadedScript, t],
  )

  /**
   * Loads script from URL parameters (on mount or navigation)
   */
  const loadFromUrlParams = useCallback(
    async (
      resetModifications?: () => void,
      getSavedScript?: (id: string) => SavedScript | null,
    ) => {
      const originalUrl = window.location.href
      const params = new URLSearchParams(window.location.search)
      const encodedScript = params.get('script')
      const scriptId = params.get('id')
      const scriptUrlParam = params.get('script_url')

      // Priority 1: script_url (external URL)
      if (scriptUrlParam) {
        setCurrentScriptUrl(scriptUrlParam)
        setCurrentScriptId(null)
        await loadFromUrl(scriptUrlParam, resetModifications)
        return
      }

      // Priority 2: wait for migration before resolving a saved script ID
      if (scriptId && getSavedScript) {
        setIsLoading(true)
        try {
          await useSavedScriptsStore.getState().initialize()
        } catch (error) {
          console.error('Failed to load saved scripts:', error)
          setError(t('Could not load saved scripts. Please reload to retry.'))
          return
        } finally {
          setIsLoading(false)
        }
        if (window.location.href !== originalUrl) return
        const savedScript = getSavedScript(scriptId)

        if (savedScript) {
          showScript(savedScript.scriptData, savedScript.name, '')
          setCurrentScriptId(scriptId)
          if (resetModifications) resetModifications()

          sendEvent('load_saved_script', {
            script_name: savedScript.name,
            script_id: scriptId,
          })
          return
        } else {
          // ID not found in IndexedDB - fall back to encoded script
          console.warn('Script ID not found in IndexedDB:', scriptId)
          setCurrentScriptId(null)
        }
      }

      // Priority 3: encoded script in URL
      if (encodedScript) {
        const result = readScript({ kind: 'encoded', param: encodedScript })

        if (result.ok) {
          // The address already holds this script, so unlike setLoadedScript
          // nothing is pushed and the diff's key is left as it is
          showScript(
            result.script.data,
            result.script.name || t('Shared Script'),
            '',
          )
          setCurrentScriptId(null) // Clear ID for shared scripts
          if (resetModifications) resetModifications()
        } else {
          console.error('Failed to load script from URL:', result.error)
          failLoad(
            describeIntakeError(result.error, 'link'),
            'nothing',
            resetModifications,
          )
        }
      } else {
        // No script in URL - clear everything
        setScriptData(null)
        setScriptName('')
        setCurrentScriptUrl('')
        setCurrentScriptId(null)
        setError(null)
        clearOriginalScriptCache()
        if (resetModifications) resetModifications()
      }
    },
    [describeIntakeError, failLoad, loadFromUrl, showScript, t],
  )

  /**
   * Clears the current script and resets state
   */
  const clearScript = useCallback((resetModifications?: () => void) => {
    setScriptData(null)
    setScriptName('')
    setCurrentScriptUrl('')
    setCurrentScriptId(null)
    setError(null)
    clearOriginalScriptCache()
    if (resetModifications) resetModifications()
  }, [])

  // Note: useEffect hooks for loading from URL params and popstate
  // are handled in the parent component (index.tsx) where getSavedScript is available

  return {
    // State
    scriptData,
    scriptName,
    error,
    isLoading,
    currentScriptUrl,
    currentScriptId,
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
    setCurrentScriptId,
  }
}
