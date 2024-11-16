import { useCallback } from 'react'

import {
  WWVisionCard,
  WWVisionLocatePurpose,
  WWVisionPile,
} from '~/constants/woodenbot'
import { shuffle } from '~/utils/deck/shuffle'
import { useLocationState } from '~/utils/state/useLocationState'

import { useVisionDeck } from './useVisionDeck'

type Props = {
  purpose: WWVisionLocatePurpose
}

export const useVisionDeckDiscovery = ({ purpose }: Props) => {
  const { deck, deckCommit } = useVisionDeck({ purpose })
  const [, setCrystals] = useLocationState('crystals')

  // Discovery state
  const [discoveryDone, setDiscoveryDone] = useLocationState(
    purpose === WWVisionLocatePurpose.CARD_SEARCH
      ? 'woodenbot_vision_discovery_search_card_done'
      : purpose === WWVisionLocatePurpose.CARD_EYE
      ? 'woodenbot_vision_discovery_eye_card_done'
      : 'woodenbot_vision_discovery_done',
  )
  const [discoveryCard, setDiscoveryCard] = useLocationState(
    purpose === WWVisionLocatePurpose.CARD_SEARCH
      ? 'woodenbot_vision_discovery_search_card_card'
      : purpose === WWVisionLocatePurpose.CARD_EYE
      ? 'woodenbot_vision_discovery_eye_card_card'
      : 'woodenbot_vision_discovery_card',
  )
  const [discoveryMarked, setDiscoveryMarked] = useLocationState(
    purpose === WWVisionLocatePurpose.CARD_SEARCH
      ? 'woodenbot_vision_discovery_search_card_marked'
      : purpose === WWVisionLocatePurpose.CARD_EYE
      ? 'woodenbot_vision_discovery_eye_card_marked'
      : 'woodenbot_vision_discovery_marked',
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
            .get(WWVisionPile.DRAW)
            .findIndex((card) => card[0] === name)
          card = deck.draw(
            WWVisionPile.DRAW,
            WWVisionPile.DISCOVERED,
            cardIndex,
          )
        } else {
          // Move a vision card from the draw pile to the discovered pile.
          card = deck.draw(WWVisionPile.DRAW, WWVisionPile.DISCOVERED)
        }

        // Refill the draw pile with discarded vision cards until it has 5 cards.
        Array(Math.max(0, 5 - deck.size(WWVisionPile.DRAW)))
          .fill(null)
          .map(() => deck.draw(WWVisionPile.DISCARD, WWVisionPile.DRAW))

        // Shuffle the draw pile.
        shuffle(deck, WWVisionPile.DRAW)

        // Commit the deck changes.
        deckCommit()

        if (card) {
          // If the card has crystals, add it to the bot's crystals.
          setCrystals((crystals) => crystals + card[1])

          // Set the discovery flag to true.
          setDiscoveryDone(true)
          setDiscoveryCard(card)
          setDiscoveryMarked(deck.get(WWVisionPile.DRAW))
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
