import {
  Badge,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
} from '@radix-ui/themes'

import { WBVisionPile } from '~/constants/woodenbot'
import { useDeck } from '~/hooks/useDeck'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'
import { DebugOnly } from '~/utils/debug/DebugOnly'
import { Pile } from '~/utils/state/types'
import { useLocationState } from '~/utils/state/useLocationState'

import { CardBadge } from '../CardBadge'
import { PossibleMountains } from './PossibleMountains'
import { VisionCardBadge } from './VisionCardBadge'

export const WoodenbotHand = () => {
  const { deck } = useDeck()
  const { deck: visionDeck } = useVisionDeck()

  const [crystals] = useLocationState('crystals')
  const [woodenbotSpiritCubes] = useLocationState('woodenbot_spirit_cubes')

  return (
    <>
      <Section size="1">
        <Flex gap="2" direction="column">
          <Heading>Bot&apos;s Hand</Heading>

          <Flex gap="1" wrap="wrap" align="center">
            <Badge color="bronze">Spirit cubes: {woodenbotSpiritCubes}</Badge>
            <Badge color="blue">Crystals: {crystals}</Badge>
          </Flex>
          <Flex gap="1" align="center" wrap="wrap">
            <Text size="1">Possible mountains:</Text>
            <PossibleMountains />
          </Flex>

          {visionDeck.size(WBVisionPile.DISCOVERED) > 0 && (
            <Flex align="center" gap="1">
              <Separator orientation="vertical" decorative={false} />
              <Text size="1">Discovered in:</Text>
              {visionDeck.get(WBVisionPile.DISCOVERED).map((card) => (
                <VisionCardBadge key={card[0]} card={card} />
              ))}
            </Flex>
          )}
        </Flex>

        <DebugOnly>
          <Flex gap="1" direction="column">
            <Flex gap="1">
              <Badge color="gold">
                Cards in hand:{' '}
                {deck.size(Pile.HAND_SPECIAL_PRIORITY) +
                  deck.size(Pile.HAND_SPECIAL) +
                  deck.size(Pile.HAND_BASE)}
              </Badge>
              <Badge color="orange">
                Cards in deck: {deck.size(Pile.DRAW_SPECIAL)}
              </Badge>
              <Badge color="red">
                Cards in discard:{' '}
                {deck.size(Pile.DISCARD_SPECIAL) + deck.size(Pile.DISCARD_BASE)}
              </Badge>
            </Flex>

            <Flex direction="column" gap="1">
              <Flex gap="1" align="center">
                <Text size="1">Base cards:</Text>
                {deck
                  .log()
                  .filter(([pile]) => pile === Pile.HAND_BASE)
                  .map(([, cards]) =>
                    cards
                      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
                      .map((card) => <CardBadge key={card[0]} card={card} />),
                  )}
              </Flex>
              <Flex gap="1" align="center">
                <Text size="1">Special cards:</Text>
                {deck
                  .log()
                  .filter(([pile]) => pile === Pile.HAND_SPECIAL)
                  .map(([, cards]) =>
                    cards
                      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
                      .map((card) => <CardBadge key={card[0]} card={card} />),
                  )}
              </Flex>
              <Flex gap="1" align="center">
                <Text size="1">Top of deck cards:</Text>
                {deck
                  .log()
                  .filter(([pile]) => pile === Pile.HAND_SPECIAL_PRIORITY)
                  .map(([, cards]) =>
                    cards
                      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
                      .map((card) => <CardBadge key={card[0]} card={card} />),
                  )}
              </Flex>
            </Flex>
          </Flex>
        </DebugOnly>
      </Section>
    </>
  )
}
