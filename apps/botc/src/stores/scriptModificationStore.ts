import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { decompressFromUrl } from '../utils/urlCompression'

// Script item can be a string (role id) or an object with id
type ScriptItem = string | { id: string; [key: string]: unknown }

interface MetaOverrides {
  name?: string
  author?: string
}

interface ScriptModificationState {
  // Diff: roles added (not in original) - can be string (just id) or full object (custom data)
  addedRoles: ScriptItem[]
  // Diff: roles removed (were in original)
  removedRoles: string[]
  // Diff: overrides for _meta fields (name, author)
  metaOverrides: MetaOverrides | null
  // Diff: reordered roles (list of role IDs in new order)
  reorderedScript: string[] | null

  // Actions
  addRole: (roleItem: ScriptItem) => void
  removeRole: (roleId: string) => void
  replaceRole: (oldRoleId: string, newRoleItem: ScriptItem) => void
  reorderRoles: (roleIds: string[]) => void
  setName: (name: string) => void
  setAuthor: (author: string) => void
  commitChanges: () => { script: ScriptItem[]; name: string; author: string }
  getModifiedScript: () => ScriptItem[] | null
  getName: () => string
  getAuthor: () => string
  isModified: () => boolean
  reset: () => void
}

// Helper to normalize script items for comparison
function normalizeScriptItem(item: ScriptItem): string {
  if (typeof item === 'string') {
    return item
  }
  return item.id
}

// Helper to get role IDs from script (excluding _meta)
function getRoleIds(script: ScriptItem[]): string[] {
  return script.map(normalizeScriptItem).filter((id) => id !== '_meta')
}

// Helper to parse script from URL
function getOriginalFromUrl(): {
  script: ScriptItem[] | null
  name: string
  author: string
} {
  if (typeof window === 'undefined') {
    return { script: null, name: '', author: '' }
  }

  const params = new URLSearchParams(window.location.search)
  const encodedScript = params.get('script')

  if (!encodedScript) {
    return { script: null, name: '', author: '' }
  }

  try {
    // Decompress from URL (handles both compressed and legacy uncompressed formats)
    const decoded = decompressFromUrl(encodedScript)
    const parsed = JSON.parse(decoded) as ScriptItem[]

    if (!Array.isArray(parsed)) {
      return { script: null, name: '', author: '' }
    }

    // Extract name and author from _meta object
    const metaItem = parsed.find(
      (item) =>
        typeof item === 'object' && item !== null && item.id === '_meta',
    )
    const metaObj = metaItem as { name?: string; author?: string } | undefined
    const name = metaObj?.name || ''
    const author = metaObj?.author || ''

    return { script: parsed, name, author }
  } catch {
    return { script: null, name: '', author: '' }
  }
}

export const useScriptModificationStore = create<ScriptModificationState>()(
  persist(
    (set, get) => ({
      addedRoles: [],
      removedRoles: [],
      metaOverrides: null,
      reorderedScript: null,

      addRole: (roleItem) => {
        const { addedRoles, removedRoles } = get()
        const roleId = normalizeScriptItem(roleItem)

        // If role was previously removed, just un-remove it
        if (removedRoles.includes(roleId)) {
          set({ removedRoles: removedRoles.filter((id) => id !== roleId) })
          return
        }

        // Otherwise add to addedRoles if not already there
        if (!addedRoles.some((r) => normalizeScriptItem(r) === roleId)) {
          // Check if this is a custom role (has properties beyond just 'id')
          // If it's an object with only 'id', or a string, store just the id
          // If it has custom properties, store the full object
          let itemToStore: string | { id: string; [key: string]: unknown }

          if (typeof roleItem === 'string') {
            itemToStore = roleItem
          } else if (Object.keys(roleItem).length === 1 && roleItem.id) {
            // Object with only 'id' property - store as string
            itemToStore = roleItem.id
          } else {
            // Has custom properties - store the full object
            itemToStore = roleItem
          }

          set({ addedRoles: [...addedRoles, itemToStore] })
        }
      },

      removeRole: (roleId) => {
        const { addedRoles, removedRoles } = get()
        const { script: originalScript } = getOriginalFromUrl()
        const originalRoleIds = originalScript ? getRoleIds(originalScript) : []

        // If role was added (not in original), just un-add it
        if (addedRoles.some((r) => normalizeScriptItem(r) === roleId)) {
          set({
            addedRoles: addedRoles.filter(
              (r) => normalizeScriptItem(r) !== roleId,
            ),
          })
          return
        }

        // If role is in original, add to removedRoles
        if (
          originalRoleIds.includes(roleId) &&
          !removedRoles.includes(roleId)
        ) {
          set({ removedRoles: [...removedRoles, roleId] })
        }
      },

      replaceRole: (oldRoleId, newRoleItem) => {
        const { getModifiedScript } = get()
        const currentScript = getModifiedScript()

        if (!currentScript) return

        // Get role IDs from current script
        const roleIds = getRoleIds(currentScript)
        
        // Find the index of the old role
        const oldIndex = roleIds.indexOf(oldRoleId)
        
        if (oldIndex === -1) return

        // Create new role IDs array with replacement
        const newRoleId = normalizeScriptItem(newRoleItem)
        const newRoleIds = [...roleIds]
        newRoleIds[oldIndex] = newRoleId

        // Get the current state
        const { addedRoles, removedRoles } = get()
        const { script: originalScript } = getOriginalFromUrl()
        const originalRoleIds = originalScript ? getRoleIds(originalScript) : []

        // Handle removal of old role
        let updatedAddedRoles = [...addedRoles]
        let updatedRemovedRoles = [...removedRoles]

        // If old role was added (not in original), remove it from addedRoles
        if (addedRoles.some((r) => normalizeScriptItem(r) === oldRoleId)) {
          updatedAddedRoles = updatedAddedRoles.filter(
            (r) => normalizeScriptItem(r) !== oldRoleId,
          )
        } 
        // If old role is in original, mark it as removed
        else if (originalRoleIds.includes(oldRoleId) && !removedRoles.includes(oldRoleId)) {
          updatedRemovedRoles = [...updatedRemovedRoles, oldRoleId]
        }

        // Handle addition of new role
        // If new role was previously removed, un-remove it
        if (updatedRemovedRoles.includes(newRoleId)) {
          updatedRemovedRoles = updatedRemovedRoles.filter((id) => id !== newRoleId)
        }
        // If new role is not in original and not already added, add it
        else if (
          !originalRoleIds.includes(newRoleId) &&
          !updatedAddedRoles.some((r) => normalizeScriptItem(r) === newRoleId)
        ) {
          // Prepare the item to store
          let itemToStore: string | { id: string; [key: string]: unknown }
          
          if (typeof newRoleItem === 'string') {
            itemToStore = newRoleItem
          } else if (Object.keys(newRoleItem).length === 1 && newRoleItem.id) {
            itemToStore = newRoleItem.id
          } else {
            itemToStore = newRoleItem
          }
          
          updatedAddedRoles = [...updatedAddedRoles, itemToStore]
        }

        // Update state with new ordering and role changes
        set({
          addedRoles: updatedAddedRoles,
          removedRoles: updatedRemovedRoles,
          reorderedScript: newRoleIds,
        })
      },

      reorderRoles: (roleIds) => {
        set({ reorderedScript: roleIds })
      },

      setName: (name) => {
        const { metaOverrides } = get()
        const { name: originalName } = getOriginalFromUrl()

        if (name === originalName) {
          // Remove name override if same as original
          if (metaOverrides?.author !== undefined) {
            set({ metaOverrides: { author: metaOverrides.author } })
          } else {
            set({ metaOverrides: null })
          }
        } else {
          set({ metaOverrides: { ...metaOverrides, name } })
        }
      },

      setAuthor: (author) => {
        const { metaOverrides } = get()
        const { author: originalAuthor } = getOriginalFromUrl()

        if (author === originalAuthor) {
          // Remove author override if same as original
          if (metaOverrides?.name !== undefined) {
            set({ metaOverrides: { name: metaOverrides.name } })
          } else {
            set({ metaOverrides: null })
          }
        } else {
          set({ metaOverrides: { ...metaOverrides, author } })
        }
      },

      getModifiedScript: () => {
        const { addedRoles, removedRoles, metaOverrides, reorderedScript } =
          get()
        const { script: originalScript } = getOriginalFromUrl()

        if (!originalScript) return null

        // If we have a reordered script, reconstruct from IDs
        if (reorderedScript) {
          // Create a map of all available items (original + added)
          const itemMap = new Map<string, ScriptItem>()

          // Add original items to map
          originalScript.forEach((item) => {
            const id = normalizeScriptItem(item)
            itemMap.set(id, item)
          })

          // Add new roles to map
          addedRoles.forEach((item) => {
            const id = normalizeScriptItem(item)
            itemMap.set(id, item)
          })

          // Reconstruct script in reordered sequence
          const result = reorderedScript
            .map((id) => itemMap.get(id))
            .filter((item): item is ScriptItem => item !== undefined)
            .map((item) => {
              const id = normalizeScriptItem(item)
              // Apply meta overrides to _meta object
              if (id === '_meta' && typeof item === 'object' && metaOverrides) {
                return { ...item, ...metaOverrides }
              }
              return item
            })

          return result
        }

        // Apply diff to original script
        const modified = originalScript
          .filter((item) => {
            const id = normalizeScriptItem(item)
            return id === '_meta' || !removedRoles.includes(id)
          })
          .map((item) => {
            const id = normalizeScriptItem(item)
            // Apply meta overrides to _meta object
            if (id === '_meta' && typeof item === 'object' && metaOverrides) {
              return { ...item, ...metaOverrides }
            }
            return item
          })

        // Add new roles - use the full role objects to preserve custom data
        return [...modified, ...addedRoles]
      },

      getName: () => {
        const { metaOverrides } = get()
        const { name: originalName } = getOriginalFromUrl()
        return metaOverrides?.name ?? originalName
      },

      getAuthor: () => {
        const { metaOverrides } = get()
        const { author: originalAuthor } = getOriginalFromUrl()
        return metaOverrides?.author ?? originalAuthor
      },

      commitChanges: () => {
        const { getModifiedScript, getName, getAuthor } = get()
        const modifiedScript = getModifiedScript()
        const name = getName()
        const author = getAuthor()

        if (!modifiedScript) return { script: [], name: '', author: '' }

        // Build committed script: update _meta with name and author, preserve all other role data
        let hasMetaEntry = false
        const committed = modifiedScript.map((item) => {
          const id = normalizeScriptItem(item)
          if (id === '_meta' && typeof item === 'object') {
            hasMetaEntry = true
            return { ...item, name, author }
          }
          // Preserve original role data (custom roles may have name, ability, image, etc.)
          return item
        })

        if (!hasMetaEntry) {
          committed.unshift({ id: '_meta', name, author })
        }

        // Reset diff state after commit
        set({
          addedRoles: [],
          removedRoles: [],
          metaOverrides: null,
          reorderedScript: null,
        })

        return { script: committed, name, author }
      },

      isModified: () => {
        const { addedRoles, removedRoles, metaOverrides, reorderedScript } =
          get()
        return (
          addedRoles.length > 0 ||
          removedRoles.length > 0 ||
          reorderedScript !== null ||
          (metaOverrides !== null &&
            (metaOverrides.name !== undefined ||
              metaOverrides.author !== undefined))
        )
      },

      reset: () => {
        set({
          addedRoles: [],
          removedRoles: [],
          metaOverrides: null,
          reorderedScript: null,
        })
      },
    }),
    {
      name: 'botc-script-modifications',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
