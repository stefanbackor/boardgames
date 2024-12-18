import { useCallback, useRef } from 'react'

import { Difficulty } from '~/constants/difficulty'
import { useDeck } from '~/hooks/useDeck'
import { Bot } from '~/utils/state/types'
import { useLocationState } from '~/utils/state/useLocationState'

import { useDifficulty } from './useDifficulty'
import { useGameParams } from './useGameParams'

/**
 * Hook providing callback to prepare round cards once, add crystals.
 * @returns
 */
export const usePrepareRound = () => {
  const { botId, roundId } = useGameParams()
  const { prepareRoundCards } = useDeck()
  const { hasDifficulty } = useDifficulty()
  const [, setCrystals] = useLocationState('crystals')
  const [, setSpiritCubes] = useLocationState('woodenbot_spirit_cubes')

  const roundCardsReadyRef = useRef<Record<string, boolean>>({})
  const [roundCardsReady, setRoundCardsReady] = useLocationState(
    'round_preparation_done',
  )

  return useCallback(() => {
    if (roundId && !roundCardsReady && !roundCardsReadyRef.current[roundId]) {
      if (botId === Bot.WOODENBOT) {
        setCrystals((crystals) => crystals + 1)
        prepareRoundCards(2)

        if (roundId === '1') {
          if (hasDifficulty(Difficulty.ADD_EXTRA_SPECIAL_ELEMENT)) {
            setSpiritCubes(2)
          }
          if (hasDifficulty(Difficulty.ADD_EXTRA_SPECIAL_CARDS)) {
            prepareRoundCards(2)
          }
        }
      }

      if (botId === Bot.IRONBOT) {
        setCrystals((crystals) => crystals + 2)
        prepareRoundCards(2)

        if (roundId === '1') {
          if (hasDifficulty(Difficulty.ADD_EXTRA_SPECIAL_CARDS)) {
            prepareRoundCards(2)
          }
        }
      }

      setRoundCardsReady(true)
      roundCardsReadyRef.current[roundId] = true
    }
  }, [
    botId,
    hasDifficulty,
    prepareRoundCards,
    roundCardsReady,
    roundId,
    setCrystals,
    setRoundCardsReady,
    setSpiritCubes,
  ])
}
