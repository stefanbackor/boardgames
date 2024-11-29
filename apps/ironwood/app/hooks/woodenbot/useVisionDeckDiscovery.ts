import { useCallback } from 'react'

import { WBVisionPile, WWVisionCard } from '~/constants/woodenbot'
import { shuffle } from '~/utils/deck/shuffle'
import { useLocationState } from '~/utils/state/useLocationState'

import { useVisionDeck } from './useVisionDeck'

type Props = {
  key: string
}

export const useVisionDeckDiscovery = ({ key }: Props) => {
  const { deck, deckCommit } = useVisionDeck()
  const [, setCrystals] = useLocationState('crystals')

  // Discovery state
  const [discoveryDoneStore, setDiscoveryDoneStore] = useLocationState(
    'woodenbot_vision_discovery_done',
  )
  const discoveryDone = Boolean(discoveryDoneStore?.[key])
  const setDiscoveryDone = useCallback(
    () => setDiscoveryDoneStore((values) => ({ ...values, [key]: true })),
    [setDiscoveryDoneStore, key],
  )

  const [discoveryCardStore, setDiscoveryCardStore] = useLocationState(
    'woodenbot_vision_discovery_card',
  )
  const discoveryCard = discoveryCardStore?.[key]
  const setDiscoveryCard = useCallback(
    (card: WWVisionCard) =>
      setDiscoveryCardStore((values) => ({ ...values, [key]: card })),
    [setDiscoveryCardStore, key],
  )

  const [discoveryMarkedStore, setDiscoveryMarkedStore] = useLocationState(
    'woodenbot_vision_discovery_marked',
  )
  const discoveryMarked = discoveryMarkedStore?.[key]
  const setDiscoveryMarked = useCallback(
    (marked: Array<WWVisionCard>) =>
      setDiscoveryMarkedStore((values) => ({ ...values, [key]: marked })),
    [setDiscoveryMarkedStore, key],
  )

  return {
    // Flag to indicate if the discovery has been done.
    discoveryDone,
    discoveryCard,
    discoveryMarked,
    /**
     * Discover a vision card by drawing it from the deck and
     * moving it to the discovered pile.
     */
    discoverVisionCard: useCallback(
      (name?: string) => {
        let card: WWVisionCard | undefined
        if (name) {
          // Find the card by name in the draw pile.
          const cardIndex = deck
            .get(WBVisionPile.DRAW)
            .findIndex((card) => card[0] === name)
          card = deck.draw(
            WBVisionPile.DRAW,
            WBVisionPile.DISCOVERED,
            cardIndex,
          )
        } else {
          // Move a vision card from the draw pile to the discovered pile.
          card = deck.draw(WBVisionPile.DRAW, WBVisionPile.DISCOVERED)
        }

        // Refill the draw pile with discarded vision cards until it has 5 cards.
        Array(Math.max(0, 5 - deck.size(WBVisionPile.DRAW)))
          .fill(null)
          .map(() => deck.draw(WBVisionPile.DISCARD, WBVisionPile.DRAW))

        // Shuffle the draw pile.
        shuffle(deck, WBVisionPile.DRAW)

        // Commit the deck changes.
        deckCommit()

        if (card) {
          // If the card has crystals, add it to the bot's crystals.
          setCrystals((crystals) => crystals + card[1])

          // Set the discovery flag to true.
          setDiscoveryDone()
          setDiscoveryCard(card)
          setDiscoveryMarked(deck.get(WBVisionPile.DRAW))
        }
      },
      [
        deck,
        deckCommit,
        setCrystals,
        setDiscoveryCard,
        setDiscoveryDone,
        setDiscoveryMarked,
      ],
    ),
  }
}
