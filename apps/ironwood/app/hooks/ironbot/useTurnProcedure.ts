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

  const [turnProcedure] = useLocationState(
    actionId === '1'
      ? 'ironbot_1_turn_procedure'
      : actionId === '2'
      ? 'ironbot_2_turn_procedure'
      : 'ironbot_3_turn_procedure',
  )
  const [, setTurnProcedure] = useLocationState(
    actionId === '1'
      ? 'ironbot_2_turn_procedure'
      : actionId === '2'
      ? 'ironbot_3_turn_procedure'
      : 'ironbot_1_turn_procedure',
  )

  const flipTurnProcedure = useCallback(() => {
    console.log(
      'flipTurnProcedure',
      turnProcedure,
      actionId,
      turnProcedure === IBTurnProcedure.ALERT
        ? IBTurnProcedure.EXHAUSTED
        : IBTurnProcedure.ALERT,
      actionId === '1'
        ? 'ironbot_2_turn_procedure'
        : actionId === '2'
        ? 'ironbot_3_turn_procedure'
        : 'ironbot_1_turn_procedure',
    )
    setTurnProcedure(
      turnProcedure === IBTurnProcedure.ALERT
        ? IBTurnProcedure.EXHAUSTED
        : IBTurnProcedure.ALERT,
    )
  }, [actionId, setTurnProcedure, turnProcedure])

  return {
    turnProcedure,
    setTurnProcedure,
    flipTurnProcedure,
  }
}
