import { Button, Flex, Heading } from '@radix-ui/themes'
import { useParams } from '@remix-run/react'
import { useEffect } from 'react'

import { LinkNext } from '~/components/LinkNext'
import { NavBar } from '~/components/NavBar'
import { RoundPrepare } from '~/components/woodenbot/RoundPrepare'
import { WoodenbotHand } from '~/components/WoodenbotHand'
import { usePrepareRound } from '~/hooks/usePrepareRound'
import { Bot } from '~/utils/state/types'

export const meta = () => []

export default function Page() {
  const { botId, gameId, roundId } = useParams()
  const prepareRound = usePrepareRound()

  useEffect(() => {
    prepareRound()
  }, [prepareRound])

  return (
    <>
      <WoodenbotHand />
      <Flex direction="column" gap="3">
        <NavBar>
          <Button asChild>
            <LinkNext
              to={`/game/woodenbot/${gameId}/round/${roundId}/action/1`}
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
