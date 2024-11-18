import { Box, Flex, Heading, Strong } from '@radix-ui/themes'

import { UnmarkedMountains } from '~/components/ironbot/UnmarkedMountains'
import { Keyword } from '~/components/KeywordButton'

export const Protect = () => {
  return (
    <Flex direction="column" gap="2">
      <Heading size="4">Target of the movement:</Heading>

      <ul>
        <Flex direction="column" gap="2">
          <li>Ferrum, if there are fewer than 3 units in Ferrum.</li>
          <li>
            A mountain with a Foundation, where there is a larger adjacent
            Woodwalker Warband than the Ironclad Warband present. Target an
            unmarked mountain first, prioritizing the one with the smallest
            Ironclad Warband.
          </li>
          <li>
            An unmarked inner mountain, where there is a larger adjacent
            Woodwalker Warband than the Ironclad Warband present.
          </li>
        </Flex>
      </ul>

      <UnmarkedMountains />

      <Box>
        Use the <Keyword.MagicDie /> if multiple are tied in any of the above
        choices.
      </Box>

      <Heading size="4">Source of the movement:</Heading>

      <Box>
        A mountain without a Foundation and the largest Ironclad Warband
        adjacent to the target. If this is Ferrum, ignore 3 Ironclad Fighters
        there (as they would be left behind to protect Ferrum) and re- evaluate
        the source of the movement. Use the Magic die if multiple are tied. In
        the unlikely case of no viable source, the move is forfeit.
      </Box>
      <Box>
        Move all of the combat units <Strong>except one</Strong> (or three in
        case of Ferrum) from the source mountain to the target mountain. Golems
        always move before Fighters.
      </Box>
    </Flex>
  )
}
