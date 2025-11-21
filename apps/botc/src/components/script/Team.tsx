import { Flex } from '@radix-ui/themes'
import type { Role } from '../../data/types'
import { TeamSection } from './TeamSection'

interface TeamProps {
  roles: Role[]
  excludeTravelers?: boolean
}

const teamOrder = ['townsfolk', 'outsider', 'minion', 'demon', 'traveler']
const teamColors = {
  townsfolk: 'blue',
  outsider: 'blue',
  minion: 'red',
  demon: 'red',
  traveler: 'orange',
} as const

export function Team({ roles, excludeTravelers = false }: TeamProps) {
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
        if (excludeTravelers && team === 'traveler') return null

        const teamRoles = rolesByTeam?.[team]
        if (!teamRoles || teamRoles.length === 0) return null

        return (
          <TeamSection
            key={team}
            team={team}
            teamColor={teamColors[team as keyof typeof teamColors]}
            roles={teamRoles}
          />
        )
      })}
    </Flex>
  )
}
