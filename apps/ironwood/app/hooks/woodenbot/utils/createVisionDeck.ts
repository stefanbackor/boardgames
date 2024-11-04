import { Decker } from '@repo/decker'

import {
  WW_VISION_CARDS_INSIDE,
  WW_VISION_CARDS_OUTSIDE,
  WWVisionCard,
  WWVisionPile,
} from '~/constants/woodenbot'

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
    deck.shuffle(WWVisionPile.DRAW)
    deck.shuffle(WWVisionPile.DISCARD)
  }

  return deck
}
