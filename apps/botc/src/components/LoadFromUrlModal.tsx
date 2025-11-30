import { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextField,
} from '@radix-ui/themes'
import { Link2, Loader2, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LoadFromUrlModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUrlLoad: (url: string) => void
  currentScriptUrl?: string
  isLoading?: boolean
}

export function LoadFromUrlModal({
  open,
  onOpenChange,
  onUrlLoad,
  currentScriptUrl,
  isLoading = false,
}: LoadFromUrlModalProps) {
  const { t } = useTranslation()
  const [urlInput, setUrlInput] = useState('')
  const [urlError, setUrlError] = useState<string | null>(null)

  // Populate URL modal with current script URL when opened
  useEffect(() => {
    if (open && currentScriptUrl) {
      setUrlInput(currentScriptUrl)
      setUrlError(null)
    } else if (!open) {
      // Clear when modal closes
      setUrlInput('')
      setUrlError(null)
    }
  }, [open, currentScriptUrl])

  const handleLoadUrl = () => {
    try {
      setUrlError(null)
      const trimmed = urlInput.trim()
      if (!trimmed) {
        setUrlError(t('Please enter a URL'))
        return
      }

      // Basic URL validation
      try {
        new URL(trimmed)
      } catch {
        setUrlError(t('Invalid URL format'))
        return
      }

      // Call the callback with the URL
      onUrlLoad(trimmed)

      // Close modal (state will be cleared by useEffect)
      onOpenChange(false)
    } catch (err) {
      setUrlError(err instanceof Error ? err.message : t('Invalid URL'))
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        size="3"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--space-6)',
        }}
      >
        <Flex justify="between" align="start" mb="3">
          <div>
            <Dialog.Title mb="1">{t('Load from URL')}</Dialog.Title>
            <Dialog.Description size="2" color="gray">
              {t('Enter a URL to a script JSON file or a script tool URL')}
            </Dialog.Description>
          </div>
          <Dialog.Close>
            <IconButton
              size="1"
              variant="ghost"
              color="gray"
              aria-label={t('Close')}
            >
              <X size={16} />
            </IconButton>
          </Dialog.Close>
        </Flex>

        <Flex direction="column" gap="3">
          <TextField.Root
            placeholder={t(
              'https://script.bloodontheclocktower.com/?script=...',
            )}
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value)
              setUrlError(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLoadUrl()
              }
            }}
            size="3"
            autoFocus
          />

          <Text size="1" color="gray">
            {t('Supported formats:')}
            <br />• script.bloodontheclocktower.com/?script=123
            <br />• www.botcscripts.com/api/scripts/123/json/
          </Text>

          {urlError && (
            <Text color="red" size="2">
              {urlError}
            </Text>
          )}

          <Flex justify="end" gap="2" mt="2">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                {t('Cancel')}
              </Button>
            </Dialog.Close>
            <Button onClick={handleLoadUrl} disabled={isLoading}>
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Link2 size={16} />
              )}
              {t('Load Script')}
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
