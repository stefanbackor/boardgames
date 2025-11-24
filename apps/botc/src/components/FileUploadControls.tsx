import { useState, useEffect } from 'react'
import {
  Button,
  Flex,
  Text,
  TextField,
  Dialog,
  TextArea,
  IconButton,
} from '@radix-ui/themes'
import {
  Upload,
  Printer,
  Link as LinkIcon,
  Check,
  Link2,
  Loader2,
  FileJson,
  X,
} from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'

interface FileUploadControlsProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onUrlLoad: (url: string) => void
  onPrint: () => void
  onCopyLink: () => void
  hasScript: boolean
  linkCopied: boolean
  error: string | null
  currentScriptUrl: string
  isLoading: boolean
  onJsonPaste?: (jsonContent: string) => void
  currentScriptJson?: string
}

export function FileUploadControls({
  onFileUpload,
  onUrlLoad,
  onPrint,
  onCopyLink,
  hasScript,
  linkCopied,
  error,
  currentScriptUrl,
  isLoading,
  onJsonPaste,
  currentScriptJson,
}: FileUploadControlsProps) {
  const { t } = useTranslation()
  const [urlInput, setUrlInput] = useState(currentScriptUrl)
  const [pasteModalOpen, setPasteModalOpen] = useState(false)
  const [pastedJson, setPastedJson] = useState('')
  const [pasteError, setPasteError] = useState<string | null>(null)

  // Update input when currentScriptUrl changes
  useEffect(() => {
    setUrlInput(currentScriptUrl)
  }, [currentScriptUrl])

  // Populate modal with current script JSON when opened
  useEffect(() => {
    if (pasteModalOpen && currentScriptJson) {
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
    } else if (!pasteModalOpen) {
      // Clear when modal closes
      setPastedJson('')
      setPasteError(null)
    }
  }, [pasteModalOpen, currentScriptJson])

  const handleLoadUrl = () => {
    if (urlInput.trim()) {
      onUrlLoad(urlInput.trim())
    }
  }

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
      if (onJsonPaste) {
        onJsonPaste(trimmed)
      }

      // Close modal (state will be cleared by useEffect)
      setPasteModalOpen(false)
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

  const UrlButton = () => (
    <Button onClick={handleLoadUrl} disabled={isLoading}>
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Link2 size={16} />
      )}
      {t('Load from URL')}
    </Button>
  )

  const FileButton = () => (
    <>
      <label
        key="file-label"
        htmlFor="file-upload"
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <Button asChild>
          <span>
            <Upload size={16} />
            {t('Choose File')}
          </span>
        </Button>
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".json"
        onChange={onFileUpload}
        style={{ display: 'none' }}
      />
    </>
  )

  const PasteJsonButton = () => (
    <Button onClick={() => setPasteModalOpen(true)}>
      <FileJson size={16} />
      {t('Paste JSON')}
    </Button>
  )

  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="3" align="center">
        <Flex width="100%" gap="3" align="center" justify="center" wrap="wrap">
          {/* Upload script buttons */}
          <Flex
            direction="row"
            gap="2"
            justify="center"
            align="center"
            wrap="wrap"
          >
            <TextField.Root
              placeholder={t('Paste script JSON URL...')}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLoadUrl()
                }
              }}
              disabled={isLoading}
              style={{ minWidth: '200px', maxWidth: '500px' }}
            />

            <Trans
              i18nKey="<0></0> or <1></1> or <2></2>"
              components={[<UrlButton />, <FileButton />, <PasteJsonButton />]}
            />
          </Flex>

          {/* Script actions buttons */}
          <Flex direction="row" gap="2">
            <Button onClick={onPrint} variant="soft" disabled={!hasScript}>
              <Printer size={16} />
              {t('Print')}
            </Button>
            <Button onClick={onCopyLink} variant="soft" disabled={!hasScript}>
              {linkCopied ? <Check size={16} /> : <LinkIcon size={16} />}
              {linkCopied ? t('Link Copied!') : t('Copy Link')}
            </Button>
          </Flex>
        </Flex>

        {error && (
          <Text color="red" size="2">
            {error}
          </Text>
        )}
      </Flex>

      {/* Paste JSON Modal */}
      <Dialog.Root open={pasteModalOpen} onOpenChange={setPasteModalOpen}>
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
                <Button onClick={handleLoadPastedJson}>
                  {t('Load Script')}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  )
}
