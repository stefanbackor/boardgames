import { Badge, Flex } from '@radix-ui/themes'

import { WWAction } from '~/constants/woodenbot'

import { Alert } from './content/Alert'
import { Arrows } from './content/Arrows'
import { Battle } from './content/Battle'
import { Card } from './content/Card'
import { Crystals } from './content/Crystals'
import { Cubes } from './content/Cubes'
import { Eye } from './content/Eye'
import { Search } from './content/Search'
import { Shield } from './content/Shield'
import { Warband } from './content/Warband'

type Props = {
  action: WWAction
}

export const CardAction = ({ action }: Props) => {
  return (
    <Flex direction="column" gap="3">
      {(() => {
        switch (action) {
          case WWAction.CARD:
          case WWAction.CARD_RED:
            return <Card />
          case WWAction.CRYSTALS:
            return <Crystals />
          case WWAction.EYE:
          case WWAction.EYE_RED:
            return <Eye />
          case WWAction.WARBAND:
          case WWAction.WARBAND_RED:
            return <Warband />
          case WWAction.SHIELD:
          case WWAction.SHIELD_RED:
            return <Shield />
          case WWAction.ALERT:
          case WWAction.ALERT_RED:
            return <Alert />
          case WWAction.CUBES:
          case WWAction.CUBES_RED:
            return <Cubes />
          case WWAction.BATTLE:
            return <Battle />
          case WWAction.SEARCH:
          case WWAction.SEARCH_RED:
            return <Search />
          case WWAction.ARROWS:
            return <Arrows />
          default:
            return <Badge color="red">Unknown {action}</Badge>
        }
      })()}
    </Flex>
  )
}
