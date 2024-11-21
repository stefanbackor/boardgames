import { Difficulty } from '~/constants/difficulty'

import { BitSet } from '../BitSet'

/**
 * Set the difficulty for testing.
 * @param diff
 * @returns
 */
export function testingSetDifficultyValue(diffs: Array<Difficulty>) {
  const bs = new BitSet()
  diffs.forEach((diff) => {
    bs.set(Number(diff))
  })

  return bs.get()
}
