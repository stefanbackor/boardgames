import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { IBTurnProcedure } from '~/constants/ironbot'
import { useTurnProcedure } from '~/hooks/ironbot/useTurnProcedure'
import { useLocationState } from '~/utils/state/useLocationState'

import { ExecuteButton } from '../ExecuteButton'
import { Keyword } from '../KeywordButton'
import { Expend } from './Expend'

export const RoundActionAlertExpansive = () => {
  const [, setCrystals] = useLocationState('crystals')
  const { turnProcedure, setTurnProcedure } = useTurnProcedure()

  const [done, setDone] = useLocationState('ironbot_expansive_alert_done')

  const onExecuteAlert = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
    setTurnProcedure(IBTurnProcedure.EXHAUSTED)
    setDone(true)
  }, [setCrystals, setDone, setTurnProcedure])

  return (
    <>
      {turnProcedure === IBTurnProcedure.ALERT && (
        <>
          <li>
            <Keyword.Ironbot /> places a <Keyword.Foundation /> on an outer{' '}
            <Keyword.Mountain /> it controls with the largest{' '}
            <Keyword.IroncladWarband />. If successful, <Keyword.Ironbot />{' '}
            gains 1 <Keyword.Crystal />. End bot&apos;s turn.
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
