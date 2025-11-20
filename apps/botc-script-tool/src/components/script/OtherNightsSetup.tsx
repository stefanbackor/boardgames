import { Avatar, Flex, Heading } from '@radix-ui/themes'
import type { Role } from '../../data/types'
import { NightRoleItem } from './NightRoleItem'
import type { Translations } from '../../translations'
import { Moon, Sun } from 'lucide-react'

interface OtherNightsSetupProps {
  roles: Role[]
  t: Translations
}

export function OtherNightsSetup({ roles, t }: OtherNightsSetupProps) {
  const otherNightsRoles = roles
    .filter((role) => role.otherNight > 0)
    .sort((a, b) => a.otherNight - b.otherNight)

  return (
    <div style={{ pageBreakBefore: 'always', marginTop: '2rem' }}>
      <Flex direction="column" gap="3">
        <Flex direction="column" align="center" gap="2">
          <Heading size="8">{t.otherNights}</Heading>
        </Flex>

        <Flex direction="column" gap="4">
          <NightRoleItem
            name={t.dusk}
            image={
              <Avatar
                fallback={<Moon size={24} />}
                size="4"
                color="orange"
                radius="full"
              />
            }
            reminder=""
          />

          {otherNightsRoles.map((role) => (
            <NightRoleItem
              key={role.id}
              name={role.name}
              image={role.image}
              reminder={role.otherNightReminder}
            />
          ))}

          <NightRoleItem
            name={t.dawn}
            image={
              <Avatar
                fallback={<Sun size={24} />}
                size="4"
                color="orange"
                radius="full"
              />
            }
            reminder=""
          />
        </Flex>
      </Flex>
    </div>
  )
}
