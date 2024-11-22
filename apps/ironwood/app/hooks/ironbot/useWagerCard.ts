import { useCallback } from 'react'

import { IBStance } from '~/constants/ironbot'
import { useLocationState } from '~/utils/state/useLocationState'

import { useDeck } from '../useDeck'

export enum WagerCardPurpose {
  ATTACK_AGGRESSIVE,
  ATTACK_BATTLE,
  ATTACK_COMPASS,
  ATTACK_FORGE,
  ATTACK_HIT,
  DEFENSE,
}

/**
 * Purpose of the wagered combat card.
 * It is possible to have multiple attacks in a single round (WW16).
 */
const PURPOSE_STORES = {
  [WagerCardPurpose.ATTACK_AGGRESSIVE]: ['ironbot_attack_aggressive'] as const,
  [WagerCardPurpose.ATTACK_BATTLE]: ['ironbot_attack_battle_card'] as const,
  [WagerCardPurpose.ATTACK_COMPASS]: ['ironbot_attack_compass_card'] as const,
  [WagerCardPurpose.ATTACK_FORGE]: ['ironbot_attack_forge_card'] as const,
  [WagerCardPurpose.ATTACK_HIT]: ['ironbot_attack_hit_card'] as const,
  [WagerCardPurpose.DEFENSE]: ['combat_defend_card'] as const,
}

/**
 * Wager a card for combat. Provides props for <WagerCardContent />
 */
export const useWagerCard = (purpose: WagerCardPurpose) => {
  const { wagerCard, drawCard } = useDeck()

  const combatCardKey = PURPOSE_STORES[purpose][0]
  const [combatCard, setCombatCard] = useLocationState(combatCardKey)

  const [stance] = useLocationState('ironbot_action_stance')

  const onExecuteWager = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      const card = wagerCard()
      setCombatCard(card)

      // If more cards in hand, draw a card instead.
      if (!card) {
        drawCard()
      }
    },
    [drawCard, setCombatCard, wagerCard],
  )

  const damage = combatCard ? combatCard[1][0] : 0
  const damageModifier = stance === IBStance.EXPANSIVE ? 1 : 0

  const defense = combatCard ? combatCard[1][1] : 0
  const defenseModifier = stance === IBStance.DEFENSIVE ? 1 : 0

  const dominance = combatCard ? combatCard[1][2] : 0
  const dominanceModifier = stance === IBStance.AGGRESSIVE ? 1 : 0

  return {
    combatCard,
    damage,
    damageModifier,
    defense,
    defenseModifier,
    dominance,
    dominanceModifier,
    onExecuteWager,
  }
}
