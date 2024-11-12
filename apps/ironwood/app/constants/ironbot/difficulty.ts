/**
 * Ironbot difficulty bits.
 */
export enum IBDifficulty {
  RESOLVE_RED_ACTIONS = '0',
  ADD_EXTRA_GOLEM_TO_FERRUM = '1',
  ADD_EXTRA_SPECIAL_CARDS = '2',
  ADD_FOUNDATIONS = '3',
  ADD_EXTRA_IRONCLAD_TO_ONE = '4',
  ADD_EXTRA_IRONCLAD_TO_TWO = '5',
  ADD_EXTRA_IRONCLAD_TO_THREE = '6',
  ADD_EXTRA_IRONCLAD_TO_FOUR = '7',
  ADD_EXTRA_IRONCLAD_TO_ALL = '8',
}

/**
 * Woodenbot numeric levels to each difficulty bit.
 */
export const IBDifficultyLevel: Record<IBDifficulty, number> = {
  [IBDifficulty.RESOLVE_RED_ACTIONS]: 2,
  [IBDifficulty.ADD_EXTRA_GOLEM_TO_FERRUM]: 3,
  [IBDifficulty.ADD_EXTRA_SPECIAL_CARDS]: 2,
  [IBDifficulty.ADD_FOUNDATIONS]: 3,
  [IBDifficulty.ADD_EXTRA_IRONCLAD_TO_ONE]: 1,
  [IBDifficulty.ADD_EXTRA_IRONCLAD_TO_TWO]: 2,
  [IBDifficulty.ADD_EXTRA_IRONCLAD_TO_THREE]: 3,
  [IBDifficulty.ADD_EXTRA_IRONCLAD_TO_FOUR]: 4,
  [IBDifficulty.ADD_EXTRA_IRONCLAD_TO_ALL]: 5,
}
