import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { useDeck } from '~/hooks/useDeck'
import { useLocationState } from '~/utils/state/useLocationState'

export const Card = () => {
  const { drawCardToTop } = useDeck()
  const [, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useLocationState('ironbot_expended_card_action_done')

  const onExecute = useCallback(() => {
    drawCardToTop()
    setCrystals((crystals) => crystals + 1)
    setDone(true)
  }, [drawCardToTop, setCrystals, setDone])

  return (
    <Box>
      Draw 1 <Keyword.Card /> for <Keyword.Ironbot /> and put it on the top of
      its hand. <Keyword.Ironbot /> gains 1 <Keyword.Crystal />.
      <Box mt="2">
        <ExecuteButton done={done} onClick={onExecute} />
      </Box>
    </Box>
  )
}
