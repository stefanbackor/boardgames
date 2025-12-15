import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ScriptData, SavedScript } from '@/types'

interface SavedScriptsState {
  scripts: Record<string, SavedScript>

  // Actions
  saveScript: (
    id: string | null,
    scriptData: ScriptData,
    name: string,
    author: string,
    encodedScript: string,
  ) => string
  loadScript: (id: string) => SavedScript | null
  deleteScript: (id: string) => void
  getAllScripts: () => SavedScript[]
  getScript: (id: string) => SavedScript | null
  hasScript: (id: string) => boolean
}

export const useSavedScriptsStore = create<SavedScriptsState>()(
  persist(
    (set, get) => ({
      scripts: {},

      saveScript: (id, scriptData, name, author, encodedScript) => {
        const scriptId = id || crypto.randomUUID()
        const now = new Date().toISOString()
        const existing = get().scripts[scriptId]

        set((state) => ({
          scripts: {
            ...state.scripts,
            [scriptId]: {
              id: scriptId,
              name,
              author,
              scriptData,
              encodedScript,
              savedAt: existing?.savedAt || now,
              lastModified: now,
            },
          },
        }))

        return scriptId
      },

      loadScript: (id) => get().scripts[id] || null,

      deleteScript: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.scripts
          return { scripts: rest }
        })
      },

      getAllScripts: () => {
        const scripts = Object.values(get().scripts)
        // Sort by lastModified descending (most recent first)
        return scripts.sort(
          (a, b) =>
            new Date(b.lastModified).getTime() -
            new Date(a.lastModified).getTime(),
        )
      },

      getScript: (id) => get().scripts[id] || null,

      hasScript: (id) => !!get().scripts[id],
    }),
    {
      name: 'botc-saved-scripts',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
