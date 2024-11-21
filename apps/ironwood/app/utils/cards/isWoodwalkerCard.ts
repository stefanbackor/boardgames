import { WWCard } from '~/constants/woodenbot'

import { IWCard } from '../state/types'

export const isWoodwalkerCard = (card: IWCard): card is WWCard => {
  return (
    Array.isArray(card) &&
    typeof card[0] === 'string' &&
    card[0].startsWith('WW')
  )
}
