import { Decker } from '@repo/decker'

import {
  WW_VISION_CARDS_INSIDE,
  WW_VISION_CARDS_OUTSIDE,
  WWVisionCard,
  WWVisionPile,
} from '~/constants/woodenbot'
import { shuffle } from '~/utils/deck/shuffle'

/**
 * Create deck of Woodwalker Vision cards.
 * @param exportJSON
 * @returns
 */
export const createVisionDeck = (exportJSON?: string) => {
  const deck = new Decker<WWVisionCard, WWVisionPile>()

  if (exportJSON) {
    deck.import(exportJSON)
  } else {
    deck.createPile(WWVisionPile.DRAW, WW_VISION_CARDS_INSIDE)
    deck.createPile(WWVisionPile.DISCARD, WW_VISION_CARDS_OUTSIDE)
    shuffle(deck, WWVisionPile.DRAW)
    shuffle(deck, WWVisionPile.DISCARD)
  }

  return deck
}
