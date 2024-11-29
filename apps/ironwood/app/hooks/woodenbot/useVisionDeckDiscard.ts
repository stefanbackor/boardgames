import { useCallback } from 'react'

import { WBVisionPile, WWVisionCard } from '~/constants/woodenbot'
import { shuffle } from '~/utils/deck/shuffle'
import { useLocationState } from '~/utils/state/useLocationState'

import { useVisionDeck } from './useVisionDeck'

type Props = {
  key: string
}

export const useVisionDeckDiscard = ({ key }: Props) => {
  const { deck, deckCommit } = useVisionDeck()

  const [discardDoneStore, setDiscardDoneStore] = useLocationState(
    'woodenbot_vision_discard_done',
  )
  const done = Boolean(discardDoneStore?.[key])
  const setDone = useCallback(
    () => setDiscardDoneStore((values) => ({ ...values, [key]: true })),
    [setDiscardDoneStore, key],
  )

  const [discardCardStore, setDiscardCardStore] = useLocationState(
    'woodenbot_vision_discard_card',
  )
  const card = discardCardStore?.[key]
  const setCard = useCallback(
    (card: WWVisionCard) =>
      setDiscardCardStore((values) => ({ ...values, [key]: card })),
    [setDiscardCardStore, key],
  )

  return {
    // Card action "EYE".
    discardPileTopCard: deck.peek(WBVisionPile.DISCARD),
    /**
     * Shuffle top vision card from the discard pile back to the draw pile.
     */
    discardPileTopCardBackToDraw: useCallback(() => {
      const card = deck.draw(WBVisionPile.DISCARD, WBVisionPile.DRAW)
      if (card) {
        shuffle(deck, WBVisionPile.DRAW)
        deckCommit()
        setCard(card)
      }
      setDone()
    }, [deck, deckCommit, setCard, setDone]),

    // Flag to indicate if the discard has been done.
    discardDone: done,
    discardCard: card,
    /**
     * Discard a vision card by moving it from the draw pile to the discard pile.
     */
    discardVisionCard: useCallback(() => {
      const card = deck.discard(WBVisionPile.DRAW, WBVisionPile.DISCARD)
      if (card) {
        shuffle(deck, WBVisionPile.DISCARD)
        deckCommit()
        setCard(card)
      }
      setDone()
    }, [deck, deckCommit, setCard, setDone]),
  }
}
