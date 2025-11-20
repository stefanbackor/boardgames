import { useState } from 'react'
import { Button, Flex, Heading, Link, Text, TextField } from '@radix-ui/themes'
import { Upload, Printer, Link as LinkIcon, Check, Link2 } from 'lucide-react'
import type { Translations } from '../translations'

interface FileUploadControlsProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onUrlLoad: (url: string) => void
  onPrint: () => void
  onCopyLink: () => void
  hasScript: boolean
  linkCopied: boolean
  error: string | null
  t: Translations
}

export function FileUploadControls({
  onFileUpload,
  onUrlLoad,
  onPrint,
  onCopyLink,
  hasScript,
  linkCopied,
  error,
  t,
}: FileUploadControlsProps) {
  const [urlInput, setUrlInput] = useState('')

  const handleLoadUrl = () => {
    if (urlInput.trim()) {
      onUrlLoad(urlInput.trim())
    }
  }

  return (
    <Flex direction="column" gap="5">
      <Heading size="8" mt="8" align="center">
        <Link href="/">{t.title}</Link>
      </Heading>

      <Flex direction="column" gap="3" align="center">
        <Text size="3">{t.uploadPrompt}</Text>
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
              placeholder={t.urlPlaceholder}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLoadUrl()
                }
              }}
              style={{ minWidth: '200px', maxWidth: '500px' }}
            />
            <Button onClick={handleLoadUrl}>
              <Link2 size={16} />
              {t.loadFromUrl}
            </Button>
            {'or'}
            <label
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
                  {t.chooseFile}
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
          </Flex>

          {/* Script actions buttons */}
          <Flex direction="row" gap="2">
            <Button onClick={onPrint} variant="soft" disabled={!hasScript}>
              <Printer size={16} />
              {t.print}
            </Button>
            <Button onClick={onCopyLink} variant="soft" disabled={!hasScript}>
              {linkCopied ? <Check size={16} /> : <LinkIcon size={16} />}
              {linkCopied ? t.linkCopied : t.copyLink}
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
