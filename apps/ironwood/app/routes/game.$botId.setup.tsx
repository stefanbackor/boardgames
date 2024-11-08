import { Button, Flex } from '@radix-ui/themes'
import { useParams } from '@remix-run/react'
import random from 'lodash/random'
import { useMemo } from 'react'

import { GameSetup as IronbotGameSetup } from '~/components/ironbot/GameSetup'
import { LinkNext } from '~/components/LinkNext'
import { NavBar } from '~/components/NavBar'
import { GameSetup as WoodenbotGameSetup } from '~/components/woodenbot/GameSetup'
import { Bot } from '~/utils/state/types'

export const meta = () => []

export default function Page() {
  const { botId } = useParams()
  const gameId = useMemo(() => random(100, 999, false), [])

  return (
    <Flex direction="column" gap="3">
      <NavBar>
        <Button asChild>
          <LinkNext
            to={`/game/${botId}/round/prepare`}
            params={{ gameId: gameId.toString(), roundId: '1' }}
          >
            Continue
          </LinkNext>
        </Button>
      </NavBar>

      {botId === Bot.WOODENBOT ? <WoodenbotGameSetup /> : null}
      {botId === Bot.IRONBOT ? <IronbotGameSetup /> : null}
    </Flex>
  )
}
