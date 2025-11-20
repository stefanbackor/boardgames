import { Flex, Badge, Separator, Box } from '@radix-ui/themes'
import type { Role } from '../../data/types'
import { RoleCard } from './RoleCard'

interface TeamSectionProps {
  team: string
  teamLabel: string
  teamColor: 'blue' | 'red' | 'orange'
  roles: Role[]
}

export function TeamSection({
  team,
  teamLabel,
  teamColor,
  roles,
}: TeamSectionProps) {
  return (
    <div key={team} style={{ pageBreakInside: 'avoid' }}>
      <Flex direction="row" align="center" gap="2" style={{ minWidth: '40px' }}>
        <Badge color={teamColor} size="2">
          {teamLabel}
        </Badge>
        <Separator orientation="horizontal" size="4" />
      </Flex>
      <Box mb="3">
        <Box
          style={{
            columnCount: 2,
            columnWidth: '50%',
            columnGap: 'var(--space-3)',
          }}
        >
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </Box>
      </Box>
    </div>
  )
}
