import { Box, Strong } from '@radix-ui/themes'
import { useCallback } from 'react'

import { IBTurnProcedure } from '~/constants/ironbot'
import { useTurnProcedure } from '~/hooks/ironbot/useTurnProcedure'
import { useActionDone } from '~/hooks/useActionDone'
import { useLocationState } from '~/utils/state/useLocationState'

import { ExecuteButton } from '../ExecuteButton'
import { Keyword } from '../KeywordButton'

export const RoundActionAlertDefensive = () => {
  const [crystals, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useActionDone('defensive/alert')
  const { setNextTurnProcedure } = useTurnProcedure()

  const onExecute = useCallback(() => {
    setCrystals((crystals) => Math.max(crystals - 5, 0))
    setNextTurnProcedure(IBTurnProcedure.EXHAUSTED)
    setDone()
  }, [setNextTurnProcedure, setDone, setCrystals])

  return (
    <>
      {crystals > 4 || done ? (
        <li>
          <Keyword.Ironbot /> spends 5 <Keyword.Crystal /> to flip the
          controlled <Keyword.Foundation /> to <Keyword.Forge />.{' '}
          <Strong>End bot&apos;s turn.</Strong>
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
