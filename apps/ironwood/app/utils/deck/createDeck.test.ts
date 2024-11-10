import { WW_CARDS_BASE, WW_CARDS_SPECIAL } from '~/constants/woodenbot'

import { Pile } from '../state/types'
import { createDeck } from './createDeck'

describe('createDeck', () => {
  it('should create a deck with base and shuffled special cards', () => {
    const deck = createDeck(WW_CARDS_BASE, WW_CARDS_SPECIAL)
    expect(deck.size(Pile.HAND_BASE)).toBe(WW_CARDS_BASE.length)
    expect(deck.size(Pile.DRAW_SPECIAL)).toBe(WW_CARDS_SPECIAL.length)
    expect(deck.get(Pile.HAND_BASE)).toEqual(WW_CARDS_BASE)
    expect(deck.get(Pile.DRAW_SPECIAL)).not.toEqual(WW_CARDS_SPECIAL)
  })
})
