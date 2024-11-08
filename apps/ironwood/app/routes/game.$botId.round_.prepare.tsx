import { Button, Flex, Heading } from '@radix-ui/themes'
import { useEffect } from 'react'

import { BotHand } from '~/components/BotHand'
import { LinkNext } from '~/components/LinkNext'
import { NavBar } from '~/components/NavBar'
import { RoundPrepare } from '~/components/woodenbot/RoundPrepare'
import { useGameParams } from '~/hooks/useGameParams'
import { usePrepareRound } from '~/hooks/usePrepareRound'
import { Bot } from '~/utils/state/types'

export const meta = () => []

export default function Page() {
  const { botId, gameId, roundId } = useGameParams()
  const prepareRound = usePrepareRound()

  useEffect(() => {
    prepareRound()
  }, [prepareRound])

  return (
    <>
      <BotHand />
      <Flex direction="column" gap="3">
        <NavBar>
          <Button asChild>
            <LinkNext
              to={`/game/${botId}/round/action/1`}
              params={{ gameId, roundId }}
            >
              Take Action #1
            </LinkNext>
          </Button>
        </NavBar>

        <Heading size="8">Round Prepare</Heading>

        <Flex direction="column" gap="3">
          {botId === Bot.IRONBOT ? <>TBD</> : null}
          {botId === Bot.WOODENBOT ? <RoundPrepare /> : null}
        </Flex>
      </Flex>
    </>
  )
}
