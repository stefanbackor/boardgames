import { Box } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'
import { WagerAttackCardButton } from '~/components/woodenbot/WagerAttackCardButton'
import { WBStance } from '~/constants/woodenbot'
import { WagerCardPurpose } from '~/hooks/woodenbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

export const Arrows = () => {
  const [stance] = useLocationState('woodenbot_action_stance')

  return (
    <>
      {stance === WBStance.DISRUPTIVE ? (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="3" />{' '}
            to <Keyword.Interfere count="3" /> and moves{' '}
            <Keyword.WoodwalkerWarrior count="2" /> to{' '}
            <Keyword.Plunder count="2" />.
          </Box>
          <Box>
            <Keyword.Woodenbot /> <Keyword.WoodenbotAttacks />:
            <ul>
              <li>
                a controlled possible <Keyword.Mountain />
              </li>
              <li>
                <Keyword.IroncladDrill />
              </li>
              <li>
                <Keyword.Ferrum />
              </li>
              <li>
                an adjacent <Keyword.IroncladWarband />
              </li>
            </ul>
            <Box mt="2">
              <WagerAttackCardButton purpose={WagerCardPurpose.ATTACK_ARROWS} />
            </Box>
          </Box>
        </>
      ) : null}

      {stance === WBStance.EXALTED ? (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="3" />{' '}
            to <Keyword.Plunder count="3" /> and moves{' '}
            <Keyword.WoodwalkerWarrior count="2" /> to{' '}
            <Keyword.Interfere count="2" />.
          </Box>
          <Box>
            <Keyword.Woodenbot /> <Keyword.WoodenbotAttacks />:
            <ul>
              <li>
                <Keyword.IroncladDrill />
              </li>
              <li>
                <Keyword.Ferrum />
              </li>
              <li>
                a controlled <Keyword.Foundation />
              </li>
              <li>
                an adjacent <Keyword.IroncladWarband />
              </li>
            </ul>
            <Box mt="2">
              <WagerAttackCardButton purpose={WagerCardPurpose.ATTACK_ARROWS} />
            </Box>
          </Box>
        </>
      ) : null}
    </>
  )
}
