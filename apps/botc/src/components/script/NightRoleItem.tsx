import { Avatar, Flex, Heading, Text } from '@radix-ui/themes'
import { sanitizeHtml } from '@/utils/sanitizeHtml'
import { ImageIcon } from 'lucide-react'
import { getProxiedImageUrl } from '@/utils/imageUrl'

interface NightRoleItemProps {
  name: string
  image: React.ReactNode | string
  reminder: string
}

export function NightRoleItem({ name, image, reminder }: NightRoleItemProps) {
  // Helper function to make uppercase parts bold
  const formatReminder = (text: string) => {
    // Match sequences of uppercase letters (2+ chars), optionally with spaces between uppercase words
    // Using \p{Lu} to match any Unicode uppercase letter (including accented characters like Á, É, Ñ, etc.)
    return text.replace(/\b\p{Lu}{2,}(?:\s+\p{Lu}{2,})*\b/gu, (match) => `<strong>${match}</strong>`)
  }

  return (
    <Flex gap="3" justify="start" style={{ pageBreakInside: 'avoid' }}>
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
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(formatReminder(reminder)) }}
          />
        )}
      </Flex>
    </Flex>
  )
}
