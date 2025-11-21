import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Box, Container, Flex, Text, Button, Link } from '@radix-ui/themes'
import { Trans, useTranslation } from 'react-i18next'
import { roles as baseRolesData } from '../data/roles'
import type { Role } from '../data/types'
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

export const Route = createFileRoute('/')({ component: App })

function App() {
  const { t, i18n } = useTranslation()
  const [scriptData, setScriptData] = useState<ScriptData | null>(null)
  const [scriptName, setScriptName] = useState<string>('')
  const [baseRoles, setBaseRoles] = useState<Role[]>([])
  const [error, setError] = useState<string | null>(null)
  const [linkCopied, setLinkCopied] = useState(false)
  const [currentScriptUrl, setCurrentScriptUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

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
    // Set base roles from imported data (English source of truth)
    setBaseRoles(baseRolesData as Role[])

    // Load script from URL on mount (client-side only)
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const encodedScript = params.get('script')
    const urlScriptName = params.get('name')
    const scriptUrlParam = params.get('script_url')

    // Prioritize script_url over encoded script
    if (scriptUrlParam) {
      setCurrentScriptUrl(scriptUrlParam)
      loadScriptFromUrl(scriptUrlParam, urlScriptName)
    } else if (encodedScript) {
      try {
        let decoded: string
        try {
          // Try new UTF-8 decoding first
          const binaryString = atob(encodedScript)
          const bytes = new Uint8Array(binaryString.length)
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }
          decoded = new TextDecoder().decode(bytes)
        } catch {
          // Fallback to simple atob for backward compatibility
          decoded = atob(encodedScript)
        }

        const parsed = JSON.parse(decoded)

        if (Array.isArray(parsed)) {
          setScriptData(parsed)
          setScriptName(urlScriptName || 'Shared Script')
          setError(null)
        }
      } catch (err) {
        console.error('Failed to load script from URL:', err)
        setError('Failed to load script from URL')
      }
    }
  }, [])

  // Function to load script from URL
  const loadScriptFromUrl = async (
    url: string,
    fallbackName: string | null = null,
  ) => {
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
        return
      }

      setScriptData(parsed)
      // Extract name from URL if no fallback name
      const urlName =
        fallbackName ||
        url
          .split('/')
          .pop()
          ?.replace(/\.[^/.]+$/, '') ||
        'Script from URL'
      setScriptName(urlName)
      setCurrentScriptUrl(url)

      // Update URL with script_url parameter
      const params = new URLSearchParams()
      params.set('script_url', url)
      if (fallbackName) {
        params.set('name', fallbackName)
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.pushState({}, '', newUrl)
    } catch (err) {
      console.error('Failed to load script from URL:', err)
      setError(
        `Failed to load script from URL: ${err instanceof Error ? err.message : 'Unknown error'}`,
      )
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
          return
        }

        setScriptData(parsed)
        // Use filename without extension as fallback name
        const fileName = file.name.replace(/\.[^/.]+$/, '')
        setScriptName(fileName)
        setError(null)
        setCurrentScriptUrl('')

        // Update URL with encoded script data
        // Use Unicode-safe encoding by converting to UTF-8 bytes first
        const utf8Bytes = new TextEncoder().encode(content)
        const binaryString = Array.from(utf8Bytes, (byte) =>
          String.fromCharCode(byte),
        ).join('')
        const encoded = btoa(binaryString)

        const params = new URLSearchParams()
        params.set('script', encoded)
        params.set('name', fileName)

        // Update URL without reloading the page
        const newUrl = `${window.location.pathname}?${params.toString()}`
        window.history.pushState({}, '', newUrl)
      } catch (err) {
        setError('Failed to parse JSON file')
        console.error(err)
      }
    }
    reader.readAsText(file)
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

  const sampleScripts = useSampleScripts()

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage)
  }

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
                    name={meta?.name || scriptName}
                    author={meta?.author}
                  />
                  <TeamSection
                    team="townsfolk"
                    teamColor="blue"
                    roles={scriptRoles.filter(
                      (role) => role.team === 'townsfolk',
                    )}
                  />
                </Flex>
                <div style={{ pageBreakInside: 'avoid' }}>
                  <TeamSection
                    team="outsider"
                    teamColor="blue"
                    roles={scriptRoles.filter(
                      (role) => role.team === 'outsider',
                    )}
                  />
                </div>
                <div style={{ pageBreakInside: 'avoid' }}>
                  <TeamSection
                    team="minion"
                    teamColor="red"
                    roles={scriptRoles.filter((role) => role.team === 'minion')}
                  />
                </div>
                <div style={{ pageBreakInside: 'avoid' }}>
                  <TeamSection
                    team="demon"
                    teamColor="red"
                    roles={scriptRoles.filter((role) => role.team === 'demon')}
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
                <TeamSection
                  team="traveler"
                  teamColor="orange"
                  roles={scriptRoles.filter((role) => role.team === 'traveler')}
                />

                <PlayerCountTable />
              </Flex>
              <div
                style={{ pageBreakBefore: 'always', pageBreakInside: 'avoid' }}
              >
                <NightFirstSetup roles={scriptRoles} />
              </div>
              <div
                style={{ pageBreakBefore: 'always', pageBreakInside: 'avoid' }}
              >
                <NightOtherSetup roles={scriptRoles} />
              </div>
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
                    onClick={() => loadScriptFromUrl(script.url, script.name)}
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

          <Footer />
        </Flex>
      </Container>
    </>
  )
}
