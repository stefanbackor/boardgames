import { Flex } from '@radix-ui/themes'
import type { Role } from '../../data/types'
import { TeamSection } from './TeamSection'
import type { Translations } from '../../translations'

interface TeamProps {
  roles: Role[]
  t: Translations
}

const teamOrder = ['townsfolk', 'outsider', 'minion', 'demon', 'traveler']
const teamColors = {
  townsfolk: 'blue',
  outsider: 'blue',
  minion: 'red',
  demon: 'red',
  traveler: 'orange',
} as const

export function Team({ roles, t }: TeamProps) {
  // Group roles by team
  const rolesByTeam = roles.reduce(
    (acc, role) => {
      if (!acc[role.team]) acc[role.team] = []
      acc[role.team].push(role)
      return acc
    },
    {} as Record<string, Role[]>,
  )

  return (
    <Flex direction="column">
      {teamOrder.map((team) => {
        const teamRoles = rolesByTeam?.[team]
        if (!teamRoles || teamRoles.length === 0) return null

        return (
          <TeamSection
            key={team}
            team={team}
            teamLabel={t[team as keyof typeof t] as string}
            teamColor={teamColors[team as keyof typeof teamColors]}
            roles={teamRoles}
          />
        )
      })}
    </Flex>
  )
}
