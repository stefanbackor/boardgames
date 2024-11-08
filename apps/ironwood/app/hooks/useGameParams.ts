import { useParams, useSearchParams } from '@remix-run/react'

/**
 * Return game params like botId, gameId, roundId in a convenient object.
 * @returns
 */
export const useGameParams = () => {
  const { botId, actionId } = useParams()

  const [searchParams] = useSearchParams()

  // Storing `gameId` and `roundId` in searchParams,
  // as the only dynamic params, to avoid URL pollution
  // for analytics.
  const gameId = searchParams.get('game')
  const roundId = searchParams.get('round')

  return { botId, gameId, roundId, actionId }
}
