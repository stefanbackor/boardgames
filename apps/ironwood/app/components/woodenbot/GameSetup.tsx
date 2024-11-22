import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Callout, Flex, Heading, Strong } from '@radix-ui/themes'
import { useEffect } from 'react'

import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'

import { DifficultySettingsButton } from './DifficultySettingsButton'

export const GameSetup = () => {
  const { prepareGameVisionCards } = useVisionDeck()

  useEffect(() => {
    prepareGameVisionCards()
  }, [prepareGameVisionCards])

  return (
    <>
      <Heading>Woodenbot Game Setup</Heading>

      <Flex justify="center" align="center" mt="3">
        <DifficultySettingsButton />
      </Flex>

      <ol>
        <Flex direction="column" gap="3">
          <li>
            Place the main board with numbered locations in the middle of the
            playing area with the solo mode side up .
          </li>
          <li>
            Take the Ironclad player board and set out the Woodwalker board with
            its solo mode side up .
          </li>
          <li>
            Take your 3 base cards and put them in your hand. Take the bot’s 3
            base cards and place them in a face down deck next to its player
            board where indicated . For simplicity, this deck will be referred
            to as the “bot’s hand.”
          </li>
          <li>
            From your own deck, remove cards with reference numbers{' '}
            <Strong>IC13, IC17, IC27, IC33, IC36</Strong>. Then, shuffle your
            deck and place it on the corresponding draw deck area of your player
            board.
          </li>
          <li>
            Shuffle the 4 vision cards showing an inner mountain to create the
            vision deck. Place the six remaining cards face up on the right side
            of the bot’s player board, creating the vision discard pile.
          </li>
          <li>
            <Strong>
              Place a marker on all four inner mountains’ marking slots.
            </Strong>
          </li>
          <li>
            <Strong>Place 2 Woodwalker Fighters on each outer forest.</Strong>
          </li>
          <li>
            Place the Drill on Ferrum. Place 1 of your Ironclad Fighters on
            Ferrum and 3 of your Fighters on each of the mountains adjacent to
            Ferrum.
          </li>
          <li>
            Place the closed Bot Control Aid and the Magic die within your
            reach.
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
          You win if you build 3 additional Forges (besides Ferrum). If the
          Woodenbot secures three Totems, you lose the game.
        </Callout.Text>
      </Callout.Root>
    </>
  )
}
