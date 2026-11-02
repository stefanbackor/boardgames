import { Button, Tooltip } from '@radix-ui/themes'
import { FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface DownloadPdfButtonProps {
  onDownload: () => void
  isGenerating: boolean
  hasScript: boolean
}

/** Downloads the loaded script as a PDF */
export function DownloadPdfButton({
  onDownload,
  isGenerating,
  hasScript,
}: DownloadPdfButtonProps) {
  const { t } = useTranslation()

  return (
    <Tooltip content={t('Download script as PDF file')}>
      <Button
        onClick={onDownload}
        variant={hasScript ? 'solid' : 'soft'}
        disabled={!hasScript}
        loading={isGenerating}
      >
        <FileText size={16} />
        <span className="hidden md:inline">{t('Download PDF')}</span>
        <span className="md:hidden">{t('PDF')}</span>
      </Button>
    </Tooltip>
  )
}
