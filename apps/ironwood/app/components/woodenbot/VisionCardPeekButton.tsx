import { Box, Button, Flex } from '@radix-ui/themes'
import { useState } from 'react'

import { Keyword } from '~/components/KeywordButton'
import { ModalDialog } from '~/components/ModalDialog'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'

import { VisionCardBadge } from './VisionCardBadge'

export const VisionCardPeekButton = () => {
  const { drawPileTopCard } = useVisionDeck()
  const [full, setFull] = useState(false)

  return (
    <ModalDialog
      title="Peek at bot's Vision deck"
      trigger={<Button>Peek at Visions</Button>}
      action={
        <Button
          disabled={full}
          onClick={(event) => {
            setFull(true)
            event.preventDefault()
          }}
        >
          Confirm
        </Button>
      }
    >
      <Flex direction="column" gap="3">
        <Box>
          You are allowed to peek at the top card of the bot&apos;s Vision deck
          on <Keyword.IroncladDrill />
          &apos;s 2nd movement to see bot&apos;s next <Keyword.Locate />{' '}
          mountain.
        </Box>
        <Flex justify="center" align="center" gap="2">
          {full && <VisionCardBadge card={drawPileTopCard} size="3" />}
        </Flex>
      </Flex>
    </ModalDialog>
  )
}
