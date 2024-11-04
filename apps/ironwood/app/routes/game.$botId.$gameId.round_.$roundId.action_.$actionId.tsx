import { Button, Flex, Heading } from '@radix-ui/themes'
import { useParams } from '@remix-run/react'
import { useCallback, useEffect, useState } from 'react'

import { LinkNext } from '~/components/LinkNext'
import { ModalDialog } from '~/components/ModalDialog'
import { NavBar } from '~/components/NavBar'
import { RoundAction as WWRoundAction } from '~/components/woodenbot/RoundAction'
import { WoodenbotHand } from '~/components/WoodenbotHand'
import { useDeck } from '~/hooks/useDeck'
import { Bot } from '~/utils/state/types'
import { useLocationState } from '~/utils/state/useLocationState'

export const meta = () => []

export default function Page() {
  const { botId, actionId, gameId, roundId } = useParams()
  const currentActionId = parseInt(actionId || '0', 10)
  const nextActionId = currentActionId + 1

  const { expendCard } = useDeck()
  const [stance] = useLocationState('woodenbot_action_stance')

  const [alert, setAlert] = useState('')

  const checkActionConditions = useCallback(
    (event: React.SyntheticEvent) => {
      if (botId === Bot.WOODENBOT && !stance) {
        event.preventDefault()
        setAlert('Pick a stance first!')
      }
    },
    [botId, stance],
  )

  /**
   * Each action expends a card from the bot's hand.
   */
  useEffect(() => {
    if (actionId) {
      expendCard(actionId)
    }
  }, [actionId, expendCard])

  return (
    <>
      <WoodenbotHand />
      <Flex direction="column" gap="3">
        <NavBar>
          <Button asChild>
            {actionId === '3' ? (
              <LinkNext to={`/game/${botId}/${gameId}/round/${roundId}/end`}>
                Round End
              </LinkNext>
            ) : (
              <LinkNext
                to={`/game/${botId}/${gameId}/round/${roundId}/action/${nextActionId}`}
                onClick={checkActionConditions}
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
              onOpenChange: (open) => !open && setAlert(''),
            }}
          ></ModalDialog>
        ) : null}
      </Flex>
    </>
  )
}
