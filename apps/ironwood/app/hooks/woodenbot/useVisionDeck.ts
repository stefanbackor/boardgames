import { Decker } from '@repo/decker'
import { useCallback, useEffect, useState } from 'react'

import { WBVisionPile, WWVisionCard } from '~/constants/woodenbot'
import { useLocationState } from '~/utils/state/useLocationState'

import { createVisionDeck } from './utils/createVisionDeck'

export const useVisionDeck = () => {
  const [cardsJSON, setCardsJSON] = useLocationState('woodenbot_vision_cards')

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
  }
}
