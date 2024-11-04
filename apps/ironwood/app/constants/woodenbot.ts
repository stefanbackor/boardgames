import { CardWithoutActions } from './types'

export enum WWStance {
  DISRUPTIVE = 'disruptive',
  EXALTED = 'exalted',
}

export enum WWAction {
  CARD = 'CARD',
  CARD_RED = 'CARD_RED',
  CRYSTALS = 'CRYSTALS',
  EYE = 'EYE',
  EYE_RED = 'EYE_RED',
  WARBAND = 'WARBAND',
  WARBAND_RED = 'WARBAND_RED',
  SHIELD = 'SHIELD',
  SHIELD_RED = 'SHIELD_RED',
  ALERT = 'ALERT',
  ALERT_RED = 'ALERT_RED',
  //
  CUBES = 'CUBES',
  CUBES_RED = 'CUBES_RED',
  BATTLE = 'BATTLE',
  SEARCH = 'SEARCH',
  SEARCH_RED = 'SEARCH_RED',
  ARROWS = 'ARROWS',
}

export type WWCard = [
  ...CardWithoutActions,
  actions: [first: WWAction, second?: WWAction],
]

export const WW_CARDS_BASE: Array<WWCard> = [
  ['WW01P', [0, 1, 1], [WWAction.CARD_RED, WWAction.SEARCH]],
  ['WW02P', [1, 0, 1], [WWAction.CRYSTALS, WWAction.EYE_RED]],
  ['WW03P', [1, 1, 0], [WWAction.ARROWS, WWAction.WARBAND_RED]],
]

export const WW_CARDS_SPECIAL: Array<WWCard> = [
  ['WW04', [0, 1, 4], [WWAction.ARROWS, WWAction.SHIELD_RED]],
  ['WW05', [2, 0, 3], [WWAction.EYE, WWAction.ALERT]],
  ['WW06', [0, 1, 4], [WWAction.EYE, WWAction.CRYSTALS]],
  ['WW07', [2, 1, 1], [WWAction.SEARCH, WWAction.WARBAND_RED]],
  ['WW08', [2, 0, 3], [WWAction.ARROWS, WWAction.SEARCH_RED]],
  ['WW09', [1, 2, 2], [WWAction.WARBAND, WWAction.ALERT]],
  ['WW10', [0, 1, 4], [WWAction.CRYSTALS, WWAction.SEARCH]],
  ['WW11', [0, 1, 4], [WWAction.WARBAND, WWAction.ARROWS]],
  ['WW12', [1, 2, 2], [WWAction.SEARCH, WWAction.CARD]],
  ['WW13', [0, 1, 4], [WWAction.BATTLE, WWAction.ALERT_RED]],
  ['WW14', [2, 1, 1], [WWAction.SHIELD, WWAction.SHIELD_RED]],
  ['WW15', [1, 2, 2], [WWAction.CARD, WWAction.CRYSTALS]],
  ['WW16', [3, 0, 0], [WWAction.BATTLE, WWAction.CRYSTALS]],
  ['WW17', [0, 1, 4], [WWAction.WARBAND, WWAction.SEARCH]],
  ['WW18', [2, 0, 3], [WWAction.CARD, WWAction.CUBES]],
  ['WW19', [2, 0, 3], [WWAction.BATTLE, WWAction.CUBES]],
  ['WW20', [4, 0, 2], [WWAction.CUBES, WWAction.BATTLE]],
  ['WW21', [1, 2, 2], [WWAction.BATTLE, WWAction.CARD]],
  ['WW22', [2, 1, 1], [WWAction.CUBES, WWAction.ALERT]],
  ['WW23', [3, 0, 0], [WWAction.ARROWS, WWAction.CUBES]],
  ['WW24', [2, 0, 3], [WWAction.CUBES, WWAction.ARROWS]],
  ['WW25', [2, 1, 1], [WWAction.SEARCH, WWAction.WARBAND]],
  ['WW26', [0, 1, 4], [WWAction.SEARCH, WWAction.ALERT]],
  ['WW27', [2, 1, 1], [WWAction.EYE, WWAction.SEARCH]],
  ['WW28', [1, 2, 2], [WWAction.BATTLE, WWAction.WARBAND]],
  ['WW29', [2, 0, 3], [WWAction.EYE, WWAction.ALERT]],
  ['WW30', [3, 0, 0], [WWAction.SHIELD, WWAction.WARBAND_RED]],
  ['WW31', [1, 2, 2], [WWAction.CUBES_RED, WWAction.BATTLE]],
  ['WW32', [3, 0, 0], [WWAction.CARD, WWAction.ARROWS]],
  ['WW33', [2, 1, 1], [WWAction.CRYSTALS, WWAction.CARD]],
  ['WW34', [2, 0, 3], [WWAction.CARD, WWAction.SHIELD]],
  ['WW35', [1, 2, 2], [WWAction.BATTLE, WWAction.CARD]],
  ['WW36', [3, 0, 0], [WWAction.SHIELD, WWAction.EYE]],
  ['WW37', [1, 2, 2], [WWAction.BATTLE, WWAction.WARBAND]],
  ['WW38', [1, 2, 2], [WWAction.SHIELD, WWAction.SEARCH]],
]

export const WW_CARDS = [...WW_CARDS_BASE, ...WW_CARDS_SPECIAL]

export type WWVisionCard = [name: string, crystals: number]

export const WW_VISION_CARDS_INSIDE: Array<WWVisionCard> = [
  ['AURIA', 3], // 3 crystals
  ['LITHIMAR', 3], // 3 crystals
  ['PALLADIMOR', 3], // 3 crystals
  ['ZINCUR', 3], // 3 crystals
]

export const WW_VISION_CARDS_OUTSIDE: Array<WWVisionCard> = [
  ['ARGENTIMAR', 0],
  ['CHROMIA', 0],
  ['COBALTIS', 0],
  ['CUPRUMIS', 0],
  ['GALLIMOR', 0],
  ['PLUMBARUM', 0],
]

export const WW_VISION_CARDS = [
  ...WW_VISION_CARDS_INSIDE,
  ...WW_VISION_CARDS_OUTSIDE,
]

export enum WWVisionPile {
  DRAW = 'draw',
  DISCARD = 'discard',
  DISCOVERED = 'discovered',
}

/**
 * Locate action purpose (source). Locate can be executed as "main"
 * action of disruptive stance or as a "SEARCH" or "EYE"
 * card action.
 */
export enum WWVisionLocatePurpose {
  MAIN,
  CARD_SEARCH,
  CARD_EYE,
}

export enum WWWarriorType {
  WOODWALKER = 'woodwalker',
  WARBAND = 'warband',
}
