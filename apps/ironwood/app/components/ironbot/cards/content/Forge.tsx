import { Box, Flex } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { WagerAttackCardButton } from '~/components/ironbot/WagerAttackCardButton'
import { Keyword } from '~/components/KeywordButton'
import { IBAction, IBStance } from '~/constants/ironbot'
import { WagerCardPurpose } from '~/hooks/ironbot/useWagerCard'
import { useCardActionDone } from '~/hooks/useCardActionDone'
import { IWCard } from '~/utils/state/types'
import { useLocationState } from '~/utils/state/useLocationState'

type Props = {
  card: IWCard
}

export const Forge = ({ card }: Props) => {
  const [stance] = useLocationState('ironbot_action_stance')
  const [crystals, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useCardActionDone(card, IBAction.FORGE)

  const onExecuteAggressive = useCallback(() => {
    setCrystals((crystals) => Math.max(crystals - 1, 0))
    setDone()
  }, [setCrystals, setDone])

  const onExecuteDefensive = useCallback(() => {
    setCrystals((crystals) => Math.max(crystals - 5, 0))
    setDone()
  }, [setCrystals, setDone])

  const onExecuteExpansive = useCallback(() => {
    setCrystals((crystals) => Math.max(crystals - 1, 0))
    setDone()
  }, [setCrystals, setDone])

  return (
    <>
      {stance === IBStance.AGGRESSIVE && (
        <Box>
          <Keyword.Ironbot /> spends 1 <Keyword.Crystal /> to{' '}
          <Keyword.IronbotRecruits count="1" />{' '}
          <Keyword.IroncladWarrior count="1" />, then{' '}
          <Keyword.IronbotAttacks purpose={WagerCardPurpose.ATTACK_FORGE} /> (if
          able).
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
          <Keyword.Ironbot /> spends 5 <Keyword.Crystal /> and flips a
          controlled <Keyword.Foundation /> to the <Keyword.Forge /> side (if
          able) or <Keyword.Ironbot /> <Keyword.IronbotRecruits count="1" />{' '}
          <Keyword.IroncladWarrior count="1" />.
          <Box mt="2">
            <ExecuteButton done={done} onClick={onExecuteDefensive} />
          </Box>
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
