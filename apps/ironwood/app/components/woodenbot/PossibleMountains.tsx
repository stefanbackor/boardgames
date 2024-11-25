import { Flex } from '@radix-ui/themes'

import { WBVisionPile } from '~/constants/woodenbot/vision'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'

import { VisionCardBadge } from './VisionCardBadge'

export const PossibleMountains = () => {
  const { deck: visionDeck } = useVisionDeck()

  return (
    <Flex gap="1" wrap="wrap">
      {visionDeck
        .get(WBVisionPile.DRAW)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((card) => (
          <VisionCardBadge key={card[0]} card={card} />
        ))}
    </Flex>
  )
}
