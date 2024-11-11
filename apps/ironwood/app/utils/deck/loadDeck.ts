import { Decker } from '@repo/decker'

import { IWCard, Pile } from '../state/types'
import { emptyPileHandler } from './emptyPileHandler'

/**
 * Load deck from JSON string.
 * @param exportJSON
 * @returns
 */
export function loadDeck(exportJSON: string) {
  const deck = new Decker<IWCard, Pile>(emptyPileHandler)
  deck.import(exportJSON)

  return deck
}
