import { IWCard } from '../state/types'

export const isBaseCard = (card: IWCard): boolean => {
  return card[0].endsWith('P')
}
