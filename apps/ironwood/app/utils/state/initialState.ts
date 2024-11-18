import { IBTurnProcedure } from '~/constants/ironbot'

import { LocationState } from './types'

export const initialState: LocationState = {
  cards: '',
  crystals: 0,
  difficulty: 0,
  round_preparation_done: false,
  round_action_done: false,
  round_end_done: false,
  // Woodenbot
  woodenbot_spirit_cubes: 0,
  woodenbot_vision_cards: '',
  // Ironbot
  ironbot_1_turn_procedure: IBTurnProcedure.ALERT,
  ironbot_2_turn_procedure: IBTurnProcedure.ALERT,
  ironbot_3_turn_procedure: IBTurnProcedure.ALERT,
}
