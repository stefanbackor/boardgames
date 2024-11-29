import { Box } from '@radix-ui/themes'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { VisionCardBadge } from '~/components/woodenbot/VisionCardBadge'
import { WBStance, WWCard, WWWarriorType } from '~/constants/woodenbot'
import { useLocate } from '~/hooks/woodenbot/useLocate'
import { useVisionDeckDiscard } from '~/hooks/woodenbot/useVisionDeckDiscard'
import { useLocationState } from '~/utils/state/useLocationState'

type Props = {
  card: WWCard
  red?: boolean
}

export const Eye = ({ card, red }: Props) => {
  const [stance] = useLocationState('woodenbot_action_stance')

  const {
    discardCard,
    discardDone,
    discardPileTopCard,
    discardPileTopCardBackToDraw: onDisruptiveExecute,
  } = useVisionDeckDiscard({ key: `${card[0]}/eye/${red}` })

  const { render: renderLocate } = useLocate({ key: `${card[0]}/eye` })

  return (
    <>
      {stance === WBStance.DISRUPTIVE ? (
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
      {stance === WBStance.EXALTED ? (
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
