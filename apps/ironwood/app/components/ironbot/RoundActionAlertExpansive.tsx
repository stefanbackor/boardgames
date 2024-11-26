import { Box, Strong } from '@radix-ui/themes'
import { useCallback } from 'react'

import { IBTurnProcedure } from '~/constants/ironbot'
import { useTurnProcedure } from '~/hooks/ironbot/useTurnProcedure'
import { useLocationState } from '~/utils/state/useLocationState'

import { ExecuteButton } from '../ExecuteButton'
import { Expend } from '../Expend'
import { Keyword } from '../KeywordButton'

export const RoundActionAlertExpansive = () => {
  const [, setCrystals] = useLocationState('crystals')
  const { turnProcedure, setNextTurnProcedure } = useTurnProcedure()

  const [done, setDone] = useLocationState('ironbot_expansive_alert_done')

  const onExecuteAlert = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
    setNextTurnProcedure(IBTurnProcedure.EXHAUSTED)
    setDone(true)
  }, [setCrystals, setDone, setNextTurnProcedure])

  return (
    <>
      {turnProcedure === IBTurnProcedure.ALERT && (
        <>
          <li>
            <Keyword.Ironbot /> places a <Keyword.Foundation /> on an outer{' '}
            <Keyword.Mountain /> it controls with the largest{' '}
            <Keyword.IroncladWarband />. If successful, <Keyword.Ironbot />{' '}
            gains 1 <Keyword.Crystal />. <Strong>End bot&apos;s turn.</Strong>
            <Box mt="2">
              <ExecuteButton done={done} onClick={onExecuteAlert} />
            </Box>
          </li>
          <li>
            Otherwise follow the actions from expended card bellow:
            <Expend />
          </li>
        </>
      )}
    </>
  )
}
