import type { ParsedRole, Role } from '@/types'

/**
 * Jinx entry structure from jinxes data
 */
export interface JinxEntry {
  id: string
  hatred: Array<{
    id: string
    reason: string
  }>
}

/**
 * Checks if there are any active jinx pairs in the script
 * (both roles of a jinx present in the script)
 */
function hasActiveJinxes(
  roleIds: Set<string>,
  jinxes: JinxEntry[],
): boolean {
  for (const jinxEntry of jinxes) {
    if (roleIds.has(jinxEntry.id)) {
      for (const hatred of jinxEntry.hatred) {
        if (roleIds.has(hatred.id)) {
          return true
        }
      }
    }
  }
  return false
}

/**
 * Checks if there are any custom roles in the script
 * (excluding bootlegger and djinn themselves)
 */
function hasCustomRoles(roles: ParsedRole[]): boolean {
  return roles.some(
    (r) => r.isCustom && r.id !== 'bootlegger' && r.id !== 'djinn',
  )
}

/**
 * Automatically adds or removes bootlegger and djinn based on script content:
 * - Bootlegger is auto-added when there are custom roles (excluding itself and djinn)
 * - Djinn is auto-added when there are active jinx pairs (both roles present)
 *
 * @param scriptRoles - The parsed roles from the script
 * @param jinxes - The jinx data
 * @param baseRoles - The base roles database (to find bootlegger/djinn)
 * @returns Modified roles array with auto-added/removed roles
 */
export function applyAutoRoles(
  scriptRoles: ParsedRole[],
  jinxes: JinxEntry[],
  baseRoles: Role[],
): ParsedRole[] {
  let modifiedRoles = [...scriptRoles]
  const roleIds = new Set(modifiedRoles.map((r) => r.id))

  const hasCustom = hasCustomRoles(modifiedRoles)
  const hasJinxes = hasActiveJinxes(roleIds, jinxes)

  // Auto-add/remove bootlegger based on custom roles
  if (hasCustom && !roleIds.has('bootlegger')) {
    const bootlegger = baseRoles.find((r) => r.id === 'bootlegger')
    if (bootlegger) {
      modifiedRoles.push({ ...bootlegger, isCustom: false })
    }
  } else if (!hasCustom && roleIds.has('bootlegger')) {
    modifiedRoles = modifiedRoles.filter((r) => r.id !== 'bootlegger')
  }

  // Auto-add/remove djinn based on active jinxes
  if (hasJinxes && !roleIds.has('djinn')) {
    const djinn = baseRoles.find((r) => r.id === 'djinn')
    if (djinn) {
      modifiedRoles.push({ ...djinn, isCustom: false })
    }
  } else if (!hasJinxes && roleIds.has('djinn')) {
    modifiedRoles = modifiedRoles.filter((r) => r.id !== 'djinn')
  }

  return modifiedRoles
}

