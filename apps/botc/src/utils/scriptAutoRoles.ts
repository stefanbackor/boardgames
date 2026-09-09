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
function hasActiveJinxes(roleIds: Set<string>, jinxes: JinxEntry[]): boolean {
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
 * Options for {@link applyAutoRoles}
 */
export interface AutoRolesOptions {
  /**
   * Whether the script declares homebrew rules (`_meta.bootlegger`).
   * Homebrew rules require the Bootlegger just like homebrew characters do.
   */
  hasHomebrewRules?: boolean
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
 * Whether the bootlegger is required by the script content, i.e. whether
 * {@link applyAutoRoles} brings it back on its own.
 *
 * The UI uses this to decide whether removing the bootlegger can stick: while
 * homebrew characters or homebrew rules are present, taking it out of the
 * script data changes nothing on screen.
 *
 * @param scriptRoles - The roles in the script
 * @param options - Extra script context, e.g. whether homebrew rules exist
 * @returns True when the bootlegger cannot be removed
 */
export function isBootleggerRequired(
  scriptRoles: ParsedRole[],
  options: AutoRolesOptions = {},
): boolean {
  return hasCustomRoles(scriptRoles) || !!options.hasHomebrewRules
}

/**
 * Whether the djinn is required by the script content, i.e. whether
 * {@link applyAutoRoles} brings it back on its own.
 *
 * As {@link isBootleggerRequired}, for the djinn: while both halves of a jinx
 * are in the script, taking the djinn out of the script data changes nothing
 * on screen.
 *
 * @param scriptRoles - The roles in the script
 * @param jinxes - The jinx data
 * @returns True when the djinn cannot be removed
 */
export function isDjinnRequired(
  scriptRoles: ParsedRole[],
  jinxes: JinxEntry[],
): boolean {
  return hasActiveJinxes(new Set(scriptRoles.map((r) => r.id)), jinxes)
}

/**
 * Automatically adds bootlegger and adds/removes djinn based on script content:
 * - Bootlegger is auto-added when there are custom roles (excluding itself and
 *   djinn) or when the script declares homebrew rules
 * - Djinn is auto-added when there are active jinx pairs (both roles present)
 *
 * A bootlegger that is already part of the script is never removed: it is listed
 * there on purpose, often to carry homebrew rules rather than homebrew
 * characters. Auto-added bootleggers are not part of the script data, so they
 * disappear on their own once the homebrew content is gone.
 *
 * @param scriptRoles - The parsed roles from the script
 * @param jinxes - The jinx data
 * @param baseRoles - The base roles database (to find bootlegger/djinn)
 * @param options - Extra script context, e.g. whether homebrew rules exist
 * @returns Modified roles array with auto-added/removed roles
 */
export function applyAutoRoles(
  scriptRoles: ParsedRole[],
  jinxes: JinxEntry[],
  baseRoles: Role[],
  options: AutoRolesOptions = {},
): ParsedRole[] {
  let modifiedRoles = [...scriptRoles]
  const roleIds = new Set(modifiedRoles.map((r) => r.id))

  const needsBootlegger = isBootleggerRequired(modifiedRoles, options)
  const hasJinxes = hasActiveJinxes(roleIds, jinxes)

  // Auto-add bootlegger for homebrew characters or homebrew rules
  if (needsBootlegger && !roleIds.has('bootlegger')) {
    const bootlegger = baseRoles.find((r) => r.id === 'bootlegger')
    if (bootlegger) {
      modifiedRoles.push({ ...bootlegger, isCustom: false })
    }
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
