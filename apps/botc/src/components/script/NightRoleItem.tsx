import { Avatar, Flex, Heading, Text } from '@radix-ui/themes'
import { sanitizeHtml } from '../../utils/sanitizeHtml'
import { ImageIcon } from 'lucide-react'

interface NightRoleItemProps {
  name: string
  image: React.ReactNode | string
  reminder: string
}

export function NightRoleItem({ name, image, reminder }: NightRoleItemProps) {
  return (
    <Flex gap="3" justify="start">
      {typeof image === 'string' ? (
        <Avatar size="4" radius="full" src={image} fallback={<ImageIcon />} />
      ) : (
        image
      )}
      <Flex direction="column" justify="center">
        <Heading size="4" mt="1">
          {name}
        </Heading>
        {reminder && (
          <Text
            size="2"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(reminder) }}
          />
        )}
      </Flex>
    </Flex>
  )
}
