import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Flex, Separator, Text } from '@radix-ui/themes'

import { CrystalsButton } from '~/components/CrystalsButton'
import { Keyword } from '~/components/KeywordButton'
import { WagerCardValues } from '~/components/WagerCardValues'
import { useWagerCard } from '~/hooks/woodenbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

import { PossibleMountains } from './PossibleMountains'

type Props = Omit<ReturnType<typeof useWagerCard>, 'onExecuteWager'>

export const WagerCardContent = ({
  combatCard,
  damage,
  damageModifier,
  defense,
  defenseModifier,
  dominance,
  dominanceModifier,
  hasModifiers,
  shouldHaveModifiers,
}: Props) => {
  const [stance] = useLocationState('woodenbot_action_stance')

  return (
    <>
      {combatCard === undefined && (
        <>
          {shouldHaveModifiers && !stance ? (
            <Callout.Root color="brown">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                Spirits of the Forest modifiers should be applied. Please pick a
                stance first.
              </Callout.Text>
            </Callout.Root>
          ) : (
            <Box py="6">
              Click &quot;Confirm&quot; to draw bot&apos;s top card for combat.
            </Box>
          )}
        </>
      )}

      {combatCard === null && (
        <Box py="6">No card for combat. Bot hand is empty.</Box>
      )}

      {combatCard && (
        <Flex direction="column" gap="3">
          {Boolean(hasModifiers) && (
            <Callout.Root color="brown">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                Spirits of the Forest modifiers applied.
              </Callout.Text>
            </Callout.Root>
          )}

          <WagerCardValues
            combatCard={combatCard}
            damage={damage}
            damageModifier={damageModifier}
            defense={defense}
            defenseModifier={defenseModifier}
            dominance={dominance}
            dominanceModifier={dominanceModifier}
          />

          <Separator size="4" />

          <Flex align="center" justify="start" gap="3">
            <Text>
              If your <Keyword.Ferrum /> or <Keyword.IroncladDrill /> is
              defeated,
            </Text>
            <CrystalsButton size="1" />
          </Flex>

          <Separator size="4" />

          <Callout.Root size="1" color="brown">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              If the bot wins, it forces you to retreat to adjacent mountain:
              <ul>
                <li>with fewest (or no) Ironclads</li>
                <li>
                  preferring mountain other than: <PossibleMountains />
                </li>
                <li>
                  in case of a tie, use <Keyword.MagicDie size="2" />
                </li>
              </ul>
            </Callout.Text>
          </Callout.Root>
        </Flex>
      )}
    </>
  )
}
