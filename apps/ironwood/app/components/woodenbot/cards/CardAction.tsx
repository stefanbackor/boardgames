import { Badge, Flex } from '@radix-ui/themes'

import { WBAction } from '~/constants/woodenbot'

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
  action: WBAction
}

export const CardAction = ({ action }: Props) => {
  return (
    <Flex direction="column" gap="3">
      {(() => {
        switch (action) {
          case WBAction.CARD:
          case WBAction.CARD_RED:
            return <Card />
          case WBAction.CRYSTALS:
            return <Crystals />
          case WBAction.EYE:
          case WBAction.EYE_RED:
            return <Eye />
          case WBAction.WARBAND:
          case WBAction.WARBAND_RED:
            return <Warband />
          case WBAction.SHIELD:
          case WBAction.SHIELD_RED:
            return <Shield />
          case WBAction.ALERT:
          case WBAction.ALERT_RED:
            return <Alert />
          case WBAction.CUBES:
          case WBAction.CUBES_RED:
            return <Cubes />
          case WBAction.BATTLE:
            return <Battle />
          case WBAction.SEARCH:
          case WBAction.SEARCH_RED:
            return <Search />
          case WBAction.ARROWS:
            return <Arrows />
          default:
            return <Badge color="red">Unknown {action}</Badge>
        }
      })()}
    </Flex>
  )
}
