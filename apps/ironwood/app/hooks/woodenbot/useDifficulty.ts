import { useCallback, useRef } from 'react'

import { BitSet } from '../../utils/BitSet'
import { useLocationState } from '../../utils/state/useLocationState'

/**
 * Woodenbot difficulty bits.
 */
export enum WWDifficulty {
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
export const WWDifficultyLevel: Record<WWDifficulty, number> = {
  [WWDifficulty.RESOLVE_RED_ACTIONS]: 2,
  [WWDifficulty.ADD_EXTRA_SPIRIT_CUBES]: 3,
  [WWDifficulty.ADD_EXTRA_SPECIAL_CARDS]: 2,
  [WWDifficulty.REMOVE_FOUNDATIONS]: 3,
  [WWDifficulty.ADD_EXTRA_WOODWALKER_TO_ONE]: 1,
  [WWDifficulty.ADD_EXTRA_WOODWALKER_TO_TWO]: 2,
  [WWDifficulty.ADD_EXTRA_WOODWALKER_TO_THREE]: 3,
  [WWDifficulty.ADD_EXTRA_WOODWALKER_TO_FOUR]: 4,
  [WWDifficulty.ADD_EXTRA_WOODWALKER_TO_ALL]: 5,
}

export const useDifficulty = () => {
  const [difficulty, setDifficulty] = useLocationState('woodenbot_difficulty')
  const difficultyRef = useRef(difficulty)
  difficultyRef.current = difficulty

  return {
    /**
     * Check if the difficulty has a specific bit set.
     */

    hasDifficulty: useCallback(
      (diff: WWDifficulty) =>
        new BitSet(difficultyRef.current).test(Number(diff)),
      [],
    ),
    /**
     * Set a specific bit in the difficulty.
     */

    setDifficulty: useCallback(
      (diff: WWDifficulty) => {
        console.log(
          'setDifficulty',
          difficultyRef.current.toString(2),
          Number(diff),
        )
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
        Object.values(WWDifficulty)
          .filter((value) =>
            new BitSet(difficultyRef.current).test(Number(value)),
          )
          .reduce((acc, diff: WWDifficulty) => {
            return acc + WWDifficultyLevel[diff]
          }, 0),
      [],
    ),
  }
}
