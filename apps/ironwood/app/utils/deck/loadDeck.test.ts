import { Pile } from '../state/types'
import { createIronbotDeck } from './createIronbotDeck'
import { loadDeck } from './loadDeck'

describe('loadDeck', () => {
  it('should load a deck from a JSON string', () => {
    const deck = createIronbotDeck()
    const deckJSON = deck.export()

    const anotherDeck = loadDeck(deckJSON)
    expect(anotherDeck).toBeDefined()
    expect(anotherDeck.size(Pile.HAND_BASE)).toBe(deck.size(Pile.HAND_BASE))
    expect(anotherDeck.size(Pile.DRAW_SPECIAL)).toBe(
      deck.size(Pile.DRAW_SPECIAL),
    )
  })
})
