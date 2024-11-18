import { Button } from '@radix-ui/themes'

import { useWagerCard, WagerCardPurpose } from '~/hooks/ironbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

import { ExecuteButton } from '../ExecuteButton'
import { ModalDialog } from '../ModalDialog'
import { WagerCardContent } from './WagerCardContent'

type Props = {
  purpose: WagerCardPurpose
}

export const WagerAttackCardButton = ({ purpose }: Props) => {
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
  } = useWagerCard(purpose)

  const cardValues = [
    damage + damageModifier,
    defense + defenseModifier,
    dominance + dominanceModifier,
  ]

  return (
    <ModalDialog
      title="Combat card"
      trigger={
        <ExecuteButton
          label={combatCard ? `Wagered: ${cardValues}` : `Wager for combat`}
        />
      }
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
