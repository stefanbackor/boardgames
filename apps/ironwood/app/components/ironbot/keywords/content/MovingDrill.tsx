import { Box, Flex, Strong } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'

export const MovingDrill = () => {
  return (
    <Flex direction="column" gap="2">
      <Box>
        If there are at least 3 crystals in the Drill’s cargo area , it moves
        towards the closest Forge; otherwise it moves to a mountain without a
        Forge (if possible). If there are multiple eligible mountains, it moves
        to the one with a larger Ironclad Warband and/or with the smaller
        Woodwalker Warband adjacent. If there is no adjacent mountain with an
        Ironclad Warband on it, the Drill moves to a mountain that is adjacent
        to a larger Ironclad Warband. In case of a tie, use the{' '}
        <Keyword.MagicDie />.
      </Box>
      <Box>
        When moving to a mountain without a Forge, advance on the Drill track
        with the bot gaining the indicated benefit.
      </Box>
      <Box>
        When the bot resolves this reward, it does not survey your vision deck.
        Instead,{' '}
        <Strong>if you have more than one vision card in your hand</Strong>, you
        must select one of them randomly and shuffle it back into the vision
        deck. If you have one or no vision cards in your hand, nothing happens.
      </Box>
      <Box>
        When moving to a mountain with a Forge: reset its tracker to the
        starting position, and the bot gains all crystals accumulated by the
        Drill.
      </Box>
    </Flex>
  )
}
