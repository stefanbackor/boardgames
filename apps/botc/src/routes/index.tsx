import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { Box, Container, Flex, Text, Button, Link } from '@radix-ui/themes'
import { Trans, useTranslation } from 'react-i18next'
import { roles as baseRoles } from '../data/roles'
import { roleTranslationsCs } from '../data/roles.cs.translation'
import { AppHeader } from '../components/AppHeader'
import { FileUploadControls } from '../components/FileUploadControls'
import { Header } from '../components/script/Header'
import { NightFirstSetup } from '../components/script/NightFirstSetup'
import { NightOtherSetup } from '../components/script/NightOtherSetup'
import { Footer } from '@/components/Footer'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { parseScript, type ScriptData } from '../utils/parseScript'
import { useSampleScripts } from '../hooks/useSampleScripts'
import { PlayerCountTable } from '@/components/script/PlayerCountTable'
import { TeamSection } from '@/components/script/TeamSection'
import type { Role } from '../data/types'
import { useScriptModificationStore } from '../stores/scriptModificationStore'
import { compressForUrl, decompressFromUrl } from '../utils/urlCompression'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const { t, i18n } = useTranslation()
  const [scriptData, setScriptData] = useState<ScriptData | null>(null)
  const [scriptName, setScriptName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [linkCopied, setLinkCopied] = useState(false)
  const [currentScriptUrl, setCurrentScriptUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  // Script modification store (diff-based, URL is source of truth)
  const {
    addRole,
    removeRole,
    replaceRole,
    reorderRoles,
    setName,
    setAuthor,
    getModifiedScript,
    getName,
    getAuthor,
    commitChanges,
    isModified,
    reset: resetModifications,
  } = useScriptModificationStore()

  useEffect(() => {
    // Initialize language from localStorage or browser settings (client-side only)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language')
      if (saved === 'en' || saved === 'cs') {
        i18n.changeLanguage(saved)
      } else {
        const browserLang = navigator.language.split('-')[0]
        i18n.changeLanguage(browserLang === 'en' ? 'en' : 'cs')
      }
    }
  }, [])

  useEffect(() => {
    // Load script from URL on mount (client-side only)
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const encodedScript = params.get('script')
    const scriptUrlParam = params.get('script_url')

    // Prioritize script_url over encoded script
    if (scriptUrlParam) {
      setCurrentScriptUrl(scriptUrlParam)
      loadScriptFromUrl(scriptUrlParam)
    } else if (encodedScript) {
      try {
        // Decompress from URL (handles both compressed and legacy uncompressed formats)
        const decoded = decompressFromUrl(encodedScript)
        const parsed = JSON.parse(decoded)

        if (Array.isArray(parsed)) {
          // Extract name from _meta object in the script
          const metaItem = parsed.find(
            (item) =>
              typeof item === 'object' && item !== null && item.id === '_meta',
          )
          const metaObj = metaItem as { name?: string } | undefined
          const name = metaObj?.name || 'Shared Script'

          setScriptData(parsed)
          setScriptName(name)
          // Reset any stale modifications from previous session
          resetModifications()
          setError(null)
        }
      } catch (err) {
        console.error('Failed to load script from URL:', err)
        setError('Failed to load script from URL')
        // Clear modifications when loading fails
        resetModifications()
      }
    } else {
      // No script in URL - clear any stale modifications
      resetModifications()
    }
  }, [resetModifications])

  // Function to load script from URL
  const loadScriptFromUrl = async (url: string) => {
    try {
      setError(null)
      setIsLoading(true)
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Failed to fetch script: ${response.statusText}`)
      }

      const parsed = await response.json()

      if (!Array.isArray(parsed)) {
        setError('Invalid script format: expected an array')
        // Clear modifications when loading fails
        resetModifications()
        return
      }

      // Extract name and author from _meta object, or use filename from URL as fallback
      const metaItem = parsed.find(
        (item) =>
          typeof item === 'object' && item !== null && item.id === '_meta',
      )
      const metaObj = metaItem as { name?: string; author?: string } | undefined
      const urlName =
        metaObj?.name ||
        url
          .split('/')
          .pop()
          ?.replace(/\.[^/.]+$/, '') ||
        'Script from URL'

      setScriptData(parsed)
      setScriptName(urlName)
      setCurrentScriptUrl(url)

      // Encode script to URL with compression (source of truth for modifications)
      const content = JSON.stringify(parsed)
      const encoded = compressForUrl(content)

      const params = new URLSearchParams()
      params.set('script', encoded)

      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.pushState({}, '', newUrl)

      // Reset any stale modifications
      resetModifications()
    } catch (err) {
      console.error('Failed to load script from URL:', err)
      setError(
        `Failed to load script from URL: ${err instanceof Error ? err.message : 'Unknown error'}`,
      )
      // Clear modifications when loading fails
      resetModifications()
    } finally {
      setIsLoading(false)
    }
  }

  const language = i18n.language

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Apply language translations to roles
  const roles = baseRoles.map((role) => {
    // Apply Czech translations when language is Czech
    if (language === 'cs' && roleTranslationsCs[role.id]) {
      const translation = roleTranslationsCs[role.id]
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
    }
    // Return base English role when language is English
    return role
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const parsed = JSON.parse(content)

        if (!Array.isArray(parsed)) {
          setError('Invalid script format: expected an array')
          // Clear modifications when loading fails
          resetModifications()
          return
        }

        // Extract name from _meta object, or use filename as fallback
        const metaItem = parsed.find(
          (item: unknown) =>
            typeof item === 'object' &&
            item !== null &&
            (item as { id?: string }).id === '_meta',
        )
        const metaObj = metaItem as { name?: string } | undefined
        const fileName = file.name.replace(/\.[^/.]+$/, '')
        const name = metaObj?.name || fileName

        setScriptData(parsed)
        setScriptName(name)
        setError(null)
        setCurrentScriptUrl('')

        // Update URL with compressed script data
        const encoded = compressForUrl(content)

        const params = new URLSearchParams()
        params.set('script', encoded)

        // Update URL without reloading the page
        const newUrl = `${window.location.pathname}?${params.toString()}`
        window.history.pushState({}, '', newUrl)

        // Reset any stale modifications
        resetModifications()
      } catch (err) {
        setError('Failed to parse JSON file')
        // Clear modifications when loading fails
        resetModifications()
        console.error(err)
      }
    }
    reader.readAsText(file)
  }

  const handleJsonPaste = (content: string) => {
    try {
      const parsed = JSON.parse(content)

      if (!Array.isArray(parsed)) {
        setError('Invalid script format: expected an array')
        // Clear modifications when loading fails
        resetModifications()
        return
      }

      // Extract name from _meta object
      const metaItem = parsed.find(
        (item: unknown) =>
          typeof item === 'object' &&
          item !== null &&
          (item as { id?: string }).id === '_meta',
      )
      const metaObj = metaItem as { name?: string } | undefined
      const name = metaObj?.name || 'Pasted Script'

      setScriptData(parsed)
      setScriptName(name)
      setError(null)
      setCurrentScriptUrl('')

      // Update URL with compressed script data
      const encoded = compressForUrl(content)

      const params = new URLSearchParams()
      params.set('script', encoded)

      // Update URL without reloading the page
      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.pushState({}, '', newUrl)

      // Reset any stale modifications
      resetModifications()
    } catch (err) {
      setError('Failed to parse JSON')
      // Clear modifications when loading fails
      resetModifications()
      console.error(err)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const parsedScript = scriptData ? parseScript(scriptData, roles) : null
  const meta = parsedScript?.meta
  const scriptRoles = parsedScript?.roles

  // Track existing role IDs for filtering in add modal
  const existingRoleIds = useMemo(() => {
    return new Set(scriptRoles?.map((role) => role.id) || [])
  }, [scriptRoles])

  // Handler to add a new role to the script
  const handleAddRole = useCallback(
    (role: Role) => {
      // When adding a role from the modal, check if it exists in base roles
      // If yes, store just the id string for compact JSON
      // If it's a custom role not in base, store the full object
      const isBaseRole = baseRoles.some((r) => r.id === role.id)

      if (isBaseRole) {
        // Base role - store just the id string
        addRole(role.id)
      } else {
        // Custom role - store full object with custom properties
        addRole(role)
      }

      // Update local state with modified script
      const modified = getModifiedScript()
      if (modified) {
        setScriptData(modified as ScriptData)
      }
    },
    [addRole, getModifiedScript],
  )

  // Handler to remove a role from the script
  const handleRemoveRole = useCallback(
    (roleId: string) => {
      removeRole(roleId)
      // Update local state with modified script
      const modified = getModifiedScript()
      if (modified) {
        setScriptData(modified as ScriptData)
      }
    },
    [removeRole, getModifiedScript],
  )

  // Handler to replace a role in the script (at same position)
  const handleReplaceRole = useCallback(
    (oldRoleId: string, newRole: Role) => {
      // Check if new role exists in base roles
      const isBaseRole = baseRoles.some((r) => r.id === newRole.id)

      if (isBaseRole) {
        // Base role - store just the id string
        replaceRole(oldRoleId, newRole.id)
      } else {
        // Custom role - store full object with custom properties
        replaceRole(oldRoleId, newRole)
      }

      // Update local state with modified script
      const modified = getModifiedScript()
      if (modified) {
        setScriptData(modified as ScriptData)
      }
    },
    [replaceRole, getModifiedScript],
  )

  // Check if script is modified
  const scriptIsModified = isModified()

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

  // Handler to commit changes to URL
  const handleCommitChanges = useCallback(() => {
    const { script: committed, name: committedName } = commitChanges()
    if (committed.length === 0) return

    // Encode the committed script to URL with compression (name is stored in _meta)
    const content = JSON.stringify(committed)
    const encoded = compressForUrl(content)

    const params = new URLSearchParams()
    params.set('script', encoded)

    // Update URL without reloading the page
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, '', newUrl)

    // Clear the script URL since we're now using encoded script
    setCurrentScriptUrl('')

    // Update local state to match committed name
    setScriptName(committedName)
  }, [commitChanges])

  // Handler to revert changes
  const handleRevertChanges = useCallback(() => {
    resetModifications()
    // Reload original script from URL
    const originalScript = getModifiedScript()
    if (originalScript) {
      setScriptData(originalScript as ScriptData)
    }
  }, [resetModifications, getModifiedScript])

  // Handler to reorder roles within a team
  const handleReorderRoles = useCallback(
    (team: string, fromIndex: number, toIndex: number) => {
      if (!scriptRoles) return

      // Get all roles in the script
      const allRoles = [...scriptRoles]

      // Filter roles by team
      const teamRoles = allRoles.filter((r) => r.team === team)

      // Reorder within the team
      const [movedRole] = teamRoles.splice(fromIndex, 1)
      teamRoles.splice(toIndex, 0, movedRole)

      // Find the original position of the first role of this team
      const firstTeamRoleIndex = allRoles.findIndex((r) => r.team === team)

      // Reconstruct the script
      const newScript = [
        ...allRoles.slice(0, firstTeamRoleIndex),
        ...teamRoles,
        ...allRoles.slice(
          firstTeamRoleIndex + allRoles.filter((r) => r.team === team).length,
        ),
      ]

      // Extract role IDs in the new order
      const roleIds = newScript.map((role) => role.id)

      // Add _meta at the beginning if it exists in scriptData
      const metaItem = scriptData?.find(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          (item as { id?: string }).id === '_meta',
      )

      if (metaItem) {
        roleIds.unshift('_meta')
      }

      // Update the store with reordered role IDs
      reorderRoles(roleIds)

      // Update local state with modified script
      const modified = getModifiedScript()
      if (modified) {
        setScriptData(modified as ScriptData)
      }
    },
    [scriptRoles, scriptData, reorderRoles, getModifiedScript],
  )

  const sampleScripts = useSampleScripts()

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage)
  }

  // Get current script JSON for the paste modal
  const currentScriptJson = scriptData ? JSON.stringify(scriptData) : undefined

  return (
    <>
      <AppHeader language={language} onLanguageChange={handleLanguageChange} />
      <Container size="4" p="2">
        <Flex direction="column" gap="9">
          <div className="no-print">
            <Box>
              <FileUploadControls
                onFileUpload={handleFileUpload}
                onUrlLoad={loadScriptFromUrl}
                onPrint={handlePrint}
                onCopyLink={handleCopyLink}
                hasScript={!!scriptData}
                linkCopied={linkCopied}
                error={error}
                currentScriptUrl={currentScriptUrl}
                isLoading={isLoading}
                onJsonPaste={handleJsonPaste}
                currentScriptJson={currentScriptJson}
              />
            </Box>
          </div>

          {scriptData && scriptRoles && (
            <Flex direction="column" gap="9">
              <Flex direction="column" gap="2">
                <Flex
                  direction="column"
                  gap="2"
                  style={{ pageBreakInside: 'avoid' }}
                >
                  <Header
                    name={getName() || meta?.name || scriptName}
                    author={getAuthor() ?? meta?.author ?? ''}
                    isModified={scriptIsModified}
                    onCommit={handleCommitChanges}
                    onRevert={handleRevertChanges}
                    onNameChange={setName}
                    onAuthorChange={setAuthor}
                  />
                  <TeamSection
                    team="townsfolk"
                    teamColor="blue"
                    roles={scriptRoles.filter(
                      (role) => role.team === 'townsfolk',
                    )}
                    allRoles={roles}
                    existingRoleIds={existingRoleIds}
                    onAddRole={handleAddRole}
                    onRemoveRole={handleRemoveRole}
                    onReplaceRole={handleReplaceRole}
                    onReorderRoles={handleReorderRoles}
                  />
                </Flex>
                <div style={{ pageBreakInside: 'avoid' }}>
                  <TeamSection
                    team="outsider"
                    teamColor="blue"
                    roles={scriptRoles.filter(
                      (role) => role.team === 'outsider',
                    )}
                    allRoles={roles}
                    existingRoleIds={existingRoleIds}
                    onAddRole={handleAddRole}
                    onRemoveRole={handleRemoveRole}
                    onReplaceRole={handleReplaceRole}
                    onReorderRoles={handleReorderRoles}
                  />
                </div>
                <div style={{ pageBreakInside: 'avoid' }}>
                  <TeamSection
                    team="minion"
                    teamColor="red"
                    roles={scriptRoles.filter((role) => role.team === 'minion')}
                    allRoles={roles}
                    existingRoleIds={existingRoleIds}
                    onAddRole={handleAddRole}
                    onRemoveRole={handleRemoveRole}
                    onReplaceRole={handleReplaceRole}
                    onReorderRoles={handleReorderRoles}
                  />
                </div>
                <div style={{ pageBreakInside: 'avoid' }}>
                  <TeamSection
                    team="demon"
                    teamColor="red"
                    roles={scriptRoles.filter((role) => role.team === 'demon')}
                    allRoles={roles}
                    existingRoleIds={existingRoleIds}
                    onAddRole={handleAddRole}
                    onRemoveRole={handleRemoveRole}
                    onReplaceRole={handleReplaceRole}
                    onReorderRoles={handleReorderRoles}
                  />
                </div>
              </Flex>
              <Flex
                direction="column"
                gap="5"
                justify="between"
                align="stretch"
                style={{
                  height: '100vh',
                  pageBreakBefore: 'always',
                  pageBreakInside: 'avoid',
                }}
              >
                <div
                  className={
                    scriptRoles.filter((role) => role.team === 'traveler')
                      .length === 0
                      ? 'print:hidden'
                      : ''
                  }
                >
                  <TeamSection
                    team="traveler"
                    teamColor="orange"
                    roles={scriptRoles.filter(
                      (role) => role.team === 'traveler',
                    )}
                    allRoles={roles}
                    existingRoleIds={existingRoleIds}
                    onAddRole={handleAddRole}
                    onRemoveRole={handleRemoveRole}
                    onReplaceRole={handleReplaceRole}
                    onReorderRoles={handleReorderRoles}
                  />
                </div>

                <PlayerCountTable />
              </Flex>
              <div style={{ pageBreakBefore: 'always' }}>
                <NightFirstSetup roles={scriptRoles} />
              </div>
              <Flex
                direction="column"
                gap="5"
                style={{ pageBreakBefore: 'always' }}
              >
                <NightOtherSetup roles={scriptRoles} />
                <Footer />
              </Flex>
            </Flex>
          )}

          {!scriptData && !isLoading && (
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap="4"
              style={{ minHeight: '300px' }}
            >
              <Text size="5" color="gray">
                {t('Upload a script json or pick one below to get started')}
              </Text>
              <Flex gap="2" wrap="wrap" justify="center">
                {sampleScripts.map((script) => (
                  <Button
                    key={script.key}
                    variant="solid"
                    size="2"
                    onClick={() => loadScriptFromUrl(script.url)}
                  >
                    {script.name}
                  </Button>
                ))}
              </Flex>

              <Text size="2" color="gray">
                <Trans>
                  Or find more scripts on{' '}
                  <Link target="_blank" href="https://www.botcscripts.com">
                    botcscripts.com
                  </Link>
                </Trans>
              </Text>
            </Flex>
          )}

          {isLoading && <LoadingIndicator />}

          {!scriptData && <Footer />}
        </Flex>
      </Container>
    </>
  )
}
