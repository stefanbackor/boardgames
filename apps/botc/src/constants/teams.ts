/**
 * Team constants and configurations for Blood on the Clocktower
 */

/**
 * Team enum - represents all available teams in the game
 */
export enum Team {
  Townsfolk = 'townsfolk',
  Outsider = 'outsider',
  Minion = 'minion',
  Demon = 'demon',
  Traveler = 'traveler',
  Fabled = 'fabled',
  Loric = 'loric',
}

/**
 * All available teams as an array (for iteration)
 */
export const TEAMS = [
  Team.Townsfolk,
  Team.Outsider,
  Team.Minion,
  Team.Demon,
  Team.Traveler,
  Team.Fabled,
  Team.Loric,
] as const

/**
 * Team color mapping for UI components
 */
export type TeamColor = 'blue' | 'red' | 'orange' | 'grass' | 'amber'

/**
 * Configuration for each team
 */
export interface TeamConfig {
  color: TeamColor
  columns?: number
  pageBreakBefore?: boolean
  hideIfEmpty?: boolean
}

/**
 * Team configuration map
 */
export const TEAM_CONFIG: Record<Team, TeamConfig> = {
  [Team.Townsfolk]: {
    color: 'blue',
  },
  [Team.Outsider]: {
    color: 'blue',
  },
  [Team.Minion]: {
    color: 'red',
  },
  [Team.Demon]: {
    color: 'red',
  },
  [Team.Traveler]: {
    color: 'orange',
    columns: 1,
    pageBreakBefore: true,
    hideIfEmpty: true,
  },
  [Team.Fabled]: {
    color: 'amber',
    columns: 1,
    pageBreakBefore: true,
    hideIfEmpty: true,
  },
  [Team.Loric]: {
    color: 'grass',
    columns: 1,
    pageBreakBefore: true,
    hideIfEmpty: true,
  },
}

/**
 * Team labels for UI components
 * These are translation keys that should be used with i18next t() function
 */
export const TEAM_LABELS: Record<
  Team,
  { label: string; addLabel: string; replaceLabel: string }
> = {
  [Team.Townsfolk]: {
    label: 'Townsfolk',
    addLabel: 'Add Townsfolk',
    replaceLabel: 'Replace Townsfolk',
  },
  [Team.Outsider]: {
    label: 'Outsiders',
    addLabel: 'Add Outsiders',
    replaceLabel: 'Replace Outsiders',
  },
  [Team.Minion]: {
    label: 'Minions',
    addLabel: 'Add Minions',
    replaceLabel: 'Replace Minions',
  },
  [Team.Demon]: {
    label: 'Demons',
    addLabel: 'Add Demons',
    replaceLabel: 'Replace Demons',
  },
  [Team.Traveler]: {
    label: 'Recommended Travelers',
    addLabel: 'Add Recommended Travelers',
    replaceLabel: 'Replace Recommended Travelers',
  },
  [Team.Fabled]: {
    label: 'Fabled',
    addLabel: 'Add Fabled',
    replaceLabel: 'Replace Fabled',
  },
  [Team.Loric]: {
    label: 'Loric',
    addLabel: 'Add Loric',
    replaceLabel: 'Replace Loric',
  },
}
