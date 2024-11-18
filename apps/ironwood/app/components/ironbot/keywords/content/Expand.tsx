import { Box, Flex, Heading, Strong } from '@radix-ui/themes'

import { UnmarkedMountains } from '~/components/ironbot/UnmarkedMountains'
import { Keyword } from '~/components/KeywordButton'

export const Expand = () => {
  return (
    <Flex direction="column" gap="2">
      <Heading size="4">Target of the movement:</Heading>
      <ul>
        <Flex direction="column" gap="2">
          <li>
            An uncontrolled and <Strong>unmarked</Strong> outer mountain without
            a Forge and with the fewest total Woodwalker Fighters adjacent,
            prioritizing a mountain with a Foundation over one without a
            Foundation. a Forge and with the fewest total Woodwalker Fighters
            adjacent, prioritizing a mountain with a Foundation over one without
            a Foundation.
          </li>
          <li>
            An uncontrolled outer mountain with a Foundation and with the fewest
            total Woodwalker Fighters adjacent.
          </li>
          <li>
            An uncontrolled and <Strong>unmarked</Strong> inner mountain with
            the with the largest adjacent Woodwalker Warband.
          </li>
        </Flex>
      </ul>

      <UnmarkedMountains />

      <Box>
        Use the <Keyword.MagicDie /> if multiple are tied in any of the above
        above choices.
      </Box>
      <Heading size="4">Source of the movement:</Heading>
      <Box>
        The mountain with the largest Ironclad Warband adjacent to the target.
        If this is Ferrum, ignore 3 Ironclad Fighters there (as they would be
        left behind to protect Ferrum) and re-evaluate the source of the
        movement. Use the Magic die if multiple are tied.
      </Box>
      <Box>
        Move all of the combat units <Strong>except one</Strong> (or three in
        case of Ferrum) from the source mountain to the target mountain. Golems
        always move before Fighters. If no Ironclad Fighter can be moved to the
        target mountain, re-evaluate to a different target mountain (if
        possible).
      </Box>
    </Flex>
  )
}
