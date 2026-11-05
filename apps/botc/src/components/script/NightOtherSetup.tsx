import { Badge, Flex, Heading, Separator } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'
import type { Role } from '@/types'
import { useOtherNightItems } from '@/hooks/useNightItems'
import { NightRoleItem } from './NightRoleItem'

interface NightOtherSetupProps {
  roles: Role[]
  scriptName?: string
}

export function NightOtherSetup({ roles, scriptName }: NightOtherSetupProps) {
  const { t: tContent } = useTranslation('content')
  const items = useOtherNightItems(roles)

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
          {items.map((item) => (
            <NightRoleItem
              key={item.id}
              name={item.name}
              image={item.image}
              isCustom={item.isCustom}
              marker={item.marker}
              reminder={item.reminder}
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
