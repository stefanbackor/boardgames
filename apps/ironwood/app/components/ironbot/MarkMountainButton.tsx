import { Button, CheckboxCards, Flex } from '@radix-ui/themes'

import { ModalDialog } from '~/components/ModalDialog'
import { VisionCardBadge } from '~/components/woodenbot/VisionCardBadge'
import { WW_VISION_CARDS } from '~/constants/woodenbot'
import { useLocationState } from '~/utils/state/useLocationState'

export const MarkMountainButton = () => {
  const allMountains = WW_VISION_CARDS
  const [markedMountains, setMarkedMountains] = useLocationState(
    'ironbot_mountains_marked',
  )

  return (
    <ModalDialog
      title="Mark mountain"
      trigger={
        <Button size="1" color="green">
          Mark mountain
        </Button>
      }
    >
      <Flex direction="column" gap="2">
        <CheckboxCards.Root
          onValueChange={(values) => {
            setMarkedMountains(
              allMountains.filter((m) => values.includes(m[0])),
            )
          }}
          defaultValue={markedMountains?.map((m) => m[0])}
          columns={{ initial: '2' }}
          size="1"
          gap="1"
        >
          {allMountains
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map((mountain) => (
              <CheckboxCards.Item value={mountain[0]} key={mountain[0]}>
                <VisionCardBadge card={mountain} />
              </CheckboxCards.Item>
            ))}
        </CheckboxCards.Root>
      </Flex>
    </ModalDialog>
  )
}
