import { Box } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'
import { IBStance } from '~/constants/ironbot'
import { WagerCardPurpose } from '~/hooks/ironbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

import { WagerAttackCardButton } from '../../WagerAttackCardButton'

export const Hit = () => {
  const [stance] = useLocationState('ironbot_action_stance')

  return (
    <Box>
      {stance === IBStance.AGGRESSIVE && (
        <>
          <Keyword.Ironbot /> moves to <Keyword.Chase />.
        </>
      )}
      {stance === IBStance.DEFENSIVE && (
        <>
          <Keyword.Ironbot /> moves to <Keyword.Protect />.
        </>
      )}{' '}
      <Keyword.Ironbot /> <Keyword.IronbotAttacks /> (if able).
      <Box mt="2">
        <WagerAttackCardButton purpose={WagerCardPurpose.ATTACK_HIT} />
      </Box>
    </Box>
  )
}
