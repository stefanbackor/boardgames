import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ScriptData } from '@/utils/parseScript'
import { compressForUrl } from '@/utils/urlCompression'
import { sendEvent } from '@/utils/analytics'
import { useScriptModificationStore } from '@/stores/scriptModificationStore'
import { extractMeta, getScriptItemId } from '@/utils/parseScript'
import { buildCommittedScript } from '@/utils/commitScript'
import type { MetaOverrides, SavedScript } from '@/types'

/**
 * Props for the useScriptCommit hook
 */
interface UseScriptCommitProps {
  /** The raw script data */
  scriptData: ScriptData | null
  /** Function to get metadata overrides from store */
  getMetaOverrides: () => MetaOverrides | null
  /**
   * Name shown on screen, used to label a script that carries no name of its
   * own so the library row is not blank. It labels the saved script only - it
   * is never written into `_meta`, see the `label` in `handleSaveChanges`.
   */
  fallbackName: string
  /** Function to update script data state */
  setScriptData: (data: ScriptData) => void
  /** Function to update script name state */
  setScriptName: (name: string) => void
  /** Function to clear current script URL */
  setCurrentScriptUrl: (url: string) => void
  /** Function to reset modification tracking */
  resetModifications: () => void
  /**
   * Function to reload script from URL params. The saved-script lookup has to
   * be handed on: without it a reload cannot resolve an `id` in the URL and
   * would treat a saved script as an anonymous shared one.
   */
  loadFromUrlParams: (
    resetCallback: () => void,
    getSavedScript: (id: string) => SavedScript | null,
  ) => void
  /** Function to look a saved script up by id */
  getSavedScript: (id: string) => SavedScript | null
  /** Current script ID if this is a saved script */
  currentScriptId: string | null
  /** Function to save script to IndexedDB */
  saveScript: (
    id: string | null,
    scriptData: ScriptData,
    name: string,
    author: string,
    encodedScript: string,
  ) => Promise<string>
  /** Function to update current script ID */
  setCurrentScriptId: (id: string | null) => void
}

/**
 * Return type for the useScriptCommit hook
 */
interface UseScriptCommitReturn {
  saveError: string | null
  /** Handler to save changes to IndexedDB and URL */
  handleSaveChanges: () => Promise<void>
  /** Handler to revert changes to original state */
  handleRevertChanges: () => void
}

/**
 * Custom hook for saving and reverting script changes.
 * Handles URL encoding, metadata updates, IndexedDB persistence, and modification tracking.
 *
 * When saving:
 * - Builds a complete script with updated metadata
 * - Compresses and encodes the script for URL
 * - Saves to IndexedDB with UUID
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
 *   fallbackName,
 *   setScriptData,
 *   setScriptName,
 *   setCurrentScriptUrl,
 *   resetModifications,
 *   loadFromUrlParams,
 *   getSavedScript,
 *   currentScriptId,
 *   saveScript,
 *   setCurrentScriptId,
 * })
 */
export function useScriptCommit({
  scriptData,
  getMetaOverrides,
  fallbackName,
  setScriptData,
  setScriptName,
  setCurrentScriptUrl,
  resetModifications,
  loadFromUrlParams,
  getSavedScript,
  currentScriptId,
  saveScript,
  setCurrentScriptId,
}: UseScriptCommitProps): UseScriptCommitReturn {
  const { t } = useTranslation()
  const [saveError, setSaveError] = useState<string | null>(null)
  const saving = useRef(false)
  const latestScriptData = useRef(scriptData)
  latestScriptData.current = scriptData
  /**
   * Handler to save changes to IndexedDB and URL
   * Encodes the script with metadata, saves to IndexedDB, and updates the URL
   */
  const handleSaveChanges = useCallback(async () => {
    if (!scriptData || saving.current) return
    saving.current = true
    setSaveError(null)
    const originalUrl = window.location.href
    const overrides = getMetaOverrides()
    try {
      // Unsaved _meta edits win over what the script data still carries
      const {
        script: committed,
        name,
        author,
      } = buildCommittedScript(scriptData, overrides)

      if (committed.length === 0) return

      /**
       * The label this script is filed and shown under.
       *
       * It is kept beside the script rather than written into it. The name on
       * screen for a script that carries none is a localized placeholder
       * ("Shared Script"), so writing it into `_meta` would give the script a
       * real name in one user's language - and every share link and JSON download
       * from then on would carry it, which is exactly what leaving `_meta` alone
       * on the way out is for. The library row needs something to show, so it
       * gets the placeholder; the script itself stays nameless.
       */
      const label = name || fallbackName

      // Encode the committed script to URL with compression (a name the script
      // carries is already in its _meta). pako is lazy-loaded here
      const content = JSON.stringify(committed)
      const encoded = await compressForUrl(content)

      // Save to IndexedDB and get/generate UUID
      const scriptId = await saveScript(
        currentScriptId,
        committed,
        label,
        author,
        encoded,
      )

      // A save finishing after navigation must not replace the newly opened script.
      if (window.location.href !== originalUrl) return

      // Resolve edits against their old baseline before the URL changes. An
      // edit back to an original value may have already pruned its override.
      const unchanged =
        latestScriptData.current === scriptData &&
        getMetaOverrides() === overrides
      const latest =
        !unchanged && latestScriptData.current
          ? buildCommittedScript(latestScriptData.current, getMetaOverrides())
          : null

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
      if (unchanged) {
        setScriptData(committed)
        setScriptName(label)
      } else if (latest) {
        // Raw metadata remains the saved baseline; newer metadata stays in
        // overrides. Otherwise pruning an override on the next edit would
        // expose stale metadata again when building the next save.
        setScriptData([
          ...committed.filter((item) => getScriptItemId(item) === '_meta'),
          ...latest.script.filter((item) => getScriptItemId(item) !== '_meta'),
        ])
        setScriptName(label)
      }

      /**
       * Analytics: Track when users save their script changes
       * Purpose: Understand script save patterns and user behavior
       * Key insights: Save frequency, script complexity (role count), new vs update saves
       */
      sendEvent('save_script', {
        script_name: label,
        // Entries too malformed to name a role are not roles, so they are not
        // counted as any - see getScriptItemId
        role_count: committed.filter((item) => {
          const id = getScriptItemId(item)
          return id !== '' && id !== '_meta'
        }).length,
        has_author: !!author,
        is_new: !currentScriptId,
      })

      // Reset modification tracking in the store
      if (unchanged) resetModifications()
      else if (latest)
        useScriptModificationStore.getState().rebase(latest.script)
    } catch (error) {
      console.error('Failed to save script:', error)
      setSaveError(
        t(
          'Could not save script. Your edits are still available. Please try again.',
        ),
      )
    } finally {
      saving.current = false
    }
  }, [
    scriptData,
    t,
    getMetaOverrides,
    fallbackName,
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

    /**
     * Reload the script from URL params, which will also reset modifications.
     * The saved-script lookup goes along: the URL of a saved script carries its
     * `id`, and a reload that cannot resolve it clears the current id - the
     * next save would then file a second copy instead of updating this one.
     */
    loadFromUrlParams(resetModifications, getSavedScript)
  }, [loadFromUrlParams, getSavedScript, resetModifications, scriptData])

  return {
    saveError,
    handleSaveChanges,
    handleRevertChanges,
  }
}
