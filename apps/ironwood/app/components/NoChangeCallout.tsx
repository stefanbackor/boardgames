import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Strong } from '@radix-ui/themes'
import { useCallback } from 'react'

import { useLocationState } from '~/utils/state/useLocationState'

import { ExecuteButton } from './ExecuteButton'

export const NoChangeCallout = () => {
  const [, setCrystals] = useLocationState('crystals')
  const [noChangeCrystalsDone, setNoChangeCrystalsDone] = useLocationState(
    'no_change_crystals_done',
  )

  const onExecute = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
    setNoChangeCrystalsDone(true)
  }, [setCrystals, setNoChangeCrystalsDone])

  return (
    <Callout.Root color="brown">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        <Strong>IMPORTANT:</Strong> If the resolution of an icon results in no
        change to the game state or there are no valid targets for the effects
        of an icon, the <Strong>bot gains 1 crystal</Strong> as compensation.
        <Box mt="2">
          <ExecuteButton done={noChangeCrystalsDone} onClick={onExecute} />
        </Box>
      </Callout.Text>
    </Callout.Root>
  )
}
