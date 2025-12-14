import { Avatar, Badge, Flex, Heading, Separator } from '@radix-ui/themes'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Role } from '@/types'
import { NightRoleItem } from './NightRoleItem'

interface NightOtherSetupProps {
  roles: Role[]
  scriptName?: string
}

export function NightOtherSetup({ roles, scriptName }: NightOtherSetupProps) {
  const { t: tContent } = useTranslation('content')

  // Create special role objects for night setup phases
  const dusk = {
    id: 'dusk',
    name: tContent('Dusk'),
    firstNight: 1,
    otherNight: 1,
    image: (
      <Avatar
        fallback={<Moon size={24} />}
        size="4"
        color="orange"
        radius="full"
      />
    ),
    reminder: '',
    otherNightReminder: '',
  }

  const dawn = {
    id: 'dawn',
    name: tContent('Dawn'),
    firstNight: 53,
    otherNight: 94,
    image: (
      <Avatar
        fallback={<Sun size={24} />}
        size="4"
        color="orange"
        radius="full"
      />
    ),
    reminder: '',
    otherNightReminder: '',
  }

  const otherNightsRoles = [dusk, dawn, ...roles]
    .filter((role) => role.otherNight > 0)
    .sort((a, b) => a.otherNight - b.otherNight)

  return (
    <Flex className="night-page" direction="row" align="stretch" gap="4">
      <Flex direction="column" gap="3" style={{ flex: 1 }}>
        <Flex direction="row" gap="2" align="center">
          <Badge size="3" color="gray">
            {tContent('Other Nights')}
          </Badge>
          <Separator orientation="horizontal" size="4" />
        </Flex>

        <Flex direction="column" gap="2">
          {otherNightsRoles.map((role) => (
            <NightRoleItem
              key={role.id}
              name={role.name}
              image={role.image}
              reminder={role.otherNightReminder}
            />
          ))}
        </Flex>
      </Flex>

      {scriptName && (
        <Flex className="night-script-label">
          <Heading
            size="7"
            weight="regular"
            className="night-script-label-text"
          >
            {scriptName}
          </Heading>
        </Flex>
      )}
    </Flex>
  )
}
