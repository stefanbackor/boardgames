import { Box } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'
import { IBStance } from '~/constants/ironbot'
import { useLocationState } from '~/utils/state/useLocationState'

export const Shield = () => {
  const [stance] = useLocationState('ironbot_action_stance')

  return (
    <>
      {stance === IBStance.AGGRESSIVE && (
        <Box>
          Remove 1 <Keyword.WoodwalkerWarrior count="1" /> from the{' '}
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
        </Box>
      )}
    </>
  )
}
