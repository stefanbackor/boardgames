import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { WBAction, WBStance, WWCard } from '~/constants/woodenbot'
import { useCardActionDone } from '~/hooks/useCardActionDone'
import { useLocationState } from '~/utils/state/useLocationState'

type Props = {
  card: WWCard
  red?: boolean
}

export const Cubes = ({ card, red }: Props) => {
  const [stance] = useLocationState('woodenbot_action_stance')
  const [, setCubes] = useLocationState('woodenbot_spirit_cubes')
  const [done, setDone] = useCardActionDone(card, WBAction.CUBES, red)

  const onExecute = useCallback(() => {
    setCubes((cubes) => cubes + 2)
    setDone()
  }, [setCubes, setDone])

  return (
    <>
      <Box>
        Add <Keyword.SpiritCube count="2" /> to Spirit of the Forest.
        <Box>
          <ExecuteButton done={done} onClick={onExecute} />
        </Box>
      </Box>

      {stance === WBStance.DISRUPTIVE ? (
        <Box>
          <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" /> to{' '}
          <Keyword.Interfere count="2" />
        </Box>
      ) : null}

      {stance === WBStance.EXALTED ? (
        <Box>
          <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" /> to{' '}
          <Keyword.Secure count="2" />
        </Box>
      ) : null}
    </>
  )
}
