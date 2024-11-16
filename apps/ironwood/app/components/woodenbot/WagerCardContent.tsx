import { InfoCircledIcon } from '@radix-ui/react-icons'
import {
  Badge,
  Box,
  Callout,
  DataList,
  Flex,
  Separator,
  Text,
} from '@radix-ui/themes'

import { useGameParams } from '~/hooks/useGameParams'
import { useWagerCard } from '~/hooks/useWagerCard'
import { Bot } from '~/utils/state/types'
import { useLocationState } from '~/utils/state/useLocationState'

import { CardBadge } from '../CardBadge'
import { CrystalsButton } from './CrystalsButton'
import { Keyword } from './keywords/KeywordButton'

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
  const { botId } = useGameParams()
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
          <Flex justify="center" mt="2">
            <Flex direction="row" align="stretch" justify="start" gap="3">
              <Flex>
                <CardBadge card={combatCard} />
              </Flex>
              <Flex>
                <Separator orientation="vertical" size="4" />
              </Flex>
              <Flex direction="column">
                <DataList.Root orientation="horizontal">
                  <DataList.Item align="center">
                    <DataList.Label>Damage</DataList.Label>
                    <DataList.Value>
                      <Badge size="3" highContrast>
                        {damage}
                        {damageModifier > 0 ? ` + ${damageModifier}` : null}
                      </Badge>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item align="center">
                    <DataList.Label>Defense</DataList.Label>
                    <DataList.Value>
                      <Badge size="3" highContrast>
                        {defense}
                        {defenseModifier > 0 ? ` + ${defenseModifier}` : null}
                      </Badge>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item align="center">
                    <DataList.Label>Dominance</DataList.Label>
                    <DataList.Value>
                      <Badge size="3" highContrast>
                        {dominance}
                        {dominanceModifier > 0
                          ? ` + ${dominanceModifier}`
                          : null}
                      </Badge>
                    </DataList.Value>
                  </DataList.Item>
                </DataList.Root>

                {botId === Bot.WOODENBOT && (
                  <>
                    <Separator size="4" my="3" />
                    <Box>
                      <Text size="1">if your Ferrum or Drill defeated:</Text>
                      <Box>
                        <CrystalsButton />
                      </Box>
                    </Box>
                    <Separator size="4" my="3" />
                    <Callout.Root size="1" color="brown">
                      <Callout.Icon>
                        <InfoCircledIcon />
                      </Callout.Icon>
                      <Callout.Text>
                        If the bot wins, and forces you to retreat, it forces
                        you to move to an adjacent mountain with the fewest
                        (including zero) Ironclad combat units, preferring a
                        mountain without a marker (i.e., not a possible
                        mountain). In case of a tie, use the{' '}
                        <Keyword.MagicDie size="2" />.
                      </Callout.Text>
                    </Callout.Root>
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  )
}
