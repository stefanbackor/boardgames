import { Settings, ChevronDown, ChevronRight } from 'lucide-react'
import { FolderDialog } from './FolderDialogs'
import { useSavedScriptsStore } from '@/stores/savedScriptsStore'
import { compareNames } from '@/stores/folderLibrary'
import { useState } from 'react'
import { Flex, Text, Button, Link, Tooltip, Separator } from '@radix-ui/themes'
import { Trans, useTranslation } from 'react-i18next'
import { parseScript } from '@/utils/parseScript'
import { readMeta } from '@/utils/scriptIntake'
import { getImageScale, getProxiedImageUrl } from '@/utils/imageUrl'
import type { CarouselScript } from '@/hooks/useCarouselScripts'
import type { SavedScript } from '@/types'
import { useLanguage } from '@/hooks/useLanguage'
import { useTranslatedRoles } from '@/hooks/useTranslatedRoles'

/**
 * Script type from useBaseScripts hook
 */
interface BaseScript {
  key: string
  json: any
}

/**
 * Props for the EmptyState component
 */
interface EmptyStateProps {
  /** Array of base/sample scripts to display */
  sampleScripts: BaseScript[]
  /** Array of experimental carousel scripts */
  carouselScripts: CarouselScript[]
  /** Array of saved scripts from browser storage */
  savedScripts: SavedScript[]
  /** Handler for loading a script from JSON */
  onLoadScript: (json: any) => void
  /** Handler for loading a script from URL */
  onLoadUrl: (url: string) => void
  /** Handler for loading a saved script by ID */
  onLoadSavedScript: (id: string) => void
}

/**
 * Component displayed when no script is loaded.
 * Shows sample scripts, optional experimental carousel scripts, and a link to botcscripts.com.
 *
 * @example
 * <EmptyState
 *   sampleScripts={sampleScripts}
 *   carouselScripts={carouselScripts}
 *   onLoadScript={handleJsonPaste}
 *   onLoadUrl={loadFromUrl}
 * />
 */
export function EmptyState({
  sampleScripts,
  carouselScripts,
  savedScripts,
  onLoadScript,
  onLoadUrl,
  onLoadSavedScript,
}: EmptyStateProps) {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const roles = useTranslatedRoles(language)
  const [showExperimentalScripts, setShowExperimentalScripts] = useState(false)

  // Helper to extract demon images from a saved script
  const getDemonImages = (script: SavedScript): string[] => {
    const parsed = parseScript(script.scriptData, roles)
    const demons = parsed.roles.filter(
      (role) => String(role.team).toLowerCase() === 'demon',
    )
    return demons.map((demon) => demon.image).filter(Boolean)
  }

  const { folderLibrary, setFolderCollapsed } = useSavedScriptsStore()
  const [editingFolder, setEditingFolder] = useState<string | null>(null)
  const [folderError, setFolderError] = useState('')
  const folders = Object.values(folderLibrary.folders).sort(compareNames)
  const sortedScripts = [...savedScripts].sort(compareNames)
  const unfiledScripts = sortedScripts.filter(
    (script) => !folderLibrary.folders[folderLibrary.membership[script.id]],
  )
  const renderScripts = (scripts: SavedScript[]) => (
    <Flex gap="2" wrap="wrap" justify="center">
      {scripts.map((script) => {
        const demonImages = getDemonImages(script)
        return (
          <Flex key={script.id} direction="row" gap="2" align="center">
            <Button variant="soft" onClick={() => onLoadSavedScript(script.id)}>
              <Flex direction="row" gap="2" align="center">
                {demonImages.length > 0 && (
                  <Flex direction="row" gap="0" align="center">
                    {demonImages.map((image, index) => (
                      <img
                        key={index}
                        src={getProxiedImageUrl(image)}
                        alt=""
                        style={{
                          width: '16px',
                          height: '16px',
                          aspectRatio: '1/1',
                          borderRadius: '50%',
                          backgroundColor:
                            'color-mix(in srgb, var(--color-background) 80%, transparent)',
                          objectFit: 'cover',
                          transform: `scale(${getImageScale(image)})`,
                        }}
                      />
                    ))}
                  </Flex>
                )}

                <Text>{script.name}</Text>
              </Flex>
            </Button>
          </Flex>
        )
      })}
    </Flex>
  )

  return (
    <Flex direction="column" align="center" justify="center" gap="4">
      {/* Saved Scripts Section */}
      {(savedScripts.length > 0 || folders.length > 0) && (
        <>
          <Flex direction="column" gap="3" width="100%" align="center">
            <Flex gap="2" wrap="wrap" justify="center">
              {renderScripts(unfiledScripts)}
            </Flex>
          </Flex>
          {folders.map((folder) => (
            <Flex
              key={folder.id}
              direction="column"
              gap="3"
              width="100%"
              align="center"
              role="region"
              aria-label={folder.name}
            >
              <Flex align="center" gap="2" width="100%" my="2">
                <Button
                  variant="ghost"
                  aria-expanded={!folder.collapsed}
                  aria-controls={`folder-${folder.id}`}
                  onClick={async () => {
                    try {
                      await setFolderCollapsed(folder.id, !folder.collapsed)
                      setFolderError('')
                    } catch {
                      setFolderError(
                        t('Could not update folders. Please try again.'),
                      )
                    }
                  }}
                >
                  {folder.collapsed ? (
                    <ChevronRight size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                  {folder.name}
                </Button>
                <Button
                  variant="ghost"
                  aria-label={t('Edit folder {{folder}}', {
                    folder: folder.name,
                  })}
                  onClick={() => setEditingFolder(folder.id)}
                >
                  <Settings size={16} />
                </Button>
                <Separator decorative orientation="horizontal" size="4" />
              </Flex>
              <div id={`folder-${folder.id}`} hidden={folder.collapsed}>
                {renderScripts(
                  sortedScripts.filter(
                    (script) =>
                      folderLibrary.membership[script.id] === folder.id,
                  ),
                )}
              </div>
            </Flex>
          ))}
          {folderError && (
            <Text role="alert" color="red">
              {folderError}
            </Text>
          )}
          {editingFolder && (
            <FolderDialog
              folderId={editingFolder}
              onClose={() => setEditingFolder(null)}
            />
          )}
          <Separator size="4" />
        </>
      )}

      <Text
        size="5"
        color="gray"
        align="center"
        style={{ fontFamily: 'var(--heading-font-family)' }}
      >
        {t('Upload a script json or pick one below to get started')}
      </Text>

      <Flex gap="2" wrap="wrap" justify="center">
        {sampleScripts.map((script) => (
          <Button
            key={script.key}
            variant="soft"
            size="2"
            onClick={() => onLoadScript(JSON.stringify(script.json))}
          >
            {readMeta(script.json).name || script.key}
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
                    onClick={() => onLoadUrl(script.url)}
                  >
                    {script.name}
                  </Button>
                </Tooltip>
              ))}
            </Flex>
          )}
        </Flex>
      )}

      <Text
        size="2"
        color="gray"
        style={{ fontFamily: 'var(--heading-font-family)' }}
      >
        <Trans>
          Find more scripts on{' '}
          <Link target="_blank" href="https://www.botcscripts.com">
            botcscripts.com
          </Link>
        </Trans>
      </Text>
    </Flex>
  )
}
