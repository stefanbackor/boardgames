import { Avatar, Flex, Heading, Text } from '@radix-ui/themes'
import { sanitizeHtml } from '@/utils/sanitizeHtml'
import { ImageIcon } from 'lucide-react'
import { getProxiedImageUrl } from '@/utils/imageUrl'
import { formatReminder } from '@/utils/formatReminder'
import type { NightMarker } from '@/constants/nightMarkers'
import { NightMarkerAvatar } from './NightMarkerAvatar'

interface NightRoleItemProps {
  name: string
  /** The role's image. A custom role may have none, and then shows no avatar */
  image?: string
  /** Stands in for the image on a step that belongs to no role */
  marker?: NightMarker
  reminder: string
}

export function NightRoleItem({
  name,
  image,
  marker,
  reminder,
}: NightRoleItemProps) {
  return (
    <Flex gap="3" justify="start" style={{ pageBreakInside: 'avoid' }}>
      {marker ? (
        <NightMarkerAvatar marker={marker} />
      ) : (
        image && <Avatar
          size="4"
          radius="full"
          src={getProxiedImageUrl(image)}
          fallback={<ImageIcon />}
        />
      )}
      <Flex direction="column" justify="center">
        <Heading size="3">
          <strong>{name}</strong>
        </Heading>
        {reminder && (
          <Text
            size="2"
            style={{ lineHeight: '1.33' }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(formatReminder(reminder)) }}
          />
        )}
      </Flex>
    </Flex>
  )
}
