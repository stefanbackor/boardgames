import { useState } from 'react'
import { Flex, Text, Button, Link, Tooltip, IconButton } from '@radix-ui/themes'
import { Trans, useTranslation } from 'react-i18next'
import { Trash2 } from 'lucide-react'
import { getScriptMeta, parseScript } from '@/utils/parseScript'
import { getImageScale, getProxiedImageUrl } from '@/utils/imageUrl'
import type { CarouselScript } from '@/hooks/useCarouselScripts'
import type { SavedScript } from '@/types'
import { formatRelativeTime } from '@/utils/formatRelativeTime'
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
  /** Array of saved scripts from localStorage */
  savedScripts: SavedScript[]
  /** Handler for loading a script from JSON */
  onLoadScript: (json: any) => void
  /** Handler for loading a script from URL */
  onLoadUrl: (url: string) => void
  /** Handler for loading a saved script by ID */
  onLoadSavedScript: (id: string) => void
  /** Handler for deleting a saved script */
  onDeleteScript: (id: string) => void
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
  onDeleteScript,
}: EmptyStateProps) {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const roles = useTranslatedRoles(language)
  const [showExperimentalScripts, setShowExperimentalScripts] = useState(false)

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation() // Prevent loading the script
    if (window.confirm(t('Are you sure you want to delete this script?'))) {
      onDeleteScript(id)
    }
  }

  // Helper to extract demon images from a saved script
  const getDemonImages = (script: SavedScript): string[] => {
    const parsed = parseScript(script.scriptData, roles)
    const demons = parsed.roles.filter(
      (role) => String(role.team).toLowerCase() === 'demon',
    )
    return demons.map((demon) => demon.image).filter(Boolean)
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      style={{ minHeight: '300px' }}
    >
      {/* Saved Scripts Section */}
      {savedScripts.length > 0 && (
        <Flex direction="column" gap="3" width="100%" align="center">
          <Text size="4" weight="bold">
            {t('Your Saved Scripts')}
          </Text>
          <Flex gap="3" wrap="wrap" justify="center">
            {savedScripts.map((script) => {
              const demonImages = getDemonImages(script)
              return (
                <Flex key={script.id} direction="row" gap="2" align="center">
                  <Tooltip
                    content={formatRelativeTime(script.lastModified, language)}
                  >
                    <Button
                      color="crimson"
                      onClick={() => onLoadSavedScript(script.id)}
                    >
                      <Flex direction="row" gap="1" align="center">
                        {/* Demon icons */}
                        {demonImages.slice(0, 4).map((image, index) => (
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

                        <Text>{script.name}</Text>
                      </Flex>
                    </Button>
                  </Tooltip>

                  {/* Delete button */}
                  <Tooltip content={t('Delete')}>
                    <IconButton
                      size="1"
                      variant="ghost"
                      color="red"
                      onClick={(e) => handleDelete(e, script.id)}
                      style={{ flexShrink: 0 }}
                    >
                      <Trash2 size={14} />
                    </IconButton>
                  </Tooltip>
                </Flex>
              )
            })}
          </Flex>
        </Flex>
      )}

      <Text size="5" color="gray" align="center">
        {t('Upload a script json or pick one below to get started')}
      </Text>

      <Flex gap="2" wrap="wrap" justify="center">
        {sampleScripts.map((script) => (
          <Button
            key={script.key}
            variant="solid"
            size="2"
            onClick={() => onLoadScript(JSON.stringify(script.json))}
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

      <Text size="2" color="gray">
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
