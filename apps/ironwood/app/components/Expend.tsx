import { useMemo } from 'react'

import { ACTION_PILE_PAIRS, useDeck } from '~/hooks/useDeck'
import { useGameParams } from '~/hooks/useGameParams'
import { IWCard } from '~/utils/state/types'

import { ExpendContent } from './ExpendContent'

export const Expend = () => {
  const { actionId } = useGameParams()
  const { deck } = useDeck()

  const currentActionId = parseInt(actionId || '0', 10)

  const cards = useMemo(() => {
    return ACTION_PILE_PAIRS[currentActionId - 1]
      .map((pile) => deck.get(pile).map((card) => card))
      .flat()
      .filter(Boolean) as Array<IWCard>
  }, [currentActionId, deck])

  return <ExpendContent cards={cards} />
}
