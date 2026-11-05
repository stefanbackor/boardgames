import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFirstNightItems, useOtherNightItems } from '@/hooks/useNightItems'
import { useTeamLabels } from '@/hooks/useTeamLabels'
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore'
import { sendEvent } from '@/utils/analytics'
import type { ScriptPdfData } from '@/components/pdf/ScriptPdfDocument'
import type { ScriptView } from '@/utils/scriptView'

interface UseScriptPdfOptions {
  /**
   * The script as it is on screen, unsaved edits included, or null while none
   * is loaded; the hook adds the night sheets and the translations
   */
  view: ScriptView | null
}

interface UseScriptPdfResult {
  /** Everything the PDF draws, for previewing it; null without a script */
  data: ScriptPdfData | null
  /** Generates the PDF and hands it to the browser as a download */
  downloadPdf: () => Promise<void>
  isGenerating: boolean
  /** Why the last attempt failed, ready to show */
  error: string | null
}

/**
 * Downloads the script as a PDF generated in the browser. The generator is a
 * heavy library most visits never need, so it is only loaded on first use.
 *
 * @param options - The script as it is on screen
 * @returns The PDF's data, the download action and its state
 */
export function useScriptPdf({
  view,
}: UseScriptPdfOptions): UseScriptPdfResult {
  const { t } = useTranslation()
  const { t: tContent } = useTranslation('content')
  const teamLabels = useTeamLabels()
  const firstNightItems = useFirstNightItems(view?.roles ?? [])
  const otherNightItems = useOtherNightItems(view?.roles ?? [])
  const showEnglishNames = useDisplayOptionsStore(
    (state) => state.showEnglishNames,
  )
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const data: ScriptPdfData | null = view && {
    view,
    firstNightItems,
    otherNightItems,
    showEnglishNames,
    labels: {
      by: t('by'),
      notFirstNight: t('*Not the first night'),
      firstNight: tContent('First Night'),
      otherNights: tContent('Other Nights'),
      players: t('Players'),
      townsfolk: t('Townsfolk'),
      outsiders: t('Outsiders'),
      minions: t('Minions'),
      demons: t('Demons'),
      teams: {
        townsfolk: teamLabels.townsfolk.label,
        outsider: teamLabels.outsider.label,
        minion: teamLabels.minion.label,
        demon: teamLabels.demon.label,
        traveller: teamLabels.traveller.label,
        fabled: teamLabels.fabled.label,
        loric: teamLabels.loric.label,
      },
    },
  }

  const downloadPdf = async () => {
    if (!data) return
    const { name } = data.view

    setIsGenerating(true)
    setError(null)

    try {
      const { generateScriptPdf } =
        await import('@/components/pdf/ScriptPdfDocument')
      const blob = await generateScriptPdf(data)

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = name ? `${name}.pdf` : 'script.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      sendEvent('download_script', {
        script_name: name || 'unnamed',
        format: 'pdf',
      })
    } catch (err) {
      console.error('Failed to generate PDF:', err)
      setError(t('Could not generate the PDF'))
    } finally {
      setIsGenerating(false)
    }
  }

  return { data, downloadPdf, isGenerating, error }
}
