import { Decker } from '@repo/decker'

import { IWCard, Pile } from '~/utils/state/types'

import { emptyPileHandler } from './emptyPileHandler'

/**
 * Create Decker deck with base and special cards and
 * a custom callback for reshuffling the deck.
 * @param exportJSON
 * @returns
 */
export const createDeck = (
  cardsBase: Array<IWCard>,
  cardsSpecial: Array<IWCard>,
) => {
  const deck = new Decker<IWCard, Pile>(emptyPileHandler)

  deck.createPile(Pile.HAND_BASE, cardsBase)
  deck.createPile(Pile.DRAW_SPECIAL, cardsSpecial)
  deck.shuffle(Pile.DRAW_SPECIAL)

  return deck
}
