// import { useParams } from "@remix-run/react";
import { useCallback } from 'react'

import { useDeck } from '~/hooks/useDeck'
// import { useLocationState2 } from "~/utils/state/useLocationState2";

/**
 * Hook to provide callback to end the round.
 */
export const useEndRound = () => {
  // const { botId, roundId } = useParams();
  const { cleanupRoundCards } = useDeck()
  // const [crystals, setCrystals] = useLocationState2("crystals");

  // const roundCardsReadyRef = useRef<Record<string, boolean>>({});
  // const [roundCardsReady, setRoundCardsReady] = useLocationState2(
  //   "round_preparation_done"
  // );

  return useCallback(() => {
    cleanupRoundCards()
  }, [cleanupRoundCards])
}
