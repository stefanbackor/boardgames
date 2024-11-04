import { Decker } from '@repo/decker'

import { IWCard, Pile } from '~/utils/state/types'

/**
 * Create Decker deck with base and special cards and
 * a custom callback for reshuffling the deck.
 * @param exportJSON
 * @returns
 */
export const createDeck = (
  cardsBase: Array<IWCard>,
  cardsSpecial: Array<IWCard>,
  exportJSON?: string,
) => {
  const deck = new Decker<IWCard, Pile>((pile, deck) => {
    // Main deck is empty, reshuffle discard pile.
    if (pile === Pile.DRAW_SPECIAL) {
      deck.reshuffle(Pile.DISCARD_SPECIAL, Pile.DRAW_SPECIAL)
    }
  })

  if (exportJSON) {
    deck.import(exportJSON)
  } else {
    deck.createPile(Pile.HAND_BASE, cardsBase)
    deck.createPile(Pile.DRAW_SPECIAL, cardsSpecial)
    deck.shuffle(Pile.DRAW_SPECIAL)
  }

  return deck
}
