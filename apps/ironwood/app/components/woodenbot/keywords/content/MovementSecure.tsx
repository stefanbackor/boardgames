import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Flex, Text } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'

type Props = {
  count: string
}

export const MovementSecure = ({ count }: Props) => {
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
      <Text size="4">
        Target of the movement, if a{' '}
        <strong>Woodwalker Warband has a Totem</strong>:
      </Text>
      <ul>
        <li>
          An outer forest adjacent to the Totem (carrying the Totem with them).
        </li>
        <li>
          An inner forest adjacent to an outer forest with the smallest number
          of Ironclad Fighters adjacent (carrying the Totem with them).
        </li>
      </ul>
      <Text size="4">
        Target of the movement, if a{' '}
        <strong>Totem is present on the board</strong>:
      </Text>
      <ul>
        <li>
          A forest with a Totem with the largest number of Woodwalker Fighters
          adjacent.
        </li>
        <li>
          An inner forest adjacent to a Totem with the largest number of
          Woodwalker Fighters adjacent.
        </li>
      </ul>
      <Text size="4">
        Target of the movement, if <strong>no Totem</strong> is present on the
        board:
      </Text>
      <ul>
        <li>
          An inner forest adjacent to an outer forest and adjacent to a possible
          (preferable uncontrolled) mountain with the largest number of
          Woodwalker Fighters adjacent.
        </li>
      </ul>
      <Box>
        If multiple forests are tied, use the <Keyword.MagicDie />.
      </Box>
    </Flex>
  )
}
