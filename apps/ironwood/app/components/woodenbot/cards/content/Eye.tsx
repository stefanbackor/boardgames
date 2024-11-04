import { Box } from '@radix-ui/themes'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/woodenbot/keywords/KeywordButton'
import { useLocate } from '~/components/woodenbot/useLocate'
import { VisionCardBadge } from '~/components/woodenbot/VisionCardBadge'
import {
  WWStance,
  WWVisionLocatePurpose,
  WWWarriorType,
} from '~/constants/woodenbot'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'
import { useLocationState } from '~/utils/state/useLocationState'

export const Eye = () => {
  const [stance] = useLocationState('woodenbot_action_stance')

  const {
    discardCard,
    discardDone,
    discardPileTopCard,
    discardPileTopCardBackToDraw: onDisruptiveExecute,
  } = useVisionDeck({ purpose: WWVisionLocatePurpose.CARD_EYE })

  const { render: renderLocate } = useLocate({
    purpose: WWVisionLocatePurpose.CARD_EYE,
  })

  return (
    <>
      {stance === WWStance.DISRUPTIVE ? (
        <>
          <Box>
            Shuffle a random discarded <Keyword.VisionCard /> back into the{' '}
            <Keyword.VisionCard /> deck (marking the corresponding{' '}
            <Keyword.Mountain />
            ). <br />
            Mark <VisionCardBadge
              card={discardCard || discardPileTopCard}
            />{' '}
            and confirm.
            <Box mt="2">
              <ExecuteButton done={discardDone} onClick={onDisruptiveExecute} />
            </Box>
          </Box>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="2" />{' '}
            to <Keyword.Secure count="2" />
          </Box>
        </>
      ) : null}
      {stance === WWStance.EXALTED ? (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarband count="2" />{' '}
            to <Keyword.Interfere count="2" countType={WWWarriorType.WARBAND} />
          </Box>
          <Box>
            <Keyword.Locate /> <Keyword.Totem />.{renderLocate()}
          </Box>
        </>
      ) : null}
    </>
  )
}
