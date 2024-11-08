import { Badge, Box, Flex, Grid, Separator, Text } from '@radix-ui/themes'
import { useMemo } from 'react'

import { CardBadge } from '~/components/CardBadge'
import { WWAction } from '~/constants/woodenbot'
import { PILE_PAIRS, useDeck } from '~/hooks/useDeck'
import { useGameParams } from '~/hooks/useGameParams'
import { useDifficulty, WWDifficulty } from '~/hooks/woodenbot/useDifficulty'
import { isRedCardAction } from '~/utils/cards/isRedCardAction'
import { DebugOnly } from '~/utils/debug/DebugOnly'
import { IWCard, IWCardAction } from '~/utils/state/types'

import { CardAction } from './cards/CardAction'
import { CardUnavailable } from './cards/CardUnavailable'

export const Expend = () => {
  const { actionId } = useGameParams()
  const { deck } = useDeck()
  const { hasDifficulty } = useDifficulty()

  const currentActionId = parseInt(actionId || '0', 10)

  const cards = useMemo(() => {
    return PILE_PAIRS[currentActionId - 1]
      .map((pile) => deck.get(pile).map((card) => card))
      .flat()
      .filter(Boolean) as Array<IWCard>
  }, [currentActionId, deck])

  const shouldDisplayCardAction = (action?: IWCardAction) => {
    return (
      action &&
      (!isRedCardAction(action) ||
        (isRedCardAction(action) &&
          hasDifficulty(WWDifficulty.RESOLVE_RED_ACTIONS)))
    )
  }

  return (
    <>
      <Separator orientation="horizontal" size="4" my="3" />
      {cards.length ? (
        cards.map((card) => (
          <Box key={card[0]}>
            <Grid columns="60px min-content auto" width="auto" gap="3">
              <Flex width="25%">
                <CardBadge card={card} />
              </Flex>
              <Flex width="5px">
                <Separator orientation="vertical" size="4" />
              </Flex>
              <Flex direction="column">
                <DebugOnly>
                  <Flex gap="1">
                    {card[2].map((action) => (
                      <Badge key={action} color="gray">
                        <Text
                          style={{
                            textDecoration: shouldDisplayCardAction(action)
                              ? 'none'
                              : 'line-through',
                          }}
                        >
                          {action}
                        </Text>
                      </Badge>
                    ))}
                  </Flex>
                </DebugOnly>
                {card[2]
                  .filter((action) => shouldDisplayCardAction(action))
                  .map((action, index) => (
                    <Box key={index}>
                      {index > 0 && (
                        <Separator orientation="horizontal" size="4" my="3" />
                      )}
                      <CardAction key={index} action={action as WWAction} />
                    </Box>
                  ))}
              </Flex>
            </Grid>
            <Separator orientation="horizontal" size="4" my="3" />
          </Box>
        ))
      ) : (
        <CardUnavailable />
      )}
    </>
  )
}
