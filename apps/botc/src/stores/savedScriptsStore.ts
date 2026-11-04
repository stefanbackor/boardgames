import { create } from 'zustand'
import {
  loadSavedScripts,
  writeSavedScript,
  deleteSavedScript,
} from './savedScriptsDb'
import type { ScriptData, SavedScript } from '@/types'

interface SavedScriptsState {
  scripts: Record<string, SavedScript>

  initialize: () => Promise<void>

  // Actions
  saveScript: (
    id: string | null,
    scriptData: ScriptData,
    name: string,
    author: string,
    encodedScript: string,
  ) => Promise<string>
  loadScript: (id: string) => SavedScript | null
  deleteScript: (id: string) => Promise<void>
  getAllScripts: () => SavedScript[]
  getScript: (id: string) => SavedScript | null
  hasScript: (id: string) => boolean
}

let initialization: Promise<void> | undefined

export const useSavedScriptsStore = create<SavedScriptsState>()((set, get) => ({
  scripts: {},

  initialize: () => {
    if (!initialization) {
      initialization = loadSavedScripts()
        .then((scripts) => {
          set({
            scripts: Object.fromEntries(
              scripts.map((script) => [script.id, script]),
            ),
          })
        })
        .catch((error) => {
          initialization = undefined
          throw error
        })
    }
    return initialization
  },

  saveScript: async (id, scriptData, name, author, encodedScript) => {
    await get().initialize()
    const scriptId = id || crypto.randomUUID()
    const now = new Date().toISOString()
    const existing = get().scripts[scriptId]
    const script: SavedScript = {
      id: scriptId,
      name,
      author,
      scriptData,
      encodedScript,
      savedAt: existing?.savedAt || now,
      lastModified: now,
    }
    await writeSavedScript(script)
    set((state) => ({ scripts: { ...state.scripts, [scriptId]: script } }))
    return scriptId
  },

  loadScript: (id) => get().scripts[id] || null,

  deleteScript: async (id) => {
    await get().initialize()
    await deleteSavedScript(id)
    set((state) => {
      const { [id]: _, ...rest } = state.scripts
      return { scripts: rest }
    })
  },

  getAllScripts: () =>
    Object.values(get().scripts).sort(
      (a, b) =>
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime(),
    ),
  getScript: (id) => get().scripts[id] || null,
  hasScript: (id) => !!get().scripts[id],
}))
