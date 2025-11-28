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
import { AppHeader } from '../components/AppHeader'
import { FileUploadControls } from '../components/FileUploadControls'
import { Header } from '../components/script/Header'
import { NightFirstSetup } from '../components/script/NightFirstSetup'
import { NightOtherSetup } from '../components/script/NightOtherSetup'
import { Footer } from '@/components/Footer'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { parseScript, type ScriptData } from '../utils/parseScript'
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
    getModifiedScript,
    getName,
    getAuthor,
    commitChanges,
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
  const handleCommitChanges = useCallback(async () => {
    const { script: committed, name: committedName } = commitChanges()
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
                      />
                    </div>
                  )
                })}
              </Flex>
              {/* Render special teams (traveler, loric) with page break */}
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
                {[Team.Traveler, Team.Loric].map((team) => {
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
                    {script.name}
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
