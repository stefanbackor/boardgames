import { Box } from '@radix-ui/themes'

import { WagerAttackCardButton } from '~/components/woodenbot/WagerAttackCardButton'
import { WWStance } from '~/constants/woodenbot'
import { WagerCardPurpose } from '~/hooks/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../../keywords/KeywordButton'

export const Arrows = () => {
  const [stance] = useLocationState('woodenbot_action_stance')

  return (
    <>
      {stance === WWStance.DISRUPTIVE ? (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="3" />{' '}
            to <Keyword.Interfere count="3" /> and moves{' '}
            <Keyword.WoodwalkerWarrior count="2" /> to{' '}
            <Keyword.Plunder count="2" />.
          </Box>
          <Box>
            <Keyword.Woodenbot /> <Keyword.Attacks />:
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

      {stance === WWStance.EXALTED ? (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="3" />{' '}
            to <Keyword.Plunder count="3" /> and moves{' '}
            <Keyword.WoodwalkerWarrior count="2" /> to{' '}
            <Keyword.Interfere count="2" />.
          </Box>
          <Box>
            <Keyword.Woodenbot /> <Keyword.Attacks />:
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
