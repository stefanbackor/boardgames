import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { IBAction } from '~/constants/ironbot'
import { useCardActionDone } from '~/hooks/useCardActionDone'
import { IWCard } from '~/utils/state/types'
import { useLocationState } from '~/utils/state/useLocationState'

type Props = {
  card: IWCard
  red?: boolean
}

export const Crystals = ({ card, red }: Props) => {
  const [, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useCardActionDone(card, IBAction.CRYSTALS, red)

  const onExecute = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
    setDone()
  }, [setCrystals, setDone])

  return (
    <Box>
      <Keyword.Ironbot /> gains 1 <Keyword.Crystal /> and moves{' '}
      <Keyword.Drill />
      <Box mt="2">
        <ExecuteButton done={done} onClick={onExecute} />
      </Box>
    </Box>
  )
}
