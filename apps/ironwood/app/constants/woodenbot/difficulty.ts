/**
 * Woodenbot difficulty bits.
 */
export enum WBDifficulty {
  RESOLVE_RED_ACTIONS = '0',
  ADD_EXTRA_SPIRIT_CUBES = '1',
  ADD_EXTRA_SPECIAL_CARDS = '2',
  REMOVE_FOUNDATIONS = '3',
  ADD_EXTRA_WOODWALKER_TO_ONE = '4',
  ADD_EXTRA_WOODWALKER_TO_TWO = '5',
  ADD_EXTRA_WOODWALKER_TO_THREE = '6',
  ADD_EXTRA_WOODWALKER_TO_FOUR = '7',
  ADD_EXTRA_WOODWALKER_TO_ALL = '8',
}

/**
 * Woodenbot numeric levels to each difficulty bit.
 */
export const WBDifficultyLevel: Record<WBDifficulty, number> = {
  [WBDifficulty.RESOLVE_RED_ACTIONS]: 2,
  [WBDifficulty.ADD_EXTRA_SPIRIT_CUBES]: 3,
  [WBDifficulty.ADD_EXTRA_SPECIAL_CARDS]: 2,
  [WBDifficulty.REMOVE_FOUNDATIONS]: 3,
  [WBDifficulty.ADD_EXTRA_WOODWALKER_TO_ONE]: 1,
  [WBDifficulty.ADD_EXTRA_WOODWALKER_TO_TWO]: 2,
  [WBDifficulty.ADD_EXTRA_WOODWALKER_TO_THREE]: 3,
  [WBDifficulty.ADD_EXTRA_WOODWALKER_TO_FOUR]: 4,
  [WBDifficulty.ADD_EXTRA_WOODWALKER_TO_ALL]: 5,
}
