import { Box, Flex } from '@radix-ui/themes'

import { WagerAttackCardButton } from '~/components/woodenbot/WagerAttackCardButton'
import { WWStance } from '~/constants/woodenbot'
import { WagerCardPurpose } from '~/hooks/useWagerCard'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../../keywords/KeywordButton'
import { VisionCardBadge } from '../../VisionCardBadge'

export const Battle = () => {
  const [stance] = useLocationState('woodenbot_action_stance')
  const { drawPile } = useVisionDeck()

  return (
    <>
      {stance === WWStance.DISRUPTIVE && (
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
                a controlled possible <Keyword.Mountain />
                <Flex gap="1">
                  {drawPile.map((card) => (
                    <VisionCardBadge key={card[0]} card={card} />
                  ))}
                </Flex>
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

      {stance === WWStance.EXALTED && (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" />{' '}
            to <Keyword.Secure count="2" />
          </Box>
          <Box>
            <Keyword.Woodenbot /> <Keyword.Attacks />:
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
