import { Button, Flex, Heading, Separator } from '@radix-ui/themes'
import { useEffect } from 'react'

import { BotHand } from '~/components/BotHand'
import { RoundPrepare as IronbotRoundPrepare } from '~/components/ironbot/RoundPrepare'
import { LinkNext } from '~/components/LinkNext'
import { NavBar } from '~/components/NavBar'
import { RoundPrepare as WoodenbotRoundPrepare } from '~/components/woodenbot/RoundPrepare'
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

  const Navbar = (
    <NavBar>
      <Button asChild>
        <LinkNext
          to={`/game/${botId}/round/action/1`}
          params={{ gameId, roundId }}
        >
          Take 1st Action
        </LinkNext>
      </Button>
    </NavBar>
  )

  return (
    <>
      <BotHand />
      <Flex direction="column" gap="3">
        {Navbar}

        <Heading size="8">Prepare Round</Heading>
        <Separator size="4" />

        <Flex direction="column" gap="3">
          {botId === Bot.IRONBOT ? <IronbotRoundPrepare /> : null}
          {botId === Bot.WOODENBOT ? <WoodenbotRoundPrepare /> : null}
        </Flex>

        {Navbar}
      </Flex>
    </>
  )
}
