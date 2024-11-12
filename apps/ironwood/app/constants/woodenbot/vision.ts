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

/**
 * Woodenbot vision deck piles.
 */
export enum WBVisionPile {
  DRAW = 'draw',
  DISCARD = 'discard',
  DISCOVERED = 'discovered',
}

/**
 * Locate action purpose (source). Locate can be executed as "main"
 * action of disruptive stance or as a "SEARCH" or "EYE"
 * card action.
 */
export enum WBVisionLocatePurpose {
  MAIN,
  CARD_SEARCH,
  CARD_EYE,
}
