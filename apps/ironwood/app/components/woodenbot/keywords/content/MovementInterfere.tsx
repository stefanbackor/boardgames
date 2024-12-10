import { InfoCircledIcon } from '@radix-ui/react-icons'
import {
  Box,
  Callout,
  Flex,
  Heading,
  Separator,
  Strong,
} from '@radix-ui/themes'
import { useState } from 'react'

import { FullInstructionsButton } from '~/components/ironbot/keywords/content/common/FullInstructionsButton'
import { Keyword } from '~/components/KeywordButton'
import { NoDoubleMovementCallout } from '~/components/NoDoubleMovementCallout'
import { VisionCardBadge } from '~/components/woodenbot/VisionCardBadge'
import { WWWarriorType } from '~/constants/woodenbot'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'

import { MovementSourceFull } from './MovementSourceFull'
import { MovementSourceShort } from './MovementSourceShort'

type Props = {
  count: string
  countType?: WWWarriorType
}

export const MovementInterfere = ({ count, countType }: Props) => {
  const { drawPile } = useVisionDeck()
  const [full, setFull] = useState(false)

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
      <Heading>Target forest:</Heading>
      <ul>
        <li>
          Inner to <Strong>controlled Foundation</Strong> with most Woodwalkers
          adjacent
        </li>
        <li>
          Inner to <Strong>Ferrum</Strong> with most Woodwalkers adjacent
        </li>
        <li>
          Inner to <Strong>Drill</Strong> (2+ crystals) with most Woodwalkers
          adjacent
        </li>
        <li>
          Inner to a <Strong>possible Mountain</Strong>{' '}
          {drawPile.length > 0 &&
            drawPile.map((card) => (
              <>
                <VisionCardBadge key={card[0]} card={card} />{' '}
              </>
            ))}{' '}
          with most Woodwalkers adjacent in outer forest
        </li>
      </ul>
      <Box>
        If tied, use the <Keyword.MagicDie />.
      </Box>

      <MovementSourceShort />
      <NoDoubleMovementCallout />

      <FullInstructionsButton full={full} onClick={() => setFull(!full)} />

      {full && (
        <>
          <Separator size="4" />
          <Heading size="4">Target of the movement:</Heading>
          <ul>
            <li>
              An inner forest adjacent to a{' '}
              <Strong>controlled Foundation</Strong> with the largest number of
              Woodwalker Fighters adjacent.
            </li>
            <li>
              An inner forest adjacent to <Strong>Ferrum</Strong> with the
              largest number of Woodwalker Fighters adjacent.
            </li>
            <li>
              An inner forest adjacent to the <Strong>Drill</Strong> (if the
              Drill has <Strong>2 or more crystals</Strong> in the cargo area)
              with the largest number of Woodwalker Fighters adjacent.
            </li>
            <li>
              An inner forest adjacent to a <Strong>possible Mountain</Strong>{' '}
              with the largest number of Woodwalker Fighters in adjacent outer
              forests.
            </li>
          </ul>
          <Box>If multiple forests are tied, use the Magic Die.</Box>

          <MovementSourceFull />
        </>
      )}
    </Flex>
  )
}
