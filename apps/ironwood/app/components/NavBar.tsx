import { Box, Flex } from '@radix-ui/themes'
import { useParams } from '@remix-run/react'
import { PropsWithChildren } from 'react'

import { Bot } from '~/utils/state/types'

import { MagicDie } from './MagicDie'
import { CrystalsButton } from './woodenbot/CrystalsButton'
import { SpiritCubesButton } from './woodenbot/SpiritCubesButton'
import { WagerDefenseCardButton } from './woodenbot/WagerDefenseCardButton'

export const NavBar = ({ children }: PropsWithChildren) => {
  const { botId, actionId } = useParams()

  return (
    <Box
      style={{
        position: 'sticky',
        top: '0',
        zIndex: 1,
      }}
    >
      <Flex py="3" gap="6" justify="between" align="end">
        <Flex gap="1" wrap="wrap">
          {actionId ? <MagicDie /> : null}
          {actionId ? <WagerDefenseCardButton /> : null}
          {botId === Bot.WOODENBOT ? (
            <>
              <CrystalsButton />
              <SpiritCubesButton />
            </>
          ) : null}
        </Flex>
        {children}
      </Flex>
    </Box>
  )
}
