import { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextArea,
} from '@radix-ui/themes'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface PasteJsonModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onJsonPaste: (jsonContent: string) => void
  currentScriptJson?: string
}

export function PasteJsonModal({
  open,
  onOpenChange,
  onJsonPaste,
  currentScriptJson,
}: PasteJsonModalProps) {
  const { t } = useTranslation()
  const [pastedJson, setPastedJson] = useState('')
  const [pasteError, setPasteError] = useState<string | null>(null)

  // Populate modal with current script JSON when opened
  useEffect(() => {
    if (open && currentScriptJson) {
      try {
        // Format the JSON with proper indentation
        const parsed = JSON.parse(currentScriptJson)
        const formatted = JSON.stringify(parsed, null, 2)
        setPastedJson(formatted)
        setPasteError(null)
      } catch {
        // If parsing fails, use as-is
        setPastedJson(currentScriptJson)
      }
    } else if (!open) {
      // Clear when modal closes
      setPastedJson('')
      setPasteError(null)
    }
  }, [open, currentScriptJson])

  const handleLoadPastedJson = () => {
    try {
      setPasteError(null)
      const trimmed = pastedJson.trim()
      if (!trimmed) {
        setPasteError('Please paste JSON content')
        return
      }

      // Validate JSON
      JSON.parse(trimmed)

      // Call the callback with the JSON content
      onJsonPaste(trimmed)

      // Close modal (state will be cleared by useEffect)
      onOpenChange(false)
    } catch (err) {
      setPasteError(err instanceof Error ? err.message : 'Invalid JSON format')
    }
  }

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setPastedJson(value)
    setPasteError(null)
  }

  const handleJsonPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')

    try {
      // Try to parse and format the pasted JSON
      const parsed = JSON.parse(pastedText.trim())
      const formatted = JSON.stringify(parsed, null, 2)
      setPastedJson(formatted)
      setPasteError(null)
    } catch {
      // If it's not valid JSON, just paste as-is
      setPastedJson(pastedText)
    }
  }

  const handleFormatJson = () => {
    try {
      setPasteError(null)
      const trimmed = pastedJson.trim()
      if (!trimmed) {
        setPasteError('No content to format')
        return
      }

      const parsed = JSON.parse(trimmed)
      const formatted = JSON.stringify(parsed, null, 2)
      setPastedJson(formatted)
    } catch (err) {
      setPasteError(err instanceof Error ? err.message : 'Invalid JSON format')
    }
  }

  const handleClearJson = () => {
    setPastedJson('')
    setPasteError(null)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        size="4"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--space-6)',
          maxHeight: '90vh',
        }}
      >
        <Flex justify="between" align="start" mb="3">
          <div>
            <Dialog.Title mb="1">{t('Paste JSON')}</Dialog.Title>
            <Dialog.Description size="2" color="gray">
              {t('Paste your script JSON content below')}
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

        <Flex direction="column" gap="3" style={{ flex: 1, minHeight: 0 }}>
          <TextArea
            placeholder={t('Paste script JSON here...')}
            value={pastedJson}
            onChange={handleJsonChange}
            onPaste={handleJsonPaste}
            style={{
              minHeight: '400px',
              fontFamily: 'monospace',
              fontSize: '14px',
            }}
            autoFocus
          />

          {pasteError && (
            <Text color="red" size="2">
              {pasteError}
            </Text>
          )}

          <Flex justify="between" gap="2" mt="2" wrap="wrap">
            <Flex gap="2">
              <Button variant="soft" onClick={handleFormatJson}>
                {t('Format')}
              </Button>
              <Button variant="soft" color="red" onClick={handleClearJson}>
                {t('Clear')}
              </Button>
            </Flex>
            <Flex gap="2">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  {t('Cancel')}
                </Button>
              </Dialog.Close>
              <Button onClick={handleLoadPastedJson}>{t('Load Script')}</Button>
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
