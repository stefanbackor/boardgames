import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Heading, Strong } from '@radix-ui/themes'

import { ExecuteButton } from '../ExecuteButton'

export const RoundPrepare = () => (
  <>
    <Heading as="h3">Gain crystals</Heading>
    <Box>
      No change from the core rules. <Strong>You gain 1 crystal;</Strong> the
      bot gains 2 crystals.
      <Box mt="2">
        <ExecuteButton done={true} onClick={() => {}} />
      </Box>
    </Box>
    <Heading as="h3">Draw 2 cards</Heading>
    <Box>
      No change from the core rules on your side. Draw the top two cards of your
      deck. If it’s the first round, you may draw 4 cards instead, select 2 to
      keep, and shuffle the rest into your draw deck.
    </Box>
    <Box>
      For the bot, draw 2 cards from its deck and keeping all cards face down,
      shuffle them into its hand (the three base cards).
      <Box mt="2">
        <ExecuteButton done={true} onClick={() => {}} />
      </Box>
    </Box>
    <Heading as="h3">Remove markers</Heading>
    <Box>
      No change from the core rules on your side. Remove 1 marker from all
      ongoing cards you have in play.
    </Box>
    <Callout.Root color="green">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        <Strong>REMINDER:</Strong> As soon as an ongoing card is exhausted,
        discard it.
      </Callout.Text>
    </Callout.Root>
    <Box>
      The bot does not use ongoing cards, but may mark specific mountains to
      track the game state. Those markers are never removed.
    </Box>
  </>
)
