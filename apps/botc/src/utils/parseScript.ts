import type {
  Role,
  ScriptMeta,
  ScriptRole,
  ScriptData,
  ParsedRole,
  ParseScriptResult,
} from '@/types'
import { getScriptItemId, readMeta } from './scriptIntake'

// Re-export types for backward compatibility
export type {
  ScriptMeta,
  ScriptRole,
  ScriptData,
  ParsedRole,
  ParseScriptResult,
}

/**
 * Reads the image URL off a script role. The schema allows alignment variants
 * as an array, good first; only the first is shown. Anything that is not a URL
 * string is dropped, as the rest of the app treats the image as one.
 */
function getScriptRoleImage(image: unknown): string | undefined {
  const url = Array.isArray(image) ? image[0] : image
  return typeof url === 'string' && url ? url : undefined
}

/**
 * Parses script data and returns a list of valid roles with their metadata.
 *
 * @param scriptData - The raw script data array containing metadata and role references
 * @param baseRoles - The base roles database to use for role lookups
 * @returns An object containing the script metadata and parsed roles
 */
export function parseScript(
  scriptData: ScriptData,
  baseRoles: Role[],
): ParseScriptResult {
  const meta = readMeta(scriptData)

  // Parse roles
  const roles = scriptData
    // An entry with no id of its own is no role, so it is dropped rather than
    // carried as far as the lookup below - see getScriptItemId
    .filter((item) => {
      const id = getScriptItemId(item)
      return id !== '' && id !== '_meta'
    })
    .map((item) => {
      // Handle string notation (just role ID)
      const roleId = getScriptItemId(item)
      const scriptRole =
        typeof item === 'string' ? { id: item } : (item as ScriptRole)

      // First, try to find the role in base roles
      const baseRole = baseRoles.find((role) => role.id === roleId)

      if (baseRole) {
        return { ...baseRole, isCustom: false }
      }

      // If not found in base roles, check if the script has full role data
      if (scriptRole.name && scriptRole.team) {
        // Normalize legacy "traveler" spelling to preferred "traveller"
        const team =
          (scriptRole.team as string) === 'traveler'
            ? 'traveller'
            : scriptRole.team

        const image = getScriptRoleImage(scriptRole.image)

        // Convert script role to Role type with defaults for required fields
        return {
          id: scriptRole.id,
          name: scriptRole.name,
          team,
          edition: scriptRole.edition || '',
          ability: scriptRole.ability || '',
          firstNight: scriptRole.firstNight || 0,
          otherNight: scriptRole.otherNight || 0,
          firstNightReminder: scriptRole.firstNightReminder || '',
          otherNightReminder: scriptRole.otherNightReminder || '',
          reminders: scriptRole.reminders || [],
          setup: scriptRole.setup || false,
          isCustom: true,
          ...(image && { image }),
          ...(scriptRole.flavor && { flavor: scriptRole.flavor }),
          ...(scriptRole.remindersGlobal && {
            remindersGlobal: scriptRole.remindersGlobal,
          }),
          ...(scriptRole.special && { special: scriptRole.special }),
        } as ParsedRole
      }

      // If neither base role nor full script data exists, return null
      return null
    })
    .filter((role): role is ParsedRole => role !== null)

  return {
    meta,
    roles,
  }
}
