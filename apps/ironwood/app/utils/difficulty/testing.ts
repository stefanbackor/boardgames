import { IBDifficulty } from '~/constants/ironbot'
import { WBDifficulty } from '~/constants/woodenbot'

import { BitSet } from '../BitSet'

/**
 * Set the difficulty for testing.
 * @param diff
 * @returns
 */
export function testingSetDifficultyValue(
  diffs: Array<WBDifficulty> | Array<IBDifficulty>,
) {
  const bs = new BitSet()
  diffs.forEach((diff) => {
    bs.set(Number(diff))
  })

  return bs.get()
}
