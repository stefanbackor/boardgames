import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  Link,
  Tooltip,
} from '@radix-ui/themes'
import { Trans, useTranslation } from 'react-i18next'
import { roles as baseRoles } from '../data/roles'
import { roleTranslationsCs } from '../data/roles.cs.translation'
import { jinxes } from '../data/jinxes'
import { AppHeader } from '../components/AppHeader'
import { FileUploadControls } from '../components/FileUploadControls'
import { Header } from '../components/script/Header'
import { NightFirstSetup } from '../components/script/NightFirstSetup'
import { NightOtherSetup } from '../components/script/NightOtherSetup'
import { Footer } from '@/components/Footer'
import { LoadingIndicator } from '../components/LoadingIndicator'
import {
  getScriptMeta,
  parseScript,
  type ScriptData,
} from '../utils/parseScript'
import { useBaseScripts } from '../hooks/useBaseScripts'
import { PlayerCountTable } from '@/components/script/PlayerCountTable'
import { TeamSection } from '@/components/script/TeamSection'
import type { Role } from '../data/types'
import { useScriptModificationStore } from '../stores/scriptModificationStore'
import { compressForUrl } from '../utils/urlCompression'
import { CarouselScript, useCarouselScripts } from '@/hooks/useCarouselScripts'
import { useMetaTags } from '@/hooks/useMetaTags'
import { useLanguage } from '@/hooks/useLanguage'
import { useScript } from '@/hooks/useScript'
import { Team, TEAM_CONFIG } from '@/constants'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()
  const [linkCopied, setLinkCopied] = useState(false)
  const [showExperimentalScripts, setShowExperimentalScripts] = useState(false)

  // Script loading and management
  const {
    scriptData,
    scriptName,
    error,
    isLoading,
    currentScriptUrl,
    loadFromUrl,
    loadFromFile,
    loadFromJson,
    setScriptData,
    setScriptName,
    setCurrentScriptUrl,
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

  // Language is automatically detected and initialized by i18next
  // Slovak (sk) is automatically normalized to Czech (cs) by custom detectors

  // Apply language translations to roles
  const roles = baseRoles.map((role) => {
    // Apply Czech translations when language is Czech (Slovak is normalized to Czech)
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
    loadFromFile(file, resetModifications)
  }

  const handleJsonPaste = (content: string) => {
    loadFromJson(content, resetModifications)
  }

  const handlePrint = () => {
    window.print()
  }

  const parsedScript = scriptData ? parseScript(scriptData, roles) : null
  const meta = parsedScript?.meta
  let scriptRoles = parsedScript?.roles

  // Auto-add bootlegger if there are custom roles, and djinn if there are jinxed roles
  // Auto-remove djinn if there are no active jinx pairs
  scriptRoles = useMemo(() => {
    if (!scriptRoles) return scriptRoles

    let modifiedRoles = [...scriptRoles]
    const roleIds = new Set(modifiedRoles.map((r) => r.id))

    // Check if there are custom roles (excluding already existing bootlegger/djinn)
    const hasCustomRoles = modifiedRoles.some(
      (r) => r.isCustom && r.id !== 'bootlegger' && r.id !== 'djinn',
    )

    // Check if there are any active jinx pairs (both roles of a jinx present in script)
    let hasActiveJinxes = false
    for (const jinxEntry of jinxes) {
      if (roleIds.has(jinxEntry.id)) {
        for (const hatred of jinxEntry.hatred) {
          if (roleIds.has(hatred.id)) {
            hasActiveJinxes = true
            break
          }
        }
        if (hasActiveJinxes) break
      }
    }

    // Auto-add/remove bootlegger based on custom roles
    if (hasCustomRoles && !roleIds.has('bootlegger')) {
      const bootlegger = roles.find((r) => r.id === 'bootlegger')
      if (bootlegger) {
        modifiedRoles.push({ ...bootlegger, isCustom: false })
      }
    } else if (!hasCustomRoles && roleIds.has('bootlegger')) {
      modifiedRoles = modifiedRoles.filter((r) => r.id !== 'bootlegger')
    }

    // Auto-add/remove djinn based on active jinxes
    if (hasActiveJinxes && !roleIds.has('djinn')) {
      const djinn = roles.find((r) => r.id === 'djinn')
      if (djinn) {
        modifiedRoles.push({ ...djinn, isCustom: false })
      }
    } else if (!hasActiveJinxes && roleIds.has('djinn')) {
      modifiedRoles = modifiedRoles.filter((r) => r.id !== 'djinn')
    }

    return modifiedRoles
  }, [scriptRoles, roles])

  // Track existing role IDs for filtering in add modal
  const existingRoleIds = useMemo(() => {
    return new Set(scriptRoles?.map((role) => role.id) || [])
  }, [scriptRoles])

  // Handler to add a new role to the script
  const handleAddRole = useCallback(
    (role: Role) => {
      if (!scriptData) return

      // When adding a role from the modal, check if it exists in base roles
      // If yes, store just the id string for compact JSON
      // If it's a custom role not in base, store the full object
      const isBaseRole = baseRoles.some((r) => r.id === role.id)

      const roleItem = isBaseRole ? role.id : role

      // Update store for tracking changes
      addRole(roleItem)

      // Update local state directly - append the new role at the end
      const newScriptData = [...scriptData, roleItem]
      setScriptData(newScriptData as ScriptData)
    },
    [scriptData, addRole, setScriptData],
  )

  // Handler to remove a role from the script
  const handleRemoveRole = useCallback(
    (roleId: string) => {
      if (!scriptData) return

      // Update store for tracking changes
      removeRole(roleId)

      // Update local state directly - filter out the removed role
      const newScriptData = scriptData.filter((item) => {
        const id = typeof item === 'string' ? item : item.id
        return id !== roleId
      })
      setScriptData(newScriptData as ScriptData)
    },
    [scriptData, removeRole, setScriptData],
  )

  // Handler to replace a role in the script (at same position)
  const handleReplaceRole = useCallback(
    (oldRoleId: string, newRole: Role) => {
      if (!scriptData) return

      // Check if new role exists in base roles
      const isBaseRole = baseRoles.some((r) => r.id === newRole.id)
      const newRoleItem = isBaseRole ? newRole.id : newRole

      // Update store for tracking changes
      replaceRole(oldRoleId, newRoleItem)

      // Update local state directly - replace the role at the same position
      const newScriptData = scriptData.map((item) => {
        const id = typeof item === 'string' ? item : item.id
        return id === oldRoleId ? newRoleItem : item
      })
      setScriptData(newScriptData as ScriptData)
    },
    [scriptData, replaceRole, setScriptData],
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

  // Handler to revert changes
  const handleRevertChanges = useCallback(() => {
    // Reset modification tracking
    resetModifications()
    // Reload the page to get original script from URL
    window.location.reload()
  }, [resetModifications])

  // Handler to reorder roles within a team
  const handleReorderRoles = useCallback(
    (team: string, fromIndex: number, toIndex: number) => {
      if (!scriptRoles) return

      // Get all roles in the script
      const allRoles = [...scriptRoles]

      // Split roles into team roles and other roles
      const teamRoles = allRoles.filter((r) => r.team === team)
      const otherRoles = allRoles.filter((r) => r.team !== team)

      // Reorder within the team
      const [movedRole] = teamRoles.splice(fromIndex, 1)
      teamRoles.splice(toIndex, 0, movedRole)

      // Find the original position of the first role of this team
      const firstTeamRoleIndex = allRoles.findIndex((r) => r.team === team)

      // Reconstruct the script by inserting reordered team at the correct position
      const newScript = [
        ...otherRoles.slice(0, firstTeamRoleIndex),
        ...teamRoles,
        ...otherRoles.slice(firstTeamRoleIndex),
      ]

      // Update the store with reordered role IDs (for commit functionality)
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

      reorderRoles(roleIds)

      // Update local state directly with the new order
      // Build new script data with reordered roles
      const newScriptData: ScriptData = []
      if (metaItem) {
        newScriptData.push(metaItem)
      }

      // Add roles in new order
      newScript.forEach((role) => {
        // Find the original item in scriptData
        const originalItem = scriptData?.find((item) => {
          const id = typeof item === 'string' ? item : item.id
          return id === role.id
        })
        if (originalItem) {
          newScriptData.push(originalItem)
        }
      })

      setScriptData(newScriptData as ScriptData)
    },
    [scriptRoles, scriptData, reorderRoles, setScriptData],
  )

  const sampleScripts = useBaseScripts()
  const carouselScripts = useCarouselScripts()

  // Get current script JSON for the paste modal
  const currentScriptJson = scriptData ? JSON.stringify(scriptData) : undefined

  // Generate dynamic meta tags for social media sharing
  const metaDescription = useMemo(() => {
    if (!scriptData || !scriptRoles) {
      return 'Create and share custom Blood on the Clocktower scripts with night order sheets and role information'
    }

    // Extract author if available
    const metaItem = scriptData.find(
      (item) =>
        typeof item === 'object' && item !== null && item.id === '_meta',
    )
    const metaObj = metaItem as { author?: string } | undefined
    const author = metaObj?.author

    // Count roles by team
    const townsfolk = scriptRoles.filter(
      (r) => r.team === Team.Townsfolk,
    ).length
    const outsider = scriptRoles.filter((r) => r.team === Team.Outsider).length
    const minion = scriptRoles.filter((r) => r.team === Team.Minion).length
    const demon = scriptRoles.filter((r) => r.team === Team.Demon).length
    const traveler = scriptRoles.filter((r) => r.team === Team.Traveler).length

    const parts = [
      `${townsfolk} Townsfolk`,
      `${outsider} Outsider${outsider !== 1 ? 's' : ''}`,
      `${minion} Minion${minion !== 1 ? 's' : ''}`,
      `${demon} Demon${demon !== 1 ? 's' : ''}`,
    ]
    if (traveler > 0) {
      parts.push(`${traveler} Traveler${traveler !== 1 ? 's' : ''}`)
    }

    const rolesSummary = parts.join(', ')
    const authorPart = author ? ` by ${author}` : ''

    return `A Blood on the Clocktower script${authorPart} with ${rolesSummary}. View night order and role details.`
  }, [scriptData, scriptRoles])

  useMetaTags({
    title: scriptName
      ? `${scriptName} - BotC Script Tool`
      : 'Blood on the Clocktower Script Tool',
    description: metaDescription,
    url: window.location.href,
  })

  const handleCopyLink = async () => {
    try {
      const url = new URL(window.location.href)
      const params = url.searchParams

      const hasScript = params.has('script')
      const shareUrl = hasScript
        ? `${url.origin}/api/share?${params.toString()}`
        : url.href

      if (navigator.share) {
        await navigator.share({
          url: shareUrl,
          title: scriptName
            ? `${scriptName} - BotC Script Tool`
            : 'Blood on the Clocktower Script Tool',
          text: metaDescription,
        })
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 2000)
      } else {
        window.open(shareUrl, '_blank')
      }
    } catch (err) {
      console.error('Failed to share link:', err)
    }
  }

  return (
    <>
      <AppHeader language={language} onLanguageChange={changeLanguage} />
      <Container size="4" p="4">
        <Flex direction="column" gap="9">
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
              />
            </Box>
          </div>

          {scriptData && scriptRoles && (
            <Flex direction="column" gap="9">
              <Flex direction="column">
                <Flex direction="column" style={{ pageBreakInside: 'avoid' }}>
                  <Header
                    name={getName() || meta?.name || scriptName}
                    author={getAuthor() || meta?.author || ''}
                    isModified={scriptIsModified}
                    onCommit={handleCommitChanges}
                    onRevert={handleRevertChanges}
                    onNameChange={setName}
                    onAuthorChange={setAuthor}
                  />
                  {/* Render first team (townsfolk) without wrapper for proper page break handling */}
                  <TeamSection
                    key={Team.Townsfolk}
                    team={Team.Townsfolk}
                    teamColor={TEAM_CONFIG[Team.Townsfolk].color}
                    columnsCount={TEAM_CONFIG[Team.Townsfolk].columns}
                    roles={scriptRoles.filter(
                      (role) => role.team === Team.Townsfolk,
                    )}
                    allRoles={roles}
                    existingRoleIds={existingRoleIds}
                    onAddRole={handleAddRole}
                    onRemoveRole={handleRemoveRole}
                    onReplaceRole={handleReplaceRole}
                    onReorderRoles={handleReorderRoles}
                    scriptRoles={scriptRoles}
                  />
                </Flex>
                {/* Render main teams (outsider, minion, demon) */}
                {[Team.Outsider, Team.Minion, Team.Demon].map((team) => {
                  const teamRoles = scriptRoles.filter(
                    (role) => role.team === team,
                  )
                  const config = TEAM_CONFIG[team]

                  return (
                    <div key={team} style={{ pageBreakInside: 'avoid' }}>
                      <TeamSection
                        team={team}
                        teamColor={config.color}
                        columnsCount={config.columns}
                        roles={teamRoles}
                        allRoles={roles}
                        existingRoleIds={existingRoleIds}
                        onAddRole={handleAddRole}
                        onRemoveRole={handleRemoveRole}
                        onReplaceRole={handleReplaceRole}
                        onReorderRoles={handleReorderRoles}
                        scriptRoles={scriptRoles}
                      />
                    </div>
                  )
                })}
              </Flex>
              {/* Render special teams (traveler, fabled, loric) with page break */}
              <Flex
                direction="column"
                gap="5"
                justify="start"
                align="stretch"
                style={{
                  height: '100vh',
                  pageBreakBefore: 'always',
                  pageBreakInside: 'avoid',
                }}
              >
                {[Team.Traveler, Team.Fabled, Team.Loric].map((team) => {
                  const teamRoles = scriptRoles.filter(
                    (role) => role.team === team,
                  )
                  const config = TEAM_CONFIG[team]
                  const isEmpty = teamRoles.length === 0

                  return (
                    <div
                      key={team}
                      className={
                        isEmpty && config.hideIfEmpty ? 'print:hidden' : ''
                      }
                    >
                      <TeamSection
                        team={team}
                        teamColor={config.color}
                        columnsCount={config.columns}
                        roles={teamRoles}
                        allRoles={roles}
                        existingRoleIds={existingRoleIds}
                        onAddRole={handleAddRole}
                        onRemoveRole={handleRemoveRole}
                        onReplaceRole={handleReplaceRole}
                        onReorderRoles={handleReorderRoles}
                        scriptRoles={scriptRoles}
                      />
                    </div>
                  )
                })}

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
              gap="2"
              style={{ minHeight: '300px' }}
            >
              <Text size="5" color="gray" align="center">
                {t('Upload a script json or pick one below to get started')}
              </Text>

              <Flex gap="2" wrap="wrap" justify="center">
                {sampleScripts.map((script) => (
                  <Button
                    key={script.key}
                    variant="solid"
                    size="2"
                    onClick={() => handleJsonPaste(JSON.stringify(script.json))}
                  >
                    {getScriptMeta(script.json)?.name || script.key}
                  </Button>
                ))}
              </Flex>
              {carouselScripts.length > 0 && (
                <Flex direction="column" gap="2" align="center">
                  <Button
                    variant="outline"
                    size="1"
                    onClick={() => setShowExperimentalScripts((prev) => !prev)}
                  >
                    {t('Experimental Carousel scripts')}
                  </Button>
                  {showExperimentalScripts && (
                    <Flex gap="2" wrap="wrap" justify="center">
                      {carouselScripts.map((script: CarouselScript) => (
                        <Tooltip key={script.key} content={script.flavor}>
                          <Button
                            variant="soft"
                            size="1"
                            onClick={() =>
                              loadFromUrl(script.url, resetModifications)
                            }
                          >
                            {script.name}
                          </Button>
                        </Tooltip>
                      ))}
                    </Flex>
                  )}
                </Flex>
              )}

              <Text size="2" color="gray">
                <Trans>
                  Find more scripts on{' '}
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
