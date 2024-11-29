import { WBStance, WWVisionCard } from '~/constants/woodenbot'

import { IWCard } from '.'

/**
 * Woodenbot specific keys stored in location state.
 */
export type LocationState = {
  woodenbot_action_stance?: WBStance // Current round action stance for Woodenbot.

  woodenbot_spirit_cubes: number // Current number of spirit cubes available for Woodenbot.
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

  woodenbot_vision_discard_done?: Record<string, boolean> // Flag to indicate that Woodenbot has discarded a vision card.
  woodenbot_vision_discard_card?: Record<string, WWVisionCard> // Current vision card discarded by Woodenbot.

  woodenbot_vision_discovery_done?: Record<string, boolean> // Flag to indicate that Woodenbot has discovered a vision card.
  woodenbot_vision_discovery_card?: Record<string, WWVisionCard> // Current vision card discovered by Woodenbot.
  woodenbot_vision_discovery_marked?: Record<string, Array<WWVisionCard>> // List of mountains/cards marked by refilling draw deck.
}
