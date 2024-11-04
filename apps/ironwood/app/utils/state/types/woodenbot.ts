import { WWStance, WWVisionCard } from '~/constants/woodenbot'

import { IWCard } from '../types'

/**
 * Woodenbot specific keys stored in location state.
 */
export type LocationState = {
  woodenbot_spirit_cubes: number // Current number of spirit cubes available for Woodenbot.
  woodenbot_difficulty: number // Current difficulty level for Woodenbot.
  woodenbot_vision_cards: string // `Decker` JSON export for vision cards.

  woodenbot_attack_disruptive?: IWCard | null // Current combat card for "disruptive" attack in second step.
  woodenbot_attack_arrows_card?: IWCard | null // Current combat card for "arrows" action card.
  woodenbot_attack_battle_card?: IWCard | null // Current combat card for "battle" action card.
  woodenbot_attack_crystals_card?: IWCard | null // Current combat card for "crystal" action card.

  woodenbot_spirit_cube_for_attack_disruptive_used?: boolean // Whether a spirit cube was used for modifiers on wagered attack card for "disruptive" attack in second step.
  woodenbot_spirit_cube_for_attack_arrows_used?: boolean // Whether a spirit cube was used for modifiers on wagered attack card for "arrows" action.
  woodenbot_spirit_cube_for_attack_battle_used?: boolean // Whether a spirit cube was used for modifiers on wagered attack card for "battle" action.
  woodenbot_spirit_cube_for_attack_crystals_used?: boolean // Whether a spirit cube was used for modifiers on wagered attack card for "crystals" action.
  woodenbot_spirit_cube_for_defense_used?: boolean // Whether a spirit cube was used for modifiers on wagered defense card.

  woodenbot_action_stance?: WWStance // Current game action stance for Woodenbot.

  woodenbot_vision_discard_done?: boolean // Flag to indicate that Woodenbot has discarded a vision card.
  woodenbot_vision_discard_card?: WWVisionCard // Current vision card discarded by Woodenbot.
  woodenbot_vision_discard_eye_card_done?: boolean
  woodenbot_vision_discard_eye_card_card?: WWVisionCard

  woodenbot_vision_discovery_done?: boolean // Flag to indicate that Woodenbot has discovered a vision card.
  woodenbot_vision_discovery_card?: WWVisionCard // Current vision card discovered by Woodenbot.
  woodenbot_vision_discovery_marked?: Array<WWVisionCard> // List of mountains/cards marked by refilling draw deck.
  woodenbot_vision_discovery_search_card_done?: boolean // Flag to indicate that Woodenbot has discovered a vision card as "search" card action.
  woodenbot_vision_discovery_search_card_card?: WWVisionCard // Current vision card discovered by Woodenbot as "search" card action.
  woodenbot_vision_discovery_search_card_marked?: Array<WWVisionCard> // List of mountains/cards marked by refilling draw deck as "search" card action.
  woodenbot_vision_discovery_eye_card_done?: boolean
  woodenbot_vision_discovery_eye_card_card?: WWVisionCard
  woodenbot_vision_discovery_eye_card_marked?: Array<WWVisionCard>

  woodenbot_round_end_recruitment_done?: boolean // Flag to indicate that Woodenbot has recruited warriors for crystals.
  woodenbot_round_end_recruitment_crystals?: number // Number of crystals used for recruitment.

  woodenbot_expended_alert_action_done?: boolean // Flag to indicate that Woodenbot has executed expended card's "alert" action.
  woodenbot_expended_card_action_done?: boolean // Flag to indicate that Woodenbot has executed expended card's "card" action.
  woodenbot_expended_crystals_action_done?: boolean // Flag to indicate that Woodenbot has executed expended card's "crystals" action.
  woodenbot_expended_cubes_action_done?: boolean // Flag to indicate that Woodenbot has executed expended card's "cubes" action.
  woodenbot_expended_eye_action_done?: boolean // Flag to indicate that Woodenbot has executed expended card's "eye" action.
  woodenbot_expended_shield_action_done?: boolean // Flag to indicate that Woodenbot has executed expended card's "shield" action.
  woodenbot_expended_unavailable_done?: boolean // Flag to indicate that Woodenbot has executed unavailable card action.
}
