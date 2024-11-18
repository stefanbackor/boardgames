import { Decker } from '@repo/decker'

import { IS_STORYBOOK } from '~/constants/environment'

/**
 * Shuffle the deck unless in storybook.
 * @param deck
 * @param pile
 * @returns
 */
export function shuffle<T extends object, K extends string>(
  deck: Decker<T, K>,
  pile: K,
) {
  if (!IS_STORYBOOK) {
    deck.shuffle(pile)
  }
  return deck
}
