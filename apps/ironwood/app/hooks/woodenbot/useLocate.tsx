import { Box, Strong } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { VisionCardBadge } from '~/components/woodenbot/VisionCardBadge'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'
import { useVisionDeckDiscovery } from '~/hooks/woodenbot/useVisionDeckDiscovery'

import { useVisionDeckDiscard } from './useVisionDeckDiscard'

type Props = {
  key: string
}

export const useLocate = ({ key }: Props) => {
  const { drawPileSize, drawPileTopCard, drawPileRefillCards } = useVisionDeck()
  const { discardDone, discardCard, discardVisionCard } = useVisionDeckDiscard({
    key,
  })
  const { discoveryDone, discoveryCard, discoveryMarked, discoverVisionCard } =
    useVisionDeckDiscovery({ key })

  const shouldDisplayDiscard =
    !discoveryDone && (discardDone || (!discardCard && drawPileSize > 1))
  const shouldDisplayDiscovery =
    !discardDone && (discoveryDone || (!discoveryDone && drawPileSize === 1))

  const handleDiscard = useCallback(
    () => discardVisionCard(),
    [discardVisionCard],
  )

  const handleDiscover = useCallback(
    () => discoverVisionCard(),
    [discoverVisionCard],
  )

  return {
    shouldDisplayDiscard,
    shouldDisplayDiscovery,
    render: () => (
      <>
        {shouldDisplayDiscard && (
          <ul>
            <li>
              Remove the marker from{' '}
              <VisionCardBadge card={discardCard || drawPileTopCard} />
              <Box mt="1">
                <ExecuteButton done={discardDone} onClick={handleDiscard} />
              </Box>
            </li>
          </ul>
        )}
        {shouldDisplayDiscovery && (
          <ul>
            <li>
              Place a <Keyword.Totem /> on a inner forest adjacent to{' '}
              <VisionCardBadge card={discoveryCard || drawPileTopCard} /> with
              the largest Woodwalker Warband. If no Woodwalker Warband is
              adjacent, place it on the inner forest closest to a Woodwalker
              Warband (prioritizing the larger one). If there are multiple equal
              options, use the <Keyword.MagicDie />.
            </li>

            <li>
              Remove marker from{' '}
              <VisionCardBadge card={discoveryCard || drawPileTopCard} />.
            </li>
            <li>
              Place markers on{' '}
              {(discoveryMarked || drawPileRefillCards).map((card) => (
                <VisionCardBadge key={card[0]} card={card} />
              ))}{' '}
              mountains.
            </li>
            <li>
              <Strong>End bot&apos;s turn.</Strong>
            </li>

            <li style={{ listStyleType: 'none' }}>
              <Box mt="1">
                <ExecuteButton done={discoveryDone} onClick={handleDiscover} />
              </Box>
            </li>
          </ul>
        )}
      </>
    ),
  }
}
