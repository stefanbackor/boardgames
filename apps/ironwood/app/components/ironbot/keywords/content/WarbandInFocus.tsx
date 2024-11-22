import { Box, Flex, Heading, Strong } from '@radix-ui/themes'
import { useState } from 'react'

import { Keyword } from '~/components/KeywordButton'

import { FullInstructionsButton } from './common/FullInstructionsButton'

export const WarbandInFocus = () => {
  const [full, setFull] = useState(false)

  return (
    <Flex direction="column" gap="3">
      <Heading>Warband in focus</Heading>

      <ul>
        <li>adjacent to Ironclad Warband</li>
        <li>with totem fading (unless last turn)</li>
        <li>with totem closer to outer forest</li>
        <li>with totem</li>
        <li>largest warband closest to totem</li>
        <li>smallest warband</li>

        <li>
          if tied:
          <ul>
            <li>differential {'>'}</li>
            <li>
              <Keyword.MagicDie size="2" />
            </li>
          </ul>
        </li>
      </ul>

      <FullInstructionsButton full={full} onClick={() => setFull(!full)} />

      {full && (
        <>
          <Heading>Warband in focus</Heading>

          <Box>
            When the bot plans to attack you, it focuses on one of your
            Woodwalker Warbands following this priority list:
          </Box>

          <ul>
            <li>
              Select a Woodwalker Warband with a Totem (unless the Totem is
              fading and it is the last turn of the round).
            </li>
            <li>
              If multiple Woodwalker Warbands have a Totem, break ties in the
              following priority order:
              <ul>
                <li>
                  Select one with a fading Totem (unless it is the last turn of
                  the round).
                </li>
                <li>Select one closer to an outer forest.</li>
                <li>Use the Magic die.</li>
              </ul>
            </li>
            <li>
              If no Woodwalker Warband has a Totem, select the largest
              Woodwalker Warband closest to a Totem.
            </li>
            <li>
              If no Totem is on the main board, select the smallest Woodwalker
              Warband available to select.
            </li>
          </ul>

          <Box>
            If it’s tied for multiple options, select the one where the
            differential in combat units is more favorable to the bot. If still
            tied, use the Magic die to select one (based on their forest’s
            numbers). The differential of combat units must be at least 0 or
            higher, otherwise the Ironbot will not attack.
          </Box>

          <Box>
            The selected Woodwalker Warband will be the{' '}
            <Strong> Warband in focus</Strong>.
          </Box>
        </>
      )}
    </Flex>
  )
}
