import { Team } from '@/constants/teams'

export type RoleName = string

/**
 * Base role type representing a character in Blood on the Clocktower
 *
 * Note: team property accepts both the Team enum and its string literal values
 * for compatibility with existing JSON data files
 */
export type Role = {
  id: RoleName
  image: string
  name: string
  edition: 'tb' | 'snv' | 'bmr' | ''
  team: Team | `${Team}`
  firstNight: number
  firstNightReminder: string
  otherNight: number
  otherNightReminder: string
  reminders: string[]
  remindersGlobal?: string[]
  special?: Array<
    | { name: 'replace-character'; type: 'reveal' }
    | {
        name: 'bag-disabled'
        type: 'selection'
      }
    | {
        name: 'bag-duplicate'
        type: 'selection'
      }
    | {
        name: 'grimoire'
        type: 'signal'
        time: 'night'
      }
    | {
        name: 'multiplier'
        type: 'vote'
        value: string
      }
    | {
        name: 'pointing'
        type: 'ability'
        time?: 'night'
        global?: 'minion'
      }
    | {
        name: 'open-eyes'
        type: 'player'
        time: 'night'
      }
    | {
        name: 'hidden'
        type: 'vote'
      }
  >
  setup: boolean
  ability: string
  flavor?: string
  source?: 'cs'
}

/**
 * Translation data for a role
 */
export interface RoleTranslation {
  name?: string
  ability?: string
  flavor?: string
  reminders?: string[]
  firstNightReminder?: string
  otherNightReminder?: string
}

/**
 * Extended role type with custom flag
 */
export type ParsedRole = Role & { isCustom: boolean }
