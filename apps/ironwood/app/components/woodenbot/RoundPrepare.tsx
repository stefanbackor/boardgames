import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Heading, Strong } from '@radix-ui/themes'

import { ExecuteButton } from '../ExecuteButton'

export const RoundPrepare = () => (
  <>
    <Heading as="h3">Gain crystals</Heading>

    <Box>
      No change from the core rules. <Strong>You gain 2&nbsp;crystals</Strong>,
      the bot gains 1 crystal.
      <Box mt="2">
        <ExecuteButton done={true} />
      </Box>
    </Box>

    <Heading as="h3">Draw 2 cards</Heading>

    <Box>
      No change from the core rules on your side. Draw the first two cards from
      your deck. If it’s the first round, you may draw 4 cards instead, select 2
      to keep, and shuffle the rest into your draw deck.
    </Box>
    <Box>
      For the bot, draw 2 cards from its deck and shuffle them into its hand
      (keeping its hand face down).
      <Box mt="2">
        <ExecuteButton done={true} />
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
      The Spirits of the Forest (see Bot Control Aid) can also have markers
      placed next to it, but these are not removed in this step. They are used
      during the combat resolution steps of the Woodenbot.
    </Box>

    <Callout.Root color="orange">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        <Strong>IMPORTANT:</Strong> Markers placed on mountains (to track the
        Woodenbot’s search for Totems) are not removed in this step.
      </Callout.Text>
    </Callout.Root>
  </>
)
