import { useState, useEffect } from 'react'
import { Button, Flex, Heading, Link, Text, TextField } from '@radix-ui/themes'
import { Upload, Printer, Link as LinkIcon, Check, Link2, Loader2 } from 'lucide-react'
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
}: FileUploadControlsProps) {
  const { t } = useTranslation()
  const [urlInput, setUrlInput] = useState(currentScriptUrl)

  // Update input when currentScriptUrl changes
  useEffect(() => {
    setUrlInput(currentScriptUrl)
  }, [currentScriptUrl])

  const handleLoadUrl = () => {
    if (urlInput.trim()) {
      onUrlLoad(urlInput.trim())
    }
  }

  const UrlButton = () => (
    <Button onClick={handleLoadUrl} disabled={isLoading}>
      {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Link2 size={16} />}
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

  return (
    <Flex direction="column" gap="5">
      <Heading size="8" mt="8" align="center">
        <Link href="/">{t('Blood on the Clocktower Script Tool')}</Link>
      </Heading>

      <Flex direction="column" gap="3" align="center">
        <Text size="3">
          {t('Upload a script JSON file to format for printing')}
        </Text>
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
              i18nKey="<0></0> or <1></1>"
              components={[<UrlButton />, <FileButton />]}
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
    </Flex>
  )
}
