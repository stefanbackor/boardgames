import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { useDeck } from '~/hooks/useDeck'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../../keywords/KeywordButton'

export const Card = () => {
  const { drawCardToTop } = useDeck()
  const [crystals, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useLocationState(
    'woodenbot_expended_card_action_done',
  )

  const onExecute = useCallback(() => {
    drawCardToTop()
    setCrystals(crystals + 1)
    setDone(true)
  }, [crystals, drawCardToTop, setCrystals, setDone])

  return (
    <Box>
      Draw 1 <Keyword.Card /> for <Keyword.Woodenbot /> and put it on the top of
      its hand.
      <Keyword.Woodenbot /> gains 1 <Keyword.Crystal />.
      <Box>
        <ExecuteButton done={done} onClick={onExecute} />
      </Box>
    </Box>
  )
}
