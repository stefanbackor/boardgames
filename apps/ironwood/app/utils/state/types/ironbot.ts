import { IBStance, IBTurnProcedure } from '~/constants/ironbot'
import { WWVisionCard } from '~/constants/woodenbot'

import { IWCard } from '.'

export type LocationState = {
  ironbot_1_turn_procedure?: IBTurnProcedure // 1st turn "turn procedure" for Ironbot.
  ironbot_2_turn_procedure?: IBTurnProcedure // 2nd turn "turn procedure" for Ironbot.
  ironbot_3_turn_procedure?: IBTurnProcedure // 3rd turn "turn procedure" for Ironbot.
  ironbot_action_stance?: IBStance // Current round action stance for Ironbot.

  ironbot_attack_aggressive?: IWCard | null // Current combat card for "aggressive" stance in second step.
  ironbot_attack_compass_card?: IWCard | null // Current combat card for "compass" card action.
  ironbot_attack_forge_card?: IWCard | null // Current combat card for "forge" card action.
  ironbot_attack_hit_card?: IWCard | null // Current combat card for "hit" card action.

  ironbot_mountains_marked?: Array<WWVisionCard> // List of marked mountains based on vision cards being played, discarded, or burned.

  ironbot_aggressive_alert_done?: boolean // Flag to indicate that Ironbot has executed aggressive's stance action #1.
  ironbot_defensive_alert_done?: boolean // Flag to indicate that Ironbot has executed defensive's stance action #1.
  ironbot_expansive_alert_done?: boolean // Flag to indicate that Ironbot has executed expansive's stance action #1.
  ironbot_expended_crystals_action_done?: boolean // Flag to indicate that Ironbot has executed expended card's "crystals" action.
  ironbot_expended_card_action_done?: boolean // Flag to indicate that Ironbot has executed expended card's "card" action.
  ironbot_expended_forge_action_done?: boolean // Flag to indicate that Ironbot has executed expended card's "forge" action.
  ironbot_expended_unavailable_done?: boolean // Flag to indicate that Ironbot has executed expended card's "unavailable" action.
}
