import { Flex, Avatar, Separator, Badge } from '@radix-ui/themes'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Role } from '../../data/types'
import { NightRoleItem } from './NightRoleItem'

interface NightFirstSetupProps {
  roles: Role[]
}

export function NightFirstSetup({ roles }: NightFirstSetupProps) {
  const { t } = useTranslation()
  const { t: tContent } = useTranslation('content')

  // Create special role objects for night setup phases
  const dusk = {
    id: 'dusk',
    name: t('Dusk'),
    firstNight: 1,
    image: (
      <Avatar
        fallback={<Moon size={24} />}
        size="4"
        color="orange"
        radius="full"
      />
    ),
    reminder: '',
  }

  const dawn = {
    id: 'dawn',
    name: t('Dawn'),
    firstNight: 73,
    image: (
      <Avatar
        fallback={<Sun size={24} />}
        size="4"
        color="orange"
        radius="full"
      />
    ),
    reminder: '',
  }

  const minionInfo = {
    id: 'minion-info',
    name: t('Minion Info'),
    firstNight: 15,
    image: <Avatar fallback="M" size="4" radius="full" />,
    reminder: tContent(
      'If there are 7 or more players, wake all Minions: Show the THIS IS THE DEMON token. Point to the Demon. Show the THESE ARE YOUR MINIONS token. Point to the other Minions.',
    ),
  }

  const demonInfo = {
    id: 'demon-info',
    name: t('Demon Info'),
    firstNight: 19,
    image: <Avatar fallback="D" size="4" radius="full" />,
    reminder: tContent(
      'If there are 7 or more players, wake the Demon: Show the THESE ARE YOUR MINIONS token. Point to all Minions. Show the THESE CHARACTERS ARE NOT IN PLAY token. Show 3 not-in-play good character tokens.',
    ),
  }

  // Combine roles with special info items and sort by firstNight
  const firstNightRoles = roles
    .filter((role) => role.firstNight > 0)
    .map((role) => ({
      id: role.id,
      name: role.name,
      firstNight: role.firstNight,
      image: role.image,
      reminder: role.firstNightReminder,
    }))

  const allFirstNightItems = [
    ...firstNightRoles,
    dusk,
    dawn,
    minionInfo,
    demonInfo,
  ].sort((a, b) => a.firstNight - b.firstNight)

  return (
    <Flex direction="column" gap="3">
      <Flex direction="row" gap="2" align="center">
        <Badge size="3" color="gray">
          {t('First Night')}
        </Badge>
        <Separator decorative orientation="horizontal" size="4" />
      </Flex>

      <Flex direction="column" gap="2">
        {allFirstNightItems.map((item) => (
          <NightRoleItem
            key={item.id}
            name={item.name}
            image={item.image}
            reminder={item.reminder}
          />
        ))}
      </Flex>
    </Flex>
  )
}
