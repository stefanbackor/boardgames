import { useCallback } from 'react'

import { IBTurnProcedure } from '~/constants/ironbot'
import { useGameParams } from '~/hooks/useGameParams'
import { useLocationState } from '~/utils/state/useLocationState'

/**
 * Return current "turn procedure" for Ironbot and a function to  set the next
 * "turn procedure".
 * @returns
 */
export const useTurnProcedure = () => {
  const { actionId } = useGameParams()

  const [turnProcedure, setTurnProcedure] = useLocationState(
    actionId === '1'
      ? 'ironbot_1_turn_procedure'
      : actionId === '2'
        ? 'ironbot_2_turn_procedure'
        : 'ironbot_3_turn_procedure',
  )
  const [, setNextTurnProcedure] = useLocationState(
    actionId === '1'
      ? 'ironbot_2_turn_procedure'
      : actionId === '2'
        ? 'ironbot_3_turn_procedure'
        : 'ironbot_1_turn_procedure',
  )

  const flipNextTurnProcedure = useCallback(() => {
    setNextTurnProcedure(
      turnProcedure === IBTurnProcedure.ALERT
        ? IBTurnProcedure.EXHAUSTED
        : IBTurnProcedure.ALERT,
    )
  }, [setNextTurnProcedure, turnProcedure])

  return {
    /** Current action's turn procedure */
    turnProcedure,
    /** Set current action's turn procedure */
    setTurnProcedure,
    /** Set next action's turn procedure */
    setNextTurnProcedure,
    /** Flip the next action's turn procedure to the opposite */
    flipNextTurnProcedure,
  }
}
