import { Box, Flex, Strong } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { WBAction, WWCard } from '~/constants/woodenbot'
import { useCardActionDone } from '~/hooks/useCardActionDone'
import { useDeck } from '~/hooks/useDeck'
import { useLocationState } from '~/utils/state/useLocationState'

type Props = {
  card: WWCard
  red?: boolean
}

export const Shield = ({ card, red }: Props) => {
  const [, setCrystals] = useLocationState('crystals')
  const { drawCard } = useDeck()

  const [done, setDone] = useCardActionDone(card, WBAction.SHIELD, red)

  const onExecute1 = useCallback(() => {
    drawCard()
    setDone()
  }, [drawCard, setDone])

  const onExecute2 = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
    setDone()
  }, [setCrystals, setDone])

  return (
    <>
      <>
        <Box>
          <Strong>Choose one:</Strong>
          <ul>
            <Flex direction="column" gap="2">
              <li>
                You burn 1 <Keyword.Card /> and <Keyword.Woodenbot /> draws 1{' '}
                <Keyword.Card />
                <Box mt="2">
                  <ExecuteButton done={done} onClick={onExecute1} />
                </Box>
              </li>
              <li>
                <Keyword.Woodenbot /> steals 1 <Keyword.Crystal /> from you.
                <Box mt="2">
                  <ExecuteButton done={done} onClick={onExecute2} />
                </Box>
              </li>
            </Flex>
          </ul>
        </Box>
      </>
    </>
  )
}
