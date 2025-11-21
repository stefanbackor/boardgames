import { Avatar, Badge, Flex, Separator } from '@radix-ui/themes'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Role } from '../../data/types'
import { NightRoleItem } from './NightRoleItem'

interface NightOtherSetupProps {
  roles: Role[]
}

export function NightOtherSetup({ roles }: NightOtherSetupProps) {
  const { t } = useTranslation()
  const otherNightsRoles = roles
    .filter((role) => role.otherNight > 0)
    .sort((a, b) => a.otherNight - b.otherNight)

  return (
    <Flex direction="column" gap="3">
      <Flex direction="row" gap="2" align="center">
        <Badge size="3" color="gray">
          {t('Other Nights')}
        </Badge>
        <Separator orientation="horizontal" size="4" />
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

        {otherNightsRoles.map((role) => (
          <NightRoleItem
            key={role.id}
            name={role.name}
            image={role.image}
            reminder={role.otherNightReminder}
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
  )
}
