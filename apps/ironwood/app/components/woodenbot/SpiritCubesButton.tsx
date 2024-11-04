import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Button, Callout, Flex } from '@radix-ui/themes'
import { useCallback } from 'react'

import { useLocationState } from '~/utils/state/useLocationState'

import { ModalDialog } from '../ModalDialog'
import { Keyword } from './keywords/KeywordButton'

export const SpiritCubesButton = () => {
  const [, setSpiritCubes] = useLocationState('woodenbot_spirit_cubes')

  const onAddClick = useCallback(() => {
    setSpiritCubes((cubes) => cubes + 1)
  }, [setSpiritCubes])

  const onRemoveClick = useCallback(() => {
    setSpiritCubes((cubes) => (cubes > 0 ? cubes - 1 : 0))
  }, [setSpiritCubes])

  return (
    <ModalDialog
      title="Spirits of the Forest"
      trigger={<Button>Add spirit cube</Button>}
      action={
        <Flex direction="row" justify="center" gap="2">
          <Button variant="soft" onClick={onRemoveClick}>
            Remove
          </Button>
          <Button onClick={onAddClick}>Add cube</Button>
        </Flex>
      }
    >
      <Callout.Root color="brown">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          <Flex direction="column" gap="3">
            <Box>
              Whenever a <Keyword.Foundation /> is placed, Spirits of the Forest
              receives a <Keyword.SpiritCube />.
            </Box>
            <Box>
              For each combat, a <Keyword.SpiritCube /> will be discarded to
              apply modifiers to <Keyword.Woodenbot />
              &apos;s wagered card.
            </Box>
          </Flex>
        </Callout.Text>
      </Callout.Root>
    </ModalDialog>
  )
}
