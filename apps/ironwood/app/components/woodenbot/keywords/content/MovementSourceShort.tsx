import { Heading } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'

export const MovementSourceShort = () => {
  return (
    <>
      <Heading>Source forest:</Heading>
      <ul>
        <li>from adjacent to target</li>
        <li>from outer first</li>
        <li>from smaller Warbands</li>
        <li>
          in case of tie, use the <Keyword.MagicDie />
        </li>
      </ul>
    </>
  )
}
