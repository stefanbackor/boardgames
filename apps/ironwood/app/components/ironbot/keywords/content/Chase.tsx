import { Box, Flex, Heading, Strong } from '@radix-ui/themes'
import { useState } from 'react'

import { UnmarkedInnerMountains } from '~/components/ironbot/UnmarkedInnerMountains'
import { UnmarkedOuterMountains } from '~/components/ironbot/UnmarkedOuterMountains'
import { Keyword } from '~/components/KeywordButton'

import { FullInstructionsButton } from './common/FullInstructionsButton'

export const Chase = () => {
  const [full, setFull] = useState(false)

  return (
    <Flex direction="column" gap="3">
      <Box>
        Skip entirely, if the Ironclad already has more units in the Warband
        adjacent to the Warband in focus.
      </Box>

      <Heading>Target mountain:</Heading>

      <ul>
        <li>adjacent to the Warband in focus</li>
        <li>single movement = largest Warband</li>
        <li>
          if tie:
          <ul>
            <li>
              unmarked
              <UnmarkedInnerMountains />
              <UnmarkedOuterMountains />
            </li>
            <li>
              use <Keyword.MagicDie />
            </li>
          </ul>
        </li>
      </ul>

      <Heading>Source mountain:</Heading>

      <ul>
        <li>adjacent to the target mountain</li>
        <li>largest warband (Ferrum - 3)</li>
        <li>
          use <Keyword.MagicDie /> if tied
        </li>
      </ul>

      <ul>
        <li>Golems first, then Fighters</li>
        <li>until {'>'} than Woodwalker Fighters or empty (Ferrum - 3)</li>
      </ul>

      <FullInstructionsButton full={full} onClick={() => setFull(!full)} />

      {full && (
        <>
          <Heading>Target of the movement:</Heading>

          <Box>
            A mountain adjacent to the Warband in focus,where the Ironclad can
            use a single Warband movement to form the largest possible Warband.
            (If tied, select a mountain that is <Strong>unmarked</Strong>. If
            still tied, use the Magic die.)
          </Box>

          <Box>
            However, if the Ironclad already has more units in the Warband
            adjacent to the Warband in focus, it does not move at all.
          </Box>

          <Heading>Source mountain:</Heading>

          <Box>
            The mountain with the largest Ironclad Warband adjacent to the
            target. If this is Ferrum, ignore 3 Ironclad Fighters there (as they
            would be left behind to protect Ferrum) and re-evaluate the source
            of the movement. Use the Magic die if multiple mountains are tied.
          </Box>

          <Box>
            Move combat units from the source to the target until there are{' '}
            <Strong>more</Strong> units in the Ironclad Warband than the number
            of Woodwalker Fighters in the Warband in focus, or until the source
            mountain empties (but it does not move out the last 3 combat units
            from Ferrum). Golems always move before Fighters.
          </Box>
        </>
      )}
    </Flex>
  )
}
