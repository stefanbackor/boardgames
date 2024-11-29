import {
  WBVisionPile,
  WW_VISION_CARDS_INSIDE,
  WW_VISION_CARDS_OUTSIDE,
} from '~/constants/woodenbot'

import { createVisionDeck } from './createVisionDeck'

describe('createVisionDeck', () => {
  it('should create a deck of vision cards', () => {
    const deck = createVisionDeck()
    expect(deck.size(WBVisionPile.DRAW)).toBe(WW_VISION_CARDS_INSIDE.length)
    expect(deck.size(WBVisionPile.DISCARD)).toBe(WW_VISION_CARDS_OUTSIDE.length)
  })
})
