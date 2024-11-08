import { Link } from '@remix-run/react'

import { LinkWithPreservedState } from '~/utils/state/LinkWithPreservedState'

type LinkProps = Parameters<typeof Link>[0]

/**
 * Link component that preserves state between navigation. Use this
 * to create link to next game step.
 *
 * @param props
 * @returns
 */
export const LinkNext = (props: LinkProps) => {
  return (
    <LinkWithPreservedState
      {...props}
      preserveStateKey={[
        'cards',
        'crystals',
        'woodenbot_spirit_cubes',
        'woodenbot_difficulty',
        'woodenbot_vision_cards',
        'ironbot_difficulty',
      ]}
    />
  )
}
