import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Flex, Strong } from '@radix-ui/themes'

import { Keyword } from '~/components/woodenbot/keywords/KeywordButton'

type Props = {
  count: string | number
}

export const MovementPlunder = ({ count }: Props) => {
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
          An inner forest adjacent to a controlled Foundation with the largest
          number of Woodwalker Fighters adjacent.
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
          An inner forest adjacent to an outer Mountain with the largest number
          of Woodwalker Fighters in outer forests adjacent.{' '}
        </li>

        <li>If there are no Fighters on outer forests, skip the movement.</li>
      </ul>
      <Box>
        If multiple forests are tied, use the <Keyword.MagicDie />.
      </Box>
    </Flex>
  )
}
