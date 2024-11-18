import { Button, Flex, Heading } from '@radix-ui/themes'

import { BotHand } from '~/components/BotHand'
import { RoundEnd as IronbotRoundEnd } from '~/components/ironbot/RoundEnd'
import { LinkNext } from '~/components/LinkNext'
import { NavBar } from '~/components/NavBar'
import { RoundEnd as WoodenbotRoundEnd } from '~/components/woodenbot/RoundEnd'
import { useEndRound } from '~/hooks/useEndRound'
import { useGameParams } from '~/hooks/useGameParams'
import { Bot } from '~/utils/state/types'

export const meta = () => []

export default function Page() {
  const { botId, gameId, roundId } = useGameParams()
  useEndRound()

  return (
    <>
      <BotHand />
      <Flex direction="column" gap="3">
        <NavBar>
          <Button asChild>
            <LinkNext
              to={`/game/${botId}/round/prepare`}
              params={{
                gameId,
                roundId: (parseInt(roundId || '0') + 1).toString(),
              }}
            >
              New Round
            </LinkNext>
          </Button>
        </NavBar>

        <Heading size="8">Round End</Heading>

        <Flex direction="column" gap="3">
          {botId === Bot.IRONBOT ? <IronbotRoundEnd /> : null}
          {botId === Bot.WOODENBOT ? <WoodenbotRoundEnd /> : null}
        </Flex>
      </Flex>
    </>
  )
}
