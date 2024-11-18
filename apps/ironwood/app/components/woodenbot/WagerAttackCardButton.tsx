import { Button } from '@radix-ui/themes'

import { useWagerCard, WagerCardPurpose } from '~/hooks/woodenbot/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

import { ExecuteButton } from '../ExecuteButton'
import { ModalDialog } from '../ModalDialog'
import { WagerCardContent } from './WagerCardContent'

type Props = {
  purpose: WagerCardPurpose
}

export const WagerAttackCardButton = ({ purpose }: Props) => {
  const [stance] = useLocationState('woodenbot_action_stance')
  const [spiritCubes] = useLocationState('woodenbot_spirit_cubes')

  const {
    combatCard,
    damage,
    damageModifier,
    defense,
    defenseModifier,
    dominance,
    dominanceModifier,
    hasModifiers,
    onExecuteWager,
    shouldHaveModifiers,
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
        (!shouldHaveModifiers || (shouldHaveModifiers && stance)) && (
          <Button onClick={onExecuteWager}>Confirm</Button>
        )
      }
    >
      <WagerCardContent
        {...{
          combatCard,
          damage,
          damageModifier,
          defense,
          defenseModifier,
          dominance,
          dominanceModifier,
          hasModifiers,
          shouldHaveModifiers,
          spiritCubes,
          stance,
        }}
      />
    </ModalDialog>
  )
}
