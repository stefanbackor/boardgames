import { Badge, Strong } from '@radix-ui/themes'

import { WWVisionCard } from '~/constants/woodenbot'

type Props = { card?: WWVisionCard }

export const VisionCardBadge = ({ card }: Props) => {
  return (
    <Badge color="lime">
      <Strong>{card ? card[0] : '???'}</Strong>
    </Badge>
  )
}
