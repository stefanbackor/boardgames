import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface DisplayOptionsState {
  /** Whether to append the English character name in brackets to translated names */
  showEnglishNames: boolean

  // Actions
  setShowEnglishNames: (value: boolean) => void
}

/**
 * Store for script rendering preferences that are not part of the script itself.
 * Persisted to localStorage so the choice survives reloads and shared links.
 */
export const useDisplayOptionsStore = create<DisplayOptionsState>()(
  persist(
    (set) => ({
      showEnglishNames: false,

      setShowEnglishNames: (value) => set({ showEnglishNames: value }),
    }),
    {
      name: 'botc-display-options',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
