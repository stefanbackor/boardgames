import { Decker } from './main'

enum SUIT {
  HEARTS = 'HEARTS',
  DIAMONDS = 'DIAMONDS',
  CLUBS = 'CLUBS',
  SPADES = 'SPADES',
}

enum RANK {
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE',
}

const CARD_1 = { suit: SUIT.CLUBS, rank: RANK.ACE }
const CARD_2 = { suit: SUIT.DIAMONDS, rank: RANK.KING }
const CARD_3 = { suit: SUIT.HEARTS, rank: RANK.QUEEN }

describe('Decker', () => {
  describe('with piles `deck`, `hand`, and `discard`', () => {
    let deck: Decker<typeof CARD_1, 'deck' | 'hand' | 'discard'>

    beforeEach(() => {
      deck = new Decker<typeof CARD_1, 'deck' | 'hand' | 'discard'>()
    })

    it('should create a `deck` pile of cards, then draw from it', () => {
      deck.createPile('deck', [CARD_1, CARD_2, CARD_3])

      expect(deck.draw('deck', 'hand')).toBe(CARD_1)
      expect(deck.draw('deck', 'hand')).toBe(CARD_2)
      expect(deck.draw('deck', 'hand')).toBe(CARD_3)
      expect(deck.size('deck')).toEqual(0)
      expect(deck.size('hand')).toEqual(3)
    })

    it('should draw/discard card', () => {
      deck.createPile('deck', [CARD_1, CARD_2, CARD_3])

      expect(deck.size('hand')).toEqual(0)
      expect(deck.size('discard')).toEqual(0)
      deck.draw('deck', 'hand')
      expect(deck.size('hand')).toEqual(1)
      deck.discard('hand', 'discard')
      expect(deck.size('hand')).toEqual(0)
      expect(deck.size('discard')).toEqual(1)
    })

    it('should peek at the top card of a pile', () => {
      deck.createPile('deck', [CARD_1, CARD_2, CARD_3])

      expect(deck.peek('deck')).toBe(CARD_1)
    })

    it('should peek at the card at a specific index', () => {
      deck.createPile('deck', [CARD_1, CARD_2, CARD_3])
      deck.peekAt('deck', 1)
    })

    it('should shuffle a pile of cards', () => {
      deck.createPile('deck', [
        CARD_1,
        CARD_2,
        CARD_3,
        CARD_2,
        CARD_3,
        CARD_2,
        CARD_3,
        CARD_2,
        CARD_3,
        CARD_2,
        CARD_3,
        CARD_2,
        CARD_3,
      ])
      deck.shuffle('deck')
      expect(deck.peek('deck')).not.toBe(CARD_1)
    })

    it('should reshuffle from one pile to another', () => {
      deck.createPile('deck', [CARD_1])
      deck.createPile('hand', [CARD_2])
      deck.createPile('discard', [CARD_3])

      deck.reshuffle('hand', 'deck')
      deck.reshuffle('discard', 'deck')

      expect(deck.size('deck')).toEqual(3)
      expect(deck.size('hand')).toEqual(0)
      expect(deck.size('discard')).toEqual(0)
    })
  })

  it('should call custom callback when drawing from empty pile', () => {
    const onEmptyPile = jest.fn()
    const deck = new Decker(onEmptyPile)

    deck.createPile('deck', [CARD_1])
    deck.draw('deck', 'hand')
    deck.draw('deck', 'hand')
    deck.draw('deck', 'hand')

    expect(onEmptyPile).toHaveBeenCalledTimes(2)
  })

  it('should export and import state', () => {
    const deck = new Decker()
    deck.createPile('deck', [CARD_1, CARD_2, CARD_3])
    deck.draw('deck', 'hand')
    deck.draw('deck', 'hand')
    deck.draw('deck', 'hand')

    const state = deck.export()
    const newDeck = new Decker()
    newDeck.import(state)

    expect(newDeck.size('deck')).toEqual(0)
    expect(newDeck.size('hand')).toEqual(3)
  })
})
