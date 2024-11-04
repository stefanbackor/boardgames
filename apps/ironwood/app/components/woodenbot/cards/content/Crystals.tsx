import { Box, Strong } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { WagerAttackCardButton } from '~/components/woodenbot/WagerAttackCardButton'
import { WWStance } from '~/constants/woodenbot'
import { WagerCardPurpose } from '~/hooks/useWagerCard'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../../keywords/KeywordButton'
import { VisionCardBadge } from '../../VisionCardBadge'

export const Crystals = () => {
  const [stance] = useLocationState('woodenbot_action_stance')
  const [, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useLocationState(
    'woodenbot_expended_crystals_action_done',
  )

  const { drawPile } = useVisionDeck()

  const onExecute = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
    setDone(true)
  }, [setCrystals, setDone])

  return (
    <>
      {stance === WWStance.DISRUPTIVE ? (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" />{' '}
            to <Keyword.Plunder count="2" />
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
            </ul>
            <Box mt="2">
              <WagerAttackCardButton
                purpose={WagerCardPurpose.ATTACK_CRYSTALS}
              />
            </Box>
          </Box>
        </>
      ) : null}
      {stance === WWStance.EXALTED ? (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" />{' '}
            to <Keyword.Interfere count="2" />
          </Box>
          <Box>
            <Keyword.Woodenbot /> <Keyword.Attacks />:
            <ul>
              <li>
                a controlled <Keyword.Foundation />
              </li>
              <li>
                a possible <Keyword.Mountain />
                <Box>
                  {drawPile.map((card) => (
                    <VisionCardBadge key={card[0]} card={card} />
                  ))}
                </Box>
              </li>
              <li>
                an adjacent <Keyword.IroncladWarband />
              </li>
            </ul>
            <Box mt="2">
              <WagerAttackCardButton
                purpose={WagerCardPurpose.ATTACK_CRYSTALS}
              />
            </Box>
          </Box>
          <Box>
            <Keyword.Woodenbot /> <Strong>Victory:</Strong>{' '}
            <Keyword.Woodenbot /> steals 1 <Keyword.Crystal /> from you.
            <Box mt="2">
              <ExecuteButton
                label="Confirm victory"
                done={done}
                onClick={onExecute}
              />
            </Box>
          </Box>
        </>
      ) : null}
    </>
  )
}
