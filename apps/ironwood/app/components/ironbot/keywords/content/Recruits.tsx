import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Callout, Flex } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'

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
          Recruit <Keyword.IroncladWarrior count={count} />
        </Callout.Text>
      </Callout.Root>
      <Box>
        Use the following priority list when recruiting for the Ironbot, placing
        an Ironclad Fighter at the indicated location:
      </Box>
      <ol>
        <li>Ferrum, if there are less than 3 Fighters in Ferrum</li>
        <li>The Forge with the smallest Ironclad Warband (including Ferrum)</li>
      </ol>
      <Box>
        Use the <Keyword.MagicDie /> if tied.
      </Box>
    </Flex>
  )
}
