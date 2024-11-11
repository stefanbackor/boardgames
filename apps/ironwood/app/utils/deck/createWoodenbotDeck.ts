import { WW_CARDS_BASE, WW_CARDS_SPECIAL } from '~/constants/woodenbot'

import { createDeck } from './createDeck'

/**
 * Create Woodenbot deck.
 * @param exportJSON
 * @returns
 */
export function createWoodenbotDeck() {
  return createDeck(WW_CARDS_BASE, WW_CARDS_SPECIAL)
}
