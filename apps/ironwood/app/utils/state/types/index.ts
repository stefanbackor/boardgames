import { IBAction, ICCard } from '~/constants/ironbot'
import { WBAction, WWCard } from '~/constants/woodenbot'

import { LocationState as IronBotLocationState } from './ironbot'
import { LocationState as WoodenbotLocationState } from './woodenbot'

export type IWCard = WWCard | ICCard
export type IWCardAction = WBAction | IBAction

export enum Bot {
  IRONBOT = 'ironbot',
  WOODENBOT = 'woodenbot',
}

/**
 * Cards flow for game of Ironwood can be described with several piles. In general we
 * have "special" and "base" piles of cards. Base cards are always reshuffled back to
 * the hand at the end of the each round.
 */
export enum Pile {
  ACTION1_BASE = 'action1_base', // Acton 1 pile for base cards.
  ACTION1_SPECIAL = 'action1', // Action 1 pile for special cards.
  ACTION2_BASE = 'action2_base',
  ACTION2_SPECIAL = 'action2',
  ACTION3_BASE = 'action3_base',
  ACTION3_SPECIAL = 'action3',
  DISCARD_BASE = 'discard_base', // Discard pile for base cards. Will be reshuffled back to hand_base on round end.
  DISCARD_SPECIAL = 'discard', // Discard pile for special cards.
  DRAW_SPECIAL = 'draw', // Draw pile with special cards only.
  HAND_BASE = 'hand_base', // Hand pile with base cards only.
  HAND_SPECIAL = 'hand', // Hand pile with special cards only.
  HAND_SPECIAL_PRIORITY = 'hand_primary', // Priority pile to draw to when instructed to put card on top of the bot's hand.
}

/**
 * App state is stored in `window.history.state` object. This allows us to use browser "back"
 * navigation to restore the state of the app from previous step. Some keys are carried over
 * to the next page via `<LocationStateLink />` component.
 */
export type LocationState = {
  // Carried over state
  cards: string // `Decker` JSON export
  crystals: number // Current number of crystals for each bot.
  difficulty: number // Current difficulty for each bot.
  // Page-only state
  round_preparation_done: boolean // Flag to indicate that round preparation was done.
  round_action_done: boolean
  round_end_done: boolean
  round_end_recruitment_done?: boolean // Flag to indicate that bot has recruited warriors for crystals.
  round_end_recruitment_crystals?: number // Number of crystals used for recruitment.

  roller?: string // `DiceRoller` JSON export as a state of Magic die rolls.
  combat_defend_card?: IWCard | null // Current combat card for defense.
  no_change_crystals_done?: boolean // Flag to indicate that no change to game state (crystal gain) was done.
} & WoodenbotLocationState &
  IronBotLocationState
