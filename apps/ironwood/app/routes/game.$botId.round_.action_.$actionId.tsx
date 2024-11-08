import { Button, Flex, Heading } from '@radix-ui/themes'

import { BotHand } from '~/components/BotHand'
import { LinkNext } from '~/components/LinkNext'
import { ModalDialog } from '~/components/ModalDialog'
import { NavBar } from '~/components/NavBar'
import { RoundAction as WWRoundAction } from '~/components/woodenbot/RoundAction'
import { useGameParams } from '~/hooks/useGameParams'
import { useCheckActionComplete } from '~/hooks/woodenbot/useCheckActionComplete'
import { Bot } from '~/utils/state/types'

export const meta = () => []

export default function Page() {
  const { botId, actionId, gameId, roundId } = useGameParams()
  const currentActionId = parseInt(actionId || '0', 10)
  const nextActionId = currentActionId + 1

  const { alert, resetAlert, handleCheck } = useCheckActionComplete()

  return (
    <>
      <BotHand />
      <Flex direction="column" gap="3">
        <NavBar>
          <Button asChild>
            {actionId === '3' ? (
              <LinkNext
                to={`/game/${botId}/round/end`}
                params={{ gameId, roundId }}
              >
                Round End
              </LinkNext>
            ) : (
              <LinkNext
                to={`/game/${botId}/round/action/${nextActionId}`}
                params={{ gameId, roundId }}
                onClick={handleCheck}
              >
                Take Action #{nextActionId}
              </LinkNext>
            )}
          </Button>
        </NavBar>
        <Heading size="8">Action {actionId}/3</Heading>

        {botId === Bot.IRONBOT ? <></> : null}
        {botId === Bot.WOODENBOT ? <WWRoundAction /> : null}

        {alert ? (
          <ModalDialog
            title={alert}
            dialogProps={{
              open: true,
              onOpenChange: (open) => !open && resetAlert(),
            }}
          ></ModalDialog>
        ) : null}
      </Flex>
    </>
  )
}
