import { roles as baseRoles } from '@/data/roles.en'

/**
 * English role names keyed by role id, built once from the base role data.
 */
const englishNames = new Map(baseRoles.map((role) => [role.id, role.name]))

/**
 * Returns the official English name for a role id.
 * Falls back to the id itself for custom roles that have no base entry.
 */
export function getEnglishRoleName(roleId: string): string {
  return englishNames.get(roleId) || roleId
}

/**
 * Formats a role name for display, optionally appending the English name in
 * brackets (e.g. `Pradlena (Washerwoman)`).
 *
 * The bracket is omitted when it would add nothing: when the option is off, when
 * the role is custom (no English name known), or when the name is untranslated
 * and therefore already English.
 *
 * @param role - Role to render the name for
 * @param showEnglishNames - Whether the English name should be appended
 */
export function formatRoleDisplayName(
  role: { id: string; name: string },
  showEnglishNames: boolean,
): string {
  if (!showEnglishNames) return role.name

  const englishName = englishNames.get(role.id)
  if (!englishName || englishName === role.name) return role.name

  return `${role.name} (${englishName})`
}
