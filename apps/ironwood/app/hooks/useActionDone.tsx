import { useCallback } from 'react'

import { useLocationState } from '~/utils/state/useLocationState'

/**
 * Marks action identified by a key as done.
 * @param key
 * @returns
 */
export const useActionDone = (key: string) => {
  const [actionsDone, setActionsDone] = useLocationState('actions_done')

  const value = Boolean(actionsDone && actionsDone[key]) ?? false

  const setter = useCallback(() => {
    setActionsDone((actionsDone) => ({ ...actionsDone, [key]: true }))
  }, [key, setActionsDone])

  return [value, setter] as const
}
