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
  /** Current script ID if this is a saved script */
  currentScriptId: string | null
  /** Function to save script to localStorage */
  saveScript: (
    id: string | null,
    scriptData: ScriptData,
    name: string,
    author: string,
    encodedScript: string,
  ) => string
  /** Function to update current script ID */
  setCurrentScriptId: (id: string | null) => void
}

/**
 * Return type for the useScriptCommit hook
 */
interface UseScriptCommitReturn {
  /** Handler to save changes to localStorage and URL */
  handleSaveChanges: () => Promise<void>
  /** Handler to revert changes to original state */
  handleRevertChanges: () => void
}

/**
 * Custom hook for saving and reverting script changes.
 * Handles URL encoding, metadata updates, localStorage persistence, and modification tracking.
 *
 * When saving:
 * - Builds a complete script with updated metadata
 * - Compresses and encodes the script for URL
 * - Saves to localStorage with UUID
 * - Updates browser history with both script and id parameters
 * - Resets modification tracking
 *
 * When reverting:
 * - Reloads script from current URL parameters
 * - Discards all uncommitted changes
 *
 * @param props - Configuration including script data and state management functions
 * @returns Object containing save and revert handlers
 *
 * @example
 * const { handleSaveChanges, handleRevertChanges } = useScriptCommit({
 *   scriptData,
 *   getMetaOverrides,
 *   setScriptData,
 *   setScriptName,
 *   setCurrentScriptUrl,
 *   resetModifications,
 *   loadFromUrlParams,
 *   currentScriptId,
 *   saveScript,
 *   setCurrentScriptId,
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
  currentScriptId,
  saveScript,
  setCurrentScriptId,
}: UseScriptCommitProps): UseScriptCommitReturn {
  /**
   * Handler to save changes to localStorage and URL
   * Encodes the script with metadata, saves to localStorage, and updates the URL
   */
  const handleSaveChanges = useCallback(async () => {
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

    // Save to localStorage and get/generate UUID
    const scriptId = saveScript(
      currentScriptId,
      committed as ScriptData,
      name,
      author,
      encoded,
    )

    // Update URL with both script and id parameters
    const params = new URLSearchParams()
    params.set('script', encoded)
    params.set('id', scriptId)

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, '', newUrl)

    // Clear the script URL since we're now using encoded script
    setCurrentScriptUrl('')

    // Update script ID if this was a new save
    if (currentScriptId !== scriptId) {
      setCurrentScriptId(scriptId)
    }

    // Update local state to match committed script
    setScriptData(committed as ScriptData)
    setScriptName(name)

    /**
     * Analytics: Track when users save their script changes
     * Purpose: Understand script save patterns and user behavior
     * Key insights: Save frequency, script complexity (role count), new vs update saves
     */
    sendEvent('save_script', {
      script_name: name,
      role_count: committed.filter((item) => {
        const id = typeof item === 'string' ? item : item.id
        return id !== '_meta'
      }).length,
      has_author: !!author,
      is_new: !currentScriptId,
    })

    // Reset modification tracking in the store
    resetModifications()
  }, [
    scriptData,
    getMetaOverrides,
    setScriptData,
    setScriptName,
    setCurrentScriptUrl,
    currentScriptId,
    saveScript,
    setCurrentScriptId,
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
    handleSaveChanges,
    handleRevertChanges,
  }
}
