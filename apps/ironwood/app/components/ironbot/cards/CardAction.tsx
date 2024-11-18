import { Badge, Flex } from '@radix-ui/themes'

import { IBAction } from '~/constants/ironbot'

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
  action: IBAction
}

export const CardAction = ({ action }: Props) => {
  return (
    <Flex direction="column" gap="3">
      {(() => {
        switch (action) {
          case IBAction.BATTLE:
            return <Battle />
          case IBAction.CARD:
          case IBAction.CARD_RED:
            return <Card />
          case IBAction.COMPASS:
            return <Compass />
          case IBAction.CRYSTALS:
          case IBAction.CRYSTALS_RED:
            return <Crystals />
          case IBAction.DRILL:
          case IBAction.DRILL_RED:
            return <Drill />
          case IBAction.FORGE:
            return <Forge />
          case IBAction.GOLEM:
          case IBAction.GOLEM_RED:
            return <Golem />
          case IBAction.HIT:
            return <Hit />
          case IBAction.SHIELD:
          case IBAction.SHIELD_RED:
            return <Shield />
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
