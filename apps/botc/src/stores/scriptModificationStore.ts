import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ScriptItem, MetaOverrides } from '@/types'
import {
  areBootleggerRulesEqual,
  normalizeBootleggerRules,
} from '@/utils/bootleggerRules'
import {
  normalizeScriptItem,
  getRoleIds,
  getOriginalFromUrl,
  getScriptKey,
} from './scriptModificationHelpers'

/**
 * Drops an empty override object so that "no changes" is always represented as null
 */
function pruneMetaOverrides(overrides: MetaOverrides): MetaOverrides | null {
  return Object.keys(overrides).length > 0 ? overrides : null
}

/**
 * Reads a persisted `_meta` diff back, keeping only what it is meant to hold.
 *
 * The value comes out of session storage, which an older version of this app -
 * or anyone with a console open - is free to have written. Naming the fields in
 * a type is a cast, not a check, so each one is checked here: an override of the
 * wrong shape would otherwise reach the rule editor and, on the next save, be
 * written into the script itself.
 *
 * @param value - The `metaOverrides` field as it came out of storage
 * @returns The overrides worth restoring, or null when nothing is left
 */
function readMetaOverrides(value: unknown): MetaOverrides | null {
  if (typeof value !== 'object' || value === null) return null

  const { name, author, bootlegger } = value as Record<string, unknown>
  const overrides: MetaOverrides = {}

  if (typeof name === 'string') overrides.name = name
  if (typeof author === 'string') overrides.author = author

  // An array is required rather than normalized into one: leniency about the
  // shape belongs to `_meta` as scripts in the wild write it, not to a value
  // this app wrote itself. What is inside it is still cleaned up, so a hand
  // written entry cannot seed the editor with blank rules.
  if (Array.isArray(bootlegger)) {
    overrides.bootlegger = normalizeBootleggerRules(bootlegger)
  }

  return pruneMetaOverrides(overrides)
}

/** The role edits {@link getModifiedRoleItems} works from */
interface RoleDiff {
  addedRoles: ScriptItem[]
  removedRoles: string[]
  reorderedScript: string[] | null
}

/**
 * The original script from the URL with the role edits applied.
 *
 * `_meta` is carried through as it came, overrides and all: the unsaved `_meta`
 * edits are resolved by `buildCommittedScript` at the point a script is handed
 * out, and answering the same question a second time here is how the two drift
 * apart. Role edits also land in the loaded script data directly, so this is
 * only for reasoning about the diff itself - `replaceRole` needs to know the
 * current order to record a new one.
 *
 * @param diff - The recorded role edits
 * @returns The script with role edits applied, or null without an original
 */
export function getModifiedRoleItems(diff: RoleDiff): ScriptItem[] | null {
  const { addedRoles, removedRoles, reorderedScript } = diff
  const { script: originalScript } = getOriginalFromUrl()

  if (!originalScript) return null

  // If we have a reordered script, reconstruct from IDs
  if (reorderedScript) {
    // Create a map of all available items (original + added)
    const itemMap = new Map<string, ScriptItem>()

    originalScript.forEach((item) => {
      itemMap.set(normalizeScriptItem(item), item)
    })

    addedRoles.forEach((item) => {
      itemMap.set(normalizeScriptItem(item), item)
    })

    // Reconstruct script in reordered sequence
    const reordered = reorderedScript
      .map((id) => itemMap.get(id))
      .filter((item): item is ScriptItem => item !== undefined)

    /**
     * A recorded order only ever names roles, so `_meta` is not in it. It is
     * put back rather than dropped, so that both branches answer with the same
     * script: a caller that reads more than the role ids - the only thing the
     * one caller today reads - must not find the entry missing depending on
     * whether the roles happen to have been reordered.
     */
    const meta = originalScript.find(
      (item) => normalizeScriptItem(item) === '_meta',
    )

    return meta === undefined ? reordered : [meta, ...reordered]
  }

  // Apply diff to original script
  const modified = originalScript.filter((item) => {
    const id = normalizeScriptItem(item)
    return id === '_meta' || !removedRoles.includes(id)
  })

  // Add new roles - use the full role objects to preserve custom data
  return [...modified, ...addedRoles]
}

// Re-export helper functions for external use
export {
  setOriginalScriptCache,
  clearOriginalScriptCache,
} from './scriptModificationHelpers'

interface ScriptModificationState {
  // Diff: roles added (not in original) - can be string (just id) or full object (custom data)
  addedRoles: ScriptItem[]
  // Diff: roles removed (were in original)
  removedRoles: string[]
  // Diff: overrides for _meta fields (name, author)
  metaOverrides: MetaOverrides | null
  // Diff: reordered roles (list of role IDs in new order)
  reorderedScript: string[] | null
  /**
   * The script the diff above belongs to. The diff outlives a reload, so it has
   * to be told apart from the next script opened in the same tab.
   */
  scriptKey: string

  // Actions
  addRole: (roleItem: ScriptItem) => void
  removeRole: (roleId: string) => void
  replaceRole: (oldRoleId: string, newRoleItem: ScriptItem) => void
  reorderRoles: (roleIds: string[]) => void
  setName: (name: string) => void
  setAuthor: (author: string) => void
  setBootleggerRules: (rules: string[]) => void
  getName: () => string | null
  getAuthor: () => string | null
  getBootleggerRules: () => string[] | null
  getMetaOverrides: () => MetaOverrides | null
  hasRoleEdits: () => boolean
  isModified: () => boolean
  reset: () => void
}

/**
 * The slice of the diff that is worth carrying across a page load.
 *
 * Role edits are deliberately left out: they land in the loaded script data,
 * which is rebuilt from the URL on every load. Restoring them would light up
 * the "Changes made" badge for edits that are no longer on screen and that
 * saving would not write out either.
 */
type PersistedModificationState = Pick<
  ScriptModificationState,
  'metaOverrides' | 'scriptKey'
>

export const useScriptModificationStore = create<ScriptModificationState>()(
  persist<ScriptModificationState, [], [], PersistedModificationState>(
    (set, get) => ({
      addedRoles: [],
      removedRoles: [],
      metaOverrides: null,
      reorderedScript: null,
      scriptKey: getScriptKey(),

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
        const currentScript = getModifiedRoleItems(get())

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
        else if (
          originalRoleIds.includes(oldRoleId) &&
          !removedRoles.includes(oldRoleId)
        ) {
          updatedRemovedRoles = [...updatedRemovedRoles, oldRoleId]
        }

        // Handle addition of new role
        // If new role was previously removed, un-remove it
        if (updatedRemovedRoles.includes(newRoleId)) {
          updatedRemovedRoles = updatedRemovedRoles.filter(
            (id) => id !== newRoleId,
          )
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
        const next = { ...metaOverrides }

        if (name === originalName) {
          // Remove name override if same as original
          delete next.name
        } else {
          next.name = name
        }

        set({ metaOverrides: pruneMetaOverrides(next) })
      },

      setAuthor: (author) => {
        const { metaOverrides } = get()
        const { author: originalAuthor } = getOriginalFromUrl()
        const next = { ...metaOverrides }

        if (author === originalAuthor) {
          // Remove author override if same as original
          delete next.author
        } else {
          next.author = author
        }

        set({ metaOverrides: pruneMetaOverrides(next) })
      },

      setBootleggerRules: (rules) => {
        const { metaOverrides } = get()
        const { bootlegger: originalRules } = getOriginalFromUrl()
        const next = { ...metaOverrides }

        if (areBootleggerRulesEqual(rules, originalRules)) {
          // Remove rules override if same as original
          delete next.bootlegger
        } else {
          next.bootlegger = rules
        }

        set({ metaOverrides: pruneMetaOverrides(next) })
      },

      /**
       * Returns the name to display, or null when neither an override nor an
       * original name exist (so callers can fall back to the loaded script).
       *
       * An override wins even when it is empty: a name the user cleared must
       * not be answered with the name they cleared it from - that is the name
       * saving would drop, and the night order sheets would be the last place
       * still showing it.
       */
      getName: () => {
        const { metaOverrides } = get()
        const { name: originalName } = getOriginalFromUrl()
        return metaOverrides?.name ?? (originalName || null)
      },

      /** As {@link getName}, for the author */
      getAuthor: () => {
        const { metaOverrides } = get()
        const { author: originalAuthor } = getOriginalFromUrl()
        return metaOverrides?.author ?? (originalAuthor || null)
      },

      /**
       * Returns the homebrew rules to display, or null when neither an override
       * nor original rules exist (so callers can fall back to the loaded script)
       */
      getBootleggerRules: () => {
        const { metaOverrides } = get()
        const { bootlegger: originalRules } = getOriginalFromUrl()

        if (metaOverrides?.bootlegger !== undefined) {
          return metaOverrides.bootlegger
        }

        return originalRules.length > 0 ? originalRules : null
      },

      getMetaOverrides: () => {
        const { metaOverrides } = get()
        return metaOverrides
      },

      /**
       * Whether any role edits are outstanding.
       *
       * These are the changes a reload drops: role edits land in the loaded
       * script data, which is rebuilt from the URL, while the `_meta` diff is
       * persisted and restored. So this, rather than
       * {@link ScriptModificationState.isModified}, is what a warning about
       * changes being lost has to ask about - warning about a `_meta` edit
       * would promise a loss that does not happen, and then hand the
       * "discarded" name straight back on the way in.
       *
       * A closing tab does drop the `_meta` diff with the session storage
       * holding it, and is knowingly not warned about - see
       * `reloadWouldLoseWork` in the route for why that is the least bad of
       * the options.
       */
      hasRoleEdits: () => {
        const { addedRoles, removedRoles, reorderedScript } = get()
        return (
          addedRoles.length > 0 ||
          removedRoles.length > 0 ||
          reorderedScript !== null
        )
      },

      isModified: () => {
        const { metaOverrides, hasRoleEdits } = get()
        return (
          hasRoleEdits() ||
          (metaOverrides !== null &&
            (metaOverrides.name !== undefined ||
              metaOverrides.author !== undefined ||
              metaOverrides.bootlegger !== undefined))
        )
      },

      reset: () => {
        set({
          addedRoles: [],
          removedRoles: [],
          metaOverrides: null,
          reorderedScript: null,
          // A reset means a script was just loaded, so the diff that follows
          // belongs to whatever the URL points at now
          scriptKey: getScriptKey(),
        })
      },
    }),
    {
      name: 'botc-script-modifications',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        metaOverrides: state.metaOverrides,
        scriptKey: state.scriptKey,
      }),
      /**
       * The _meta diff survives a reload of the same script, but must never be
       * applied to a different one: opening another script in the same tab
       * would otherwise inherit its name, author and homebrew rules - and with
       * them a Bootlegger the script never had.
       *
       * There is a single slot, so the last script edited in the tab owns it:
       * coming back to an earlier one finds its diff only if nothing has been
       * edited since. Switching scripts in-page resets the diff either way, so
       * this only shows up across full page loads.
       *
       * Only the fields {@link PersistedModificationState} names are taken, and
       * each is checked rather than trusted - see {@link readMetaOverrides} - so
       * a stored shape from an older version cannot smuggle anything back.
       */
      merge: (persisted, current) => {
        const saved = persisted as
          | Partial<PersistedModificationState>
          | undefined

        if (!saved || saved.scriptKey !== current.scriptKey) return current

        return {
          ...current,
          metaOverrides: readMetaOverrides(saved.metaOverrides),
        }
      },
    },
  ),
)

/**
 * Re-reads the key of the script the URL points at.
 *
 * Loading a script rewrites the URL, and the URL is what identifies the script.
 * The store is created before any of that happens, so whoever rewrites the URL
 * without also resetting the diff has to say so - otherwise the diff is
 * persisted under the previous script's key and dropped on the next reload.
 */
export function syncScriptKey(): void {
  useScriptModificationStore.setState({ scriptKey: getScriptKey() })
}

/**
 * The answer to {@link canPersistModifications}, worked out once. It is asked
 * for on every render, and the case it exists for - a browser that will not
 * hold session storage at all - does not change part way through one.
 */
let persistenceAvailable: boolean | null = null

/**
 * Whether the `_meta` diff can actually be written down.
 *
 * A reload is deliberately not warned about for `_meta` edits, on the grounds
 * that they come back. Storage that refuses to be written at all - a browser set
 * to block site data, session storage missing outright - takes that away without
 * saying so, so whoever relies on the diff surviving has to be able to ask
 * first.
 *
 * That, and not every way a write can fail, is what this answers. The probe is a
 * single byte, so storage that takes it and would still refuse the diff itself
 * on quota reads as available here. Nothing is done about that on purpose: the
 * diff is a name, an author and a handful of rules against a quota measured in
 * megabytes, and a probe large enough to prove otherwise would be a waste of the
 * very space it was testing for.
 *
 * @returns True when storage takes writes at all, so the diff written above can
 *   be expected to survive a reload
 */
export function canPersistModifications(): boolean {
  if (persistenceAvailable !== null) return persistenceAvailable

  try {
    const probe = 'botc-script-modifications-probe'
    sessionStorage.setItem(probe, '1')
    sessionStorage.removeItem(probe)
    persistenceAvailable = true
  } catch {
    // No storage at all on the server, and none worth counting on in a browser
    // that throws for it
    persistenceAvailable = false
  }

  return persistenceAvailable
}
