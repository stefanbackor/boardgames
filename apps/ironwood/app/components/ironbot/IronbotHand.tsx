import { Badge, Flex, Heading, Section, Text } from '@radix-ui/themes'

import { useDeck } from '~/hooks/useDeck'
import { DebugOnly } from '~/utils/debug/DebugOnly'
import { Pile } from '~/utils/state/types'
import { useLocationState } from '~/utils/state/useLocationState'

import { CardBadge } from '../CardBadge'

export const IronbotHand = () => {
  const { deck } = useDeck()
  const [crystals] = useLocationState('crystals')

  return (
    <>
      <Section size="1">
        <Flex gap="1" wrap="wrap" align="center">
          <Heading>Bot&apos;s Hand</Heading>
          <Badge color="blue">Crystals: {crystals}</Badge>
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
