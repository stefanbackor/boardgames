import { Box, Flex } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { WagerAttackCardButton } from '~/components/ironbot/WagerAttackCardButton'
import { Keyword } from '~/components/KeywordButton'
import { IBStance } from '~/constants/ironbot'
import { WagerCardPurpose } from '~/hooks/ironbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

export const Forge = () => {
  const [stance] = useLocationState('ironbot_action_stance')
  const [crystals, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useLocationState('ironbot_expended_forge_action_done')

  const onExecuteAggressive = useCallback(() => {
    setCrystals((crystals) => Math.max(crystals - 1, 0))
    setDone(true)
  }, [setCrystals, setDone])

  const onExecuteDefensive = useCallback(() => {
    setCrystals((crystals) => Math.max(crystals - 5, 0))
    setDone(true)
  }, [setCrystals, setDone])

  const onExecuteExpansive = useCallback(() => {
    setCrystals((crystals) => Math.max(crystals - 1, 0))
    setDone(true)
  }, [setCrystals, setDone])

  return (
    <>
      {stance === IBStance.AGGRESSIVE && (
        <Box>
          <Keyword.Ironbot /> spends 1 <Keyword.Crystal /> to{' '}
          <Keyword.IronbotRecruits count="1" />{' '}
          <Keyword.IroncladWarrior count="1" />, then <Keyword.IronbotAttacks />{' '}
          (if able).
          <Flex mt="2" gap="2">
            <ExecuteButton
              disabled={crystals < 1}
              done={done}
              onClick={onExecuteAggressive}
            />
            &
            <WagerAttackCardButton purpose={WagerCardPurpose.ATTACK_FORGE} />
          </Flex>
        </Box>
      )}
      {stance === IBStance.DEFENSIVE && (
        <Box>
          {crystals >= 5 ? (
            <>
              <Keyword.Ironbot />
              spends 5 <Keyword.Crystal /> and flips a controlled{' '}
              <Keyword.Foundation /> to the <Keyword.Forge /> side (if able)
              <Box mt="2">
                <ExecuteButton done={done} onClick={onExecuteDefensive} />
              </Box>
            </>
          ) : (
            <>
              <Keyword.Ironbot /> <Keyword.IronbotRecruits count="1" />{' '}
              <Keyword.IroncladWarrior count="1" />.
            </>
          )}
        </Box>
      )}
      {stance === IBStance.EXPANSIVE && (
        <Box>
          <Keyword.Ironbot /> spends 1 <Keyword.Crystal /> to{' '}
          <Keyword.IronbotRecruits count="1" />{' '}
          <Keyword.IroncladWarrior count="1" />, then moves to{' '}
          <Keyword.Expand />.
          <Box mt="2">
            <ExecuteButton
              disabled={crystals < 1}
              done={done}
              onClick={onExecuteExpansive}
            />
          </Box>
        </Box>
      )}
    </>
  )
}
