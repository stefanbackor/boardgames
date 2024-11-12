import { IC_CARDS_BASE, IC_CARDS_SPECIAL } from '~/constants/ironbot'

import { createDeck } from './createDeck'

/**
 * Create Ironbot deck.
 * @param exportJSON
 * @returns
 */
export function createIronbotDeck() {
  return createDeck(IC_CARDS_BASE, IC_CARDS_SPECIAL)
}
