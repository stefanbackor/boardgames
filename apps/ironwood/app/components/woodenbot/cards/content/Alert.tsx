import { Box } from '@radix-ui/themes'
import { useParams } from '@remix-run/react'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { useDeck } from '~/hooks/useDeck'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../../keywords/KeywordButton'

export const Alert = () => {
  const { actionId } = useParams()
  const { expendCard } = useDeck()

  const [done, setDone] = useLocationState(
    'woodenbot_expended_alert_action_done',
  )

  // TODO: WW26 expended card is prepended - should be appended
  const onExecute = useCallback(() => {
    actionId && expendCard(actionId, false)
    setDone(true)
  }, [actionId, expendCard, setDone])

  return (
    <>
      <>
        <Box>
          Expend another <Keyword.Card /> placing it on top of this card and
          resolving its icons. If this icon will be resolved a second time,{' '}
          <Keyword.Woodenbot /> gains 1 <Keyword.Crystal />.
          {/* TODO: Implement crystal gain */}
          <Box mt="2">
            <ExecuteButton done={done} onClick={onExecute} />
          </Box>
        </Box>
      </>
    </>
  )
}
