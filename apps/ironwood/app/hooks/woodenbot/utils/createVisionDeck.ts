import { Decker } from '@repo/decker'

import {
  WBVisionPile,
  WW_VISION_CARDS_INSIDE,
  WW_VISION_CARDS_OUTSIDE,
  WWVisionCard,
} from '~/constants/woodenbot'

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
    deck.shuffle(WBVisionPile.DRAW)
    deck.shuffle(WBVisionPile.DISCARD)
  }

  return deck
}
