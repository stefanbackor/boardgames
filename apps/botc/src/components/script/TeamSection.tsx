import { Flex, Badge, Separator, Box } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'
import type { Role } from '../../data/types'
import { RoleCard } from './RoleCard'

interface TeamSectionProps {
  team: string
  teamColor: 'blue' | 'red' | 'orange'
  roles: Role[]
}

export function TeamSection({ team, teamColor, roles }: TeamSectionProps) {
  const { t } = useTranslation()

  const TEAM_TRANSLATION_KEYS = {
    townsfolk: t('Townsfolks'),
    outsider: t('Outsiders'),
    minion: t('Minions'),
    demon: t('Demons'),
    traveler: t('Recommended Travelers'),
  } as const

  const teamLabel =
    TEAM_TRANSLATION_KEYS[team as keyof typeof TEAM_TRANSLATION_KEYS] || team

  return (
    <Flex key={team} direction="column" style={{ pageBreakInside: 'avoid' }}>
      <Flex direction="row" align="center" gap="2" my="2">
        <Badge
          color={teamColor}
          size="2"
          style={{ textTransform: 'uppercase' }}
        >
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
