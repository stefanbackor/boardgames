import { Link } from '@remix-run/react'

import { LinkWithPreservedState } from '~/utils/state/LinkWithPreservedState'

type LinkProps = Parameters<typeof Link>[0] & {
  params?: {
    gameId: string | null
    roundId: string | null
  }
}

/**
 * Link component that preserves state between navigation. Use this
 * to create link to next game step.
 *
 * @param props
 * @returns
 */
export const LinkNext = (props: LinkProps) => {
  const { params, to, ...rest } = props
  const { gameId, roundId } = params ?? {}

  const toWithParams = params
    ? `${to}?${new URLSearchParams(
        Object.fromEntries(
          Object.entries({ game: gameId, round: roundId })
            .filter(([, value]) => value !== null)
            .map(([key, value]) => [key, value as string]),
        ),
      ).toString()}`
    : to

  return (
    <LinkWithPreservedState
      to={toWithParams}
      preserveStateKey={[
        'cards',
        'crystals',
        'woodenbot_spirit_cubes',
        'woodenbot_difficulty',
        'woodenbot_vision_cards',
        'ironbot_difficulty',
      ]}
      {...rest}
    />
  )
}
