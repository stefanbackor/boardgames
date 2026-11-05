import { Document, Page, pdf, Text, View } from '@react-pdf/renderer'
import { PLAYER_DISTRIBUTION } from '@/constants/playerDistribution'
import type { Team } from '@/constants'
import type { NightItem } from '@/hooks/useNightItems'
import { isTeamOnPaper, type ScriptView } from '@/utils/scriptView'
import { PdfNightPage } from './PdfNightPage'
import { PdfTeamSection } from './PdfTeamSection'
import { cssPx, registerFonts, styles } from './pdfStyles'

/** Everything the PDF draws, already resolved and translated */
export interface ScriptPdfData {
  /** The script as it is on screen, see buildScriptView */
  view: ScriptView
  firstNightItems: NightItem[]
  otherNightItems: NightItem[]
  showEnglishNames: boolean
  labels: {
    by: string
    notFirstNight: string
    firstNight: string
    otherNights: string
    players: string
    townsfolk: string
    outsiders: string
    minions: string
    demons: string
    teams: Record<Team, string>
  }
}

interface HeaderProps {
  view: ScriptView
  by: string
}

interface PlayerTableProps {
  labels: ScriptPdfData['labels']
}

interface ScriptDocumentProps {
  data: ScriptPdfData
}

function Header({ view, by }: HeaderProps) {
  return (
    // One Text, because react-pdf has no baseline alignment between two of them
    <Text style={styles.scriptHeader}>
      {view.name}
      {view.hasAuthor && (
        <Text style={{ fontSize: cssPx(18) }}>
          {'  '}
          {by} {view.author}
        </Text>
      )}
    </Text>
  )
}

function PlayerTable({ labels }: PlayerTableProps) {
  const rows = [
    { label: labels.players, values: PLAYER_DISTRIBUTION.playerCounts },
    { label: labels.townsfolk, values: PLAYER_DISTRIBUTION.townsfolk },
    { label: labels.outsiders, values: PLAYER_DISTRIBUTION.outsiders },
    { label: labels.minions, values: PLAYER_DISTRIBUTION.minions },
    { label: labels.demons, values: PLAYER_DISTRIBUTION.demons },
  ]

  return (
    <View wrap={false} style={{ marginTop: cssPx(20) }}>
      {rows.map(({ label, values }) => (
        <View key={label} style={styles.tableRow}>
          <Text style={styles.tableLabel}>{label}</Text>
          {values.map((value, index) => (
            <Text key={index} style={styles.tableCell}>
              {value}
            </Text>
          ))}
        </View>
      ))}
    </View>
  )
}

function ScriptDocument({ data }: ScriptDocumentProps) {
  const { view, labels } = data
  const { name } = view

  return (
    <Document title={name}>
      <Page size="A4" style={styles.page}>
        <Header view={view} by={labels.by} />
        {view.pages.characters.map((teamView) => (
          <PdfTeamSection key={teamView.team} teamView={teamView} data={data} />
        ))}
        <Text style={styles.notFirstNight}>{labels.notFirstNight}</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Header view={view} by={labels.by} />
        {view.pages.extras.filter(isTeamOnPaper).map((teamView) => (
          <PdfTeamSection key={teamView.team} teamView={teamView} data={data} />
        ))}
        <PlayerTable labels={labels} />
      </Page>

      <PdfNightPage
        title={labels.firstNight}
        items={data.firstNightItems}
        scriptName={name}
      />
      <PdfNightPage
        title={labels.otherNights}
        items={data.otherNightItems}
        scriptName={name}
      />
    </Document>
  )
}

/**
 * Renders the script to a PDF laid out in the printed sheet's pages.
 *
 * @param data - What to draw
 * @returns The finished file
 */
export async function generateScriptPdf(data: ScriptPdfData): Promise<Blob> {
  registerFonts()
  return pdf(<ScriptDocument data={data} />).toBlob()
}
