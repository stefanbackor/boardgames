import { useCallback, useRef } from 'react'

import { BitSet } from '~/utils/BitSet'
import { useLocationState } from '~/utils/state/useLocationState'

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

export const useDifficulty = () => {
  const [difficulty, setDifficulty] = useLocationState('ironbot_difficulty')
  const difficultyRef = useRef(difficulty)
  difficultyRef.current = difficulty

  return {
    /**
     * Check if the difficulty has a specific bit set.
     */

    hasDifficulty: useCallback(
      (diff: IBDifficulty) =>
        new BitSet(difficultyRef.current).test(Number(diff)),
      [],
    ),
    /**
     * Set a specific bit in the difficulty.
     */

    setDifficulty: useCallback(
      (diff: IBDifficulty) => {
        const bs = new BitSet(difficultyRef.current)
        bs.set(Number(diff))

        setDifficulty(bs.get())
        difficultyRef.current = bs.get()
      },
      [setDifficulty],
    ),

    /**
     * Reset the difficulty to zero.
     */
    resetDifficulty: useCallback(() => {
      setDifficulty(0)
      difficultyRef.current = 0
    }, [setDifficulty]),

    /**
     * Get the difficulty level based on each set bit.
     */
    getDifficultyLevel: useCallback(
      () =>
        Object.values(IBDifficulty)
          .filter((value) =>
            new BitSet(difficultyRef.current).test(Number(value)),
          )
          .reduce((acc, diff: IBDifficulty) => {
            return acc + IBDifficultyLevel[diff]
          }, 0),
      [],
    ),
  }
}
