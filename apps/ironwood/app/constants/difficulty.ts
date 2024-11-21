/**
 * Difficulty bits.
 */
export enum Difficulty {
  RESOLVE_RED_ACTIONS = '0',
  ADD_EXTRA_SPECIAL_ELEMENT = '1', // Extra Golem to Ferrum or Spirit cubes
  ADD_EXTRA_SPECIAL_CARDS = '2',
  FOUNDATIONS = '3', // Extra 2 Foundations to map or remove 2 from IC board
  ADD_EXTRA_WARRIOR_TO_ONE = '4',
  ADD_EXTRA_WARRIOR_TO_TWO = '5',
  ADD_EXTRA_WARRIOR_TO_THREE = '6',
  ADD_EXTRA_WARRIOR_TO_FOUR = '7',
  ADD_EXTRA_WARRIOR_TO_ALL = '8',
}

/**
 * Difficulty levels
 */
export const DifficultyLevel: Record<Difficulty, number> = {
  [Difficulty.RESOLVE_RED_ACTIONS]: 2,
  [Difficulty.ADD_EXTRA_SPECIAL_ELEMENT]: 3,
  [Difficulty.ADD_EXTRA_SPECIAL_CARDS]: 2,
  [Difficulty.FOUNDATIONS]: 3,
  [Difficulty.ADD_EXTRA_WARRIOR_TO_ONE]: 1,
  [Difficulty.ADD_EXTRA_WARRIOR_TO_TWO]: 2,
  [Difficulty.ADD_EXTRA_WARRIOR_TO_THREE]: 3,
  [Difficulty.ADD_EXTRA_WARRIOR_TO_FOUR]: 4,
  [Difficulty.ADD_EXTRA_WARRIOR_TO_ALL]: 5,
}
