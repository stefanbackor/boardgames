import { Decker } from '@repo/decker'
import { useCallback, useEffect, useState } from 'react'

import {
  WBVisionLocatePurpose,
  WBVisionPile,
  WWVisionCard,
} from '~/constants/woodenbot'
import { useLocationState } from '~/utils/state/useLocationState'

import { createVisionDeck } from './utils/createVisionDeck'

type Props = {
  purpose?: WBVisionLocatePurpose
}

export const useVisionDeck = (props?: Props) => {
  const { purpose } = props || {}
  const [cardsJSON, setCardsJSON] = useLocationState('woodenbot_vision_cards')

  // Discard state
  const [discardDone, setDiscardDone] = useLocationState(
    purpose === WBVisionLocatePurpose.CARD_EYE
      ? 'woodenbot_vision_discard_eye_card_done'
      : 'woodenbot_vision_discard_done',
  )
  const [discardCard, setDiscardCard] = useLocationState(
    purpose === WBVisionLocatePurpose.CARD_EYE
      ? 'woodenbot_vision_discard_eye_card_card'
      : 'woodenbot_vision_discard_card',
  )

  const [deck, setDeck] = useState<Decker<WWVisionCard, WBVisionPile>>(
    createVisionDeck(cardsJSON),
  )

  useEffect(() => {
    setDeck(createVisionDeck(cardsJSON))
  }, [cardsJSON])

  const deckCommit = useCallback(() => {
    setCardsJSON(deck.export())
  }, [deck, setCardsJSON])

  return {
    deck,
    deckCommit,
    drawPile: deck.get(WBVisionPile.DRAW),
    drawPileSize: deck.size(WBVisionPile.DRAW),
    drawPileTopCard: deck.peek(WBVisionPile.DRAW),
    drawPileRefillCards: Array(5 - (deck.size(WBVisionPile.DRAW) - 1))
      .fill(null)
      .map((_value, index) => deck.peekAt(WBVisionPile.DISCARD, index))
      .filter(Boolean) as WWVisionCard[],

    // Game setup
    prepareGameVisionCards: useCallback(() => {
      deckCommit()
    }, [deckCommit]),

    // Card action "EYE".
    discardPileTopCard: deck.peek(WBVisionPile.DISCARD),
    /**
     * Shuffle top vision card from the discard pile back to the draw pile.
     */
    discardPileTopCardBackToDraw: useCallback(() => {
      const card = deck.draw(WBVisionPile.DISCARD, WBVisionPile.DRAW)
      deck.shuffle(WBVisionPile.DRAW)
      deckCommit()
      setDiscardDone(true)
      setDiscardCard(card)
    }, [deck, deckCommit, setDiscardCard, setDiscardDone]),

    // Flag to indicate if the discard has been done.
    discardDone,
    discardCard,
    /**
     * Discard a vision card by moving it from the draw pile to the discard pile.
     */
    discardVisionCard: useCallback(() => {
      const card = deck.discard(WBVisionPile.DRAW, WBVisionPile.DISCARD)
      deck.shuffle(WBVisionPile.DISCARD)
      deckCommit()
      setDiscardDone(true)
      setDiscardCard(card)
    }, [deck, deckCommit, setDiscardCard, setDiscardDone]),
  }
}
