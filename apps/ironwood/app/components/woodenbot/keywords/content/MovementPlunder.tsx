import { InfoCircledIcon } from '@radix-ui/react-icons'
import {
  Box,
  Callout,
  Flex,
  Heading,
  Separator,
  Strong,
} from '@radix-ui/themes'
import { useState } from 'react'

import { FullInstructionsButton } from '~/components/ironbot/keywords/content/common/FullInstructionsButton'
import { Keyword } from '~/components/KeywordButton'

type Props = {
  count: string
}

export const MovementPlunder = ({ count }: Props) => {
  const [full, setFull] = useState(false)

  return (
    <Flex direction="column" gap="3">
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Move <Keyword.WoodwalkerWarrior count={count} />
        </Callout.Text>
      </Callout.Root>

      <Heading>Target forest:</Heading>

      <ol>
        <li>
          <Strong>Ironclad 5+ crystals</Strong>
          <ol>
            <li>Inner to Ferrum with most Woodwalkers adjacent</li>
            <li>Inner controlled Foundation with most Woodwalkers adjacent</li>
          </ol>
        </li>
        <li>
          <Strong>Drill 2+ crystals</Strong>
          <ol>
            <li>Inner to Drill with most Woodwalkers adjacent</li>
            <li>Inner to Ferrum with most Woodwalkers adjacent</li>
          </ol>
        </li>
        <li>
          <Strong>Otherwise</Strong>
          <ol>
            <li>Inner to outer with most Woodwalkers in outer</li>
            <li>Skip if no Woodwalkers in outer</li>
          </ol>
        </li>
      </ol>

      <Box>
        If multiple forests are tied, use the <Keyword.MagicDie />.
      </Box>

      <FullInstructionsButton onClick={() => setFull(!full)} full={full} />

      {full && (
        <>
          <Separator size="4" />
          <Box>
            Target of the movement, if the Ironclad (you) have{' '}
            <Strong wrap="nowrap">5 or more</Strong> available{' '}
            <Strong>Crystals</Strong>:
          </Box>
          <ul>
            <li>
              An inner forest adjacent to Ferrum with the largest number of
              Woodwalker Fighters adjacent.
            </li>
            <li>
              An inner forest adjacent to a controlled Foundation with the
              largest number of Woodwalker Fighters adjacent.
            </li>
          </ul>
          <Box>
            Target of the movement, if the{' '}
            <Strong>Drill has 2 or more Crystals</Strong> in its Cargo area:
          </Box>
          <ul>
            <li>
              An inner forest adjacent to the Drill with the largest number of
              Woodwalker Fighters adjacent.
            </li>
            <li>
              An inner forest adjacent to Ferrum with the largest number of
              Woodwalker Fighters adjacent.
            </li>
          </ul>
          <Box>Target of the movement otherwise:</Box>
          <ul>
            <li>
              An inner forest adjacent to an outer Mountain with the largest
              number of Woodwalker Fighters in outer forests adjacent.{' '}
            </li>

            <li>
              If there are no Fighters on outer forests, skip the movement.
            </li>
          </ul>
          <Box>If multiple forests are tied, use the Magic Die.</Box>
        </>
      )}
    </Flex>
  )
}
