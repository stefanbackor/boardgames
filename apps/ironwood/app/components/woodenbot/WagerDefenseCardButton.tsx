import { Button } from '@radix-ui/themes'

import { useWagerCard, WagerCardPurpose } from '~/hooks/useWagerCard'
import { useLocationState } from '~/utils/state/useLocationState'

import { ModalDialog } from '../ModalDialog'
import { WagerCardContent } from './WagerCardContent'

/**
 * Modal dialog for wagering a defense card.
 * @param param0
 * @returns
 */
export const WagerDefenseCardButton = () => {
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
  } = useWagerCard(WagerCardPurpose.DEFENSE)

  return (
    <ModalDialog
      title="Defense combat card"
      trigger={<Button>Wager for defense</Button>}
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
        }}
      />
    </ModalDialog>
  )
}
