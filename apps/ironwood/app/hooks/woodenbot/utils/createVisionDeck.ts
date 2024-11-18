import { Decker } from '@repo/decker'

import {
  WBVisionPile,
  WW_VISION_CARDS_INSIDE,
  WW_VISION_CARDS_OUTSIDE,
  WWVisionCard,
} from '~/constants/woodenbot'
import { shuffle } from '~/utils/deck/shuffle'

/**
 * Create deck of Woodwalker Vision cards.
 * @param exportJSON
 * @returns
 */
export const createVisionDeck = (exportJSON?: string) => {
  const deck = new Decker<WWVisionCard, WBVisionPile>()

  if (exportJSON) {
    deck.import(exportJSON)
  } else {
    deck.createPile(WBVisionPile.DRAW, WW_VISION_CARDS_INSIDE)
    deck.createPile(WBVisionPile.DISCARD, WW_VISION_CARDS_OUTSIDE)
    shuffle(deck, WBVisionPile.DRAW)
    shuffle(deck, WBVisionPile.DISCARD)
  }

  return deck
}
