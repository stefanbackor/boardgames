import { Font, StyleSheet } from '@react-pdf/renderer'
import { Team } from '@/constants'

/**
 * CSS pixels of the screen layout in PDF points. Printing draws an A4 page at
 * `zoom: 0.85` (see styles.css), and a CSS pixel is 0.75pt, so sizing everything
 * through this keeps the file the same size as the printed sheet.
 */
export const cssPx = (value: number): number => value * 0.85 * 0.75

const A4_WIDTH = 595.28
const A4_HEIGHT = 841.89
const PAGE_PADDING = cssPx(40)
const LABEL_WIDTH = cssPx(52)
const BODY_FONT = 'Inter'
const HEADING_FONT = 'Sorts Mill Goudy'
const BOLD_HEADING_FONT = 'EB Garamond'

/** The most a page can hold, in points */
export const PAGE_CONTENT_HEIGHT = A4_HEIGHT - 2 * PAGE_PADDING

/** A word longer than this could not fit a column, so it may break */
const LONGEST_UNBROKEN_WORD = 30

/** Matches the role icons. Any team not listed keeps black names */
export const ROLE_NAME_COLORS: Partial<Record<Team, string>> = {
  [Team.Townsfolk]: '#1a5fa8',
  [Team.Outsider]: '#1a5fa8',
  [Team.Minion]: '#a51c20',
  [Team.Demon]: '#a51c20',
}

const fontUrl = (file: string) =>
  `${window.location.origin}/fonts/pdf/${file}.woff`

let fontsRegistered = false

/**
 * Registers the embedded fonts, once.
 *
 * Each font holds the latin and latin-ext ranges in one file. Two families with
 * fallback would split words at every accented letter, and react-pdf treats that
 * split as a place to wrap the line. It also knows only English hyphenation, so
 * that is turned off - except for what could not fit otherwise, like a URL in a
 * homebrew rule.
 */
export function registerFonts(): void {
  if (fontsRegistered) return
  fontsRegistered = true

  Font.register({
    family: BODY_FONT,
    fonts: [
      { src: fontUrl('inter-400'), fontWeight: 400 },
      { src: fontUrl('inter-700'), fontWeight: 700 },
    ],
  })
  Font.register({
    family: HEADING_FONT,
    src: fontUrl('sorts-mill-goudy-400'),
  })
  Font.register({
    family: BOLD_HEADING_FONT,
    src: fontUrl('eb-garamond-700'),
  })
  Font.registerHyphenationCallback((word) =>
    word.length > LONGEST_UNBROKEN_WORD
      ? (word.match(/.{1,20}/gu) ?? [word])
      : [word],
  )
}

export const styles = StyleSheet.create({
  page: {
    padding: PAGE_PADDING,
    fontFamily: BODY_FONT,
    fontSize: cssPx(14),
    color: 'black',
  },
  heading: { fontFamily: HEADING_FONT },
  scriptHeader: {
    fontFamily: HEADING_FONT,
    fontSize: cssPx(28),
    marginBottom: cssPx(16),
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: cssPx(8),
    marginVertical: cssPx(8),
  },
  teamLabel: {
    fontSize: cssPx(12),
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  rule: { flexGrow: 1, height: 0.5, backgroundColor: '#bbb' },
  columns: { flexDirection: 'row', gap: cssPx(12) },
  column: { flex: 1 },
  card: { flexDirection: 'row', gap: cssPx(12), marginBottom: cssPx(4) },
  cardText: { flex: 1, justifyContent: 'center', paddingVertical: cssPx(8) },
  notFirstNight: {
    textAlign: 'right',
    marginTop: cssPx(16),
    fontSize: cssPx(12),
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#bbb',
    paddingVertical: cssPx(4),
    fontFamily: HEADING_FONT,
    fontSize: cssPx(24),
  },
  tableLabel: { width: cssPx(170), textAlign: 'right' },
  tableCell: { flex: 1, textAlign: 'center' },
  nightContent: { paddingRight: LABEL_WIDTH, gap: cssPx(8) },
  nightRow: { flexDirection: 'row', gap: cssPx(12) },
  nightText: { flex: 1, justifyContent: 'center', gap: cssPx(2) },
  // Sorts Mill Goudy has no bold, and print's synthetic bold has no PDF equivalent
  roleName: { fontFamily: BOLD_HEADING_FONT, fontSize: cssPx(16) },
  nightName: { fontFamily: BOLD_HEADING_FONT, fontSize: cssPx(15) },
  nightLabelLine: {
    position: 'absolute',
    top: PAGE_PADDING,
    bottom: PAGE_PADDING,
    right: PAGE_PADDING + cssPx(28),
    width: 0.5,
    backgroundColor: '#ccc',
  },
  nightLabel: {
    position: 'absolute',
    top: PAGE_PADDING + cssPx(8),
    left: A4_WIDTH - PAGE_PADDING + cssPx(4),
    width: 800,
    fontFamily: HEADING_FONT,
    fontSize: cssPx(28),
    textTransform: 'uppercase',
    transform: 'rotate(90deg)',
    transformOrigin: '0 0',
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  markerLetter: { fontSize: cssPx(18), fontWeight: 700 },
  rules: {
    marginTop: cssPx(8),
    borderTopWidth: 0.5,
    borderTopColor: '#bbb',
    paddingTop: cssPx(8),
    gap: cssPx(4),
  },
  jinxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: cssPx(8),
    marginBottom: cssPx(4),
  },
})
