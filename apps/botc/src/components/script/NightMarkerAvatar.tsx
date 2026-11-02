import { Avatar } from '@radix-ui/themes'
import { Moon, Sun } from 'lucide-react'
import { NIGHT_MARKER_LETTERS, type NightMarker } from '@/constants/nightMarkers'

interface NightMarkerAvatarProps {
  marker: NightMarker
}

/** The avatar of a night step that belongs to no role */
export function NightMarkerAvatar({ marker }: NightMarkerAvatarProps) {
  if (marker === 'dusk' || marker === 'dawn') {
    return (
      <Avatar
        fallback={marker === 'dusk' ? <Moon size={24} /> : <Sun size={24} />}
        size="4"
        color="orange"
        radius="full"
      />
    )
  }

  return (
    <Avatar fallback={NIGHT_MARKER_LETTERS[marker]} size="4" radius="full" />
  )
}
