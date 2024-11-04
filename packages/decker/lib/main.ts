/**
 * A class to manage a deck of cards with multiple piles.
 * Default piles are DECK, HAND, and DISCARD.
 */
export class Decker<
  Card extends object,
  Pile extends string = 'deck' | 'hand' | 'discard',
> {
  private _piles: Partial<Record<Pile, Array<Card>>> = {}
  private _onEmptyPile?: (pile: Pile, deck: Decker<Card, Pile>) => void

  /**
   * Create a new instance of Decker. Optionally, you can pass a callback
   * function to handle empty piles when drawing cards.
   * @param onEmptyPile
   */
  constructor(onEmptyPile?: (pile: Pile, deck: Decker<Card, Pile>) => void) {
    if (onEmptyPile) this._onEmptyPile = onEmptyPile
  }

  /**
   * Create a pile of cards and fill it with cards from top to bottom.
   * @param pile
   * @param cards
   */
  createPile(pile: Pile, cards: Array<Card> = []) {
    this._piles[pile] = cards
    return this
  }

  /**
   * Draw first card from a pile using `shift` method and places it
   * on top of another pile using `unshift` method.
   * @param fromPile
   * @param toPile
   * @returns card
   */
  draw(
    fromPile: Pile,
    toPile: Pile,
    atIndex: number = 0,
    allowEmpty: boolean = false,
  ): Card | undefined {
    const card = this._getOrCreatePile(fromPile).splice(atIndex, 1)[0]

    if (!card && !allowEmpty && this._onEmptyPile) {
      this._onEmptyPile(fromPile, this)
      return this.draw(fromPile, toPile, atIndex, true)
    }

    if (card) this._getOrCreatePile(toPile).unshift(card)
    return card
  }

  /**
   * Draw a random card from a pile to another pile.
   * @param fromPile
   * @param toPile
   * @returns card
   */
  drawRandom(
    fromPile: Pile,
    toPile: Pile,
    allowEmpty: boolean = false,
  ): Card | undefined {
    const atIndex = Math.floor(
      Math.random() * (this._getOrCreatePile(fromPile).length || 0),
    )
    return this.draw(fromPile, toPile, atIndex, allowEmpty)
  }

  /**
   * Alias for `draw`
   * @param fromPile
   * @param toPile
   * @returns card
   */
  discard(fromPile: Pile, toPile: Pile) {
    return this.draw(fromPile, toPile)
  }

  /**
   * Shuffle a pile of cards.
   * @param pile
   */
  shuffle(pile: Pile) {
    this._piles[pile] = this._getOrCreatePile(pile)
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    return this
  }

  /**
   * Refill all cards from a pile and shuffle.
   * @param fromPile
   * @param toPile
   */
  reshuffle(fromPile: Pile, toPile: Pile) {
    this._piles[toPile] = this._getOrCreatePile(toPile).concat(
      this._getOrCreatePile(fromPile),
    )
    this._piles[fromPile] = []
    this.shuffle(toPile)
    return this
  }

  /**
   * Peak at the first card from a pile.
   * @param pile
   * @returns
   */
  peek(pile: Pile): Card | undefined {
    return this.peekAt(pile, 0)
  }

  /**
   * Peek at a card from a pile at a specific index.
   * @param pile
   * @param index
   * @returns
   */
  peekAt(pile: Pile, index: number): Card | undefined {
    return this._getOrCreatePile(pile)[index]
  }

  /**
   * Return pile contents.
   * @param pile
   * @returns
   */
  get(pile: Pile): Array<Card> {
    return this._getOrCreatePile(pile)
  }

  /**
   * Alias for `get`. Return pile contents.
   * @param pile
   * @returns
   */
  pile(pile: Pile): Array<Card> {
    return this.get(pile)
  }

  /**
   * Size of a pile.
   * @param pile
   * @returns
   */
  size(pile: Pile): number {
    return this._getOrCreatePile(pile).length || 0
  }

  /**
   * Import a pile of cards from a stringified JSON.
   * @param stringified
   */
  import(stringified: string) {
    this._piles = JSON.parse(stringified)
  }

  /**
   * Export a pile of cards to a stringified JSON.
   * @returns
   */
  export() {
    return JSON.stringify(this._piles)
  }

  /**
   * Log all piles as Object entries.
   * @returns
   */
  log() {
    return Object.entries(this._piles) as [Pile, Card[]][]
  }

  /**
   * Get or create a pile.
   * @param pile
   * @returns
   */
  private _getOrCreatePile(pile: Pile): Array<Card> {
    if (!(pile in this._piles)) this._piles[pile] = []
    return this._piles[pile]!
  }
}
