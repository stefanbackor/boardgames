import { useCallback } from 'react'

import { Difficulty } from '~/constants/difficulty'
import { isRedCardAction } from '~/utils/cards/isRedCardAction'
import { IWCardAction } from '~/utils/state/types'

import { useDifficulty } from '../useDifficulty'

/**
 * Validate whether a card action should be displayed/executed
 * in regard to difficulty settings (resolve red actions).
 * @returns (action?: IWCardAction) => boolean
 */
export const useValidateActionCallback = () => {
  const { hasDifficulty } = useDifficulty()

  const validateCallback = useCallback(
    (action?: IWCardAction) => {
      return (
        action &&
        (!isRedCardAction(action) ||
          (isRedCardAction(action) &&
            hasDifficulty(Difficulty.RESOLVE_RED_ACTIONS)))
      )
    },
    [hasDifficulty],
  )

  return validateCallback
}
