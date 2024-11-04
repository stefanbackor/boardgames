import { useLocation, useNavigate } from '@remix-run/react'
import { useCallback, useState } from 'react'

import { initialState } from './initialState'
import { LocationState } from './types'

/**
 * App wide mutable cache object
 */
const locationStateRef = {
  current: initialState,
}

export function useLocationState<K extends keyof LocationState>(key: K) {
  const location = useLocation()
  const navigate = useNavigate()

  const [, setCurrent] = useState<LocationState[K]>(() => {
    return location.state ? location.state[key] : initialState[key]
  })

  // Updates which happen right after each other needs to be store temporary
  // before sync to the `location.state` happens in next render.
  locationStateRef.current = { ...initialState, ...location.state }

  const setter = useCallback(
    (
      value:
        | LocationState[K]
        | ((prevState: LocationState[K]) => LocationState[K]),
    ) => {
      const newValue =
        typeof value === 'function'
          ? (value as (prevState: LocationState[K]) => LocationState[K])(
              locationStateRef.current[key],
            )
          : value

      setCurrent(newValue)

      locationStateRef.current = {
        ...locationStateRef.current,
        [`${key}`]: newValue,
      }

      navigate(location.pathname, {
        replace: true,
        preventScrollReset: true,
        state: locationStateRef.current,
      })
    },
    [key, location.pathname, navigate],
  )

  return [locationStateRef.current[key], setter] as const
}
