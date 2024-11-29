import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Flex } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'
import { PossibleMountains } from '~/components/woodenbot/PossibleMountains'

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
      <Box>
        Use the following priority list when recruiting for the Woodenbot,
        placing a Woodwalker Fighter in the indicated outer Forest with the
        smallest number (including zero) of Woodwalker Fighters:
      </Box>
      <ol>
        <li>
          Adjacent to a <Keyword.Totem />.
        </li>
        <li>
          Adjacent to a controlled <Keyword.Foundation />.
        </li>
        <li>
          Adjacent to a (preferably uncontrolled) possible outer mountain,
          preferring one without a <Keyword.Forge />.
          <PossibleMountains />
        </li>
        <li>
          Closest to the <Keyword.IroncladDrill />.
        </li>
      </ol>
      <Box>
        Use the <Keyword.MagicDie /> if tied.
      </Box>
    </Flex>
  )
}
