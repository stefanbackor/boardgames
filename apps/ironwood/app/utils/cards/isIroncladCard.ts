import { ICCard } from '~/constants/ironbot'

import { IWCard } from '../state/types'

export const isIroncladCard = (card: IWCard): card is ICCard => {
  return (
    Array.isArray(card) &&
    typeof card[0] === 'string' &&
    card[0].startsWith('IC')
  )
}
