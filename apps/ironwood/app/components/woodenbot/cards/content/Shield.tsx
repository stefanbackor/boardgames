import { Box, Flex, Strong } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { useDeck } from '~/hooks/useDeck'
import { useLocationState } from '~/utils/state/useLocationState'

export const Shield = () => {
  const [, setCrystals] = useLocationState('crystals')
  const { drawCard } = useDeck()

  const [done, setDone] = useLocationState(
    'woodenbot_expended_shield_action_done',
  )

  const onExecute1 = useCallback(() => {
    drawCard()
    setDone(true)
  }, [drawCard, setDone])

  const onExecute2 = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
    setDone(true)
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
