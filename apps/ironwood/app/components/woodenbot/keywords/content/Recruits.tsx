import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Flex, Text } from '@radix-ui/themes'

import { Keyword } from '~/components/woodenbot/keywords/KeywordButton'

type Props = {
  count: string
}

export const Recruits = ({ count }: Props) => {
  return (
    <Flex direction="column" gap="2">
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Recruit <Keyword.WoodwalkerWarrior count={count} />
        </Callout.Text>
      </Callout.Root>
      <Text size="4">
        Use the following priority list when recruiting for the Woodenbot,
        placing a Woodwalker Fighter in the indicated outer Forest with the
        smallest number (including zero) of Woodwalker Fighters:
      </Text>
      <ol>
        <li>Adjacent to a Totem.</li>
        <li>Adjacent to a controlled Foundation.</li>
        <li>
          Adjacent to a (preferably uncontrolled) possible outer mountain,
          preferring one without a Forge.
        </li>
        <li>Closest to the Drill.</li>
      </ol>
      <Box>
        Use the <Keyword.MagicDie /> if tied.
      </Box>
    </Flex>
  )
}
