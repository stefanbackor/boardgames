import { useEffect, useState } from 'react'
import type { ScriptPdfData } from '@/components/pdf/ScriptPdfDocument'

interface PdfDebugPreviewProps {
  data: ScriptPdfData
}

/**
 * Dev-only view of the script's PDF, for tuning its layout without downloading
 * it. Regenerates when the data does, and reloads when the PDF's code is saved.
 */
export function PdfDebugPreview({ data }: PdfDebugPreviewProps) {
  const [url, setUrl] = useState<string>()
  const [error, setError] = useState<string>()
  // The data is rebuilt on every render, so compare what it holds
  const dataKey = JSON.stringify(data)

  // Hot updates swap the code but generate nothing, so a reload has to
  useEffect(() => {
    const hot = import.meta.hot
    if (!hot) return

    const reloadOnPdfChange = (payload: { updates: { path: string }[] }) => {
      if (
        payload.updates.some(({ path }) => path.includes('/components/pdf/'))
      ) {
        window.location.reload()
      }
    }

    hot.on('vite:afterUpdate', reloadOnPdfChange)
    return () => hot.off('vite:afterUpdate', reloadOnPdfChange)
  }, [])

  useEffect(() => {
    let cancelled = false
    let objectUrl: string | undefined

    import('@/components/pdf/ScriptPdfDocument')
      .then(({ generateScriptPdf }) => generateScriptPdf(data))
      .then((blob) => {
        if (cancelled) return
        objectUrl = URL.createObjectURL(blob)
        setUrl(objectUrl)
        setError(undefined)
      })
      .catch((err) => {
        console.error('Failed to generate PDF:', err)
        if (!cancelled) setError(String(err))
      })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [dataKey])

  if (error) return <pre style={{ padding: 16, color: 'red' }}>{error}</pre>
  if (!url) return null

  return (
    <iframe
      src={url}
      title="PDF preview"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
