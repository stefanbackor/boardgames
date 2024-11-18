import { Box, Flex, Text } from '@radix-ui/themes'
import { useCallback } from 'react'

import { IBTurnProcedure } from '~/constants/ironbot'
import { useTurnProcedure } from '~/hooks/ironbot/useTurnProcedure'
import { WagerCardPurpose } from '~/hooks/ironbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

import { ExecuteButton } from '../ExecuteButton'
import { Keyword } from '../KeywordButton'
import { WagerAttackCardButton } from './WagerAttackCardButton'

export const RoundActionAlertAggressive = () => {
  const [crystals] = useLocationState('crystals')
  const [done, setDone] = useLocationState('ironbot_aggressive_alert_done')
  const { turnProcedure, flipTurnProcedure } = useTurnProcedure()

  const onExecute = useCallback(() => {
    flipTurnProcedure()
    setDone(true)
  }, [flipTurnProcedure, setDone])

  return (
    <>
      {turnProcedure === IBTurnProcedure.ALERT && (
        <>
          {crystals >= 5 && (
            <li>
              If <Keyword.Ironbot /> has 2 <Keyword.Forge />,{' '}
              <Text wrap="nowrap">
                5 <Keyword.Crystal />
              </Text>{' '}
              and a controlled <Keyword.Foundation />, spend the Crystals to
              flip the controlled <Keyword.Foundation /> to <Keyword.Forge />.{' '}
              End bot&apos;s turn.
              <br />
              <Box mt="2">
                <ExecuteButton label="Bot wins the game" onClick={() => {}} />
              </Box>
            </li>
          )}
          <li>
            {crystals >= 5 ? (
              <>
                Otherwise, it moves to <Keyword.Chase />, then{' '}
                <Keyword.IronbotAttacks /> (if able).
              </>
            ) : (
              <>
                <Keyword.Ironbot /> moves to <Keyword.Chase />, then{' '}
                <Keyword.IronbotAttacks /> (if able).
              </>
            )}

            <Flex mt="2" gap="2">
              <ExecuteButton done={done} onClick={onExecute} />
              &
              <WagerAttackCardButton
                purpose={WagerCardPurpose.ATTACK_AGGRESSIVE}
              />
            </Flex>
          </li>
        </>
      )}
    </>
  )
}
