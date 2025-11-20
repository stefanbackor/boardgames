import { Flex, Heading, Text, Badge } from '@radix-ui/themes'
import type { Role } from '../../data/types'

interface RoleCardProps {
  role: Role & { isCustom?: boolean }
}

export function RoleCard({ role }: RoleCardProps) {
  return (
    <Flex gap="4" py="1" align="stretch" style={{ breakInside: 'avoid' }}>
      <img
        src={role.image}
        alt={role.name}
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          flexShrink: 0,
          scale: 1.3,
          objectFit: 'cover',
        }}
      />
      <Flex direction="column" justify="center" align="start">
        <Flex align="center" gap="1">
          <Heading size="4">{role.name}</Heading>
          {role.isCustom && (
            <Badge color="gray" size="1" className="no-print">
              {role.id}
            </Badge>
          )}
        </Flex>
        <Text size="2" style={{ lineHeight: '1.33' }}>
          {role.ability}
        </Text>
      </Flex>
    </Flex>
  )
}
