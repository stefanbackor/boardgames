import { Avatar, Flex, Heading, Text } from '@radix-ui/themes'
import { sanitizeHtml } from '@/utils/sanitizeHtml'
import { ImageIcon } from 'lucide-react'
import { getProxiedImageUrl } from '@/utils/imageUrl'
import { formatReminder } from '@/utils/formatReminder'
import type { NightMarker } from '@/constants/nightMarkers'
import { NightMarkerAvatar } from './NightMarkerAvatar'
import { PrintRoleImage } from './RoleImage'

interface NightRoleItemProps {
  name: string
  /** The role's image. A custom role may have none, and then shows no avatar */
  image?: string
  /** A custom character's image is loaded as the script gives it, unproxied */
  isCustom?: boolean
  /** Stands in for the image on a step that belongs to no role */
  marker?: NightMarker
  reminder: string
}

export function NightRoleItem({
  name,
  image,
  isCustom,
  marker,
  reminder,
}: NightRoleItemProps) {
  return (
    <Flex gap="3" justify="start" style={{ pageBreakInside: 'avoid' }}>
      {marker ? (
        <NightMarkerAvatar marker={marker} />
      ) : (
        image && (
          <>
            <Avatar
              size="4"
              radius="full"
              src={isCustom ? image : getProxiedImageUrl(image)}
              fallback={<ImageIcon />}
              className="print:hidden"
            />
            <PrintRoleImage
              image={image}
              alt=""
              style={{
                width: 'var(--space-8)',
                height: 'var(--space-8)',
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
          </>
        )
      )}
      <Flex direction="column" justify="center">
        <Heading size="3">
          <strong>{name}</strong>
        </Heading>
        {reminder && (
          <Text
            size="2"
            style={{ lineHeight: '1.33' }}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(formatReminder(reminder)),
            }}
          />
        )}
      </Flex>
    </Flex>
  )
}
