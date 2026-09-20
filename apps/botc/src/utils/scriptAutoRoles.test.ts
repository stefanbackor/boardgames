import { describe, it, expect } from 'vitest'
import {
  applyAutoRoles,
  isBootleggerRequired,
  isDjinnRequired,
  type JinxEntry,
} from './scriptAutoRoles'
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

    it('should keep a bootlegger that is part of the script', () => {
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

      // Listed on purpose - it may carry homebrew rules instead of characters
      expect(result.some((r) => r.id === 'bootlegger')).toBe(true)
    })

    it('should add bootlegger when the script declares homebrew rules', () => {
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

      const result = applyAutoRoles(roles, mockJinxes, mockBaseRoles, {
        hasHomebrewRules: true,
      })

      expect(result.some((r) => r.id === 'bootlegger')).toBe(true)
    })

    it('should not duplicate bootlegger when homebrew rules exist', () => {
      const roles: ParsedRole[] = [
        {
          id: 'bootlegger',
          name: 'Bootlegger',
          team: 'loric',
          edition: 'loric',
          ability: 'This script has homebrew characters or rules.',
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

      const result = applyAutoRoles(roles, mockJinxes, mockBaseRoles, {
        hasHomebrewRules: true,
      })

      expect(result.filter((r) => r.id === 'bootlegger')).toHaveLength(1)
    })

    it('should not add bootlegger when there are no homebrew rules', () => {
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

      const result = applyAutoRoles(roles, mockJinxes, mockBaseRoles, {
        hasHomebrewRules: false,
      })

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

      // Neither counts as a custom role, so no extra fabled is added.
      // The bootlegger stays because the script lists it, the djinn goes
      // because there are no active jinxes.
      expect(result.filter((r) => r.id === 'bootlegger')).toHaveLength(1)
      expect(result.some((r) => r.id === 'djinn')).toBe(false)
    })
  })
})

describe('isBootleggerRequired', () => {
  const plainRole: ParsedRole = {
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
  }

  const customRole: ParsedRole = { ...plainRole, id: 'mybrew', isCustom: true }

  it('should not require the bootlegger for a plain script', () => {
    expect(isBootleggerRequired([plainRole])).toBe(false)
  })

  it('should require the bootlegger for homebrew characters', () => {
    expect(isBootleggerRequired([plainRole, customRole])).toBe(true)
  })

  it('should require the bootlegger for homebrew rules', () => {
    expect(isBootleggerRequired([plainRole], { hasHomebrewRules: true })).toBe(
      true,
    )
  })

  it('should not require the bootlegger just because it is listed', () => {
    const bootlegger: ParsedRole = {
      ...plainRole,
      id: 'bootlegger',
      name: 'Bootlegger',
      team: 'loric',
    }

    expect(isBootleggerRequired([plainRole, bootlegger])).toBe(false)
  })
})

describe('isDjinnRequired', () => {
  const role = (id: string): ParsedRole =>
    ({
      id,
      name: id,
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
    }) as ParsedRole

  const jinxes: JinxEntry[] = [
    { id: 'chambermaid', hatred: [{ id: 'mathematician', reason: 'Test' }] },
  ]

  it('should not require the djinn without a jinx pair', () => {
    expect(isDjinnRequired([role('chambermaid')], jinxes)).toBe(false)
  })

  it('should require the djinn while both halves of a jinx are present', () => {
    expect(
      isDjinnRequired([role('chambermaid'), role('mathematician')], jinxes),
    ).toBe(true)
  })

  it('should not require the djinn just because it is listed', () => {
    expect(isDjinnRequired([role('chambermaid'), role('djinn')], jinxes)).toBe(
      false,
    )
  })
})
