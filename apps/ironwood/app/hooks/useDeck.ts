import { Decker } from '@repo/decker'
import shuffle from 'lodash/shuffle'
import { useCallback, useEffect, useRef, useState } from 'react'

import { createIronbotDeck } from '~/utils/deck/createIronbotDeck'
import { createWoodenbotDeck } from '~/utils/deck/createWoodenbotDeck'
import { loadDeck } from '~/utils/deck/loadDeck'

import { Bot, IWCard, Pile } from '../utils/state/types'
import { useLocationState } from '../utils/state/useLocationState'
import { useGameParams } from './useGameParams'

export const PILE_PAIRS = [
  [Pile.ACTION1_SPECIAL, Pile.ACTION1_BASE],
  [Pile.ACTION2_SPECIAL, Pile.ACTION2_BASE],
  [Pile.ACTION3_SPECIAL, Pile.ACTION3_BASE],
]

/**
 * Helper function to draw random card from a hand piles to destination pile.
 * Prioritizes "priority hand" for cards put on top of the deck, otherwise
 * randomly pick from "base" or "special" hand piles.
 * @param deck
 * @param destPileSpecial
 * @param destPileBase
 * @returns card
 */
const drawFromHand = (
  deck: Decker<IWCard, Pile>,
  destPileSpecial: Pile,
  destPileBase: Pile,
) => {
  let card
  if (deck.size(Pile.HAND_SPECIAL_PRIORITY) > 0) {
    // Get a card from "top" of the hand.
    card = deck.draw(Pile.HAND_SPECIAL_PRIORITY, destPileSpecial)
  } else {
    // Randomly draw from special or base hand.
    shuffle([
      () => deck.draw(Pile.HAND_SPECIAL, destPileSpecial),
      () => deck.draw(Pile.HAND_BASE, destPileBase),
    ]).every((fn) => {
      const cardDrawn = fn()
      card = cardDrawn
      return !cardDrawn
    })
  }
  return card || null
}

/**
 * Helper providing deck state and actions.
 * @returns
 */
export const useDeck = () => {
  const { botId } = useGameParams()

  const [cardsJSON, setCardsJSON] = useLocationState('cards')

  const roundActionDoneRef = useRef<Array<boolean>>([])

  const [deck, setDeck] = useState<Decker<IWCard, Pile>>(
    cardsJSON
      ? loadDeck(cardsJSON)
      : botId === Bot.WOODENBOT
      ? createWoodenbotDeck()
      : createIronbotDeck(),
  )

  useEffect(() => {
    if (cardsJSON) {
      setDeck(loadDeck(cardsJSON))
    }
  }, [cardsJSON])

  const deckCommit = useCallback(() => {
    setCardsJSON(deck.export())
  }, [deck, setCardsJSON])

  return {
    // Deck state
    // TODO: Provide specific action with pre-filtered state
    deck,

    // Game actions

    /**
     * Prepare cards for around. Draw 2 cards from the draw pile, then shuffle the hand.
     * Using a ref to ensure this only runs once per render and history state to prevent
     * drawing after refresh.
     */
    prepareRoundCards: useCallback(
      (draws: number) => {
        for (let i = 0; i < draws; i++) {
          deck.draw(Pile.DRAW_SPECIAL, Pile.HAND_SPECIAL)
        }
        deck.shuffle(Pile.HAND_SPECIAL)
        deck.shuffle(Pile.HAND_BASE)

        deckCommit()
      },
      [deck, deckCommit],
    ),

    /**
     * Cleanup piles after round ends. Reshuffle base cards back
     * to base hand. Discard special cards from all action piles.
     */
    cleanupRoundCards: useCallback(() => {
      // Restore all base cards back to hand.
      deck.reshuffle(Pile.DISCARD_BASE, Pile.HAND_BASE)
      deck.reshuffle(Pile.ACTION1_BASE, Pile.HAND_BASE)
      deck.reshuffle(Pile.ACTION2_BASE, Pile.HAND_BASE)
      deck.reshuffle(Pile.ACTION3_BASE, Pile.HAND_BASE)

      // Discard all special action cards.
      deck.discard(Pile.ACTION1_SPECIAL, Pile.DISCARD_SPECIAL)
      deck.discard(Pile.ACTION2_SPECIAL, Pile.DISCARD_SPECIAL)
      deck.discard(Pile.ACTION3_SPECIAL, Pile.DISCARD_SPECIAL)

      deckCommit()
    }, [deck, deckCommit]),

    /**
     * Draw a card from the draw pile to hand.
     */
    drawCard: useCallback(() => {
      deck.draw(Pile.DRAW_SPECIAL, Pile.HAND_SPECIAL)
      deckCommit()
    }, [deck, deckCommit]),

    /**
     * Draw a card from the draw pile to the top of hand.
     */
    drawCardToTop: useCallback(() => {
      deck.draw(Pile.DRAW_SPECIAL, Pile.HAND_SPECIAL_PRIORITY)
      deckCommit()
    }, [deck, deckCommit]),

    /**
     * Expend a card from hand to a pair of action piles.
     * @param actionId
     * @param once
     * @returns card | undefined
     */
    expendCard: useCallback(
      (actionId: string, once = true) => {
        const actionIndex = parseInt(actionId) - 1

        const destPileSpecial = PILE_PAIRS[actionIndex][0]
        const destPileBase = PILE_PAIRS[actionIndex][1]

        if (
          once &&
          (roundActionDoneRef.current[actionIndex] ||
            deck.size(destPileSpecial) ||
            deck.size(destPileBase))
        ) {
          return
        }

        drawFromHand(deck, destPileSpecial, destPileBase)

        deckCommit()
        roundActionDoneRef.current.splice(actionIndex, 1, true)
      },
      [deck, deckCommit],
    ),

    /**
     * Wager a card for combat from hand to a discard pile. Null if no cards left.
     */
    wagerCard: useCallback(() => {
      const card = drawFromHand(deck, Pile.DISCARD_SPECIAL, Pile.DISCARD_BASE)
      deckCommit()

      return card
    }, [deck, deckCommit]),
  }
}
