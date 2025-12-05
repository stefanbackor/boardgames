import { useCallback } from 'react'
import type { Role, ParsedRole } from '@/types'
import type { ScriptData } from '@/utils/parseScript'
import { sendEvent } from '@/utils/analytics'

/**
 * Props for the useScriptModification hook
 */
interface UseScriptModificationProps {
  /** The raw script data */
  scriptData: ScriptData | null
  /** Parsed roles with resolved data */
  scriptRoles: ParsedRole[] | null
  /** Base roles database */
  baseRoles: Role[]
  /** Store function to add a role */
  addRole: (roleItem: string | Role) => void
  /** Store function to remove a role */
  removeRole: (roleId: string) => void
  /** Store function to replace a role */
  replaceRole: (oldRoleId: string, newRoleItem: string | Role) => void
  /** Store function to reorder roles */
  reorderRoles: (roleIds: string[]) => void
  /** Function to update script data state */
  setScriptData: (data: ScriptData) => void
}

/**
 * Return type for the useScriptModification hook
 */
interface UseScriptModificationReturn {
  /** Handler to add a new role to the script */
  handleAddRole: (role: Role) => void
  /** Handler to remove a role from the script */
  handleRemoveRole: (roleId: string) => void
  /** Handler to replace a role in the script */
  handleReplaceRole: (oldRoleId: string, newRole: Role) => void
  /** Handler to reorder roles within a team */
  handleReorderRoles: (team: string, fromIndex: number, toIndex: number) => void
}

/**
 * Custom hook providing handlers for modifying script roles.
 * Handles add, remove, replace, and reorder operations while maintaining
 * sync between the modification store and local state.
 *
 * @param props - Configuration including script data, roles, and store functions
 * @returns Object containing all script modification handlers
 *
 * @example
 * const { handleAddRole, handleRemoveRole, ... } = useScriptModification({
 *   scriptData,
 *   scriptRoles,
 *   baseRoles,
 *   addRole,
 *   removeRole,
 *   replaceRole,
 *   reorderRoles,
 *   setScriptData,
 * })
 */
export function useScriptModification({
  scriptData,
  scriptRoles,
  baseRoles,
  addRole,
  removeRole,
  replaceRole,
  reorderRoles,
  setScriptData,
}: UseScriptModificationProps): UseScriptModificationReturn {
  /**
   * Handler to add a new role to the script
   * Stores base roles as ID strings for compact JSON, custom roles as full objects
   */
  const handleAddRole = useCallback(
    (role: Role) => {
      if (!scriptData) return

      // When adding a role from the modal, check if it exists in base roles
      // If yes, store just the id string for compact JSON
      // If it's a custom role not in base, store the full object
      const isBaseRole = baseRoles.some((r) => r.id === role.id)
      const roleItem = isBaseRole ? role.id : role

      /**
       * Analytics: Track when users add roles to their scripts
       * Purpose: Understand which roles are most popular and script building patterns
       * Key insights: Most added roles, custom vs base roles ratio, team preferences
       */
      sendEvent('add_role', {
        role_id: role.id,
        role_name: role.name,
        team: role.team,
        is_custom: !isBaseRole,
        edition: role.edition || 'unknown',
      })

      // Update store for tracking changes
      addRole(roleItem)

      // Update local state directly - append the new role at the end
      const newScriptData = [...scriptData, roleItem]
      setScriptData(newScriptData as ScriptData)
    },
    [scriptData, baseRoles, addRole, setScriptData],
  )

  /**
   * Handler to remove a role from the script
   */
  const handleRemoveRole = useCallback(
    (roleId: string) => {
      if (!scriptData) return

      /**
       * Analytics: Track when users remove roles from their scripts
       * Purpose: Understand script refinement patterns and unpopular roles
       * Key insights: Most removed roles, script editing behavior, role balance issues
       */
      sendEvent('remove_role', {
        role_id: roleId,
      })

      // Update store for tracking changes
      removeRole(roleId)

      // Update local state directly - filter out the removed role
      const newScriptData = scriptData.filter((item) => {
        const id = typeof item === 'string' ? item : item.id
        return id !== roleId
      })
      setScriptData(newScriptData as ScriptData)
    },
    [scriptData, removeRole, setScriptData],
  )

  /**
   * Handler to replace a role in the script at the same position
   */
  const handleReplaceRole = useCallback(
    (oldRoleId: string, newRole: Role) => {
      if (!scriptData) return

      // Check if new role exists in base roles
      const isBaseRole = baseRoles.some((r) => r.id === newRole.id)
      const newRoleItem = isBaseRole ? newRole.id : newRole

      /**
       * Analytics: Track when users replace one role with another
       * Purpose: Understand role substitution patterns and script balancing behavior
       * Key insights: Common role swaps, team composition adjustments, role popularity
       */
      sendEvent('replace_role', {
        old_role_id: oldRoleId,
        new_role_id: newRole.id,
        new_role_name: newRole.name,
        new_role_team: newRole.team,
        is_custom: !isBaseRole,
      })

      // Update store for tracking changes
      replaceRole(oldRoleId, newRoleItem)

      // Update local state directly - replace the role at the same position
      const newScriptData = scriptData.map((item) => {
        const id = typeof item === 'string' ? item : item.id
        return id === oldRoleId ? newRoleItem : item
      })
      setScriptData(newScriptData as ScriptData)
    },
    [scriptData, baseRoles, replaceRole, setScriptData],
  )

  /**
   * Handler to reorder roles within a team
   * Maintains team grouping while allowing reordering within teams
   */
  const handleReorderRoles = useCallback(
    (team: string, fromIndex: number, toIndex: number) => {
      if (!scriptRoles) return

      /**
       * Analytics: Track when users reorder roles within a team
       * Purpose: Understand if users care about role presentation order
       * Key insights: Reorder frequency, preferred role arrangements, UX friction points
       */
      sendEvent('reorder_roles', {
        team: team,
        from_index: fromIndex,
        to_index: toIndex,
        distance: Math.abs(toIndex - fromIndex),
      })

      // Get all roles in the script
      const allRoles = [...scriptRoles]

      // Split roles into team roles and other roles
      const teamRoles = allRoles.filter((r) => r.team === team)
      const otherRoles = allRoles.filter((r) => r.team !== team)

      // Reorder within the team
      const [movedRole] = teamRoles.splice(fromIndex, 1)
      teamRoles.splice(toIndex, 0, movedRole)

      // Find the original position of the first role of this team
      const firstTeamRoleIndex = allRoles.findIndex((r) => r.team === team)

      // Reconstruct the script by inserting reordered team at the correct position
      const newScript = [
        ...otherRoles.slice(0, firstTeamRoleIndex),
        ...teamRoles,
        ...otherRoles.slice(firstTeamRoleIndex),
      ]

      // Update the store with reordered role IDs (for commit functionality)
      // Extract role IDs in the new order
      const roleIds = newScript.map((role) => role.id)

      // Add _meta at the beginning if it exists in scriptData
      const metaItem = scriptData?.find(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          (item as { id?: string }).id === '_meta',
      )

      if (metaItem) {
        roleIds.unshift('_meta')
      }

      reorderRoles(roleIds)

      // Update local state directly with the new order
      // Build new script data with reordered roles
      const newScriptData: ScriptData = []
      if (metaItem) {
        newScriptData.push(metaItem)
      }

      // Add roles in new order
      newScript.forEach((role) => {
        // Find the original item in scriptData
        const originalItem = scriptData?.find((item) => {
          const id = typeof item === 'string' ? item : item.id
          return id === role.id
        })
        if (originalItem) {
          newScriptData.push(originalItem)
        }
      })

      setScriptData(newScriptData as ScriptData)
    },
    [scriptRoles, scriptData, reorderRoles, setScriptData],
  )

  return {
    handleAddRole,
    handleRemoveRole,
    handleReplaceRole,
    handleReorderRoles,
  }
}
