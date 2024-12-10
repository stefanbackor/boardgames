import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { WBAction, WWCard } from '~/constants/woodenbot'
import { useCardActionDone } from '~/hooks/useCardActionDone'
import { useDeck } from '~/hooks/useDeck'
import { useLocationState } from '~/utils/state/useLocationState'

type Props = {
  card: WWCard
  red?: boolean
}

export const Card = ({ card, red }: Props) => {
  const { drawCardToTop } = useDeck()
  const [, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useCardActionDone(card, WBAction.CARD, red)

  const onExecute = useCallback(() => {
    drawCardToTop()
    setCrystals((crystals) => crystals + 1)
    setDone()
  }, [drawCardToTop, setCrystals, setDone])

  return (
    <Box>
      Draw 1 <Keyword.Card /> for <Keyword.Woodenbot /> and put it on the top of
      its hand. <Keyword.Woodenbot /> gains 1 <Keyword.Crystal />.
      <Box mt="2">
        <ExecuteButton done={done} onClick={onExecute} />
      </Box>
    </Box>
  )
}
