import type { Role } from '../data/types'

export type ScriptMeta = {
  id: '_meta'
  name: string
  author: string
  firstNight?: Array<string>
  otherNight?: Array<string>
}

export type ScriptRole = {
  id: string
  // Optional fields from full role objects in script
  name?: string
  image?: string
  team?: Role['team']
  edition?: Role['edition']
  ability?: string
  flavor?: string
  firstNight?: number
  otherNight?: number
  firstNightReminder?: string
  otherNightReminder?: string
  reminders?: string[]
  remindersGlobal?: string[]
  setup?: boolean
  special?: Role['special']
}

export type ScriptData = Array<ScriptMeta | ScriptRole | string>

export type ParsedRole = Role & { isCustom: boolean }

export interface ParseScriptResult {
  meta?: ScriptMeta
  roles: ParsedRole[]
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
  const meta = scriptData.find(
    (item) => typeof item !== 'string' && item.id === '_meta',
  ) as ScriptMeta | undefined

  // Parse roles
  const roles = scriptData
    .filter((item) => {
      if (typeof item === 'string') return true
      return item.id !== '_meta'
    })
    .map((item) => {
      // Handle string notation (just role ID)
      const roleId = typeof item === 'string' ? item : item.id
      const scriptRole = typeof item === 'string' ? { id: item } : (item as ScriptRole)

      // First, try to find the role in base roles
      const baseRole = baseRoles.find((role) => role.id === roleId)

      if (baseRole) {
        return { ...baseRole, isCustom: false }
      }

      // If not found in base roles, check if the script has full role data
      if (scriptRole.name && scriptRole.team) {
        // Convert script role to Role type with defaults for required fields
        return {
          id: scriptRole.id,
          name: scriptRole.name,
          team: scriptRole.team,
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
