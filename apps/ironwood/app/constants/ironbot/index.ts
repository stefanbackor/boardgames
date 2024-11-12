export * from './difficulty'
export * from './stance'
import { CardWithoutActions } from '../types'

export enum IBAction {
  FIGHT = 'FIGHT', // TODO: Remove placeholder
}

export type ICCard = [
  ...CardWithoutActions,
  actions: [first: IBAction, second?: IBAction],
]

export const IC_CARDS_BASE: Array<ICCard> = [
  ['IC01P', [0, 0, 0], [IBAction.FIGHT, IBAction.FIGHT]], // TODO: Remove placeholder
  ['IC02P', [0, 0, 0], [IBAction.FIGHT, IBAction.FIGHT]], // TODO: Remove placeholder
  ['IC03P', [0, 0, 0], [IBAction.FIGHT, IBAction.FIGHT]], // TODO: Remove placeholder
]

export const IC_CARDS_SPECIAL: Array<ICCard> = [
  ['IC04', [0, 1, 4], [IBAction.FIGHT, IBAction.FIGHT]], // TODO: Remove placeholder
  ['IC05', [0, 1, 4], [IBAction.FIGHT, IBAction.FIGHT]], // TODO: Remove placeholder
  ['IC06', [0, 1, 4], [IBAction.FIGHT, IBAction.FIGHT]], // TODO: Remove placeholder
  ['IC07', [0, 1, 4], [IBAction.FIGHT, IBAction.FIGHT]], // TODO: Remove placeholder
  ['IC08', [0, 1, 4], [IBAction.FIGHT, IBAction.FIGHT]], // TODO: Remove placeholder
  ['IC09', [0, 1, 4], [IBAction.FIGHT, IBAction.FIGHT]], // TODO: Remove placeholder
  ['IC10', [0, 1, 4], [IBAction.FIGHT, IBAction.FIGHT]], // TODO: Remove placeholder
]

export const IC_CARDS = [...IC_CARDS_BASE, ...IC_CARDS_SPECIAL]
