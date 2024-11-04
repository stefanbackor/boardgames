import { Flex, Strong } from '@radix-ui/themes'

import { Keyword } from '../KeywordButton'

export const Discovers = () => {
  return (
    <>
      <Flex direction="column" gap="3">
        <ol>
          <Flex direction="column" gap="3">
            <li>
              Place a Totem on an adjacent inner forest with the largest
              Woodwalker Warband. If no Woodwalker Warband is adjacent, place it
              on the inner forest closest to a Woodwalker Warband (prioritizing
              the larger one). If there are multiple equal options, use the{' '}
              <Keyword.MagicDie />.
            </li>

            <li>
              If the vision deck is not yet empty, find the vision card
              corresponding to the target mountain in the vision deck.
            </li>

            <li>
              The Woodenbot gains crystals equal to the amount shown on the
              card.
            </li>

            <li>
              Unmark the corresponding mountain of the vision card, then remove
              the vision card from the game.
            </li>

            <li>
              Rebuild the vision deck by randomly adding cards from the vision
              discard pile to the vision deck until the vision deck has 5 cards
              (if the total number of vision cards remaining is less than 5, use
              all of them instead). Mark every mountain corresponding to a
              vision card selected from the discard pile, making them possible
              mountains again.
            </li>

            <li>
              Shuffle any remaining cards in the vision deck with the selected
              vision cards from the discard pile to create a new vision deck.
            </li>

            <li>
              <Strong>Discovering a Totem always ends the bot’s turn.</Strong>{' '}
              If it is the “Locate a Totem” step, expend the top card of the bot
              deck (to indicate a turn spent) and remember to flip the closed
              Bot Control Aid.
            </li>
          </Flex>
        </ol>
      </Flex>
    </>
  )
}
