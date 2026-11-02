import { Text } from '@react-pdf/renderer'
import type { TextRun } from './pdfText'
import { cssPx } from './pdfStyles'

interface PdfRunsProps {
  runs: TextRun[]
  /** The font size in CSS pixels */
  size: number
}

/** A paragraph of text whose weight changes along the way */
export function PdfRuns({ runs, size }: PdfRunsProps) {
  return (
    <Text style={{ fontSize: cssPx(size), lineHeight: 1.2 }}>
      {runs.map((run, index) => (
        <Text key={index} style={run.bold ? { fontWeight: 700 } : undefined}>
          {run.text}
        </Text>
      ))}
    </Text>
  )
}
