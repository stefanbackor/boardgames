import { Box, Flex, Heading, Separator, Strong, Text } from '@radix-ui/themes'
import { useState } from 'react'

import { UnmarkedInnerMountains } from '~/components/ironbot/UnmarkedInnerMountains'
import { UnmarkedOuterMountains } from '~/components/ironbot/UnmarkedOuterMountains'
import { Keyword } from '~/components/KeywordButton'

import { FullInstructionsButton } from './common/FullInstructionsButton'

export const Expand = () => {
  const [full, setFull] = useState(false)

  return (
    <Flex direction="column" gap="3">
      <Heading size="6">Target mountain:</Heading>
      <ol>
        <Flex direction="column" gap="2">
          <li>
            <ul>
              <li>outer</li>
              <li>
                <Strong>unmarked</Strong>
                <UnmarkedOuterMountains />
              </li>
              <li>uncontrolled</li>
              <li>without Forge</li>
              <li>fewest total Woodwalker Fighters adjacent</li>
              <li>
                with Foundation {'>'} <Text wrap="nowrap">no Foundation</Text>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>outer</li>
              <li>uncontrolled</li>
              <li>fewest total Woodwalker Fighters adjacent</li>
              <li>Foundation</li>
            </ul>
          </li>
          <li>
            <ul>
              <li>inner</li>
              <li>
                <Strong>unmarked</Strong>
                <UnmarkedInnerMountains />
              </li>
              <li>uncontrolled</li>
              <li>largest adjacent Woodwalker Warband</li>
            </ul>
          </li>
        </Flex>
      </ol>

      <Box>
        Use the <Keyword.MagicDie /> if multiple are tied in any of the above
        above choices.
      </Box>

      <Heading size="6">Source mountain:</Heading>

      <ul>
        <li>adjacent to the target</li>
        <li>largest warband - 1 (if Ferrum - 3)</li>
        <li>
          <Keyword.MagicDie /> if multiple are tied.
        </li>
      </ul>

      <ul>
        <li>Golems first, then Fighters</li>
      </ul>

      <Box>
        If no Ironclad Fighter can be moved to the target mountain, re-evaluate
        to a different target mountain (if possible).
      </Box>

      <FullInstructionsButton full={full} onClick={() => setFull(!full)} />

      {full && (
        <>
          <Separator size="4" />

          <Heading size="6">Target mountain:</Heading>

          <ul>
            <li>
              An uncontrolled and <Strong>unmarked</Strong> outer mountain
              without a Forge and with the fewest total Woodwalker Fighters
              adjacent, prioritizing a mountain with a Foundation over one
              without a Foundation.
            </li>
            <li>
              An uncontrolled outer mountain with a Foundation and with the
              fewest total Woodwalker Fighters adjacent.
            </li>
            <li>
              An uncontrolled and <Strong>unmarked</Strong> inner mountain with
              the largest adjacent Woodwalker Warband.
            </li>
          </ul>

          <Box>
            Use the Magic die if multiple are tied in any of the above choices.
          </Box>

          <Heading size="6">Source mountain:</Heading>

          <Box>
            The mountain with the largest Ironclad Warband adjacent to the
            target. If this is Ferrum, ignore 3 Ironclad Fighters there (as they
            would be left behind to protect Ferrum) and re-evaluate the source
            of the movement. Use the Magic die if multiple are tied.
          </Box>

          <Box>
            Move all of the combat units <Strong>except one</Strong> (or three
            in case of Ferrum) from the source mountain to the target mountain.
            Golems always move before Fighters. If no Ironclad Fighter can be
            moved to the target mountain, re-evaluate to a different target
            mountain (if possible).
          </Box>
        </>
      )}
    </Flex>
  )
}
