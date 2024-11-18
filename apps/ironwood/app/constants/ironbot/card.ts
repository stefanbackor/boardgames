import { CardWithoutActions } from '../types'
import { IBAction } from './action'

export type ICCard = [
  ...CardWithoutActions,
  actions: [first: IBAction, second?: IBAction],
]

export const IC_CARDS_BASE: Array<ICCard> = [
  ['IC01P', [0, 1, 2], [IBAction.FORGE, IBAction.WARBAND_RED]],
  ['IC02P', [1, 0, 2], [IBAction.CARD_RED, IBAction.HIT]],
  ['IC03P', [1, 1, 0], [IBAction.FORGE, IBAction.CRYSTALS_RED]],
]

export const IC_CARDS_SPECIAL: Array<ICCard> = [
  ['IC04', [1, 2, 2], [IBAction.COMPASS, IBAction.CRYSTALS]],
  ['IC05', [2, 0, 3], [IBAction.COMPASS, IBAction.DRILL_RED]],
  ['IC06', [1, 2, 2], [IBAction.CARD, IBAction.HIT]],
  ['IC07', [0, 1, 4], [IBAction.CARD_RED, IBAction.WARBAND]],
  ['IC08', [2, 0, 3], [IBAction.DRILL, IBAction.CARD_RED]],
  ['IC09', [2, 0, 3], [IBAction.DRILL, IBAction.COMPASS]],
  ['IC10', [0, 1, 4], [IBAction.FORGE, IBAction.SHIELD]],
  ['IC11', [3, 0, 0], [IBAction.GOLEM, IBAction.COMPASS]],
  ['IC12', [1, 2, 2], [IBAction.DRILL, IBAction.CARD]],
  ['IC13', [0, 1, 4], [IBAction.HIT, IBAction.COMPASS]],
  ['IC14', [0, 1, 4], [IBAction.WARBAND, IBAction.CRYSTALS]],
  ['IC15', [1, 2, 2], [IBAction.CRYSTALS, IBAction.DRILL]],
  ['IC16', [3, 0, 0], [IBAction.WARBAND, IBAction.HIT]],
  ['IC17', [3, 0, 0], [IBAction.WARBAND, IBAction.COMPASS]],
  ['IC18', [2, 1, 1], [IBAction.WARBAND, IBAction.DRILL]],
  ['IC19', [3, 0, 0], [IBAction.GOLEM, IBAction.COMPASS]],
  ['IC20', [1, 1, 0], [IBAction.BATTLE, IBAction.FORGE]],
  ['IC21', [2, 1, 1], [IBAction.SHIELD, IBAction.SHIELD_RED]],
  ['IC22', [1, 2, 2], [IBAction.CARD, IBAction.CRYSTALS]],
  ['IC23', [2, 0, 3], [IBAction.HIT, IBAction.SHIELD]],
  ['IC24', [2, 0, 3], [IBAction.DRILL, IBAction.COMPASS]],
  ['IC25', [1, 2, 2], [IBAction.WARBAND_RED, IBAction.BATTLE]],
  ['IC26', [2, 1, 1], [IBAction.BATTLE, IBAction.SHIELD]],
  ['IC27', [3, 0, 0], [IBAction.CARD, IBAction.SHIELD]],
  ['IC28', [2, 1, 1], [IBAction.CRYSTALS, IBAction.CARD]],
  ['IC29', [3, 0, 0], [IBAction.COMPASS, IBAction.SHIELD]],
  ['IC30', [2, 0, 3], [IBAction.COMPASS, IBAction.DRILL_RED]],
  ['IC31', [2, 0, 3], [IBAction.SHIELD, IBAction.HIT]],
  ['IC32', [1, 2, 2], [IBAction.HIT, IBAction.GOLEM]],
  ['IC33', [0, 1, 4], [IBAction.WARBAND, IBAction.FORGE]],
  ['IC34', [1, 2, 2], [IBAction.CRYSTALS, IBAction.DRILL]],
  ['IC35', [0, 1, 4], [IBAction.CRYSTALS, IBAction.CARD]],
  ['IC36', [2, 1, 1], [IBAction.SHIELD, IBAction.COMPASS]],
  ['IC37', [0, 1, 4], [IBAction.GOLEM, IBAction.GOLEM_RED]],
  ['IC38', [0, 1, 4], [IBAction.BATTLE]],
]

export const IC_CARDS = [...IC_CARDS_BASE, ...IC_CARDS_SPECIAL]
