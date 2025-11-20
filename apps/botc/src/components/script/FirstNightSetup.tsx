import { Flex, Heading, Avatar } from '@radix-ui/themes'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Role } from '../../data/types'
import { NightRoleItem } from './NightRoleItem'

interface FirstNightSetupProps {
  roles: Role[]
}

export function FirstNightSetup({ roles }: FirstNightSetupProps) {
  const { t } = useTranslation()
  const firstNightRoles = roles
    .filter((role) => role.firstNight > 0)
    .sort((a, b) => a.firstNight - b.firstNight)

  return (
    <div style={{ pageBreakBefore: 'always' }}>
      <Flex direction="column" gap="3">
        <Flex direction="column" align="center">
          <Heading size="6">{t('First Night')}</Heading>
        </Flex>

        <Flex direction="column" gap="2">
          <NightRoleItem
            name={t('Dusk')}
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
            name={t('Minion Info')}
            image={<Avatar fallback="M" size="4" radius="full" />}
            reminder={t(
              'If there are 7 or more players, wake all Minions: Show the THIS IS THE DEMON token. Point to the Demon. Show the THESE ARE YOUR MINIONS token. Point to the other Minions.',
            )}
          />

          <NightRoleItem
            name={t('Demon Info')}
            image={<Avatar fallback="D" size="4" radius="full" />}
            reminder={t(
              'If there are 7 or more players, wake the Demon: Show the THESE ARE YOUR MINIONS token. Point to all Minions. Show the THESE CHARACTERS ARE NOT IN PLAY token. Show 3 not-in-play good character tokens.',
            )}
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
            name={t('Dawn')}
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
