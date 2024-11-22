import { Box, Callout, Flex, Strong, Text } from '@radix-ui/themes'

import { WW_VISION_CARDS } from '~/constants/woodenbot'
import { useLocationState } from '~/utils/state/useLocationState'

import { VisionCardBadge } from '../woodenbot/VisionCardBadge'

export const UnmarkedMountains = () => {
  const [markedMountains] = useLocationState('ironbot_mountains_marked')
  const allMountains = WW_VISION_CARDS

  return (
    <Callout.Root color="gray" size="1">
      <Callout.Text>
        <Flex
          direction="row"
          wrap="nowrap"
          gap="1"
          justify="start"
          align="start"
        >
          <Box>
            <Text size="2">
              <Strong>Skip marked mountains: </Strong>
            </Text>
          </Box>
          <Box>
            {markedMountains?.length === allMountains.length ? (
              <Text size="2">None, pick any mountain.</Text>
            ) : (
              markedMountains &&
              markedMountains
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map((m) => <VisionCardBadge key={m[0]} card={m} />)
            )}
          </Box>
        </Flex>
      </Callout.Text>
    </Callout.Root>
  )
}
