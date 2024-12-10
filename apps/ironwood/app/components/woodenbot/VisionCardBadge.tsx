import { Badge, BadgeProps, Strong } from '@radix-ui/themes'

import { WWVisionCard } from '~/constants/woodenbot'

interface Props extends BadgeProps {
  card?: WWVisionCard
}

export const VisionCardBadge = ({ card, ...rest }: Props) => {
  return (
    <Badge color="lime" {...rest}>
      <Strong>{card ? card[0] : '???'}</Strong>
    </Badge>
  )
}
