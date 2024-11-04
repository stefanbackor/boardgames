import { IWCardAction } from '../state/types'

export const isRedCardAction = (action: IWCardAction): boolean => {
  return action.endsWith('_RED')
}
