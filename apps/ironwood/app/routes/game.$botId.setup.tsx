import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Button, Callout, Flex, Heading } from '@radix-ui/themes'
import { useParams } from '@remix-run/react'
import random from 'lodash/random'

import { LinkNext } from '~/components/LinkNext'
import { NavBar } from '~/components/NavBar'
import { GameSetup } from '~/components/woodenbot/GameSetup'
import { Bot } from '~/utils/state/types'

export const meta = () => []

export default function Woodenbot() {
  const { botId } = useParams()

  return (
    <Flex direction="column" gap="3">
      <NavBar>
        <Button asChild>
          <LinkNext
            to={`/game/${botId}/${random(100, 999, false)}/round/1/prepare`}
          >
            Continue
          </LinkNext>
        </Button>
      </NavBar>

      {botId === Bot.WOODENBOT ? <GameSetup /> : null}

      {botId === Bot.IRONBOT ? (
        <>
          <Heading>Ironbot Game Setup</Heading>
          <ol>
            <li>TBD</li>
          </ol>

          <Callout.Root color="brown">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              You win the game if you discover 3 Totems and secure them by
              moving them to the outer forests. If the Ironbot builds 3
              additional Forges (besides Ferrum), you lose the game.
            </Callout.Text>
          </Callout.Root>
        </>
      ) : null}
    </Flex>
  )
}
