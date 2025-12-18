import { useState } from 'react'
import { Button, Flex, Text, Tooltip } from '@radix-ui/themes'
import {
  Upload,
  Link as LinkIcon,
  Check,
  Link2,
  FileJson,
  Download,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LoadFromUrlModal } from './LoadFromUrlModal'
import { PasteJsonModal } from './PasteJsonModal'
import { PrintDropdown, PrintSections } from './PrintDropdown'
import type { ScriptData } from '@/types/script'
import { sendEvent } from '@/utils/analytics'

interface FileUploadControlsProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onUrlLoad: (url: string) => void
  onPrint: (sections: PrintSections) => void
  onCopyLink: () => void
  hasScript: boolean
  linkCopied: boolean
  error: string | null
  currentScriptUrl: string
  isLoading: boolean
  onJsonPaste?: (jsonContent: string) => void
  currentScriptJson?: string
  scriptData?: ScriptData
  scriptName?: string
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
  scriptData,
  scriptName,
}: FileUploadControlsProps) {
  const { t } = useTranslation()
  const [urlModalOpen, setUrlModalOpen] = useState(false)
  const [pasteModalOpen, setPasteModalOpen] = useState(false)

  const handleDownloadJson = () => {
    if (!scriptData) return

    // Track download event
    sendEvent('download_script', {
      script_name: scriptName || 'unnamed',
      format: 'json',
    })

    // Create JSON string with proper formatting
    const jsonString = JSON.stringify(scriptData, null, 2)

    // Create blob and download link
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url

    // Use script name or default filename
    const fileName = scriptName ? `${scriptName}.json` : 'script.json'
    link.download = fileName

    // Trigger download
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const UrlButton = () => (
    <Tooltip
      content={t(
        'Load from `script.bloodontheclocktower.com` or `botcscripts.com` URL',
      )}
    >
      <Button
        onClick={() => setUrlModalOpen(true)}
        variant={hasScript ? 'soft' : 'solid'}
      >
        <Link2 size={16} />
        {t('Load from URL')}
      </Button>
    </Tooltip>
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
        <Tooltip content={t('Upload a script JSON file')}>
          <Button asChild variant={hasScript ? 'soft' : 'solid'}>
            <span>
              <Upload size={16} />
              {t('Choose JSON File')}
            </span>
          </Button>
        </Tooltip>
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
    <Tooltip content={t('Paste JSON from your clipboard')}>
      <Button
        onClick={() => setPasteModalOpen(true)}
        variant={hasScript ? 'soft' : 'solid'}
      >
        <FileJson size={16} />
        {t('Paste JSON')}
      </Button>
    </Tooltip>
  )

  return (
    <>
      <Flex direction="column" gap="5">
        <Flex direction="column" gap="3" align="center">
          <Flex
            width="100%"
            gap="3"
            align="center"
            justify="center"
            wrap="wrap"
            direction="column"
          >
            {/* Upload script buttons */}
            <Flex
              direction="row"
              gap="2"
              justify="center"
              align="center"
              wrap="wrap"
            >
              <FileButton />
              <UrlButton />
              <PasteJsonButton />
            </Flex>

            {/* Script actions buttons */}
            <Flex direction="row" gap="2">
              <PrintDropdown onPrint={onPrint} hasScript={hasScript} />
              <Tooltip content={t('Download script as JSON file')}>
                <Button
                  onClick={handleDownloadJson}
                  variant={hasScript ? 'solid' : 'soft'}
                  disabled={!hasScript}
                >
                  <Download size={16} />
                  {t('Download JSON')}
                </Button>
              </Tooltip>
              <Tooltip content={t('Share with others')}>
                <Button
                  onClick={onCopyLink}
                  variant={hasScript ? 'solid' : 'soft'}
                  disabled={!hasScript}
                >
                  {linkCopied ? <Check size={16} /> : <LinkIcon size={16} />}
                  {linkCopied ? t('Link Copied!') : t('Share')}
                </Button>
              </Tooltip>
            </Flex>
          </Flex>

          {error && (
            <Text color="red" size="2">
              {error}
            </Text>
          )}
        </Flex>
      </Flex>

      {/* Modals */}
      <LoadFromUrlModal
        open={urlModalOpen}
        onOpenChange={setUrlModalOpen}
        onUrlLoad={onUrlLoad}
        currentScriptUrl={currentScriptUrl}
        isLoading={isLoading}
      />

      {onJsonPaste && (
        <PasteJsonModal
          open={pasteModalOpen}
          onOpenChange={setPasteModalOpen}
          onJsonPaste={onJsonPaste}
          currentScriptJson={currentScriptJson}
        />
      )}
    </>
  )
}
