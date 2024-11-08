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

  const [stance] = useLocationState('woodenbot_action_stance')

  const handleCheck = useCallback(
    (event: React.SyntheticEvent) => {
      if (botId === Bot.WOODENBOT && !stance) {
        event.preventDefault()
        setAlert('Pick a stance first!')
      }
    },
    [botId, stance],
  )

  /**
   * Woodenbot expends card for each action.
   */
  useEffect(() => {
    if (botId === Bot.WOODENBOT && actionId) {
      expendCard(actionId)
    }
  }, [actionId, expendCard, botId])

  return { alert, handleCheck, resetAlert }
}
