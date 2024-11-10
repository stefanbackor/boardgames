import { Pile } from '../state/types'
import { createWoodenbotDeck } from './createWoodenbotDeck'

describe('createWoodenbotDeck', () => {
  it('should create a starting woodenbot deck', () => {
    const deck = createWoodenbotDeck()
    expect(deck.size(Pile.HAND_BASE)).toBe(3)
    expect(deck.size(Pile.HAND_SPECIAL)).toBe(0)
    expect(deck.size(Pile.DRAW_SPECIAL)).toBe(35)
    expect(deck.size(Pile.DISCARD_BASE)).toBe(0)
    expect(deck.size(Pile.DISCARD_SPECIAL)).toBe(0)
  })
})
