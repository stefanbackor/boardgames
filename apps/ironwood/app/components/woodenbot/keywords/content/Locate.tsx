import { Flex, Text } from '@radix-ui/themes'

import { Keyword } from '~/components/woodenbot/keywords/KeywordButton'

export const Locate = () => {
  return (
    <Flex direction="column" gap="2">
      <>
        <Text size="4">
          If there is <strong>exactly one card</strong> left in the vision deck:
        </Text>

        <ol>
          <li>
            Reveal that vision card (and remove the marker from the
            corresponding mountain).
          </li>
          <li>
            Discover a Totem near it, even if the shown mountain is controlled
            by the Ironclad (See Keywords and key concepts on how to resolve a
            discovery - <Keyword.Discovers />
            ).
          </li>
          <li>
            Then, expend the top card of the bot deck (to indicate a turn
            spent).
          </li>
          <li>
            Flip the closed Bot Control Aid (as indicated on the bottom of the
            Disruptive Woodwalker Turn Procedure).
          </li>
          <li>
            <strong>End the bot’s turn.</strong>
          </li>
        </ol>
      </>

      <>
        <Text size="4">
          If there is <strong>more than one card</strong> left in the vision
          deck:
        </Text>
        <ol>
          <li>Reveal and discard the top vision card.</li>
          <li>Remove the marker from the corresponding mountain.</li>
        </ol>
      </>
    </Flex>
  )
}
