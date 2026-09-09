import { describe, it, expect } from 'vitest'
import { formatRoleDisplayName, getEnglishRoleName } from './roleDisplayName'

describe('roleDisplayName utilities', () => {
  describe('getEnglishRoleName', () => {
    it('should return the English name for a known role', () => {
      expect(getEnglishRoleName('washerwoman')).toBe('Washerwoman')
    })

    it('should fall back to the id for an unknown role', () => {
      expect(getEnglishRoleName('my_custom_role')).toBe('my_custom_role')
    })
  })

  describe('formatRoleDisplayName', () => {
    const translatedRole = { id: 'washerwoman', name: 'Pradlena' }

    it('should return the plain name when the option is off', () => {
      expect(formatRoleDisplayName(translatedRole, false)).toBe('Pradlena')
    })

    it('should append the English name in brackets when the option is on', () => {
      expect(formatRoleDisplayName(translatedRole, true)).toBe(
        'Pradlena (Washerwoman)',
      )
    })

    it('should not repeat the name when it is already English', () => {
      expect(
        formatRoleDisplayName({ id: 'washerwoman', name: 'Washerwoman' }, true),
      ).toBe('Washerwoman')
    })

    it('should leave custom roles untouched', () => {
      expect(
        formatRoleDisplayName({ id: 'my_custom_role', name: 'Pekař' }, true),
      ).toBe('Pekař')
    })
  })
})
