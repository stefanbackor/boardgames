import { createLibraryId } from '@/utils/createLibraryId'
import {
  compareNames,
  emptyFolderLibrary,
  validateFolderName,
  type FolderLibrary,
} from './folderLibrary'
import { create } from 'zustand'
import {
  loadSavedScripts,
  writeSavedScript,
  deleteSavedScript,
  updateFolderLibrary,
} from './savedScriptsDb'
import type { ScriptData, SavedScript } from '@/types'

interface SavedScriptsState {
  scripts: Record<string, SavedScript>
  folderLibrary: FolderLibrary
  createFolderAndMove: (scriptId: string, name: string) => Promise<void>
  moveScript: (scriptId: string, folderId: string | null) => Promise<void>
  renameFolder: (folderId: string, name: string) => Promise<void>
  deleteFolder: (folderId: string) => Promise<void>
  setFolderCollapsed: (folderId: string, collapsed: boolean) => Promise<void>

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
  folderLibrary: emptyFolderLibrary(),

  initialize: () => {
    if (!initialization) {
      initialization = loadSavedScripts()
        .then(async (scripts) => {
          const folderLibrary = await updateFolderLibrary()
          set({
            folderLibrary,
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
    const scriptId = id || createLibraryId()
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

  createFolderAndMove: async (scriptId, value) => {
    await get().initialize()
    if (!get().scripts[scriptId]) throw new Error('Script no longer exists.')
    const folderLibrary = await updateFolderLibrary((library) => {
      const name = validateFolderName(library, value)
      const id = createLibraryId()
      library.folders[id] = { id, name, collapsed: false }
      library.membership[scriptId] = id
    })
    set({ folderLibrary })
  },

  moveScript: async (scriptId, folderId) => {
    await get().initialize()
    if (!get().scripts[scriptId]) throw new Error('Script no longer exists.')
    const folderLibrary = await updateFolderLibrary((library) => {
      if (folderId && !library.folders[folderId])
        throw new Error('Folder no longer exists.')
      if (folderId) library.membership[scriptId] = folderId
      else delete library.membership[scriptId]
    })
    set({ folderLibrary })
  },

  renameFolder: async (folderId, value) => {
    await get().initialize()
    const folderLibrary = await updateFolderLibrary((library) => {
      const folder = library.folders[folderId]
      if (!folder) throw new Error('Folder no longer exists.')
      folder.name = validateFolderName(library, value, folderId)
    })
    set({ folderLibrary })
  },

  deleteFolder: async (folderId) => {
    await get().initialize()
    const folderLibrary = await updateFolderLibrary((library) => {
      delete library.folders[folderId]
      for (const [scriptId, id] of Object.entries(library.membership)) {
        if (id === folderId) delete library.membership[scriptId]
      }
    })
    set({ folderLibrary })
  },

  setFolderCollapsed: async (folderId, collapsed) => {
    await get().initialize()
    const folderLibrary = await updateFolderLibrary((library) => {
      const folder = library.folders[folderId]
      if (!folder) throw new Error('Folder no longer exists.')
      folder.collapsed = collapsed
    })
    set({ folderLibrary })
  },

  loadScript: (id) => get().scripts[id] || null,

  deleteScript: async (id) => {
    await get().initialize()
    const folderLibrary = await deleteSavedScript(id)
    set((state) => {
      const { [id]: _, ...rest } = state.scripts
      return { scripts: rest, folderLibrary }
    })
  },

  getAllScripts: () => Object.values(get().scripts).sort(compareNames),
  getScript: (id) => get().scripts[id] || null,
  hasScript: (id) => !!get().scripts[id],
}))
