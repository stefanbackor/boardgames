import { Box, Flex, Heading, RadioCards, Text } from '@radix-ui/themes'
import { useCallback } from 'react'

import { IBStance } from '~/constants/ironbot'
import { useGameParams } from '~/hooks/useGameParams'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from './keywords/KeywordButton'
// import { RoundActionDisruptive } from './RoundActionDisruptive'
// import { RoundActionExalted } from './RoundActionExalted'

export const RoundAction = () => {
  const { actionId } = useGameParams()
  const [stance, setStance] = useLocationState('ironbot_action_stance')

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
          >
            <Flex direction="column" gap="3">
              <Heading as="h2" weight="bold" color="blue">
                {stance === IBStance.DEFENSIVE ? 'Defensive!' : 'Defensive?'}
              </Heading>

              <Box>
                If <Keyword.Ironbot /> has{' '}
                <Text wrap="nowrap">
                  5+ <Keyword.Crystal />
                </Text>{' '}
                and controls at least 1 <Keyword.Foundation />
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

              <Box>Othwerwise</Box>
            </Flex>
          </RadioCards.Item>
        </RadioCards.Root>
      </Flex>
      <Flex direction="column" gap="3">
        {/* {stance === IBStance.AGGRESSIVE ? <RoundActionAggressive /> : null}
        {stance === IBStance.DEFENSIVE ? <RoundActionDefensive /> : null} */}

        {stance && (
          <Flex justify="center">
            <Heading>Now take your turn.</Heading>
          </Flex>
        )}
      </Flex>
    </>
  )
}
