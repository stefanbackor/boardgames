import { useActionDone } from '~/hooks/useActionDone'
import { IWCard, IWCardAction } from '~/utils/state/types'

/**
 * Marks card action as done.
 * @param card
 * @param action
 * @param red
 * @returns
 */
export const useCardActionDone = (
  card: IWCard,
  action: IWCardAction,
  red?: boolean,
) => {
  return useActionDone([card[0], action, red].join('/'))
}
