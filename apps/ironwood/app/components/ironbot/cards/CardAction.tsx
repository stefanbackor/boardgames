import { Badge, Flex } from '@radix-ui/themes'

import { IBAction } from '~/constants/ironbot'
import { IWCard } from '~/utils/state/types'

import { Battle } from './content/Battle'
import { Card } from './content/Card'
import { Compass } from './content/Compass'
import { Crystals } from './content/Crystals'
import { Drill } from './content/Drill'
import { Forge } from './content/Forge'
import { Golem } from './content/Golem'
import { Hit } from './content/Hit'
import { Shield } from './content/Shield'
import { Warband } from './content/Warband'

type Props = {
  card: IWCard
  action: IBAction
}

export const CardAction = ({ card, action }: Props) => {
  return (
    <Flex direction="column" gap="3">
      {(() => {
        switch (action) {
          case IBAction.BATTLE:
            return <Battle />
          case IBAction.CARD:
            return <Card card={card} />
          case IBAction.CARD_RED:
            return <Card card={card} red />
          case IBAction.COMPASS:
            return <Compass />
          case IBAction.CRYSTALS:
            return <Crystals card={card} />
          case IBAction.CRYSTALS_RED:
            return <Crystals card={card} red />
          case IBAction.DRILL:
          case IBAction.DRILL_RED:
            return <Drill />
          case IBAction.FORGE:
            return <Forge card={card} />
          case IBAction.GOLEM:
          case IBAction.GOLEM_RED:
            return <Golem />
          case IBAction.HIT:
            return <Hit />
          case IBAction.SHIELD:
            return <Shield card={card} />
          case IBAction.SHIELD_RED:
            return <Shield card={card} red />
          case IBAction.WARBAND:
          case IBAction.WARBAND_RED:
            return <Warband />
          default:
            return <Badge color="red">Unknown {action}</Badge>
        }
      })()}
    </Flex>
  )
}
