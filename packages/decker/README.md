# Card Deck management tool

Card deck management tool build around concept of piles. No card is ever in a void.

## Usage

```js
const deck = new Decker()

deck.createPile('draw', ['Ace of spades', 'King of hearts', 'Joker'])
deck.createPile('hand')
deck.createPile('discard')

deck.shuffle('draw')

const card = deck.draw('draw', 'hand')
console.log(card)
```
