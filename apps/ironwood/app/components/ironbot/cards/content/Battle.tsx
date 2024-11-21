import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { IBTurnProcedure } from '~/constants/ironbot'
import { useTurnProcedure } from '~/hooks/ironbot/useTurnProcedure'
import { WagerCardPurpose } from '~/hooks/ironbot/useWagerCard'
import { useDeck } from '~/hooks/useDeck'

import { WagerAttackCardButton } from '../../WagerAttackCardButton'

export const Battle = () => {
  const { drawCardToTop, wagerCard } = useDeck()
  const { turnProcedure, setTurnProcedure } = useTurnProcedure()

  const onExecute = useCallback(() => {
    drawCardToTop()
    wagerCard()
    setTurnProcedure(IBTurnProcedure.ALERT)
  }, [drawCardToTop, wagerCard, setTurnProcedure])

  return (
    <>
      {turnProcedure === IBTurnProcedure.ALERT ? (
        <Box>
          <Keyword.Ironbot /> moves to <Keyword.Chase />, then{' '}
          <Keyword.IronbotAttacks purpose={WagerCardPurpose.ATTACK_BATTLE} />{' '}
          (if able).
          <Box mt="2">
            <WagerAttackCardButton purpose={WagerCardPurpose.ATTACK_BATTLE} />
          </Box>
        </Box>
      ) : (
        <Box>
          Draw 1 <Keyword.Card /> for <Keyword.Ironbot /> and put it on top of
          its hand. Then, discard this card, flip the Turn Procedure card to its
          Alert side and evaluate it again.
          <Box mt="2">
            <ExecuteButton onClick={onExecute} />
          </Box>
        </Box>
      )}
    </>
  )
}
