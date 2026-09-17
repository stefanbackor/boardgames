import type {
  Role,
  ScriptMeta,
  ScriptRole,
  ScriptData,
  ParsedRole,
  ParseScriptResult,
} from '@/types'

// Re-export types for backward compatibility
export type {
  ScriptMeta,
  ScriptRole,
  ScriptData,
  ParsedRole,
  ParseScriptResult,
}

/**
 * Reads the role id off a script item.
 *
 * Script data arrives as arbitrary JSON - a pasted file, a shared link, a
 * `script_url` pointing at someone else's tool - and only `Array.isArray` ever
 * stands between that and here. So an entry may be anything at all, `null`
 * included, and `null` is the one that matters: `typeof null === 'object'`, so
 * the obvious `typeof item === 'string' ? item : item.id` reads a property off
 * it and throws.
 *
 * Anything that is not a string or an object carrying a string `id` has no id
 * to give, and answering with an empty string says exactly that: it matches no
 * role and, just as importantly, is not `_meta`.
 *
 * @param item - A script item, trusted no further than the JSON it came from
 * @returns The role id, or an empty string for an entry that has none
 */
export function getScriptItemId(item: unknown): string {
  if (typeof item === 'string') return item

  if (typeof item === 'object' && item !== null) {
    const { id } = item as { id?: unknown }
    if (typeof id === 'string') return id
  }

  return ''
}

/**
 * Extracts metadata from unknown script data (for use before full parsing)
 * @param parsed - The raw parsed data array
 * @returns The script metadata with name and author fields
 */
export function extractMeta(parsed: unknown[]) {
  // An object, so that a bare "_meta" string entry is not read as one - and via
  // getScriptItemId, so that a null entry is not read at all
  const metaItem = parsed.find(
    (item) => typeof item === 'object' && getScriptItemId(item) === '_meta',
  )
  return metaItem as
    | { name?: string; author?: string; bootlegger?: string[] | string }
    | undefined
}

/**
 * Parses script data and returns the metadata.
 * @param scriptData - The raw script data array containing metadata and role references
 * @returns The script metadata
 */
export const getScriptMeta = (scriptData: ScriptData) => {
  // As extractMeta above: an object, and read through getScriptItemId
  return scriptData.find(
    (item) => typeof item === 'object' && getScriptItemId(item) === '_meta',
  ) as ScriptMeta | undefined
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
  // Extract metadata
  const meta = getScriptMeta(scriptData)

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
          ...(scriptRole.image && { image: scriptRole.image }),
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
