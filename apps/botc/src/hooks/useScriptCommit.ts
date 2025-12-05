import { useCallback } from 'react'
import type { ScriptData } from '@/utils/parseScript'
import { compressForUrl } from '@/utils/urlCompression'
import { sendEvent } from '@/utils/analytics'
import { extractMeta } from '@/utils/parseScript'

/**
 * Props for the useScriptCommit hook
 */
interface UseScriptCommitProps {
  /** The raw script data */
  scriptData: ScriptData | null
  /** Function to get metadata overrides from store */
  getMetaOverrides: () => { name?: string; author?: string } | null
  /** Function to update script data state */
  setScriptData: (data: ScriptData) => void
  /** Function to update script name state */
  setScriptName: (name: string) => void
  /** Function to clear current script URL */
  setCurrentScriptUrl: (url: string) => void
  /** Function to reset modification tracking */
  resetModifications: () => void
  /** Function to reload script from URL params */
  loadFromUrlParams: (resetCallback: () => void) => void
}

/**
 * Return type for the useScriptCommit hook
 */
interface UseScriptCommitReturn {
  /** Handler to commit changes to the URL */
  handleCommitChanges: () => Promise<void>
  /** Handler to revert changes to original state */
  handleRevertChanges: () => void
}

/**
 * Custom hook for committing and reverting script changes.
 * Handles URL encoding, metadata updates, and modification tracking.
 *
 * When committing:
 * - Builds a complete script with updated metadata
 * - Compresses and encodes the script for URL
 * - Updates browser history without page reload
 * - Resets modification tracking
 *
 * When reverting:
 * - Reloads script from current URL parameters
 * - Discards all uncommitted changes
 *
 * @param props - Configuration including script data and state management functions
 * @returns Object containing commit and revert handlers
 *
 * @example
 * const { handleCommitChanges, handleRevertChanges } = useScriptCommit({
 *   scriptData,
 *   getMetaOverrides,
 *   setScriptData,
 *   setScriptName,
 *   setCurrentScriptUrl,
 *   resetModifications,
 *   loadFromUrlParams,
 * })
 */
export function useScriptCommit({
  scriptData,
  getMetaOverrides,
  setScriptData,
  setScriptName,
  setCurrentScriptUrl,
  resetModifications,
  loadFromUrlParams,
}: UseScriptCommitProps): UseScriptCommitReturn {
  /**
   * Handler to commit changes to URL
   * Encodes the script with metadata and updates the URL
   */
  const handleCommitChanges = useCallback(async () => {
    if (!scriptData) return

    // Get current name/author from scriptData's _meta
    const currentMeta = scriptData.find(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        (item as { id?: string }).id === '_meta',
    ) as { name?: string; author?: string } | undefined

    // Check if user explicitly overrode name/author
    const metaOverrides = getMetaOverrides()

    // Use overridden values if they exist, otherwise use current values from scriptData
    const name =
      metaOverrides?.name !== undefined
        ? metaOverrides.name
        : currentMeta?.name || ''
    const author =
      metaOverrides?.author !== undefined
        ? metaOverrides.author
        : currentMeta?.author || ''

    // Build committed script: update _meta with name and author, preserve all other role data
    let hasMetaEntry = false
    const committed = scriptData.map((item) => {
      const id = typeof item === 'string' ? item : item.id
      if (id === '_meta' && typeof item === 'object') {
        hasMetaEntry = true
        return { ...item, name, author }
      }
      return item
    })

    if (!hasMetaEntry) {
      committed.unshift({ id: '_meta', name, author })
    }

    if (committed.length === 0) return

    // Encode the committed script to URL with compression (name is stored in _meta)
    // pako is lazy-loaded here for compression
    const content = JSON.stringify(committed)
    const encoded = await compressForUrl(content)

    const params = new URLSearchParams()
    params.set('script', encoded)

    // Update URL without reloading the page
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, '', newUrl)

    // Clear the script URL since we're now using encoded script
    setCurrentScriptUrl('')

    // Update local state to match committed script
    setScriptData(committed as ScriptData)
    setScriptName(name)

    /**
     * Analytics: Track when users commit their script changes
     * Purpose: Understand script finalization patterns and user confidence
     * Key insights: Commit frequency, script complexity (role count), save behavior
     */
    sendEvent('commit_changes', {
      script_name: name,
      role_count: committed.filter(item => {
        const id = typeof item === 'string' ? item : item.id
        return id !== '_meta'
      }).length,
      has_author: !!author,
    })

    // Reset modification tracking in the store
    resetModifications()
  }, [
    scriptData,
    getMetaOverrides,
    setScriptData,
    setScriptName,
    setCurrentScriptUrl,
    resetModifications,
  ])

  /**
   * Handler to revert changes
   * Reloads the script from URL params to discard uncommitted changes
   */
  const handleRevertChanges = useCallback(() => {
    /**
     * Analytics: Track when users revert their uncommitted changes
     * Purpose: Understand user regret patterns and change confidence
     * Key insights: Revert frequency, indicates UX friction or user uncertainty
     */
    sendEvent('revert_changes', {
      script_name: extractMeta(scriptData || [])?.name || 'unknown',
    })

    // Reload the script from URL params, which will also reset modifications
    loadFromUrlParams(resetModifications)
  }, [loadFromUrlParams, resetModifications, scriptData])

  return {
    handleCommitChanges,
    handleRevertChanges,
  }
}
