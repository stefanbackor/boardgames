import { describe, it, expect } from 'vitest'
import { Team, TEAMS, TEAM_CONFIG } from './teams'

describe('teams constants', () => {
  describe('Team enum', () => {
    it('should have all expected team values', () => {
      expect(Team.Townsfolk).toBe('townsfolk')
      expect(Team.Outsider).toBe('outsider')
      expect(Team.Minion).toBe('minion')
      expect(Team.Demon).toBe('demon')
      expect(Team.Traveler).toBe('traveler')
      expect(Team.Fabled).toBe('fabled')
      expect(Team.Loric).toBe('loric')
    })
  })

  describe('TEAMS array', () => {
    it('should contain all team values', () => {
      expect(TEAMS).toHaveLength(7)
      expect(TEAMS).toContain(Team.Townsfolk)
      expect(TEAMS).toContain(Team.Outsider)
      expect(TEAMS).toContain(Team.Minion)
      expect(TEAMS).toContain(Team.Demon)
      expect(TEAMS).toContain(Team.Traveler)
      expect(TEAMS).toContain(Team.Fabled)
      expect(TEAMS).toContain(Team.Loric)
    })

    it('should have unique values', () => {
      const uniqueTeams = new Set(TEAMS)
      expect(uniqueTeams.size).toBe(TEAMS.length)
    })
  })

  describe('TEAM_CONFIG', () => {
    it('should have config for all teams', () => {
      for (const team of TEAMS) {
        expect(TEAM_CONFIG[team]).toBeDefined()
        expect(TEAM_CONFIG[team].color).toBeDefined()
      }
    })

    it('should have correct colors for good teams', () => {
      expect(TEAM_CONFIG[Team.Townsfolk].color).toBe('blue')
      expect(TEAM_CONFIG[Team.Outsider].color).toBe('blue')
    })

    it('should have correct colors for evil teams', () => {
      expect(TEAM_CONFIG[Team.Minion].color).toBe('red')
      expect(TEAM_CONFIG[Team.Demon].color).toBe('red')
    })

    it('should have correct colors for special teams', () => {
      expect(TEAM_CONFIG[Team.Traveler].color).toBe('orange')
      expect(TEAM_CONFIG[Team.Fabled].color).toBe('amber')
      expect(TEAM_CONFIG[Team.Loric].color).toBe('grass')
    })

    it('should have columns set for special teams', () => {
      expect(TEAM_CONFIG[Team.Traveler].columns).toBe(1)
      expect(TEAM_CONFIG[Team.Fabled].columns).toBe(1)
      expect(TEAM_CONFIG[Team.Loric].columns).toBe(1)
    })

    it('should have hideIfEmpty for special teams', () => {
      expect(TEAM_CONFIG[Team.Traveler].hideIfEmpty).toBe(true)
      expect(TEAM_CONFIG[Team.Fabled].hideIfEmpty).toBe(true)
      expect(TEAM_CONFIG[Team.Loric].hideIfEmpty).toBe(true)
    })

    it('should not have columns defined for main teams', () => {
      expect(TEAM_CONFIG[Team.Townsfolk].columns).toBeUndefined()
      expect(TEAM_CONFIG[Team.Outsider].columns).toBeUndefined()
      expect(TEAM_CONFIG[Team.Minion].columns).toBeUndefined()
      expect(TEAM_CONFIG[Team.Demon].columns).toBeUndefined()
    })
  })

  describe('consistency checks', () => {
    it('should have matching keys across all constants', () => {
      const teamKeys = Object.values(Team)
      const configKeys = Object.keys(TEAM_CONFIG)

      expect(configKeys.sort()).toEqual(teamKeys.sort())
    })
  })
})
