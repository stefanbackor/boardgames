// import { useParams } from "@remix-run/react";
import { useEffect } from 'react'

import { useDeck } from '~/hooks/useDeck'

/**
 * Trigger round cleanup
 */
export const useEndRound = () => {
  const { cleanupRoundCards } = useDeck()

  useEffect(() => {
    cleanupRoundCards()
  }, [cleanupRoundCards])
}
