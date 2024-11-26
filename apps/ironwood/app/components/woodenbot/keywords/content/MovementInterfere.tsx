import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Flex, Strong, Text } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'
import { VisionCardBadge } from '~/components/woodenbot/VisionCardBadge'
import { WWWarriorType } from '~/constants/woodenbot'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'

import { MovementSourceFull } from './MovementSourceFull'

type Props = {
  count: string
  countType?: WWWarriorType
}

export const MovementInterfere = ({ count, countType }: Props) => {
  const { drawPile } = useVisionDeck()

  return (
    <Flex direction="column" gap="3">
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Move{' '}
          {countType === WWWarriorType.WARBAND ? (
            <Keyword.WoodwalkerWarband count={count} />
          ) : (
            <Keyword.WoodwalkerWarrior count={count} />
          )}
        </Callout.Text>
      </Callout.Root>
      <Text size="4">Target of the movement:</Text>
      <ul style={{ margin: 0 }}>
        <li>
          An inner forest adjacent to a <Strong>controlled Foundation</Strong>{' '}
          with the largest number of Woodwalker Fighters adjacent.
        </li>
        <li>
          An inner forest adjacent to <Strong>Ferrum</Strong> with the largest
          number of Woodwalker Fighters adjacent.
        </li>
        <li>
          An inner forest adjacent to the <Strong>Drill</Strong> (if the Drill
          has <Strong>2 or more crystals</Strong> in the cargo area) with the
          largest number of Woodwalker Fighters adjacent.
        </li>
        <li>
          An inner forest adjacent to a <Strong>possible Mountain</Strong>{' '}
          {drawPile.length > 0 &&
            drawPile.map((card) => (
              <>
                <VisionCardBadge key={card[0]} card={card} />{' '}
              </>
            ))}{' '}
          with the largest number of Woodwalker Fighters in adjacent outer
          forests.
        </li>
      </ul>
      <Box>
        If multiple forests are tied, use the <Keyword.MagicDie />.
      </Box>

      <MovementSourceFull />
    </Flex>
  )
}
