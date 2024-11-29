import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { IBAction, IBStance } from '~/constants/ironbot'
import { useCardActionDone } from '~/hooks/useCardActionDone'
import { IWCard } from '~/utils/state/types'
import { useLocationState } from '~/utils/state/useLocationState'

type Props = {
  card: IWCard
  red?: boolean
}

export const Shield = ({ card, red }: Props) => {
  const [stance] = useLocationState('ironbot_action_stance')
  const [, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useCardActionDone(card, IBAction.SHIELD, red)

  const onExecute = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
    setDone()
  }, [setCrystals, setDone])

  return (
    <>
      {stance === IBStance.AGGRESSIVE && (
        <Box>
          Remove <Keyword.WoodwalkerWarrior count="1" /> from the{' '}
          <Keyword.WoodwalkerWarband /> with/closest to the <Keyword.Totem />.
        </Box>
      )}
      {stance === IBStance.DEFENSIVE && (
        <Box>
          You burn 1 <Keyword.Card />.
        </Box>
      )}
      {stance === IBStance.EXPANSIVE && (
        <Box>
          <Keyword.Ironbot /> gains 1 <Keyword.Crystal />.
          <Box>
            <ExecuteButton done={done} onClick={onExecute} />
          </Box>
        </Box>
      )}
    </>
  )
}
