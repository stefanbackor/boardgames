import { useCallback, useEffect, useState } from 'react'

import { Bot } from '~/utils/state/types'
import { useLocationState } from '~/utils/state/useLocationState'

import { useDeck } from '../useDeck'
import { useGameParams } from '../useGameParams'

export const useCheckActionComplete = () => {
  const { botId, actionId } = useGameParams()

  const [alert, setAlert] = useState('')
  const resetAlert = useCallback(() => setAlert(''), [])

  const { expendCard } = useDeck()

  const [stance] = useLocationState(
    botId === Bot.WOODENBOT
      ? 'woodenbot_action_stance'
      : 'ironbot_action_stance',
  )

  const handleCheck = useCallback(
    (event: React.SyntheticEvent) => {
      if (!stance) {
        event.preventDefault()
        setAlert('Pick a stance first!')
      }
    },
    [stance],
  )

  /**
   * Woodenbot expends card for each action.
   */
  useEffect(() => {
    if (actionId) {
      expendCard(actionId)
    }
  }, [actionId, expendCard, botId])

  return { alert, handleCheck, resetAlert }
}
