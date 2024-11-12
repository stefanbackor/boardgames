import { useCallback } from 'react'

import { WBStance } from '~/constants/woodenbot'
import { Bot } from '~/utils/state/types'
import { useLocationState } from '~/utils/state/useLocationState'

import { useDeck } from './useDeck'
import { useGameParams } from './useGameParams'

export enum WagerCardPurpose {
  ATTACK_DISRUPTIVE,
  ATTACK_ARROWS,
  ATTACK_BATTLE,
  ATTACK_CRYSTALS,
  DEFENSE,
}

/**
 * Purpose of the wagered combat card.
 * It is possible to have multiple attacks in a single round (WW16).
 */
const PURPOSE_STORES = {
  [WagerCardPurpose.ATTACK_DISRUPTIVE]: [
    'woodenbot_attack_disruptive',
    'woodenbot_spirit_cube_for_attack_disruptive_used',
  ] as const,
  [WagerCardPurpose.ATTACK_ARROWS]: [
    'woodenbot_attack_arrows_card',
    'woodenbot_spirit_cube_for_attack_arrows_used',
  ] as const,
  [WagerCardPurpose.ATTACK_BATTLE]: [
    'woodenbot_attack_battle_card',
    'woodenbot_spirit_cube_for_attack_battle_used',
  ] as const,
  [WagerCardPurpose.ATTACK_CRYSTALS]: [
    'woodenbot_attack_crystals_card',
    'woodenbot_spirit_cube_for_attack_crystals_used',
  ] as const,
  [WagerCardPurpose.DEFENSE]: [
    'combat_defend_card',
    'woodenbot_spirit_cube_for_defense_used',
  ] as const,
}

/**
 * Wager a card for combat. Provides props for <WagerCardContent />
 */
export const useWagerCard = (purpose: WagerCardPurpose) => {
  const { botId } = useGameParams()
  const { wagerCard, drawCard } = useDeck()

  const combatCardKey = PURPOSE_STORES[purpose][0]
  const [combatCard, setCombatCard] = useLocationState(combatCardKey)

  const [stance] = useLocationState('woodenbot_action_stance')
  const [spiritCubes, setSpiritCubes] = useLocationState(
    'woodenbot_spirit_cubes',
  )
  const [spiritCubesUsed, setSpiritCubesUsed] = useLocationState(
    PURPOSE_STORES[purpose][1],
  )

  const onExecuteWager = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      const card = wagerCard()
      setCombatCard(card)

      // If more cards in hand, draw a card instead.
      if (!card) {
        drawCard()
      }

      // If spirit cubes are available, use one.
      if (card && spiritCubes > 0) {
        setSpiritCubes(spiritCubes - 1)
        setSpiritCubesUsed(true)
      }
    },
    [
      drawCard,
      setCombatCard,
      setSpiritCubes,
      setSpiritCubesUsed,
      spiritCubes,
      wagerCard,
    ],
  )

  const damage = combatCard ? combatCard[1][0] : 0
  const damageModifier =
    botId === Bot.WOODENBOT && stance === WBStance.DISRUPTIVE && spiritCubesUsed
      ? 1
      : 0

  const defense = combatCard ? combatCard[1][1] : 0
  const defenseModifier =
    botId === Bot.WOODENBOT && stance === WBStance.EXALTED && spiritCubesUsed
      ? 1
      : 0

  const dominance = combatCard ? combatCard[1][2] : 0
  const dominanceModifier = botId === Bot.WOODENBOT && spiritCubesUsed ? 1 : 0

  const shouldHaveModifiers = spiritCubes > 0
  const hasModifiers = damageModifier || defenseModifier || dominanceModifier

  return {
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
    spiritCubes,
  }
}
