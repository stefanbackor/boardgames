import { Flex, Badge, Separator, Box } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'
import type { Role } from '../../data/types'
import { RoleCard } from './RoleCard'

interface TeamSectionProps {
  team: string
  teamColor: 'blue' | 'red' | 'orange'
  roles: Role[]
}

const TEAM_TRANSLATION_KEYS = {
  townsfolk: 'Townsfolk',
  outsider: 'Outsider',
  minion: 'Minion',
  demon: 'Demon',
  traveler: 'Recommended Travelers',
} as const

export function TeamSection({ team, teamColor, roles }: TeamSectionProps) {
  const { t } = useTranslation()

  const teamLabel = t(
    TEAM_TRANSLATION_KEYS[team as keyof typeof TEAM_TRANSLATION_KEYS] || team,
  )

  return (
    <Flex key={team} direction="column" style={{ pageBreakInside: 'avoid' }}>
      <Flex direction="row" align="center" gap="2" style={{ minWidth: '40px' }}>
        <Separator orientation="horizontal" size="4" />
        <Badge color={teamColor} size="2">
          {teamLabel}
        </Badge>
        <Separator orientation="horizontal" size="4" />
      </Flex>
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
    </Flex>
  )
}
