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
  Team.Loric,
] as const

/**
 * Team color mapping for UI components
 */
export type TeamColor = 'blue' | 'red' | 'orange' | 'green'

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
  [Team.Loric]: {
    color: 'green',
    columns: 1,
    pageBreakBefore: true,
    hideIfEmpty: true,
  },
}
