import { useState } from 'react'
import { Flex, Text, Button, Link, Tooltip } from '@radix-ui/themes'
import { Trans, useTranslation } from 'react-i18next'
import { getScriptMeta } from '@/utils/parseScript'
import type { CarouselScript } from '@/hooks/useCarouselScripts'

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
  /** Handler for loading a script from JSON */
  onLoadScript: (json: any) => void
  /** Handler for loading a script from URL */
  onLoadUrl: (url: string) => void
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
  onLoadScript,
  onLoadUrl,
}: EmptyStateProps) {
  const { t } = useTranslation()
  const [showExperimentalScripts, setShowExperimentalScripts] = useState(false)

  return (
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
