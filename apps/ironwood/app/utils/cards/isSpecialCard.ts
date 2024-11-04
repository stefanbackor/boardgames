import { IWCard } from '../state/types'
import { isBaseCard } from './isBaseCard'

export const isSpecialCard = (card: IWCard): boolean => {
  return !isBaseCard(card)
}
