import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Button, Callout, CheckboxCards, Flex } from '@radix-ui/themes'

import { WW_VISION_CARDS } from '~/constants/woodenbot'
import { useLocationState } from '~/utils/state/useLocationState'

import { ModalDialog } from '../ModalDialog'
import { VisionCardBadge } from '../woodenbot/VisionCardBadge'

export const MarkMountainButton = () => {
  const allMountains = WW_VISION_CARDS
  const [markedMountains, setMarkedMountains] = useLocationState(
    'ironbot_mountains_marked',
  )

  return (
    <ModalDialog
      title="Mark mountain"
      trigger={<Button size="1">Mark mountain</Button>}
    >
      <Flex direction="column" gap="2">
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            Mark the mountains for vision cards that you have played, discarded,
            or burned.
          </Callout.Text>
        </Callout.Root>

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
