import { Circle, Page, Path, Svg, Text, View } from '@react-pdf/renderer'
import {
  NIGHT_MARKER_LETTERS,
  type NightMarker,
} from '@/constants/nightMarkers'
import type { NightItem } from '@/hooks/useNightItems'
import { PdfRoleImage } from './PdfRoleImage'
import { PdfRuns } from './PdfRuns'
import { cssPx, styles } from './pdfStyles'
import { reminderRuns } from './pdfText'

interface PdfNightPageProps {
  title: string
  items: NightItem[]
  scriptName: string
}

function NightMarkerImage({ marker }: { marker: NightMarker }) {
  const size = cssPx(48)
  const circle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  }

  if (marker === 'dusk' || marker === 'dawn') {
    return (
      <View style={[styles.marker, circle]}>
        <Svg viewBox="0 0 24 24" width={cssPx(24)} height={cssPx(24)}>
          {marker === 'dusk' ? (
            <Path
              d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
              stroke="black"
              strokeWidth={2}
            />
          ) : (
            <>
              <Circle cx={12} cy={12} r={4} stroke="black" strokeWidth={2} />
              <Path
                d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"
                stroke="black"
                strokeWidth={2}
              />
            </>
          )}
        </Svg>
      </View>
    )
  }

  return (
    <View style={[styles.marker, circle]}>
      <Text style={styles.markerLetter}>{NIGHT_MARKER_LETTERS[marker]}</Text>
    </View>
  )
}

/** One night's sheet, with the script name running down its edge */
export function PdfNightPage({ title, items, scriptName }: PdfNightPageProps) {
  return (
    <Page size="A4" style={styles.page}>
      {/* Fixed, so a night that runs over a page keeps its label on the next */}
      {scriptName !== '' && (
        <>
          <View fixed style={styles.nightLabelLine} />
          <Text fixed style={styles.nightLabel}>
            {scriptName}
          </Text>
        </>
      )}
      <View style={styles.nightContent}>
        <View style={styles.teamHeader}>
          <Text style={[styles.teamLabel, { fontSize: cssPx(14) }]}>
            {title}
          </Text>
          <View style={styles.rule} />
        </View>
        {items.map((item) => (
          <View key={item.id} style={styles.nightRow} wrap={false}>
            {item.marker ? (
              <NightMarkerImage marker={item.marker} />
            ) : (
              <PdfRoleImage image={item.image} size={48} />
            )}
            <View style={styles.nightText}>
              <Text style={styles.nightName}>{item.name}</Text>
              {item.reminder && (
                <PdfRuns runs={reminderRuns(item.reminder)} size={12} />
              )}
            </View>
          </View>
        ))}
      </View>
    </Page>
  )
}
