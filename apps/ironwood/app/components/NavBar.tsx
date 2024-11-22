import { Box, Flex } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

import { useGameParams } from '~/hooks/useGameParams'
import { Bot } from '~/utils/state/types'

import { WagerDefenseCardButton as IronbotWagerDefenseCardButton } from './ironbot/WagerDefenseCardButton'
import { MagicDie } from './MagicDie'
import { CrystalsButton } from './woodenbot/CrystalsButton'
import { SpiritCubesButton } from './woodenbot/SpiritCubesButton'
import { WagerDefenseCardButton as WoodenbotWagerDefenseCardButton } from './woodenbot/WagerDefenseCardButton'

export const NavBar = ({ children }: PropsWithChildren) => {
  const { botId } = useGameParams()

  return (
    <Box
      style={{
        position: 'sticky',
        top: '0',
        bottom: '0',
        zIndex: 1,
      }}
    >
      <Flex py="3" gap="6" justify="between" align="end">
        <Flex gap="1" wrap="wrap">
          <MagicDie />
          {botId === Bot.IRONBOT && <IronbotWagerDefenseCardButton />}
          {botId === Bot.WOODENBOT && <WoodenbotWagerDefenseCardButton />}
          <CrystalsButton />

          {botId === Bot.WOODENBOT && <SpiritCubesButton />}
        </Flex>
        {children}
      </Flex>
    </Box>
  )
}
