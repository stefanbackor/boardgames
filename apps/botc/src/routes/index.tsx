import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Box, Container, Flex } from '@radix-ui/themes'
import { roles as baseRoles } from '@/data/roles.en'
import { AppHeader } from '@/components/AppHeader'
import { FileUploadControls } from '@/components/FileUploadControls'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { EmptyState } from '@/components/EmptyState'
import { ScriptContent } from '@/components/ScriptContent'
import { Footer } from '@/components/Footer'
import type { PrintSections } from '@/components/PrintDropdown'
import { parseScript } from '@/utils/parseScript'
import { normalizeBootleggerRules } from '@/utils/bootleggerRules'
import { buildCommittedScript } from '@/utils/commitScript'
import { compressForUrl } from '@/utils/urlCompression'
import { generateMetaDescription } from '@/utils/generateMetaDescription'
import {
  applyAutoRoles,
  isBootleggerRequired,
  isDjinnRequired,
} from '@/utils/scriptAutoRoles'
import { useBaseScripts } from '@/hooks/useBaseScripts'
import { useCarouselScripts } from '@/hooks/useCarouselScripts'
import { useMetaTags } from '@/hooks/useMetaTags'
import { useLanguage } from '@/hooks/useLanguage'
import { useScript } from '@/hooks/useScript'
import { useTranslatedRoles } from '@/hooks/useTranslatedRoles'
import { useActiveJinxes } from '@/hooks/useActiveJinxes'
import { useScriptModification } from '@/hooks/useScriptModification'
import { useScriptCommit } from '@/hooks/useScriptCommit'
import {
  canPersistModifications,
  useScriptModificationStore,
} from '@/stores/scriptModificationStore'
import { useSavedScriptsStore } from '@/stores/savedScriptsStore'
import { sendEvent } from '@/utils/analytics'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/')({ component: App })

function App() {
  // ==================== HOOKS & STATE ====================
  // Translation/i18n hooks
  const { language, changeLanguage } = useLanguage()
  const { t } = useTranslation()

  // Script data hooks
  const {
    scriptData,
    scriptName,
    error,
    isLoading,
    currentScriptUrl,
    currentScriptId,
    loadFromUrl,
    loadFromFile,
    loadFromJson,
    loadFromUrlParams,
    setScriptData,
    setScriptName,
    setCurrentScriptUrl,
    setCurrentScriptId,
  } = useScript()

  // Script modification store (diff-based, URL is source of truth)
  const {
    addRole,
    removeRole,
    replaceRole,
    reorderRoles,
    setName,
    setAuthor,
    setBootleggerRules,
    getName,
    getAuthor,
    getBootleggerRules,
    getMetaOverrides,
    metaOverrides,
    hasRoleEdits,
    isModified,
    reset: resetModifications,
  } = useScriptModificationStore()

  // Saved scripts store (localStorage persistence)
  const {
    saveScript,
    loadScript: getSavedScript,
    deleteScript,
    getAllScripts,
  } = useSavedScriptsStore()

  const savedScripts = getAllScripts()

  // UI state hooks
  const [linkCopied, setLinkCopied] = useState(false)
  // Analytics events per _meta field still waiting to be sent, see trackMetaEdit
  const metaEditTimersRef = useRef<
    Record<string, { timer: ReturnType<typeof setTimeout>; send: () => void }>
  >({})
  /**
   * Sends every editing burst that is still waiting on its timer.
   *
   * Object.values takes a copy, so sending is free to delete the entry it came
   * from, and each send clears its own timer - flushing twice sends nothing the
   * second time.
   */
  const flushMetaEdits = useCallback(() => {
    Object.values(metaEditTimersRef.current).forEach(({ timer, send }) => {
      clearTimeout(timer)
      send()
    })
  }, [])
  // The address the script on screen was loaded from, see handlePopState
  const loadedUrlRef = useRef('')
  const [printSections, setPrintSections] = useState<PrintSections>({
    roles: true,
    tables: true,
    firstNight: true,
    otherNights: true,
  })

  // ==================== DERIVED DATA ====================
  // Get translated roles and active jinxes for current language (lazy-loaded)
  const roles = useTranslatedRoles(language)
  const activeJinxes = useActiveJinxes(language)

  // Parse script and apply auto-roles
  const parsedScript = useMemo(
    () => (scriptData ? parseScript(scriptData, roles) : null),
    [scriptData, roles],
  )
  const meta = parsedScript?.meta
  const parsedRoles = parsedScript?.roles

  /**
   * The name on screen. `??` rather than `||`: getName() answers null when
   * nothing has been recorded, so an edit wins even when it is empty - a name
   * the user cleared must not be replaced by the one they cleared it from.
   */
  const displayScriptName = getName() ?? (meta?.name || scriptName)

  // Homebrew rules from _meta.bootlegger; unsaved edits from the store win
  const metaBootleggerRules = useMemo(
    () => normalizeBootleggerRules(meta?.bootlegger),
    [meta],
  )
  const editedBootleggerRules = getBootleggerRules()
  const bootleggerRules = editedBootleggerRules ?? metaBootleggerRules
  const hasBootleggerRules = bootleggerRules.length > 0

  // Deleting the last rule must not take the editor away with it, so an
  // unsaved rule edit keeps the Bootlegger around even at zero rules
  const hasHomebrewRules = hasBootleggerRules || editedBootleggerRules !== null

  // Auto-add bootlegger if there are custom roles or homebrew rules, and djinn
  // if there are jinxed roles. Auto-remove djinn if there are no active jinx pairs
  const scriptRoles = useMemo(() => {
    if (!parsedRoles) return null
    return applyAutoRoles(parsedRoles, activeJinxes, roles, {
      hasHomebrewRules,
    })
  }, [parsedRoles, roles, activeJinxes, hasHomebrewRules])

  /**
   * Why a role cannot be taken out of the script, by role id. Taking one out
   * does nothing while the auto-roles put it straight back, so the card says
   * why instead of offering a control that changes nothing.
   */
  const lockedRoles = useMemo(() => {
    if (!scriptRoles) return undefined

    const locked: Record<string, string> = {}

    /**
     * The Bootlegger's two reasons are worth telling apart. Homebrew content is
     * a property of the script; an emptied rule list only holds the Bootlegger
     * until the script is saved, and blaming rules that are no longer there is
     * how a tooltip loses the reader.
     */
    if (
      isBootleggerRequired(scriptRoles, {
        hasHomebrewRules: hasBootleggerRules,
      })
    ) {
      // Homebrew characters, or rules that are actually there
      locked.bootlegger = t(
        'Homebrew characters or rules require the Bootlegger',
      )
    } else if (hasHomebrewRules) {
      // Nothing but the open rule editor is holding it, and a save closes that
      locked.bootlegger = t('Save the script to remove the Bootlegger')
    }

    if (isDjinnRequired(scriptRoles, activeJinxes)) {
      locked.djinn = t('Jinxed characters require the Djinn')
    }

    return locked
  }, [scriptRoles, activeJinxes, hasBootleggerRules, hasHomebrewRules, t])

  // Track existing role IDs for filtering in add modal
  const existingRoleIds = useMemo(() => {
    return new Set(scriptRoles?.map((role) => role.id) || [])
  }, [scriptRoles])

  // Sample and carousel scripts for empty state
  const sampleScripts = useBaseScripts()
  const carouselScripts = useCarouselScripts()

  /**
   * The script as the app hands it out.
   *
   * Role edits land in the loaded script data at once, while _meta edits live
   * in the store until saving - and a diff restored from a reload is only ever
   * in the store. Resolving both here is what keeps the JSON view, the JSON
   * download, the share link and saving from telling four different stories.
   */
  const committedScript = useMemo(
    () =>
      scriptData
        ? buildCommittedScript(scriptData, metaOverrides).script
        : null,
    [scriptData, metaOverrides],
  )

  // ==================== HANDLERS ====================
  /**
   * Asks before an action that puts another script on screen, the same way
   * back/forward navigation does. Loading a script resets the diff, and unsaved
   * work is no less lost for having been replaced rather than navigated away
   * from - so every way into another script has to ask.
   *
   * Deleting is deliberately not one of these: it asks its own question, and
   * following it with a second dialog would only be in the way.
   *
   * @returns True when the action may go ahead
   */
  const confirmLeavingScript = () => {
    if (
      isModified() &&
      !window.confirm(
        t('Your unsaved changes will be lost. Leave this script?'),
      )
    ) {
      return false
    }

    /**
     * The burst still on its timer was typed into the script on its way out,
     * and the payload it is holding names that script. Sending it now rather
     * than a second later keeps it from being reported against the one that is
     * about to replace it.
     */
    flushMetaEdits()

    return true
  }

  // File upload handlers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    /**
     * Let go of the file whatever happens next, or picking the same one again
     * fires no change event and the upload appears to be broken. The File
     * itself is in hand and reading it does not go back to the input, so
     * clearing it here cannot take the upload away.
     */
    event.target.value = ''

    if (!confirmLeavingScript()) return

    /**
     * Analytics: Track file upload button click
     * Purpose: Understand how users interact with file upload feature
     * Key insights: File upload usage vs other loading methods
     */
    sendEvent('click_upload_file', {
      file_size: file.size,
      file_name: file.name,
    })

    loadFromFile(file, resetModifications)
  }

  const handleJsonPaste = (content: string) => {
    if (!confirmLeavingScript()) return

    /**
     * Analytics: Track JSON paste modal usage
     * Purpose: Understand clipboard/paste feature adoption
     * Key insights: Paste vs other loading methods
     */
    sendEvent('click_paste_json', {
      content_length: content.length,
    })

    loadFromJson(content, resetModifications)
  }

  /**
   * Loads a script from an external URL, asking first if that replaces unsaved
   * work. Shared by the header control and the empty state, so both ask.
   */
  const handleUrlLoad = (url: string) => {
    if (!confirmLeavingScript()) return

    loadFromUrl(url, resetModifications)
  }

  const handlePrint = (sections: PrintSections) => {
    // Track print event
    sendEvent('print_script', {
      script_name: displayScriptName,
      sections: Object.entries(sections)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .join(','),
    })

    setPrintSections(sections)
    // Use setTimeout to ensure state is updated before print dialog opens
    setTimeout(() => {
      window.print()
    }, 0)
  }

  // Script modification handlers (from hook)
  const {
    handleAddRole,
    handleRemoveRole,
    handleReplaceRole,
    handleReorderRoles,
  } = useScriptModification({
    scriptData,
    scriptRoles,
    baseRoles,
    addRole,
    removeRole,
    replaceRole,
    reorderRoles,
    setScriptData,
  })

  // Save/revert handlers (from hook)
  const { handleSaveChanges, handleRevertChanges } = useScriptCommit({
    scriptData,
    getMetaOverrides,
    fallbackName: displayScriptName,
    setScriptData,
    setScriptName,
    setCurrentScriptUrl,
    resetModifications,
    loadFromUrlParams,
    getSavedScript,
    currentScriptId,
    saveScript,
    setCurrentScriptId,
  })

  // Check if script is modified
  const scriptIsModified = isModified()
  /**
   * The part of that a page load would drop, see the beforeunload effect.
   *
   * `_meta` edits are restored on the way back in, so they do not count - but
   * only for as long as they can actually be written down. Storage that refuses
   * to take them turns the same reload into a silent loss, so the warning has
   * to ask rather than assume.
   *
   * A closing tab is the one case this gets wrong, knowingly: the diff lives in
   * session storage, which a reload keeps and a close clears, and beforeunload
   * cannot tell the two apart. Warning on both would put a dialog in front of
   * every reload to describe a loss that does not happen there - and then hand
   * the "discarded" name straight back on the way in. Local storage would make
   * the diff outlive a close, but it is shared between tabs, so two tabs on one
   * script would overwrite each other's unsaved edits. Losing a retyped name on
   * close is the smaller of the three.
   */
  const reloadWouldLoseWork =
    hasRoleEdits() || (scriptIsModified && !canPersistModifications())

  // Show save button if script is modified OR not saved yet (no script ID)
  const showSaveButton = scriptIsModified || !currentScriptId

  // Handlers for meta changes with analytics
  /**
   * Sends one analytics event per editing burst.
   *
   * Meta edits are committed on every keystroke, so an undebounced event would
   * report a 40 character rule as 40 edits.
   */
  const trackMetaEdit = (field: string, payload: Record<string, unknown>) => {
    clearTimeout(metaEditTimersRef.current[field]?.timer)

    const send = () => {
      delete metaEditTimersRef.current[field]
      sendEvent('edit_script_meta', { field, ...payload })
    }

    metaEditTimersRef.current[field] = { timer: setTimeout(send, 1000), send }
  }

  // _meta edits go to the store only. The loaded script data is left alone on
  // purpose: committedScript resolves the overrides wherever a script is handed
  // out, so mirroring them in as well would be a second copy to keep in step -
  // and one a reload cannot restore, since only the store survives it.
  const handleNameChange = (name: string) => {
    /**
     * Analytics: Track script name edits
     * Purpose: Understand how often users customize script names
     * Key insights: Naming patterns, script personalization behavior
     */
    // script_name names the script being edited in every edit_script_meta
    // event, this one included - for a name edit that is the text being typed,
    // so there is nothing to add beside it
    trackMetaEdit('name', { script_name: displayScriptName })
    setName(name)
  }

  const handleAuthorChange = (author: string) => {
    /**
     * Analytics: Track author name edits
     * Purpose: Understand authorship attribution patterns
     * Key insights: How often scripts are attributed, collaboration patterns
     */
    trackMetaEdit('author', { script_name: displayScriptName })
    setAuthor(author)
  }

  const handleBootleggerRulesChange = (rules: string[]) => {
    /**
     * Analytics: Track homebrew rule edits on the Bootlegger
     * Purpose: Understand how often scripts carry homebrew rules
     * Key insights: Homebrew rule adoption, how many rules scripts use
     */
    trackMetaEdit('bootlegger', {
      script_name: displayScriptName,
      rule_count: rules.length,
    })
    setBootleggerRules(rules)
  }

  // ==================== EFFECTS ====================
  /**
   * Send whatever is still waiting when the page goes away, rather than let the
   * burst that was still being typed go unreported.
   *
   * The unmount alone does not cover it: closing the tab or reloading tears the
   * page down without unmounting anything, which is exactly when a burst is
   * most likely to still be waiting. `pagehide` is the event that fires for all
   * of those, the back/forward cache included, and unlike `visibilitychange` it
   * does not fire for a tab the user is merely switching away from - so a burst
   * that carries on afterwards is still reported as one edit.
   */
  useEffect(() => {
    window.addEventListener('pagehide', flushMetaEdits)
    return () => {
      window.removeEventListener('pagehide', flushMetaEdits)
      flushMetaEdits()
    }
  }, [flushMetaEdits])

  // Session tracking - track user engagement and session duration
  useEffect(() => {
    const sessionStartTime = Date.now()

    /**
     * Analytics: Track session start
     * Purpose: Understand when users access the app
     * Key insights: Peak usage times, session frequency
     */
    sendEvent('session_start', {
      has_script_on_load: !!scriptData,
      language: language,
    })

    return () => {
      /**
       * Analytics: Track session end and duration
       * Purpose: Understand user engagement and session length
       * Key insights: Average session duration, engagement patterns, retention signals
       */
      sendEvent('session_end', {
        duration_seconds: Math.floor((Date.now() - sessionStartTime) / 1000),
        had_script: !!scriptData,
        made_changes: scriptIsModified,
        language: language,
      })
    }
  }, []) // Empty deps - only run on mount/unmount

  /**
   * Warn before a reload or a closing tab drops unsaved work.
   *
   * Role edits rather than every change: the _meta diff is persisted and
   * restored on the way back in, so warning about it would promise a loss that
   * does not happen - and a reload the user accepted would then hand the
   * "discarded" name straight back. See reloadWouldLoseWork for the case where
   * it cannot be persisted after all.
   */
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (reloadWouldLoseWork) {
        // Standard way to show confirmation dialog
        e.preventDefault()
        // Chrome requires returnValue to be set
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [reloadWouldLoseWork])

  // Load script from URL params on mount (with saved script support)
  useEffect(() => {
    if (typeof window === 'undefined') return
    loadFromUrlParams(undefined, getSavedScript)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Record the address the script on screen belongs to.
   *
   * Undoing a navigation the user declined needs somewhere to put the address
   * back to, and by the time popstate fires the browser has already moved on.
   * No dependency list: every path that rewrites the URL - the first load, a
   * paste, a save, opening a saved script - sets state right after, so a render
   * always follows the address that should be recorded against it.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return
    loadedUrlRef.current = window.location.href
  })

  // Listen for browser back/forward navigation (with saved script support)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handlePopState = () => {
      /**
       * Back/forward lands on another script, so the diff of the one left
       * behind must not follow along - it is dropped. Ask first, the way
       * leaving the page does: an in-page navigation fires no beforeunload,
       * and unsaved work is no less lost for the browser having stayed put.
       *
       * isModified() rather than the value read during render: the listener is
       * registered once and would otherwise be asking about a stale answer.
       */
      if (
        isModified() &&
        !window.confirm(
          t('Your unsaved changes will be lost. Leave this script?'),
        )
      ) {
        /**
         * The browser has already navigated, so staying means putting the
         * address back. It is pushed rather than stepped back through history:
         * the step that undoes this navigation is forwards for a Back and
         * backwards for a Forward, and taking the wrong one strands the address
         * on the script the user just refused to go to - a reload would then
         * load that one and take the unsaved edits with it, which is the very
         * thing they were asked about. A push also fires no popstate of its
         * own, so there is no navigation of ours left for this handler to
         * recognise and ignore.
         */
        window.history.pushState({}, '', loadedUrlRef.current)
        return
      }

      // Another script is coming, so the burst still on its timer is reported
      // against the one it was typed into. See confirmLeavingScript.
      flushMetaEdits()

      // Record the address before loading it, rather than wait for the effect
      // above: a load that changes nothing React can see gives it no render
      // to run in, and the next declined navigation would put the address
      // back to the script before this one
      loadedUrlRef.current = window.location.href
      loadFromUrlParams(resetModifications, getSavedScript)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [
    loadFromUrlParams,
    getSavedScript,
    resetModifications,
    isModified,
    flushMetaEdits,
    t,
  ])

  // ==================== META TAGS ====================
  // Generate dynamic meta description for social media sharing
  const metaDescription = generateMetaDescription(committedScript, scriptRoles)

  useMetaTags({
    // The name on screen, not the one the script was loaded under: the share
    // link carries the unsaved edits, so its title has to as well
    title: displayScriptName
      ? `${displayScriptName} - BotC Script Tool`
      : 'Blood on the Clocktower Script Tool',
    description: metaDescription,
    url: window.location.href,
  })

  // Share/copy link handler
  const handleCopyLink = async () => {
    try {
      const url = new URL(window.location.href)
      const params = url.searchParams

      // Share what is on screen, not what the URL still holds: the URL is only
      // rewritten on save, so unsaved edits would be left behind
      const scriptParam = committedScript
        ? compressForUrl(JSON.stringify(committedScript))
        : params.get('script')

      // Remove id parameter for sharing (keep only script parameter)
      const shareParams = new URLSearchParams()
      if (scriptParam) {
        shareParams.set('script', scriptParam)
      }

      const shareUrl = scriptParam
        ? `${url.origin}/api/share?${shareParams.toString()}`
        : url.href

      // Determine share method
      let shareMethod = 'unknown'

      if (navigator.share) {
        await navigator.share({
          // The name on screen, like the link and the description beside it:
          // sharing an unsaved rename under the old name is how the share
          // sheet ends up disagreeing with what it is about to send
          url: shareUrl,
          title: displayScriptName
            ? `${displayScriptName} - BotC Script Tool`
            : 'Blood on the Clocktower Script Tool',
          text: metaDescription,
        })
        shareMethod = 'native'
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 2000)
        shareMethod = 'clipboard'
      } else {
        window.open(shareUrl, '_blank')
        shareMethod = 'new_tab'
      }

      // Track share event
      sendEvent('share_script', {
        script_name: displayScriptName,
        method: shareMethod,
        had_id: !!params.get('id'),
      })
    } catch (err) {
      console.error('Failed to share link:', err)
    }
  }

  // Handler for loading saved scripts
  const handleLoadSavedScript = (id: string) => {
    const saved = getSavedScript(id)
    if (!saved) {
      console.error('Script not found:', id)
      return
    }

    // Asked before anything is touched. The list this is reached from only
    // shows while no script is loaded, so there is nothing to lose today - but
    // the question belongs to opening another script, not to where the control
    // that opens it happens to sit
    if (!confirmLeavingScript()) return

    // Update URL with both script and id
    const params = new URLSearchParams()
    params.set('script', saved.encodedScript)
    params.set('id', id)

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, '', newUrl)

    // Trigger load
    loadFromUrlParams(resetModifications, getSavedScript)

    sendEvent('load_saved_script', {
      script_name: saved.name,
      script_id: id,
    })
  }

  // Handler for deleting saved scripts
  const handleDeleteScript = (id: string) => {
    deleteScript(id)

    // If currently viewing this script, clear URL
    const params = new URLSearchParams(window.location.search)
    if (params.get('id') === id) {
      window.history.pushState({}, '', window.location.pathname)
      loadFromUrlParams(resetModifications, getSavedScript)
    }

    sendEvent('delete_saved_script', {
      script_id: id,
    })
  }

  // Handler for deleting the current script
  const handleDeleteCurrentScript = () => {
    if (!currentScriptId) return

    if (window.confirm(t('Are you sure you want to delete this script?'))) {
      handleDeleteScript(currentScriptId)
    }
  }

  // ==================== RENDER ====================
  return (
    <>
      <AppHeader language={language} onLanguageChange={changeLanguage} />
      <Container size="4" p="4">
        <Flex direction="column" gap="9">
          {/* File upload controls */}
          <div className="no-print">
            <Box>
              <FileUploadControls
                onFileUpload={handleFileUpload}
                onUrlLoad={handleUrlLoad}
                onPrint={handlePrint}
                onCopyLink={handleCopyLink}
                hasScript={!!scriptData}
                linkCopied={linkCopied}
                error={error}
                currentScriptUrl={currentScriptUrl}
                isLoading={isLoading}
                onJsonPaste={handleJsonPaste}
                scriptData={committedScript || undefined}
                scriptName={displayScriptName}
              />
            </Box>
          </div>

          {/* Script content when loaded */}
          {scriptData && scriptRoles && (
            <ScriptContent
              scriptRoles={scriptRoles}
              displayScriptName={displayScriptName}
              meta={meta}
              roles={roles}
              activeJinxes={activeJinxes}
              existingRoleIds={existingRoleIds}
              printSections={printSections}
              scriptIsModified={scriptIsModified}
              showSave={showSaveButton}
              isSaved={!!currentScriptId}
              onSave={handleSaveChanges}
              onRevert={handleRevertChanges}
              onDelete={currentScriptId ? handleDeleteCurrentScript : undefined}
              onNameChange={handleNameChange}
              onAuthorChange={handleAuthorChange}
              onAddRole={handleAddRole}
              onRemoveRole={handleRemoveRole}
              onReplaceRole={handleReplaceRole}
              onReorderRoles={handleReorderRoles}
              getAuthor={getAuthor}
              bootleggerRules={bootleggerRules}
              onBootleggerRulesChange={handleBootleggerRulesChange}
              lockedRoles={lockedRoles}
            />
          )}

          {/* Empty state when no script loaded */}
          {!scriptData && !isLoading && (
            <EmptyState
              sampleScripts={sampleScripts}
              carouselScripts={carouselScripts}
              savedScripts={savedScripts}
              onLoadScript={handleJsonPaste}
              onLoadUrl={handleUrlLoad}
              onLoadSavedScript={handleLoadSavedScript}
            />
          )}

          {/* Loading indicator */}
          {isLoading && <LoadingIndicator />}

          {/* Footer when no script loaded */}
          {!scriptData && <Footer />}
        </Flex>
      </Container>
    </>
  )
}
