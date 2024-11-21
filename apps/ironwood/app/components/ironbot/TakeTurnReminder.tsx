import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Box, Callout, Strong } from '@radix-ui/themes'

import { MarkMountainButton } from './MarkMountainButton'

export const TakeTurnReminder = () => {
  return (
    <>
      <Callout.Root color="brown">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>
          <Strong>REMINDER:</Strong> Whenever you{' '}
          <Strong>play, discard, or burn a vision card</Strong>, the Ironbot
          marks the corresponding mountain so it will “know” that you will never
          try to discover there again.
          <Box mt="2">
            <MarkMountainButton />
          </Box>
        </Callout.Text>
      </Callout.Root>
    </>
  )
}
