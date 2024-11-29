import { Box, Strong } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { VisionCardBadge } from '~/components/woodenbot/VisionCardBadge'
import { WagerAttackCardButton } from '~/components/woodenbot/WagerAttackCardButton'
import { WBAction, WBStance, WWCard } from '~/constants/woodenbot'
import { useCardActionDone } from '~/hooks/useCardActionDone'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'
import { WagerCardPurpose } from '~/hooks/woodenbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

type Props = {
  card: WWCard
}

export const Crystals = ({ card }: Props) => {
  const [stance] = useLocationState('woodenbot_action_stance')
  const [, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useCardActionDone(card, WBAction.CRYSTALS)

  const { drawPile } = useVisionDeck()

  const onExecute = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
    setDone()
  }, [setCrystals, setDone])

  return (
    <>
      {stance === WBStance.DISRUPTIVE ? (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" />{' '}
            to <Keyword.Plunder count="2" />
          </Box>
          <Box>
            <Keyword.Woodenbot />{' '}
            <Keyword.WoodenbotAttacks
              purpose={WagerCardPurpose.ATTACK_CRYSTALS}
            />
            :
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
      {stance === WBStance.EXALTED ? (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" />{' '}
            to <Keyword.Interfere count="2" />
          </Box>
          <Box>
            <Keyword.Woodenbot />{' '}
            <Keyword.WoodenbotAttacks
              purpose={WagerCardPurpose.ATTACK_CRYSTALS}
            />
            :
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
