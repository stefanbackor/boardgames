import { Box } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'
import { WagerAttackCardButton } from '~/components/woodenbot/WagerAttackCardButton'
import { WBStance } from '~/constants/woodenbot'
import { WagerCardPurpose } from '~/hooks/woodenbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

import { PossibleMountains } from '../../PossibleMountains'

export const Battle = () => {
  const [stance] = useLocationState('woodenbot_action_stance')

  return (
    <>
      {stance === WBStance.DISRUPTIVE && (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" />{' '}
            to <Keyword.Interfere count="2" />
          </Box>
          <Box>
            <Keyword.Woodenbot />{' '}
            <Keyword.WoodenbotAttacks
              purpose={WagerCardPurpose.ATTACK_BATTLE}
            />
            :
            <ul>
              <li>
                a controlled <Keyword.Foundation />
              </li>
              <li>
                a controlled possible <Keyword.Mountain />
                <PossibleMountains />
              </li>
              <li>
                <Keyword.IroncladDrill />
              </li>
              <li>
                an adjacent <Keyword.IroncladWarband />
              </li>
            </ul>
            <Box mt="2">
              <WagerAttackCardButton purpose={WagerCardPurpose.ATTACK_BATTLE} />
            </Box>
          </Box>
        </>
      )}

      {stance === WBStance.EXALTED && (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" />{' '}
            to <Keyword.Secure count="2" />
          </Box>
          <Box>
            <Keyword.Woodenbot />{' '}
            <Keyword.WoodenbotAttacks
              purpose={WagerCardPurpose.ATTACK_BATTLE}
            />
            :
            <ul>
              <li>
                an <Keyword.IroncladWarband /> adjacent to <Keyword.Totem />
              </li>
              <li>
                a controlled possible <Keyword.Mountain />
                <PossibleMountains />
              </li>
              <li>
                an adjacent <Keyword.IroncladWarband />
              </li>
            </ul>
            <Box mt="2">
              <WagerAttackCardButton purpose={WagerCardPurpose.ATTACK_BATTLE} />
            </Box>
          </Box>
        </>
      )}
    </>
  )
}
