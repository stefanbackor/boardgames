import { Badge, Flex } from '@radix-ui/themes'

import { WBAction, WWCard } from '~/constants/woodenbot'

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
  card: WWCard
  action: WBAction
}

export const CardAction = ({ card, action }: Props) => {
  return (
    <Flex direction="column" gap="3">
      {(() => {
        switch (action) {
          case WBAction.CARD:
            return <Card card={card} />
          case WBAction.CARD_RED:
            return <Card card={card} red />
          case WBAction.CRYSTALS:
            return <Crystals card={card} />
          case WBAction.EYE:
            return <Eye card={card} />
          case WBAction.EYE_RED:
            return <Eye card={card} red />
          case WBAction.WARBAND:
          case WBAction.WARBAND_RED:
            return <Warband />
          case WBAction.SHIELD:
            return <Shield card={card} />
          case WBAction.SHIELD_RED:
            return <Shield card={card} red />
          case WBAction.ALERT:
            return <Alert card={card} />
          case WBAction.ALERT_RED:
            return <Alert card={card} red />
          case WBAction.CUBES:
            return <Cubes card={card} />
          case WBAction.CUBES_RED:
            return <Cubes card={card} red />
          case WBAction.BATTLE:
            return <Battle />
          case WBAction.SEARCH:
            return <Search card={card} />
          case WBAction.SEARCH_RED:
            return <Search card={card} red />
          case WBAction.ARROWS:
            return <Arrows />
          default:
            return <Badge color="red">Unknown {action}</Badge>
        }
      })()}
    </Flex>
  )
}
