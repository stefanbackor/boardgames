import { Decker } from '@repo/decker'
import { useCallback, useEffect, useState } from 'react'

import {
  WWVisionCard,
  WWVisionLocatePurpose,
  WWVisionPile,
} from '~/constants/woodenbot'
import { useLocationState } from '~/utils/state/useLocationState'

import { createVisionDeck } from './utils/createVisionDeck'

type Props = {
  purpose?: WWVisionLocatePurpose
}

export const useVisionDeck = (props?: Props) => {
  const { purpose } = props || {}
  const [cardsJSON, setCardsJSON] = useLocationState('woodenbot_vision_cards')

  // Discard state
  const [discardDone, setDiscardDone] = useLocationState(
    purpose === WWVisionLocatePurpose.CARD_EYE
      ? 'woodenbot_vision_discard_eye_card_done'
      : 'woodenbot_vision_discard_done',
  )
  const [discardCard, setDiscardCard] = useLocationState(
    purpose === WWVisionLocatePurpose.CARD_EYE
      ? 'woodenbot_vision_discard_eye_card_card'
      : 'woodenbot_vision_discard_card',
  )

  const [deck, setDeck] = useState<Decker<WWVisionCard, WWVisionPile>>(
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
    drawPile: deck.get(WWVisionPile.DRAW),
    drawPileSize: deck.size(WWVisionPile.DRAW),
    drawPileTopCard: deck.peek(WWVisionPile.DRAW),
    drawPileRefillCards: Array(5 - (deck.size(WWVisionPile.DRAW) - 1))
      .fill(null)
      .map((_value, index) => deck.peekAt(WWVisionPile.DISCARD, index))
      .filter(Boolean) as WWVisionCard[],

    // Game setup
    prepareGameVisionCards: useCallback(() => {
      deckCommit()
    }, [deckCommit]),

    // Card action "EYE".
    discardPileTopCard: deck.peek(WWVisionPile.DISCARD),
    /**
     * Shuffle top vision card from the discard pile back to the draw pile.
     */
    discardPileTopCardBackToDraw: useCallback(() => {
      const card = deck.draw(WWVisionPile.DISCARD, WWVisionPile.DRAW)
      deck.shuffle(WWVisionPile.DRAW)
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
      const card = deck.discard(WWVisionPile.DRAW, WWVisionPile.DISCARD)
      deck.shuffle(WWVisionPile.DISCARD)
      deckCommit()
      setDiscardDone(true)
      setDiscardCard(card)
    }, [deck, deckCommit, setDiscardCard, setDiscardDone]),
  }
}
