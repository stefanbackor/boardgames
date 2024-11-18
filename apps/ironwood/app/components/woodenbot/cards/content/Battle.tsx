import { Box, Flex } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'
import { VisionCardBadge } from '~/components/woodenbot/VisionCardBadge'
import { WagerAttackCardButton } from '~/components/woodenbot/WagerAttackCardButton'
import { WBStance } from '~/constants/woodenbot'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'
import { WagerCardPurpose } from '~/hooks/woodenbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

export const Battle = () => {
  const [stance] = useLocationState('woodenbot_action_stance')
  const { drawPile } = useVisionDeck()

  return (
    <>
      {stance === WBStance.DISRUPTIVE && (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" />{' '}
            to <Keyword.Interfere count="2" />
          </Box>
          <Box>
            <Keyword.Woodenbot /> <Keyword.WoodenbotAttacks />:
            <ul>
              <li>
                a controlled <Keyword.Foundation />
              </li>
              <li>
                a controlled possible <Keyword.Mountain />
                <Flex gap="1">
                  {drawPile.map((card) => (
                    <VisionCardBadge key={card[0]} card={card} />
                  ))}
                </Flex>
              </li>
              <li>
                <Keyword.Drill />
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
            <Keyword.Woodenbot /> <Keyword.WoodenbotAttacks />:
            <ul>
              <li>
                an <Keyword.IroncladWarband /> adjacent to <Keyword.Totem />
              </li>
              <li>
                a controlled possible <Keyword.Mountain />
                <Flex gap="1">
                  {drawPile.map((card) => (
                    <VisionCardBadge key={card[0]} card={card} />
                  ))}
                </Flex>
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
