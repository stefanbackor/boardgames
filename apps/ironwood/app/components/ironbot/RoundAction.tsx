import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import {
  Badge,
  Box,
  Flex,
  Heading,
  RadioCards,
  Strong,
  Text,
} from '@radix-ui/themes'
import { useCallback, useEffect } from 'react'

import { IBStance, IBTurnProcedure } from '~/constants/ironbot'
import { useTurnProcedure } from '~/hooks/ironbot/useTurnProcedure'
import { useGameParams } from '~/hooks/useGameParams'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../KeywordButton'
import { NoChangeCallout } from '../NoChangeCallout'
import { MarkMountainButton } from './MarkMountainButton'
import { RoundActionAlertAggressive } from './RoundActionAlertAggressive'
import { RoundActionAlertDefensive } from './RoundActionAlertDefensive'
import { RoundActionAlertExpansive } from './RoundActionAlertExpansive'
import { RoundActionExhausted } from './RoundActionExhausted'

export const RoundAction = () => {
  const { actionId } = useGameParams()
  const [crystals] = useLocationState('crystals')
  const [stance, setStance] = useLocationState('ironbot_action_stance')

  const { turnProcedure, flipTurnProcedure } = useTurnProcedure()

  useEffect(() => {
    if (turnProcedure === IBTurnProcedure.EXHAUSTED) {
      flipTurnProcedure()
    }
  }, [turnProcedure, flipTurnProcedure])

  const onStanceChange = useCallback(
    (value: IBStance) => setStance(value),
    [setStance],
  )

  const color =
    stance === IBStance.AGGRESSIVE
      ? 'red'
      : stance === IBStance.DEFENSIVE
        ? 'blue'
        : stance === IBStance.EXPANSIVE
          ? 'orange'
          : undefined

  return (
    <>
      <Flex direction="column" gap="3">
        <Box>
          Check and set <Keyword.Ironbot /> stance from left to right:
        </Box>
        <RadioCards.Root
          key={actionId}
          defaultValue={stance}
          onValueChange={onStanceChange}
          columns={{ initial: '1', xs: '3' }}
          color={color}
          gap="1"
          size="2"
        >
          <RadioCards.Item
            value={IBStance.AGGRESSIVE}
            style={{
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Flex direction="column" gap="3">
              <Heading as="h2" weight="bold" color="red">
                {stance === IBStance.AGGRESSIVE ? 'Aggressive!' : 'Aggressive?'}
              </Heading>

              <Box>
                If <Keyword.IroncladWarband /> is with <Keyword.Totem /> on the
                same <Keyword.Forrest />
              </Box>
            </Flex>
          </RadioCards.Item>
          <RadioCards.Item
            value={IBStance.DEFENSIVE}
            style={{
              justifyContent: 'start',
              alignItems: 'start',
            }}
            // disabled={crystals < 5}
          >
            <Flex direction="column" gap="3">
              <Heading as="h2" weight="bold" color="blue">
                {stance === IBStance.DEFENSIVE ? 'Defensive!' : 'Defensive?'}
              </Heading>

              <Box>
                If <Keyword.Ironbot /> has{' '}
                <Text wrap="nowrap">
                  5+ <Keyword.Crystal />{' '}
                  {crystals < 5 ? (
                    <Badge
                      size="1"
                      color="gray"
                      radius="full"
                      variant="solid"
                      style={{ verticalAlign: 'bottom' }}
                    >
                      <Cross2Icon color="white" />
                    </Badge>
                  ) : (
                    <Badge
                      size="1"
                      color="green"
                      radius="full"
                      variant="solid"
                      style={{ verticalAlign: 'bottom' }}
                    >
                      <CheckIcon color="white" />
                    </Badge>
                  )}
                </Text>{' '}
                and controls{' '}
                <Text wrap="pretty">
                  1+ <Keyword.Foundation />
                </Text>
              </Box>
            </Flex>
          </RadioCards.Item>
          <RadioCards.Item
            value={IBStance.EXPANSIVE}
            style={{
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Flex direction="column" gap="3">
              <Heading as="h2" weight="bold" color="orange">
                {stance === IBStance.EXPANSIVE ? 'Expansive!' : 'Expansive?'}
              </Heading>

              <Box>Otherwise</Box>
            </Flex>
          </RadioCards.Item>
        </RadioCards.Root>
        <RadioCards.Root
          gap="1"
          size="1"
          variant="surface"
          value={turnProcedure}
          disabled
        >
          <RadioCards.Item value={IBTurnProcedure.ALERT}>Alert</RadioCards.Item>
          <RadioCards.Item value={IBTurnProcedure.EXHAUSTED}>
            Exhausted
          </RadioCards.Item>
        </RadioCards.Root>
      </Flex>
      <Flex direction="column" gap="3">
        <ol>
          <Flex direction="column" gap="2">
            {turnProcedure === IBTurnProcedure.ALERT && (
              <>
                {stance === IBStance.AGGRESSIVE && (
                  <RoundActionAlertAggressive />
                )}
                {stance === IBStance.DEFENSIVE && <RoundActionAlertDefensive />}
                {stance === IBStance.EXPANSIVE && <RoundActionAlertExpansive />}
              </>
            )}

            {stance && turnProcedure === IBTurnProcedure.EXHAUSTED && (
              <RoundActionExhausted />
            )}
          </Flex>
        </ol>

        {stance && <NoChangeCallout />}

        {stance && (
          <>
            <Heading my="6" align="center">
              Now take your turn:
            </Heading>

            <Flex direction="column" gap="3" justify="center">
              <Box>
                Things to keep in mind:
                <ul>
                  <li>
                    Whenever you{' '}
                    <Strong>play, discard, or burn a vision card</Strong>, the
                    Ironbot marks the corresponding mountain so it will “know”
                    that you will never try to discover there again. To mark a
                    mountain, place a marker on the marking slot at the relevant
                    mountain.
                    <Box mt="2">
                      <MarkMountainButton />
                    </Box>
                  </li>
                </ul>
              </Box>
            </Flex>
          </>
        )}
      </Flex>
    </>
  )
}
