import { Avatar, Flex, Heading, Text } from '@radix-ui/themes'
import { sanitizeHtml } from '../../utils/sanitizeHtml'
import { ImageIcon } from 'lucide-react'
import { getProxiedImageUrl } from '@/utils/imageUrl'

interface NightRoleItemProps {
  name: string
  image: React.ReactNode | string
  reminder: string
}

export function NightRoleItem({ name, image, reminder }: NightRoleItemProps) {
  return (
    <Flex gap="3" justify="start">
      {typeof image === 'string' ? (
        <Avatar
          size="4"
          radius="full"
          src={getProxiedImageUrl(image)}
          fallback={<ImageIcon />}
        />
      ) : (
        image
      )}
      <Flex direction="column" justify="center">
        <Heading size="3">
          <strong>{name}</strong>
        </Heading>
        {reminder && (
          <Text
            size="2"
            style={{ lineHeight: '1.33' }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(reminder) }}
          />
        )}
      </Flex>
    </Flex>
  )
}
