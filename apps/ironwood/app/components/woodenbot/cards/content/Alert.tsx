import { Box } from '@radix-ui/themes'
import { useCallback } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { WBAction } from '~/constants/woodenbot'
import { useDeck } from '~/hooks/useDeck'
import { useGameParams } from '~/hooks/useGameParams'
import { useValidateActionCallback } from '~/hooks/woodenbot/useValidateActionCallback'
import { useLocationState } from '~/utils/state/useLocationState'

export const Alert = () => {
  const { actionId } = useGameParams()
  const { expendCard } = useDeck()
  const [, setCrystals] = useLocationState('crystals')
  const [done, setDone] = useLocationState(
    'woodenbot_expended_alert_action_done',
  )

  const shouldDisplayCardAction = useValidateActionCallback()

  // TODO: WW26 expended card is prepended - should be appended
  const onExecute = useCallback(() => {
    if (actionId) {
      const card = expendCard(actionId, false)
      if (
        card &&
        (card[2].filter(Boolean).includes(WBAction.ALERT) ||
          (shouldDisplayCardAction(WBAction.ALERT_RED) &&
            card[2].filter(Boolean).includes(WBAction.ALERT_RED)))
      ) {
        setCrystals((crystals) => crystals + 1)
      }
    }
    setDone(true)
  }, [actionId, expendCard, setCrystals, setDone, shouldDisplayCardAction])

  return (
    <>
      <Box>
        Expend another <Keyword.Card /> placing it on top of this card and
        resolving its icons. If this icon will be resolved a second time,{' '}
        <Keyword.Woodenbot /> gains 1 <Keyword.Crystal />.
        <Box mt="2">
          <ExecuteButton done={done} onClick={onExecute} />
        </Box>
      </Box>
    </>
  )
}
