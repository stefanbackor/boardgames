import { Box, Flex, Heading, RadioCards, Text } from '@radix-ui/themes'
import { useCallback } from 'react'

import { NoChangeCallout } from '~/components/NoChangeCallout'
import { WWStance } from '~/constants/woodenbot'
import { useGameParams } from '~/hooks/useGameParams'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from './keywords/KeywordButton'
import { RoundActionDisruptive } from './RoundActionDisruptive'
import { RoundActionExalted } from './RoundActionExalted'

export const RoundAction = () => {
  const { actionId } = useGameParams()
  const [stance, setStance] = useLocationState('woodenbot_action_stance')

  const onStanceChange = useCallback(
    (value: WWStance) => setStance(value),
    [setStance],
  )

  const color =
    stance === WWStance.DISRUPTIVE
      ? 'red'
      : stance === WWStance.EXALTED
      ? 'blue'
      : undefined

  return (
    <>
      <Flex direction="column" gap="3">
        <Box>
          Check and set <Keyword.Woodenbot /> stance:
        </Box>
        <RadioCards.Root
          key={actionId}
          defaultValue={stance}
          onValueChange={onStanceChange}
          columns={{ initial: '1', xs: '2' }}
          color={color}
          gap="1"
          size="2"
        >
          <RadioCards.Item
            value={WWStance.DISRUPTIVE}
            style={{
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Flex direction="column" gap="3">
              <Heading as="h2" weight="bold" color="red">
                {stance === WWStance.DISRUPTIVE ? 'Disruptive!' : 'Disruptive?'}
              </Heading>

              <Box>
                There is no <Keyword.Totem /> on the map, or <br />
                You have 2 <Keyword.Forge />,{' '}
                <Text wrap="nowrap">
                  1+ <Keyword.Foundation />
                </Text>
                , and{' '}
                <Text wrap="nowrap">
                  5+ <Keyword.Crystal />
                </Text>
              </Box>
            </Flex>
          </RadioCards.Item>
          <RadioCards.Item
            value={WWStance.EXALTED}
            style={{
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Flex direction="column" gap="3">
              <Heading as="h2" weight="bold" color="blue">
                {stance === WWStance.EXALTED ? 'Exalted!' : 'Exalted?'}
              </Heading>

              <Box>
                There is a <Keyword.Totem /> present on the map
              </Box>
            </Flex>
          </RadioCards.Item>
        </RadioCards.Root>
      </Flex>
      <Flex direction="column" gap="3">
        {stance === WWStance.DISRUPTIVE ? <RoundActionDisruptive /> : null}
        {stance === WWStance.EXALTED ? <RoundActionExalted /> : null}

        <NoChangeCallout />

        {stance && (
          <Flex justify="center">
            <Heading>Now take your turn.</Heading>
          </Flex>
        )}
      </Flex>
    </>
  )
}
