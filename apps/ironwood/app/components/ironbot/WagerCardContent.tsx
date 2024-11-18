import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Flex, Separator } from '@radix-ui/themes'

import { WagerCardValues } from '~/components/WagerCardValues'
import { useWagerCard } from '~/hooks/ironbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../KeywordButton'

type Props = Omit<ReturnType<typeof useWagerCard>, 'onExecuteWager'>

export const WagerCardContent = ({
  combatCard,
  damage,
  damageModifier,
  defense,
  defenseModifier,
  dominance,
  dominanceModifier,
}: Props) => {
  const [stance] = useLocationState('ironbot_action_stance')

  return (
    <>
      {combatCard === undefined && (
        <>
          {!stance ? (
            <Callout.Root color="brown">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                Stance modifiers should be applied. Please pick a stance first.
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

          <Callout.Root size="1" color="brown">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              If the bot wins and forces you to retreat, it forces you to move
              away from the mountain that was involved in the combat (so your
              retreating Warband is no longer adjacent). It moves you to or
              towards a forest with a smaller (or no) Woodwalker Warband, but it
              never moves you towards a forest with a Totem. Use the{' '}
              <Keyword.MagicDie size="2" />
              if multiple forests are tied.
            </Callout.Text>
          </Callout.Root>
        </Flex>
      )}
    </>
  )
}
