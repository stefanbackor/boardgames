import { useCallback, useRef } from 'react'

import { Difficulty, DifficultyLevel } from '~/constants/difficulty'
import { BitSet } from '~/utils/BitSet'
import { useLocationState } from '~/utils/state/useLocationState'

export const useDifficulty = () => {
  const [difficulty, setDifficulty] = useLocationState('difficulty')
  const difficultyRef = useRef(difficulty)
  difficultyRef.current = difficulty

  return {
    /**
     * Check if the difficulty has a specific bit set.
     */

    hasDifficulty: useCallback(
      (diff: Difficulty) =>
        new BitSet(difficultyRef.current).test(Number(diff)),
      [],
    ),
    /**
     * Set a specific bit in the difficulty.
     */

    setDifficulty: useCallback(
      (diff: Difficulty) => {
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
        Object.values(Difficulty)
          .filter((value) =>
            new BitSet(difficultyRef.current).test(Number(value)),
          )
          .reduce((acc, diff: Difficulty) => {
            return acc + DifficultyLevel[diff]
          }, 0),
      [],
    ),
  }
}
