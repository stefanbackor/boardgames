import { Flex, Heading, Avatar } from '@radix-ui/themes'
import { Moon, Sun } from 'lucide-react'
import type { Role } from '../../data/types'
import { NightRoleItem } from './NightRoleItem'
import type { Translations } from '../../translations'

interface FirstNightSetupProps {
  roles: Role[]
  t: Translations
}

export function FirstNightSetup({ roles, t }: FirstNightSetupProps) {
  const firstNightRoles = roles
    .filter((role) => role.firstNight > 0)
    .sort((a, b) => a.firstNight - b.firstNight)

  return (
    <div style={{ pageBreakBefore: 'always', marginTop: '2rem' }}>
      <Flex direction="column" gap="3">
        <Flex direction="column" align="center" gap="2">
          <Heading size="8">{t.firstNight}</Heading>
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

          <NightRoleItem
            name={t.minionInfo}
            image={<Avatar fallback="M" size="4" radius="full" />}
            reminder={t.minionInfoText}
          />

          <NightRoleItem
            name={t.demonInfo}
            image={<Avatar fallback="D" size="4" radius="full" />}
            reminder={t.demonInfoText}
          />

          {firstNightRoles.map((role) => (
            <NightRoleItem
              key={role.id}
              name={role.name}
              image={role.image}
              reminder={role.firstNightReminder}
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
