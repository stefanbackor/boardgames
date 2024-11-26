import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Callout, Strong } from '@radix-ui/themes'

export const NoDoubleMovementCallout = () => (
  <Callout.Root color="brown">
    <Callout.Icon>
      <InfoCircledIcon />
    </Callout.Icon>
    <Callout.Text>
      <Strong>REMINDER:</Strong> The same Fighters cannot be moved more than
      once in the same turn (according to the normal rules).
    </Callout.Text>
  </Callout.Root>
)
