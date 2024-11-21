import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { IBTurnProcedure } from '~/constants/ironbot'
import { useTurnProcedure } from '~/hooks/ironbot/useTurnProcedure'
import { useLocationState } from '~/utils/state/useLocationState'

import { ExecuteButton } from '../ExecuteButton'
import { Keyword } from '../KeywordButton'

export const RoundActionAlertDefensive = () => {
  const [crystals, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useLocationState('ironbot_defensive_alert_done')
  const { setNextTurnProcedure } = useTurnProcedure()

  const onExecute = useCallback(() => {
    setCrystals((crystals) => Math.max(crystals - 5, 0))
    setNextTurnProcedure(IBTurnProcedure.EXHAUSTED)
    setDone(true)
  }, [setNextTurnProcedure, setDone, setCrystals])

  return (
    <>
      {crystals > 4 || done ? (
        <li>
          <Keyword.Ironbot /> spends 5 <Keyword.Crystal /> to flip the
          controlled <Keyword.Foundation /> to <Keyword.Forge />. End bot&apos;s
          turn.
          <Box mt="2">
            <ExecuteButton done={done} onClick={onExecute} />
          </Box>
        </li>
      ) : (
        <li>Ironbot needs 5 crystals to flip the controlled Foundation.</li>
      )}
    </>
  )
}
