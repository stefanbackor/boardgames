import { Flex } from '@radix-ui/themes'

import { WW_VISION_CARDS_OUTSIDE } from '~/constants/woodenbot'
import { useLocationState } from '~/utils/state/useLocationState'

import { VisionCardBadge } from '../woodenbot/VisionCardBadge'

export const UnmarkedOuterMountains = () => {
  const [markedMountains] = useLocationState('ironbot_mountains_marked')

  return (
    <Flex direction="row" wrap="wrap" gap="1">
      {WW_VISION_CARDS_OUTSIDE.filter(
        (m) =>
          !markedMountains ||
          !markedMountains.length ||
          !markedMountains.map((mm) => mm[0]).includes(m[0]),
      )
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((m) => (
          <VisionCardBadge key={m[0]} card={m} />
        ))}
    </Flex>
  )
}
