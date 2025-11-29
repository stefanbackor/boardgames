import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTeamLabels } from './useTeamLabels'
import { Team, TEAMS } from '@/constants'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Return the key as-is (no translation)
  }),
}))

describe('useTeamLabels', () => {
  it('should return labels for all teams', () => {
    const { result } = renderHook(() => useTeamLabels())
    const labels = result.current

    for (const team of TEAMS) {
      expect(labels[team]).toBeDefined()
      expect(labels[team].label).toBeDefined()
      expect(labels[team].addLabel).toBeDefined()
      expect(labels[team].replaceLabel).toBeDefined()
    }
  })

  it('should return correct label structure for Townsfolk', () => {
    const { result } = renderHook(() => useTeamLabels())
    const labels = result.current

    expect(labels[Team.Townsfolk]).toEqual({
      label: 'Townsfolk',
      addLabel: 'Add Townsfolk',
      replaceLabel: 'Replace Townsfolk',
    })
  })

  it('should return pluralized labels for Outsider', () => {
    const { result } = renderHook(() => useTeamLabels())
    const labels = result.current

    expect(labels[Team.Outsider].label).toBe('Outsiders')
    expect(labels[Team.Outsider].addLabel).toContain('Outsiders')
  })

  it('should return pluralized labels for Minion', () => {
    const { result } = renderHook(() => useTeamLabels())
    const labels = result.current

    expect(labels[Team.Minion].label).toBe('Minions')
    expect(labels[Team.Minion].addLabel).toContain('Minions')
  })

  it('should return pluralized labels for Demon', () => {
    const { result } = renderHook(() => useTeamLabels())
    const labels = result.current

    expect(labels[Team.Demon].label).toBe('Demons')
    expect(labels[Team.Demon].addLabel).toContain('Demons')
  })

  it('should return descriptive label for Traveler', () => {
    const { result } = renderHook(() => useTeamLabels())
    const labels = result.current

    expect(labels[Team.Traveler].label).toBe('Recommended Travelers')
  })

  it('should have label prefixes match actions', () => {
    const { result } = renderHook(() => useTeamLabels())
    const labels = result.current

    for (const team of TEAMS) {
      expect(labels[team].addLabel).toMatch(/^Add /)
      expect(labels[team].replaceLabel).toMatch(/^Replace /)
    }
  })

  it('should have all labels as non-empty strings', () => {
    const { result } = renderHook(() => useTeamLabels())
    const labels = result.current

    for (const team of TEAMS) {
      expect(labels[team].label.length).toBeGreaterThan(0)
      expect(labels[team].addLabel.length).toBeGreaterThan(0)
      expect(labels[team].replaceLabel.length).toBeGreaterThan(0)
    }
  })

  it('should have matching keys for all teams', () => {
    const { result } = renderHook(() => useTeamLabels())
    const labels = result.current

    const teamKeys = Object.values(Team)
    const labelKeys = Object.keys(labels)

    expect(labelKeys.sort()).toEqual(teamKeys.sort())
  })
})
