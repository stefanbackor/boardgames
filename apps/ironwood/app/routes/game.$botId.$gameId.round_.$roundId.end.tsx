import { Button, Flex, Heading } from '@radix-ui/themes'
import { useParams } from '@remix-run/react'
import { useEffect } from 'react'

import { LinkNext } from '~/components/LinkNext'
import { NavBar } from '~/components/NavBar'
import { RoundEnd } from '~/components/woodenbot/RoundEnd'
import { WoodenbotHand } from '~/components/WoodenbotHand'
import { useDeck } from '~/hooks/useDeck'
import { Bot } from '~/utils/state/types'

export const meta = () => []

export default function Page() {
  const { botId, gameId, roundId } = useParams()
  const { cleanupRoundCards } = useDeck()

  useEffect(() => {
    cleanupRoundCards()
  }, [cleanupRoundCards])

  return (
    <>
      <WoodenbotHand />
      <Flex direction="column" gap="3">
        <NavBar>
          <Button asChild>
            <LinkNext
              to={`/game/${botId}/${gameId}/round/${
                parseInt(roundId || '0') + 1
              }/prepare`}
            >
              New Round
            </LinkNext>
          </Button>
        </NavBar>

        <Heading size="8">Round End</Heading>

        <Flex direction="column" gap="3">
          {botId === Bot.IRONBOT ? <>TBD</> : null}
          {botId === Bot.WOODENBOT ? <RoundEnd /> : null}
        </Flex>
      </Flex>
    </>
  )
}
