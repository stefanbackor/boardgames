import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, DataList, Flex, Separator } from '@radix-ui/themes'

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
            <Flex direction="column" gap="3" py="6">
              Click &quot;Confirm&quot; to draw bot&apos;s top card for combat.
              <Callout.Root color="brown">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Stance modifiers will be applied:
                  <DataList.Root
                    size="1"
                    mt="2"
                    style={{ gap: 'var(--space-2)' }}
                  >
                    <DataList.Item>
                      <DataList.Label minWidth="88px">Defensive</DataList.Label>
                      <DataList.Value>+1 Defense</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.Label minWidth="88px">
                        Aggressive
                      </DataList.Label>
                      <DataList.Value>+1 Dominance</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.Label minWidth="88px">Expansive</DataList.Label>
                      <DataList.Value>+1 Damage</DataList.Value>
                    </DataList.Item>
                  </DataList.Root>
                </Callout.Text>
              </Callout.Root>
            </Flex>
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
              If the bot wins, it forces you to move to forest:
              <ul>
                <li>away from mountain involved</li>
                <li>away from totem</li>
                <li>with smallest (or no) Woodwalker Warband</li>
                <li>
                  <Keyword.MagicDie size="2" />
                </li>
              </ul>
            </Callout.Text>
          </Callout.Root>

          <Callout.Root size="1" color="brown">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              If no combat unit left on Ferrum after a battle, the bot recruits
              1 there for free.
            </Callout.Text>
          </Callout.Root>
        </Flex>
      )}
    </>
  )
}
