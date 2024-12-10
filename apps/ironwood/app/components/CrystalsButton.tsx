import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Button, ButtonProps, Callout, Flex, Text } from '@radix-ui/themes'
import { useCallback } from 'react'

import { useGameParams } from '~/hooks/useGameParams'
import { Bot } from '~/utils/state/types'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from './KeywordButton'
import { ModalDialog } from './ModalDialog'

interface Props extends ButtonProps {
  label?: string
}

export const CrystalsButton = ({ label, ...buttonProps }: Props) => {
  const { botId } = useGameParams()
  const [crystals, setCrystals] = useLocationState('crystals')

  const onAddClick = useCallback(() => {
    setCrystals((crystals) => crystals + 1)
  }, [setCrystals])

  const onRemoveClick = useCallback(() => {
    setCrystals((crystals) => Math.max(crystals - 1, 0))
  }, [setCrystals])

  return (
    <ModalDialog
      title="Crystals"
      trigger={
        <Button {...buttonProps}>{label || `Crystals (${crystals})`}</Button>
      }
    >
      <Flex direction="column" gap="3">
        {botId === Bot.WOODENBOT && (
          <Callout.Root color="brown">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              <Flex direction="column" gap="3">
                <Box>
                  Whenever your <Keyword.Ferrum /> is defeated,{' '}
                  <Keyword.Woodenbot /> steals half of your crystals rounded up.
                </Box>
                <Box>
                  Whenever your <Keyword.IroncladDrill /> is defeated,{' '}
                  <Keyword.Woodenbot /> steals 1 crystal from the drill. The
                  rest gets discarded.
                </Box>
              </Flex>
            </Callout.Text>
          </Callout.Root>
        )}

        {botId === Bot.IRONBOT && (
          <Callout.Root color="brown">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              <Flex direction="column" gap="3">
                <Box>
                  Whenever <Keyword.Ironbot /> <Keyword.Ferrum /> is defeated,{' '}
                  you steal half of bot&apos;s crystals rounded up. The rest is
                  discarded.
                </Box>
                <Box>
                  Whenever <Keyword.Ironbot /> <Keyword.IroncladDrill /> is
                  defeated, you steal 1 crystal from the drill. The rest gets
                  discarded.
                </Box>
              </Flex>
            </Callout.Text>
          </Callout.Root>
        )}

        <Flex justify="center">
          {botId === Bot.WOODENBOT && (
            <>
              <Keyword.Woodenbot />
              <Text>&nbsp;has {crystals} crystals.</Text>
            </>
          )}
          {botId === Bot.IRONBOT && (
            <>
              <Keyword.Ironbot />
              <Text>&nbsp;has {crystals} crystals in Ferrum.</Text>
            </>
          )}
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
