import { Badge } from '@radix-ui/themes'

import { IWCard } from '~/utils/state/types'

type Props = { card?: IWCard }

export const CardBadge = ({ card }: Props) => {
  return <Badge color="gold">{card ? card[0] : '???'}</Badge>
}
