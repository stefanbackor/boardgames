import { Flex } from '@radix-ui/themes'

import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'

import { VisionCardBadge } from './VisionCardBadge'

export const PossibleMountains = () => {
  const { drawPile } = useVisionDeck()

  return (
    <Flex gap="1" wrap="wrap">
      {drawPile
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((card) => (
          <VisionCardBadge key={card[0]} card={card} />
        ))}
    </Flex>
  )
}
