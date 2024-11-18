import { Box, Flex, Heading, RadioCards, Text } from '@radix-ui/themes'
import { useCallback } from 'react'

import { WBStance } from '~/constants/woodenbot'
import { useGameParams } from '~/hooks/useGameParams'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../KeywordButton'
import { NoChangeCallout } from '../NoChangeCallout'
import { RoundActionDisruptive } from './RoundActionDisruptive'
import { RoundActionExalted } from './RoundActionExalted'

export const RoundAction = () => {
  const { actionId } = useGameParams()
  const [stance, setStance] = useLocationState('woodenbot_action_stance')

  const onStanceChange = useCallback(
    (value: WBStance) => setStance(value),
    [setStance],
  )

  const color =
    stance === WBStance.DISRUPTIVE
      ? 'red'
      : stance === WBStance.EXALTED
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
            value={WBStance.DISRUPTIVE}
            style={{
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Flex direction="column" gap="3">
              <Heading as="h2" weight="bold" color="red">
                {stance === WBStance.DISRUPTIVE ? 'Disruptive!' : 'Disruptive?'}
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
            value={WBStance.EXALTED}
            style={{
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Flex direction="column" gap="3">
              <Heading as="h2" weight="bold" color="blue">
                {stance === WBStance.EXALTED ? 'Exalted!' : 'Exalted?'}
              </Heading>

              <Box>
                There is a <Keyword.Totem /> present on the map
              </Box>
            </Flex>
          </RadioCards.Item>
        </RadioCards.Root>
      </Flex>
      <Flex direction="column" gap="3">
        {stance === WBStance.DISRUPTIVE ? <RoundActionDisruptive /> : null}
        {stance === WBStance.EXALTED ? <RoundActionExalted /> : null}

        {stance && <NoChangeCallout />}

        <NoChangeCallout />

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
