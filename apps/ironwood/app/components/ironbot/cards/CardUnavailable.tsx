import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../../KeywordButton'

export const CardUnavailable = () => {
  const [, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useLocationState('ironbot_expended_unavailable_done')

  const onExecute = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
    setDone(true)
  }, [setCrystals, setDone])

  return (
    <Box>
      No card to expend, bot gains <Keyword.Crystal /> instead.
      <Box>
        <ExecuteButton done={done} onClick={onExecute} />
      </Box>
    </Box>
  )
}
