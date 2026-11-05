import { Team, TEAM_CONFIG } from '@/constants'
import type { ParsedRole, Role, ScriptMetaFields } from '@/types'
import type { Jinx } from '@/types/jinx'
import {
  applyAutoRoles,
  isBootleggerRequired,
  isDjinnRequired,
} from './scriptAutoRoles'
import {
  getDjinnJinxes,
  getHatedByMap,
  type DjinnJinx,
  type JinxedBy,
} from './scriptJinxes'

/** The teams of the first page, in order, shown even when empty */
const CHARACTER_TEAMS = [
  Team.Townsfolk,
  Team.Outsider,
  Team.Minion,
  Team.Demon,
] as const

/** The teams of the second page, in order */
const EXTRA_TEAMS = [Team.Traveler, Team.Fabled, Team.Loric] as const

/**
 * Why a character cannot be taken out of the script:
 * - `homebrew`: custom characters or Bootlegger rules hold the Bootlegger
 * - `unsaved-rules`: only an unsaved rule edit holds it, and a save lets go
 * - `jinxes`: a jinxed pair on the script holds the Djinn
 */
export type LockReason = 'homebrew' | 'unsaved-rules' | 'jinxes'

/** One character as it is shown, with what its card carries besides itself */
export interface RoleView {
  role: ParsedRole
  /** The script's characters jinxed with this one, if any */
  hatedBy?: JinxedBy[]
  /** The Djinn only: every jinx between two characters of the script */
  jinxes?: DjinnJinx[]
  /** The Bootlegger only: the Bootlegger rules */
  rules?: string[]
  /** Why the character cannot be taken out, if it cannot */
  lock?: LockReason
}

/** One team as it is shown */
export interface TeamView {
  team: Team
  roles: RoleView[]
  /** An empty team that is left off paper; the screen keeps it to add to */
  hiddenWhenEmpty: boolean
}

/**
 * Unsaved edits, null where nothing was recorded. An empty string or list is
 * an edit too: a name the user cleared must not come back from the metadata.
 */
export interface ScriptOverrides {
  name: string | null
  author: string | null
  bootleggerRules: string[] | null
}

/** What the script view is built from */
export interface ScriptViewInput {
  /** The characters as parseScript resolved them */
  roles: ParsedRole[]
  meta: ScriptMetaFields
  /** The name to show when neither an edit nor the metadata has one */
  fallbackName: string
  overrides: ScriptOverrides
  /** Every character, to add the Bootlegger and Djinn from */
  catalog: Role[]
  jinxes: Jinx[]
}

/** The teams as the sheet lays them out, a page each */
export interface ScriptPages {
  /** Townsfolk, Outsiders, Minions and Demons */
  characters: TeamView[]
  /** Travellers, Fabled and Loric */
  extras: TeamView[]
}

/**
 * The script as players see it. The screen, print and PDF all draw this, so
 * they cannot disagree on what is on the sheet.
 */
export interface ScriptView {
  name: string
  author: string
  /** Whether the author is worth a "by" line: not empty, not only spaces */
  hasAuthor: boolean
  /** Every character on the sheet, the auto-added Bootlegger and Djinn included */
  roles: ParsedRole[]
  roleIds: ReadonlySet<string>
  pages: ScriptPages
}

/**
 * Builds the script view: what goes on the sheet, unsaved edits included.
 *
 * @param input - The parsed script, its edits, and the data it draws on
 * @returns Everything the sheet shows, grouped as it is laid out
 */
export function buildScriptView({
  roles: parsedRoles,
  meta,
  fallbackName,
  overrides,
  catalog,
  jinxes,
}: ScriptViewInput): ScriptView {
  const name = overrides.name ?? (meta.name || fallbackName)
  const author = overrides.author ?? meta.author

  const bootleggerRules = overrides.bootleggerRules ?? meta.bootlegger
  const hasBootleggerRules = bootleggerRules.length > 0
  // Deleting the last rule must not take the editor away with it, so an
  // unsaved rule edit keeps the Bootlegger around even at zero rules
  const hasHomebrewRules =
    hasBootleggerRules || overrides.bootleggerRules !== null

  const roles = applyAutoRoles(parsedRoles, jinxes, catalog, {
    hasHomebrewRules,
  })

  /**
   * The Bootlegger's two reasons are worth telling apart. Homebrew content is
   * a property of the script; an emptied rule list only holds the Bootlegger
   * until the script is saved, and blaming rules that are no longer there is
   * how a tooltip loses the reader.
   */
  const locks: Record<string, LockReason> = {}
  if (isBootleggerRequired(roles, { hasHomebrewRules: hasBootleggerRules })) {
    locks.bootlegger = 'homebrew'
  } else if (hasHomebrewRules) {
    locks.bootlegger = 'unsaved-rules'
  }
  if (isDjinnRequired(roles, jinxes)) {
    locks.djinn = 'jinxes'
  }

  const hatedBy = getHatedByMap(roles, jinxes)
  const djinnJinxes = getDjinnJinxes(roles, jinxes)

  const roleView = (role: ParsedRole): RoleView => ({
    role,
    hatedBy: hatedBy.get(role.id),
    jinxes: role.id === 'djinn' ? djinnJinxes : undefined,
    // Wherever the script lists the Bootlegger, the rules go with it
    rules: role.id === 'bootlegger' ? bootleggerRules : undefined,
    lock: locks[role.id],
  })

  const teamView = (team: Team): TeamView => ({
    team,
    roles: roles.filter((role) => role.team === team).map(roleView),
    hiddenWhenEmpty: TEAM_CONFIG[team].hideIfEmpty ?? false,
  })

  return {
    name,
    author,
    hasAuthor: author.trim() !== '',
    roles,
    roleIds: new Set(roles.map((role) => role.id)),
    pages: {
      characters: CHARACTER_TEAMS.map(teamView),
      extras: EXTRA_TEAMS.map(teamView),
    },
  }
}

/**
 * Whether a team goes on paper - print and PDF alike. An empty team the sheet
 * can do without is left off.
 */
export const isTeamOnPaper = (team: TeamView): boolean =>
  team.roles.length > 0 || !team.hiddenWhenEmpty
