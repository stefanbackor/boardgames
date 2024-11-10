import { WWDifficulty } from '~/hooks/woodenbot/useDifficulty'

import { BitSet } from '../BitSet'

/**
 * Set the difficulty for testing.
 * @param diff
 * @returns
 */
export function testingSetDifficultyValue(diffs: Array<WWDifficulty>) {
  const bs = new BitSet()
  diffs.forEach((diff) => {
    bs.set(Number(diff))
  })

  return bs.get()
}
