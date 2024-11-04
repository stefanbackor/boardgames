import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { WWStance } from '~/constants/woodenbot'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../../keywords/KeywordButton'

export const Cubes = () => {
  const [stance] = useLocationState('woodenbot_action_stance')
  const [, setCubes] = useLocationState('woodenbot_spirit_cubes')
  const [done, setDone] = useLocationState(
    'woodenbot_expended_cubes_action_done',
  )

  const onExecute = useCallback(() => {
    setCubes((cubes) => cubes + 2)
    setDone(true)
  }, [setCubes, setDone])

  return (
    <>
      <Box>
        Add <Keyword.SpiritCube count="2" /> to Spirit of the Forest.
        <Box>
          <ExecuteButton done={done} onClick={onExecute} />
        </Box>
      </Box>

      {stance === WWStance.DISRUPTIVE ? (
        <Box>
          <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" /> to{' '}
          <Keyword.Interfere count="2" />
        </Box>
      ) : null}

      {stance === WWStance.EXALTED ? (
        <Box>
          <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" /> to{' '}
          <Keyword.Secure count="2" />
        </Box>
      ) : null}
    </>
  )
}
