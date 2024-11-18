import { Box, Flex, Heading, Strong } from '@radix-ui/themes'

import { UnmarkedMountains } from '~/components/ironbot/UnmarkedMountains'
import { Keyword } from '~/components/KeywordButton'

export const Chase = () => {
  return (
    <Flex direction="column" gap="2">
      <Heading size="4">Target of the movement:</Heading>

      <Box>
        A mountain adjacent to the Warband in focus,where the Ironclad can use a
        single Warband movement to form the largest possible Warband. (If tied,
        select a mountain that is <Strong>unmarked</Strong>. If still tied, use
        the <Keyword.MagicDie />
        .)
      </Box>
      <Box>
        However, if the Ironclad already has more units in the Warband adjacent
        to the Warband in focus, it does not move at all.
      </Box>

      <UnmarkedMountains />

      <Heading size="4">Source of the movement:</Heading>

      <Box>
        The mountain with the largest Ironclad Warband adjacent to the target.
        If this is Ferrum, ignore 3 Ironclad Fighters there (as they would be
        left behind to protect Ferrum) and re-evaluate the source of the
        movement. Use the <Keyword.MagicDie /> if multiple mountains are tied.
      </Box>
      <Box>
        Move combat units from the source to the target until there are{' '}
        <Strong>more</Strong> units in the Ironclad Warband than the number of
        Woodwalker Fighters in the Warband in focus, or until the source
        mountain empties (but it does not move out the last 3 combat units from
        Ferrum). Golems always move before Fighters.
      </Box>
    </Flex>
  )
}
