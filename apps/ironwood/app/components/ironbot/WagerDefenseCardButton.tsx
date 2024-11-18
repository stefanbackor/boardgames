import { Button } from '@radix-ui/themes'

import { useWagerCard, WagerCardPurpose } from '~/hooks/ironbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

import { ModalDialog } from '../ModalDialog'
import { WagerCardContent } from './WagerCardContent'

/**
 * Modal dialog for wagering a defense card.
 * @param param0
 * @returns
 */
export const WagerDefenseCardButton = () => {
  const [stance] = useLocationState('ironbot_action_stance')

  const {
    combatCard,
    damage,
    damageModifier,
    defense,
    defenseModifier,
    dominance,
    dominanceModifier,
    onExecuteWager,
  } = useWagerCard(WagerCardPurpose.DEFENSE)

  return (
    <ModalDialog
      title="Defense combat card"
      trigger={<Button>Wager for defense</Button>}
      action={
        combatCard === undefined &&
        stance && <Button onClick={onExecuteWager}>Confirm</Button>
      }
    >
      <WagerCardContent
        combatCard={combatCard}
        damage={damage}
        damageModifier={damageModifier}
        defense={defense}
        defenseModifier={defenseModifier}
        dominance={dominance}
        dominanceModifier={dominanceModifier}
      />
    </ModalDialog>
  )
}
