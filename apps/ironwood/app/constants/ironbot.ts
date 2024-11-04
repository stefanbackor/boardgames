import { CardWithoutActions } from './types'

export enum ICAction {
  FIGHT = 'FIGHT', // TODO: Remove placeholder
}

export type ICCard = [
  ...CardWithoutActions,
  actions: [first: ICAction, second?: ICAction],
]

export const IC_CARDS_BASE: Array<ICCard> = [
  ['IC01P', [0, 0, 0], [ICAction.FIGHT, ICAction.FIGHT]], // TODO: Remove placeholder
  ['IC02P', [0, 0, 0], [ICAction.FIGHT, ICAction.FIGHT]], // TODO: Remove placeholder
  ['IC03P', [0, 0, 0], [ICAction.FIGHT, ICAction.FIGHT]], // TODO: Remove placeholder
]

export const IC_CARDS_SPECIAL: Array<ICCard> = [
  ['WW04', [0, 1, 4], [ICAction.FIGHT, ICAction.FIGHT]], // TODO: Remove placeholder
]

export const IC_CARDS = [...IC_CARDS_BASE, ...IC_CARDS_SPECIAL]
