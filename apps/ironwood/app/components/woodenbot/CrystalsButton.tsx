import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Button, Callout, Flex, Text } from '@radix-ui/themes'
import { useCallback } from 'react'

import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../KeywordButton'
import { ModalDialog } from '../ModalDialog'

type Props = {
  label?: string
}

export const CrystalsButton = ({ label }: Props) => {
  const [crystals, setCrystals] = useLocationState('crystals')

  const onAddClick = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
  }, [setCrystals])

  const onRemoveClick = useCallback(() => {
    setCrystals((crystals) => (crystals > 0 ? crystals - 1 : 0))
  }, [setCrystals])

  return (
    <ModalDialog
      title="Crystals"
      trigger={<Button>{label || 'Add crystal'}</Button>}
    >
      <Flex direction="column" gap="3">
        <Callout.Root color="brown">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            <Flex direction="column" gap="3">
              <Box>
                Whenever your <Keyword.Ferrum /> is defeated,{' '}
                <Keyword.Woodenbot /> steals half of your crystals rounded up.
                The rest is discarded.
              </Box>
              <Box>
                Whenever your <Keyword.Drill /> is defeated,{' '}
                <Keyword.Woodenbot /> steals 1 crystal from the drill. The rest
                gets discarded.
              </Box>
            </Flex>
          </Callout.Text>
        </Callout.Root>

        <Flex justify="center">
          <Keyword.Woodenbot />
          <Text>&nbsp;has {crystals} crystals.</Text>
        </Flex>

        <Flex direction="row" justify="center" gap="2">
          <Button variant="soft" onClick={onRemoveClick}>
            Remove
          </Button>
          <Button onClick={onAddClick}>Add crystal</Button>
        </Flex>
      </Flex>
    </ModalDialog>
  )
}
