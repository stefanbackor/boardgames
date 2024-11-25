import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Box, Callout, Strong } from '@radix-ui/themes'

import { SpiritCubesButton } from './SpiritCubesButton'

export const TakeTurnReminder = () => {
  return (
    <>
      <Callout.Root color="brown">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>
          <Strong>REMINDER:</Strong> Whenever a <Strong>Foundation</Strong> is
          placed, Spirits of the Forest receives a Spirit Cube.
          <Box mt="2">
            <SpiritCubesButton buttonProps={{ size: '1', color: 'green' }} />
          </Box>
        </Callout.Text>
      </Callout.Root>
    </>
  )
}
