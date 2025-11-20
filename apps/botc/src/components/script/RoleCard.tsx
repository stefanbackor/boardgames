import { Flex, Heading, Text, Badge } from '@radix-ui/themes'
import type { Role } from '../../data/types'

interface RoleCardProps {
  role: Role & { isCustom?: boolean }
}

export function RoleCard({ role }: RoleCardProps) {
  return (
    <Flex gap="3" align="start">
      <img
        src={role.image}
        alt={role.name}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          flexShrink: 0,
        }}
      />
      <Flex direction="column">
        <Flex align="center" gap="2" mt="3">
          <Heading size="4">{role.name}</Heading>
          {role.isCustom && (
            <Badge color="gray" size="1" className="no-print">
              {role.id}
            </Badge>
          )}
        </Flex>
        <Text size="2">{role.ability}</Text>
      </Flex>
    </Flex>
  )
}
