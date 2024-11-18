import { Box } from '@radix-ui/themes'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { IBTurnProcedure } from '~/constants/ironbot'
import { useTurnProcedure } from '~/hooks/ironbot/useTurnProcedure'

export const Battle = () => {
  const { turnProcedure } = useTurnProcedure()

  return (
    <>
      {turnProcedure === IBTurnProcedure.ALERT ? (
        <Box>
          <Keyword.Ironbot /> moves to <Keyword.Chase />, then{' '}
          <Keyword.IronbotAttacks /> (is able).
        </Box>
      ) : (
        <Box>
          Draw 1 <Keyword.Card /> for <Keyword.Ironbot /> and put it on top of
          its hand. Then, discard this card, flip the Turn Procedure card to its
          Alert side and evaluate it again.
          <Box mt="2">
            <ExecuteButton done={false} onClick={() => {}} />
          </Box>
        </Box>
      )}
    </>
  )
}
