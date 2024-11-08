import { useGameParams } from '~/hooks/useGameParams'
import { Bot } from '~/utils/state/types'

import { WoodenbotHand } from './woodenbot/WoodenbotHand'

export const BotHand = () => {
  const { botId } = useGameParams()

  return <>{botId === Bot.WOODENBOT && <WoodenbotHand />}</>
}
