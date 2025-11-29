import { describe, it, expect } from 'vitest'
import { Team, TEAMS, TEAM_CONFIG, TEAM_LABELS } from './teams'

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

  describe('TEAM_LABELS', () => {
    it('should have labels for all teams', () => {
      for (const team of TEAMS) {
        expect(TEAM_LABELS[team]).toBeDefined()
        expect(TEAM_LABELS[team].label).toBeDefined()
        expect(TEAM_LABELS[team].addLabel).toBeDefined()
        expect(TEAM_LABELS[team].replaceLabel).toBeDefined()
      }
    })

    it('should have correct label structure for Townsfolk', () => {
      expect(TEAM_LABELS[Team.Townsfolk]).toEqual({
        label: 'Townsfolk',
        addLabel: 'Add Townsfolk',
        replaceLabel: 'Replace Townsfolk',
      })
    })

    it('should have pluralized labels for Outsider', () => {
      expect(TEAM_LABELS[Team.Outsider].label).toBe('Outsiders')
      expect(TEAM_LABELS[Team.Outsider].addLabel).toContain('Outsiders')
    })

    it('should have pluralized labels for Minion', () => {
      expect(TEAM_LABELS[Team.Minion].label).toBe('Minions')
      expect(TEAM_LABELS[Team.Minion].addLabel).toContain('Minions')
    })

    it('should have pluralized labels for Demon', () => {
      expect(TEAM_LABELS[Team.Demon].label).toBe('Demons')
      expect(TEAM_LABELS[Team.Demon].addLabel).toContain('Demons')
    })

    it('should have descriptive label for Traveler', () => {
      expect(TEAM_LABELS[Team.Traveler].label).toBe('Recommended Travelers')
    })

    it('should have label prefixes match actions', () => {
      for (const team of TEAMS) {
        const labels = TEAM_LABELS[team]
        expect(labels.addLabel).toMatch(/^Add /)
        expect(labels.replaceLabel).toMatch(/^Replace /)
      }
    })

    it('should have all labels as non-empty strings', () => {
      for (const team of TEAMS) {
        const labels = TEAM_LABELS[team]
        expect(labels.label.length).toBeGreaterThan(0)
        expect(labels.addLabel.length).toBeGreaterThan(0)
        expect(labels.replaceLabel.length).toBeGreaterThan(0)
      }
    })
  })

  describe('consistency checks', () => {
    it('should have matching keys across all constants', () => {
      const teamKeys = Object.values(Team)
      const configKeys = Object.keys(TEAM_CONFIG)
      const labelKeys = Object.keys(TEAM_LABELS)

      expect(configKeys.sort()).toEqual(teamKeys.sort())
      expect(labelKeys.sort()).toEqual(teamKeys.sort())
    })
  })
})

