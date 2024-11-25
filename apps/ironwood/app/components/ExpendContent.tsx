import { Badge, Box, Flex, Grid, Separator, Text } from '@radix-ui/themes'

import { CardBadge } from '~/components/CardBadge'
import { useValidateActionCallback } from '~/hooks/woodenbot/useValidateActionCallback'
import { isIroncladCard } from '~/utils/cards/isIroncladCard'
import { isWoodwalkerCard } from '~/utils/cards/isWoodwalkerCard'
import { DebugOnly } from '~/utils/debug/DebugOnly'
import { IWCard } from '~/utils/state/types'

import { CardUnavailable } from './CardUnavailable'
import { CardAction as IronbotCardAction } from './ironbot/cards/CardAction'
import { CardAction as WoodenbotCardAction } from './woodenbot/cards/CardAction'

type Props = {
  cards: Array<IWCard>
}

export const ExpendContent = ({ cards }: Props) => {
  const shouldDisplayCardAction = useValidateActionCallback()

  return (
    <>
      <Separator orientation="horizontal" size="4" my="3" />
      {cards.length ? (
        cards.map((card) => (
          <Box key={card[0]}>
            <Grid columns="min-content min-content auto" width="auto" gap="3">
              <Flex>
                <CardBadge card={card} />
              </Flex>
              <Flex>
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
                {isIroncladCard(card) &&
                  card[2]
                    .filter((action) => shouldDisplayCardAction(action))
                    .map(
                      (action, index) =>
                        action && (
                          <Box key={index}>
                            {index > 0 && (
                              <Separator
                                orientation="horizontal"
                                size="4"
                                my="3"
                              />
                            )}
                            <IronbotCardAction key={index} action={action} />
                          </Box>
                        ),
                    )}
                {isWoodwalkerCard(card) &&
                  card[2]
                    .filter((action) => shouldDisplayCardAction(action))
                    .map(
                      (action, index) =>
                        action && (
                          <Box key={index}>
                            {index > 0 && (
                              <Separator
                                orientation="horizontal"
                                size="4"
                                my="3"
                              />
                            )}
                            <WoodenbotCardAction key={index} action={action} />
                          </Box>
                        ),
                    )}
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
