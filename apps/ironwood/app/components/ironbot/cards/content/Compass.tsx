import { Box } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'
import { IBStance } from '~/constants/ironbot'
import { WagerCardPurpose } from '~/hooks/ironbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

import { WagerAttackCardButton } from '../../WagerAttackCardButton'

export const Compass = () => {
  const [stance] = useLocationState('ironbot_action_stance')

  return (
    <>
      {stance === IBStance.AGGRESSIVE && (
        <Box>
          <Keyword.Ironbot />{' '}
          <Keyword.IronbotAttacks purpose={WagerCardPurpose.ATTACK_COMPASS} />{' '}
          if adjacent to a smaller <Keyword.WoodwalkerWarband /> with or
          adjacent to <Keyword.Totem />. Otherwise: <Keyword.Ironbot /> moves to{' '}
          <Keyword.Chase />.
          <Box mt="2">
            <WagerAttackCardButton purpose={WagerCardPurpose.ATTACK_COMPASS} />
          </Box>
        </Box>
      )}
      {stance === IBStance.DEFENSIVE && (
        <Box>
          <Keyword.Ironbot /> moves to <Keyword.Protect />.
        </Box>
      )}
      {stance === IBStance.EXPANSIVE && (
        <Box>
          <Keyword.Ironbot /> moves to <Keyword.Expand />.
        </Box>
      )}
    </>
  )
}
