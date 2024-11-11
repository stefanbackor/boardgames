import { Decker } from '@repo/decker'

import { IWCard, Pile } from '../state/types'

/**
 * Handler to determine refill strategy called when any
 * `Decker` pile gets empty.
 * @param pile
 * @param deck
 */
export function emptyPileHandler(pile: Pile, deck: Decker<IWCard, Pile>) {
  // Main deck is empty, reshuffle discard pile.
  if (pile === Pile.DRAW_SPECIAL) {
    deck.reshuffle(Pile.DISCARD_SPECIAL, Pile.DRAW_SPECIAL)
  }
}
