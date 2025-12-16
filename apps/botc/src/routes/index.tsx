import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useMemo } from 'react'
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
import { generateMetaDescription } from '@/utils/generateMetaDescription'
import { applyAutoRoles } from '@/utils/scriptAutoRoles'
import { useBaseScripts } from '@/hooks/useBaseScripts'
import { useCarouselScripts } from '@/hooks/useCarouselScripts'
import { useMetaTags } from '@/hooks/useMetaTags'
import { useLanguage } from '@/hooks/useLanguage'
import { useScript } from '@/hooks/useScript'
import { useTranslatedRoles } from '@/hooks/useTranslatedRoles'
import { useActiveJinxes } from '@/hooks/useActiveJinxes'
import { useScriptModification } from '@/hooks/useScriptModification'
import { useScriptCommit } from '@/hooks/useScriptCommit'
import { useScriptModificationStore } from '@/stores/scriptModificationStore'
import { useSavedScriptsStore } from '@/stores/savedScriptsStore'
import { sendEvent } from '@/utils/analytics'

export const Route = createFileRoute('/')({ component: App })

function App() {
  // ==================== HOOKS & STATE ====================
  // Translation/i18n hooks
  const { language, changeLanguage } = useLanguage()

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
    getName,
    getAuthor,
    getMetaOverrides,
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
  const parsedScript = scriptData ? parseScript(scriptData, roles) : null
  const meta = parsedScript?.meta
  const parsedRoles = parsedScript?.roles

  const displayScriptName = getName() || meta?.name || scriptName

  // Auto-add bootlegger if there are custom roles, and djinn if there are jinxed roles
  // Auto-remove djinn if there are no active jinx pairs
  const scriptRoles = useMemo(() => {
    if (!parsedRoles) return null
    return applyAutoRoles(parsedRoles, activeJinxes, roles)
  }, [parsedRoles, roles, activeJinxes])

  // Track existing role IDs for filtering in add modal
  const existingRoleIds = useMemo(() => {
    return new Set(scriptRoles?.map((role) => role.id) || [])
  }, [scriptRoles])

  // Sample and carousel scripts for empty state
  const sampleScripts = useBaseScripts()
  const carouselScripts = useCarouselScripts()

  // Get current script JSON for the paste modal
  const currentScriptJson = scriptData ? JSON.stringify(scriptData) : undefined

  // ==================== HANDLERS ====================
  // File upload handlers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

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
    setScriptData,
    setScriptName,
    setCurrentScriptUrl,
    resetModifications,
    loadFromUrlParams,
    currentScriptId,
    saveScript,
    setCurrentScriptId,
  })

  // Check if script is modified
  const scriptIsModified = isModified()

  // Show save button if script is modified OR not saved yet (no script ID)
  const showSaveButton = scriptIsModified || !currentScriptId

  // Handlers for meta changes with analytics
  const handleNameChange = (name: string) => {
    /**
     * Analytics: Track script name edits
     * Purpose: Understand how often users customize script names
     * Key insights: Naming patterns, script personalization behavior
     */
    sendEvent('edit_script_meta', {
      field: 'name',
      script_name: displayScriptName,
    })
    setName(name)
  }

  const handleAuthorChange = (author: string) => {
    /**
     * Analytics: Track author name edits
     * Purpose: Understand authorship attribution patterns
     * Key insights: How often scripts are attributed, collaboration patterns
     */
    sendEvent('edit_script_meta', {
      field: 'author',
      script_name: displayScriptName,
    })
    setAuthor(author)
  }

  // ==================== EFFECTS ====================
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

  // Add beforeunload handler to warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (scriptIsModified) {
        // Standard way to show confirmation dialog
        e.preventDefault()
        // Chrome requires returnValue to be set
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [scriptIsModified])

  // Load script from URL params on mount (with saved script support)
  useEffect(() => {
    if (typeof window === 'undefined') return
    loadFromUrlParams(undefined, getSavedScript)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for browser back/forward navigation (with saved script support)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handlePopState = () => {
      loadFromUrlParams(undefined, getSavedScript)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [loadFromUrlParams, getSavedScript])

  // ==================== META TAGS ====================
  // Generate dynamic meta description for social media sharing
  const metaDescription = generateMetaDescription(scriptData, scriptRoles)

  useMetaTags({
    title: scriptName
      ? `${scriptName} - BotC Script Tool`
      : 'Blood on the Clocktower Script Tool',
    description: metaDescription,
    url: window.location.href,
  })

  // Share/copy link handler
  const handleCopyLink = async () => {
    try {
      const url = new URL(window.location.href)
      const params = url.searchParams

      // Remove id parameter for sharing (keep only script parameter)
      const scriptParam = params.get('script')
      const shareParams = new URLSearchParams()
      if (scriptParam) {
        shareParams.set('script', scriptParam)
      }

      const hasScript = params.has('script')
      const shareUrl = hasScript
        ? `${url.origin}/api/share?${shareParams.toString()}`
        : url.href

      // Determine share method
      let shareMethod = 'unknown'

      if (navigator.share) {
        await navigator.share({
          url: shareUrl,
          title: scriptName
            ? `${scriptName} - BotC Script Tool`
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

    if (window.confirm('Are you sure you want to delete this script?')) {
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
                onUrlLoad={(url) => loadFromUrl(url, resetModifications)}
                onPrint={handlePrint}
                onCopyLink={handleCopyLink}
                hasScript={!!scriptData}
                linkCopied={linkCopied}
                error={error}
                currentScriptUrl={currentScriptUrl}
                isLoading={isLoading}
                onJsonPaste={handleJsonPaste}
                currentScriptJson={currentScriptJson}
                scriptData={scriptData || undefined}
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
            />
          )}

          {/* Empty state when no script loaded */}
          {!scriptData && !isLoading && (
            <EmptyState
              sampleScripts={sampleScripts}
              carouselScripts={carouselScripts}
              savedScripts={savedScripts}
              onLoadScript={handleJsonPaste}
              onLoadUrl={(url) => loadFromUrl(url, resetModifications)}
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
