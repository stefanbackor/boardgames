import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import { useState } from 'react'

import { FullInstructionsButton } from '~/components/ironbot/keywords/content/common/FullInstructionsButton'
import { Keyword } from '~/components/KeywordButton'
import { NoDoubleMovementCallout } from '~/components/NoDoubleMovementCallout'
import { PossibleMountains } from '~/components/woodenbot/PossibleMountains'

type Props = {
  count: string
}

export const MovementSecure = ({ count }: Props) => {
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
          Totem with Woodwalker
          <ol>
            <li>Outer forest + Totem</li>
            <li>Inner forest to outer with least Ironclads adjacent + Totem</li>
          </ol>
        </li>

        <li>
          Totem on the board
          <ol>
            <li>Forest with Totem with most Woodwalkers adjacent</li>
            <li>Forest adjacent to Totem with most Woodwalkers adjacent</li>
          </ol>
        </li>
        <li>
          No Totem
          <ul>
            <li>Inner forest to outer</li>
            <li>
              Adjacent to a possible mountain
              <PossibleMountains />
            </li>
            <li>prefer uncontrolled</li>
            <li>with most Woodwalkers adjacent</li>
          </ul>
        </li>
      </ol>

      <Box>
        If multiple forests are tied, use the <Keyword.MagicDie />.
      </Box>

      <NoDoubleMovementCallout />

      <FullInstructionsButton onClick={() => setFull(!full)} full={full} />

      {full && (
        <>
          <Separator size="4" />
          <Text size="4">
            Target of the movement, if a{' '}
            <strong>Woodwalker Warband has a Totem</strong>:
          </Text>
          <ul>
            <li>
              An outer forest adjacent to the Totem (carrying the Totem with
              them).
            </li>
            <li>
              An inner forest adjacent to an outer forest with the smallest
              number of Ironclad Fighters adjacent (carrying the Totem with
              them).
            </li>
          </ul>
          <Text size="4">
            Target of the movement, if a{' '}
            <strong>Totem is present on the board</strong>:
          </Text>
          <ul>
            <li>
              A forest with a Totem with the largest number of Woodwalker
              Fighters adjacent.
            </li>
            <li>
              An inner forest adjacent to a Totem with the largest number of
              Woodwalker Fighters adjacent.
            </li>
          </ul>
          <Text size="4">
            Target of the movement, if <strong>no Totem</strong> is present on
            the board:
          </Text>
          <ul>
            <li>
              An inner forest adjacent to an outer forest and adjacent to a
              possible (preferable uncontrolled) mountain with the largest
              number of Woodwalker Fighters adjacent.
            </li>
          </ul>
          <Box>If multiple forests are tied, use the Magic Die.</Box>
        </>
      )}
    </Flex>
  )
}
