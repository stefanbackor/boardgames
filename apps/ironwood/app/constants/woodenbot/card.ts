import { CardWithoutActions } from '../types'
import { WBAction } from './action'

export type WWCard = [
  ...CardWithoutActions,
  actions: [first: WBAction, second?: WBAction],
]

export const WW_CARDS_BASE: Array<WWCard> = [
  ['WW01P', [0, 1, 1], [WBAction.CARD_RED, WBAction.SEARCH]],
  ['WW02P', [1, 0, 1], [WBAction.CRYSTALS, WBAction.EYE_RED]],
  ['WW03P', [1, 1, 0], [WBAction.ARROWS, WBAction.WARBAND_RED]],
]

export const WW_CARDS_SPECIAL: Array<WWCard> = [
  ['WW04', [0, 1, 4], [WBAction.ARROWS, WBAction.SHIELD_RED]],
  ['WW05', [2, 0, 3], [WBAction.EYE, WBAction.ALERT]],
  ['WW06', [0, 1, 4], [WBAction.EYE, WBAction.CRYSTALS]],
  ['WW07', [2, 1, 1], [WBAction.SEARCH, WBAction.WARBAND_RED]],
  ['WW08', [2, 0, 3], [WBAction.ARROWS, WBAction.SEARCH_RED]],
  ['WW09', [1, 2, 2], [WBAction.WARBAND, WBAction.ALERT]],
  ['WW10', [0, 1, 4], [WBAction.CRYSTALS, WBAction.SEARCH]],
  ['WW11', [0, 1, 4], [WBAction.WARBAND, WBAction.ARROWS]],
  ['WW12', [1, 2, 2], [WBAction.SEARCH, WBAction.CARD]],
  ['WW13', [0, 1, 4], [WBAction.BATTLE, WBAction.ALERT_RED]],
  ['WW14', [2, 1, 1], [WBAction.SHIELD, WBAction.SHIELD_RED]],
  ['WW15', [1, 2, 2], [WBAction.CARD, WBAction.CRYSTALS]],
  ['WW16', [3, 0, 0], [WBAction.BATTLE, WBAction.CRYSTALS]],
  ['WW17', [0, 1, 4], [WBAction.WARBAND, WBAction.SEARCH]],
  ['WW18', [2, 0, 3], [WBAction.CARD, WBAction.CUBES]],
  ['WW19', [2, 0, 3], [WBAction.BATTLE, WBAction.CUBES]],
  ['WW20', [4, 0, 2], [WBAction.CUBES, WBAction.BATTLE]],
  ['WW21', [1, 2, 2], [WBAction.BATTLE, WBAction.CARD]],
  ['WW22', [2, 1, 1], [WBAction.CUBES, WBAction.ALERT]],
  ['WW23', [3, 0, 0], [WBAction.ARROWS, WBAction.CUBES]],
  ['WW24', [2, 0, 3], [WBAction.CUBES, WBAction.ARROWS]],
  ['WW25', [2, 1, 1], [WBAction.SEARCH, WBAction.WARBAND]],
  ['WW26', [0, 1, 4], [WBAction.SEARCH, WBAction.ALERT]],
  ['WW27', [2, 1, 1], [WBAction.EYE, WBAction.SEARCH]],
  ['WW28', [1, 2, 2], [WBAction.BATTLE, WBAction.WARBAND]],
  ['WW29', [2, 0, 3], [WBAction.EYE, WBAction.ALERT]],
  ['WW30', [3, 0, 0], [WBAction.SHIELD, WBAction.WARBAND_RED]],
  ['WW31', [1, 2, 2], [WBAction.CUBES_RED, WBAction.BATTLE]],
  ['WW32', [3, 0, 0], [WBAction.CARD, WBAction.ARROWS]],
  ['WW33', [2, 1, 1], [WBAction.CRYSTALS, WBAction.CARD]],
  ['WW34', [2, 0, 3], [WBAction.CARD, WBAction.SHIELD]],
  ['WW35', [1, 2, 2], [WBAction.BATTLE, WBAction.CARD]],
  ['WW36', [3, 0, 0], [WBAction.SHIELD, WBAction.EYE]],
  ['WW37', [1, 2, 2], [WBAction.BATTLE, WBAction.WARBAND]],
  ['WW38', [1, 2, 2], [WBAction.SHIELD, WBAction.SEARCH]],
]

export const WW_CARDS = [...WW_CARDS_BASE, ...WW_CARDS_SPECIAL]

/**
 * Woodenbot warrior types mentioned in the actions descriptions.
 */
export enum WWWarriorType {
  WOODWALKER = 'woodwalker',
  WARBAND = 'warband',
}
