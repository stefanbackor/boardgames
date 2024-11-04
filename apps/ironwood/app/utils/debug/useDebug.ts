import { useCallback, useState } from 'react'

/**
 * Debug mode hook.
 */
export const useDebugMode = () => {
  const [isDebugMode, setDebugMode] = useState(
    () =>
      process.env.NODE_ENV === 'development' ||
      Boolean(sessionStorage.setItem('debug', 'yes')),
  )

  return {
    isDebugMode,
    toggleDebugMode: useCallback(
      () =>
        setDebugMode((value) => {
          const newValue = !value
          if (newValue) {
            sessionStorage.setItem('debug', 'yes')
          } else {
            sessionStorage.removeItem('debug')
          }
          return newValue
        }),
      [],
    ),
  }
}
