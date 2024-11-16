import { Decker } from '@repo/decker'

import { isStorybook } from '../storybook/isStorybook'

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
  if (!isStorybook()) {
    deck.shuffle(pile)
  }
  return deck
}
