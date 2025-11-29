import { describe, it, expect } from 'vitest'
import { applyAutoRoles, type JinxEntry } from './scriptAutoRoles'
import type { ParsedRole, Role } from '@/types'

describe('applyAutoRoles', () => {
  // Mock base roles
  const mockBaseRoles: Role[] = [
    {
      id: 'bootlegger',
      name: 'Bootlegger',
      team: 'fabled',
      edition: '',
      ability: 'This script has homebrew characters.',
      image: 'https://example.com/bootlegger.png',
      firstNight: 0,
      otherNight: 0,
      firstNightReminder: '',
      otherNightReminder: '',
      reminders: [],
      setup: false,
    },
    {
      id: 'djinn',
      name: 'Djinn',
      team: 'fabled',
      edition: '',
      ability: 'Use the jinxed characters list.',
      image: 'https://example.com/djinn.png',
      firstNight: 0,
      otherNight: 0,
      firstNightReminder: '',
      otherNightReminder: '',
      reminders: [],
      setup: false,
    },
  ] as Role[]

  // Mock jinxes
  const mockJinxes: JinxEntry[] = [
    {
      id: 'chambermaid',
      hatred: [{ id: 'mathematician', reason: 'Test jinx' }],
    },
    {
      id: 'spy',
      hatred: [{ id: 'magician', reason: 'Test jinx' }],
    },
  ]

  describe('bootlegger auto-add', () => {
    it('should add bootlegger when there are custom roles', () => {
      const roles: ParsedRole[] = [
        {
          id: 'washerwoman',
          name: 'Washerwoman',
          team: 'townsfolk',
          edition: 'tb',
          ability: 'Test',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
        {
          id: 'customrole',
          name: 'Custom Role',
          team: 'townsfolk',
          edition: '',
          ability: 'Custom ability',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: true,
        },
      ]

      const result = applyAutoRoles(roles, mockJinxes, mockBaseRoles)

      expect(result).toHaveLength(3)
      expect(result.some((r) => r.id === 'bootlegger')).toBe(true)
    })

    it('should not add bootlegger when there are no custom roles', () => {
      const roles: ParsedRole[] = [
        {
          id: 'washerwoman',
          name: 'Washerwoman',
          team: 'townsfolk',
          edition: 'tb',
          ability: 'Test',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
      ]

      const result = applyAutoRoles(roles, mockJinxes, mockBaseRoles)

      expect(result.some((r) => r.id === 'bootlegger')).toBe(false)
    })

    it('should remove bootlegger when custom roles are removed', () => {
      const roles: ParsedRole[] = [
        {
          id: 'washerwoman',
          name: 'Washerwoman',
          team: 'townsfolk',
          edition: 'tb',
          ability: 'Test',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
        {
          id: 'bootlegger',
          name: 'Bootlegger',
          team: 'fabled',
          edition: '',
          ability: 'This script has homebrew characters.',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
      ]

      const result = applyAutoRoles(roles, mockJinxes, mockBaseRoles)

      expect(result.some((r) => r.id === 'bootlegger')).toBe(false)
    })
  })

  describe('djinn auto-add', () => {
    it('should add djinn when there are active jinxes', () => {
      const roles: ParsedRole[] = [
        {
          id: 'chambermaid',
          name: 'Chambermaid',
          team: 'townsfolk',
          edition: 'snv',
          ability: 'Test',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
        {
          id: 'mathematician',
          name: 'Mathematician',
          team: 'townsfolk',
          edition: 'snv',
          ability: 'Test',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
      ]

      const result = applyAutoRoles(roles, mockJinxes, mockBaseRoles)

      expect(result.some((r) => r.id === 'djinn')).toBe(true)
    })

    it('should not add djinn when there are no active jinxes', () => {
      const roles: ParsedRole[] = [
        {
          id: 'chambermaid',
          name: 'Chambermaid',
          team: 'townsfolk',
          edition: 'snv',
          ability: 'Test',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
      ]

      const result = applyAutoRoles(roles, mockJinxes, mockBaseRoles)

      expect(result.some((r) => r.id === 'djinn')).toBe(false)
    })

    it('should remove djinn when jinxed roles are removed', () => {
      const roles: ParsedRole[] = [
        {
          id: 'chambermaid',
          name: 'Chambermaid',
          team: 'townsfolk',
          edition: 'snv',
          ability: 'Test',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
        {
          id: 'djinn',
          name: 'Djinn',
          team: 'fabled',
          edition: '',
          ability: 'Use the jinxed characters list.',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
      ]

      const result = applyAutoRoles(roles, mockJinxes, mockBaseRoles)

      expect(result.some((r) => r.id === 'djinn')).toBe(false)
    })
  })

  describe('combined scenarios', () => {
    it('should add both bootlegger and djinn when needed', () => {
      const roles: ParsedRole[] = [
        {
          id: 'customrole',
          name: 'Custom Role',
          team: 'townsfolk',
          edition: '',
          ability: 'Custom ability',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: true,
        },
        {
          id: 'chambermaid',
          name: 'Chambermaid',
          team: 'townsfolk',
          edition: 'snv',
          ability: 'Test',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
        {
          id: 'mathematician',
          name: 'Mathematician',
          team: 'townsfolk',
          edition: 'snv',
          ability: 'Test',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
      ]

      const result = applyAutoRoles(roles, mockJinxes, mockBaseRoles)

      expect(result.some((r) => r.id === 'bootlegger')).toBe(true)
      expect(result.some((r) => r.id === 'djinn')).toBe(true)
    })

    it('should not count bootlegger and djinn as custom roles', () => {
      const roles: ParsedRole[] = [
        {
          id: 'washerwoman',
          name: 'Washerwoman',
          team: 'townsfolk',
          edition: 'tb',
          ability: 'Test',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: false,
        },
        {
          id: 'bootlegger',
          name: 'Bootlegger',
          team: 'fabled',
          edition: '',
          ability: 'This script has homebrew characters.',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: true, // Even if marked as custom
        },
        {
          id: 'djinn',
          name: 'Djinn',
          team: 'fabled',
          edition: '',
          ability: 'Use the jinxed characters list.',
          image: '',
          firstNight: 0,
          otherNight: 0,
          firstNightReminder: '',
          otherNightReminder: '',
          reminders: [],
          setup: false,
          isCustom: true, // Even if marked as custom
        },
      ]

      const result = applyAutoRoles(roles, mockJinxes, mockBaseRoles)

      // Should remove both since there are no actual custom roles or jinxes
      expect(result.some((r) => r.id === 'bootlegger')).toBe(false)
      expect(result.some((r) => r.id === 'djinn')).toBe(false)
    })
  })
})

