import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Callout, Flex, Heading, Strong } from '@radix-ui/themes'

import { DifficultySettingsButton } from './DifficultySettingsButton'

export const GameSetup = () => {
  return (
    <>
      <Heading>Ironbot Game Setup</Heading>

      <Flex justify="center" align="center" mt="3">
        <DifficultySettingsButton />
      </Flex>

      <ol>
        <Flex direction="column" gap="3">
          <li>
            Place the main board in the middle of the playing area with the solo
            mode side up.
          </li>
          <li>
            Take the Woodwalker player board and set out the Ironclad board with
            its solo mode side up.
          </li>
          <li>Take your 3 base cards and put them in your hand.</li>
          <li>
            From your <Strong>own</Strong> deck, remove cards with reference
            numbers <Strong>WW17, WW19, WW22, WW36.</Strong>
          </li>
          <li>
            Shuffle your deck and place it on the corresponding draw deck area
            of your player board.
          </li>
          <li>
            Shuffle the 4 vision cards showing an inner mountain and randomly
            draw 1 of them. Then, shuffle the 3 remaining cards with the rest of
            the vision cards to form the vision deck.
          </li>
          <li>
            Place 2 of your Woodwalker Fighters on each outer forest. Place the
            Drill on Ferrum. Place 1 Ironclad Fighter on Ferrum and 3 Ironclad
            Fighters on each of the inner mountains adjacent to Ferrum.
          </li>
          <li>
            Place all the remaining components near the board, within your
            reach.
          </li>
        </Flex>
      </ol>

      <Callout.Root color="brown">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          You win the game if you discover 3 Totems and secure them by moving
          them to the outer forests. If the Ironbot builds 3 additional Forges
          (besides Ferrum), you lose the game.
        </Callout.Text>
      </Callout.Root>
    </>
  )
}
