import { Document, Page, pdf, Text, View } from '@react-pdf/renderer'
import { PLAYER_DISTRIBUTION } from '@/constants/playerDistribution'
import { Team } from '@/constants'
import type { NightItem } from '@/hooks/useNightItems'
import type { Role } from '@/types'
import type { Jinx } from '@/types/jinx'
import { PdfNightPage } from './PdfNightPage'
import { PdfTeamSection } from './PdfTeamSection'
import { cssPx, registerFonts, styles } from './pdfStyles'

/** Everything the PDF draws, already resolved and translated */
export interface ScriptPdfData {
  roles: Role[]
  name: string
  author: string
  jinxes: Jinx[]
  bootleggerRules: string[]
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
  name: string
  author: string
  by: string
}

interface PlayerTableProps {
  labels: ScriptPdfData['labels']
}

interface ScriptDocumentProps {
  data: ScriptPdfData
}

function Header({ name, author, by }: HeaderProps) {
  return (
    // One Text, because react-pdf has no baseline alignment between two of them
    <Text style={styles.scriptHeader}>
      {name}
      {author.trim() !== '' && (
        <Text style={{ fontSize: cssPx(18) }}>
          {'  '}
          {by} {author}
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
  const { name, author, labels } = data

  return (
    <Document title={name}>
      <Page size="A4" style={styles.page}>
        <Header name={name} author={author} by={labels.by} />
        {[Team.Townsfolk, Team.Outsider, Team.Minion, Team.Demon].map(
          (team) => (
            <PdfTeamSection key={team} team={team} data={data} />
          ),
        )}
        <Text style={styles.notFirstNight}>{labels.notFirstNight}</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Header name={name} author={author} by={labels.by} />
        {[Team.Traveler, Team.Fabled, Team.Loric]
          .filter((team) => data.roles.some((role) => role.team === team))
          .map((team) => (
            <PdfTeamSection key={team} team={team} data={data} />
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
