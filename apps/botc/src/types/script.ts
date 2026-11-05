import type { Role } from './role'

/**
 * Script metadata object
 */
export type ScriptMeta = {
  id: '_meta'
  name: string
  author: string
  firstNight?: Array<string>
  otherNight?: Array<string>
  /**
   * Homebrew rules shown on the Bootlegger (Loric) card.
   * Official script tool format: an array of rule strings.
   * A single string is also accepted for leniency.
   */
  bootlegger?: string[] | string
}

/**
 * Script role - can have partial or full role data
 */
export type ScriptRole = {
  id: string
  // Optional fields from full role objects in script
  name?: string
  /**
   * One URL, or alignment variants (good first, then evil) as the official
   * script schema allows.
   */
  image?: string | string[]
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

/**
 * Script data - array of metadata, roles (as strings or objects)
 */
export type ScriptData = Array<ScriptMeta | ScriptRole | string>

/**
 * Script item - can be a role ID string or an object with id
 */
export type ScriptItem = string | { id: string; [key: string]: unknown }

/**
 * Metadata overrides for script modifications
 */
export interface MetaOverrides {
  name?: string
  author?: string
  /** Homebrew rules for the Bootlegger, normalized to an array */
  bootlegger?: string[]
}

/**
 * Script metadata as the rest of the app reads it: every field checked, so a
 * `_meta.name` of 42 or an author of `{}` reads as absent rather than flowing
 * on as a "string". See readMeta.
 */
export interface ScriptMetaFields {
  /** Whether the script carries a `_meta` object at all, valid or not */
  present: boolean
  /** The name, or an empty string when absent or not a string */
  name: string
  /** The author, or an empty string when absent or not a string */
  author: string
  /** The Bootlegger rules, trimmed, empty ones dropped */
  bootlegger: string[]
}

/**
 * Result of parsing a script
 */
export interface ParseScriptResult {
  meta: ScriptMetaFields
  roles: Array<Role & { isCustom: boolean }>
}

/**
 * Saved script with persistence metadata
 */
export interface SavedScript {
  id: string // UUID v4
  name: string // Script name from _meta
  author: string // Author from _meta
  scriptData: ScriptData // Full script JSON
  encodedScript: string // Compressed base64 for URL
  savedAt: string // ISO 8601 timestamp
  lastModified: string // ISO 8601 timestamp
}
