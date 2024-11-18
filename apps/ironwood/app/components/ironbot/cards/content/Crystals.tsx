import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { useLocationState } from '~/utils/state/useLocationState'

export const Crystals = () => {
  const [, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useLocationState(
    'ironbot_expended_crystals_action_done',
  )

  const onExecute = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
    setDone(true)
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
