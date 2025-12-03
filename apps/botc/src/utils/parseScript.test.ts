import { describe, it, expect } from 'vitest'
import { parseScript } from './parseScript'
import { roles as baseRolesData } from '@/data/roles.en'
import type { Role } from '@/types'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fixturesDir = path.resolve(__dirname, '../../fixtures/scripts')

// Load all fixture files
const fixtureFiles = fs
  .readdirSync(fixturesDir)
  .filter((file) => file.endsWith('.json'))

describe('parseScript', () => {
  const baseRoles = baseRolesData as Role[]

  describe('basic functionality', () => {
    it('should parse script with only base roles', () => {
      const scriptData = [
        { id: '_meta', name: 'Test Script', author: 'Test Author' },
        'washerwoman',
        'librarian',
        'investigator',
      ]

      const result = parseScript(scriptData as any, baseRoles)

      expect(result.meta).toBeDefined()
      expect(result.meta?.name).toBe('Test Script')
      expect(result.meta?.author).toBe('Test Author')
      expect(result.roles).toHaveLength(3)
      expect(result.roles[0].id).toBe('washerwoman')
      expect(result.roles[0].isCustom).toBe(false)
    })

    it('should parse script with custom roles', () => {
      const scriptData = [
        { id: '_meta', name: 'Custom Script', author: 'Custom Author' },
        {
          id: 'customrole',
          name: 'Custom Role',
          team: 'townsfolk' as const,
          ability: 'Custom ability',
          firstNight: 10,
          otherNight: 5,
          firstNightReminder: 'Do something',
          otherNightReminder: 'Do something else',
          reminders: ['Reminder 1'],
          setup: false,
        },
      ]

      const result = parseScript(scriptData as any, baseRoles)

      expect(result.roles).toHaveLength(1)
      expect(result.roles[0].id).toBe('customrole')
      expect(result.roles[0].name).toBe('Custom Role')
      expect(result.roles[0].team).toBe('townsfolk')
      expect(result.roles[0].isCustom).toBe(true)
    })

    it('should handle mixed base and custom roles', () => {
      const scriptData = [
        { id: '_meta', name: 'Mixed Script', author: 'Test' },
        'washerwoman',
        {
          id: 'customrole',
          name: 'Custom Role',
          team: 'demon' as const,
          ability: 'Custom ability',
        },
        'librarian',
      ]

      const result = parseScript(scriptData as any, baseRoles)

      expect(result.roles).toHaveLength(3)
      expect(result.roles[0].isCustom).toBe(false)
      expect(result.roles[1].isCustom).toBe(true)
      expect(result.roles[2].isCustom).toBe(false)
    })

    it('should filter out invalid roles (missing required data)', () => {
      const scriptData = [
        { id: '_meta', name: 'Test', author: 'Test' },
        'washerwoman',
        { id: 'invalidrole' }, // Missing name and team
        'librarian',
      ]

      const result = parseScript(scriptData as any, baseRoles)

      expect(result.roles).toHaveLength(2)
      expect(result.roles.find((r) => r.id === 'invalidrole')).toBeUndefined()
    })

    it('should handle script without metadata', () => {
      const scriptData = ['washerwoman', 'librarian']

      const result = parseScript(scriptData as any, baseRoles)

      expect(result.meta).toBeUndefined()
      expect(result.roles).toHaveLength(2)
    })

    it('should apply defaults for custom roles', () => {
      const scriptData = [
        {
          id: 'customrole',
          name: 'Minimal Role',
          team: 'outsider' as const,
        },
      ]

      const result = parseScript(scriptData as any, baseRoles)

      expect(result.roles).toHaveLength(1)
      const role = result.roles[0]
      expect(role.edition).toBe('')
      expect(role.ability).toBe('')
      expect(role.firstNight).toBe(0)
      expect(role.otherNight).toBe(0)
      expect(role.firstNightReminder).toBe('')
      expect(role.otherNightReminder).toBe('')
      expect(role.reminders).toEqual([])
      expect(role.setup).toBe(false)
    })

    it('should preserve optional fields when present', () => {
      const scriptData = [
        {
          id: 'customrole',
          name: 'Complex Role',
          team: 'minion' as const,
          image: 'https://example.com/image.png',
          flavor: 'Flavor text',
          remindersGlobal: ['Global reminder'],
          special: [
            { name: 'replace-character' as const, type: 'reveal' as const },
          ],
        },
      ]

      const result = parseScript(scriptData as any, baseRoles)

      expect(result.roles).toHaveLength(1)
      const role = result.roles[0]
      expect(role.image).toBe('https://example.com/image.png')
      expect(role.flavor).toBe('Flavor text')
      expect(role.remindersGlobal).toEqual(['Global reminder'])
      expect(role.special).toBeDefined()
    })
  })

  describe('fixture files', () => {
    fixtureFiles.forEach((fixtureFile) => {
      describe(`${fixtureFile}`, () => {
        const fixturePath = path.join(fixturesDir, fixtureFile)
        const scriptData = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'))

        it('should parse without errors', () => {
          expect(() => parseScript(scriptData, baseRoles)).not.toThrow()
        })

        it('should return valid ParseScriptResult', () => {
          const result = parseScript(scriptData, baseRoles)

          expect(result).toBeDefined()
          expect(result.roles).toBeDefined()
          expect(Array.isArray(result.roles)).toBe(true)
        })

        it('should parse metadata if present', () => {
          const result = parseScript(scriptData, baseRoles)
          const hasMeta = scriptData.some((item: any) => item.id === '_meta')

          if (hasMeta) {
            expect(result.meta).toBeDefined()
            expect(result.meta?.id).toBe('_meta')
            expect(result.meta?.name).toBeDefined()
          }
        })

        it('should return only valid roles', () => {
          const result = parseScript(scriptData, baseRoles)

          result.roles.forEach((role) => {
            // Required fields
            expect(role.id).toBeDefined()
            expect(typeof role.id).toBe('string')
            expect(role.name).toBeDefined()
            expect(typeof role.name).toBe('string')
            expect(role.team).toBeDefined()
            expect([
              'townsfolk',
              'outsider',
              'minion',
              'demon',
              'traveler',
              'fabled',
              'loric',
            ]).toContain(role.team)

            // Should have isCustom flag
            expect(typeof role.isCustom).toBe('boolean')

            // Should have default values for required fields
            expect(typeof role.edition).toBe('string')
            expect(typeof role.ability).toBe('string')
            expect(typeof role.firstNight).toBe('number')
            expect(typeof role.otherNight).toBe('number')
            expect(typeof role.firstNightReminder).toBe('string')
            expect(typeof role.otherNightReminder).toBe('string')
            expect(Array.isArray(role.reminders)).toBe(true)
            expect(typeof role.setup).toBe('boolean')
          })
        })

        it('should correctly identify custom vs base roles', () => {
          const result = parseScript(scriptData, baseRoles)

          result.roles.forEach((role) => {
            const isInBase = baseRoles.some(
              (baseRole) => baseRole.id === role.id,
            )

            if (isInBase) {
              expect(role.isCustom).toBe(false)
            } else {
              expect(role.isCustom).toBe(true)
            }
          })
        })

        it('should not include _meta in roles list', () => {
          const result = parseScript(scriptData, baseRoles)

          const metaInRoles = result.roles.some((role) => role.id === '_meta')
          expect(metaInRoles).toBe(false)
        })

        it('should preserve role order from script', () => {
          const result = parseScript(scriptData, baseRoles)
          const scriptRoles = scriptData.filter(
            (item: any) => item.id !== '_meta',
          )

          // Get IDs from valid parsed roles
          const parsedIds = result.roles.map((r) => r.id)
          const scriptIds = scriptRoles
            .map((item: any) => (typeof item === 'string' ? item : item.id))
            .filter((id: string) => {
              // Only include IDs that were successfully parsed
              return parsedIds.includes(id)
            })

          expect(parsedIds).toEqual(scriptIds)
        })
      })
    })
  })

  describe('edge cases', () => {
    it('should handle empty script data', () => {
      const result = parseScript([], baseRoles)

      expect(result.meta).toBeUndefined()
      expect(result.roles).toEqual([])
    })

    it('should handle script with only metadata', () => {
      const scriptData = [{ id: '_meta', name: 'Only Meta', author: 'Test' }]

      const result = parseScript(scriptData as any, baseRoles)

      expect(result.meta).toBeDefined()
      expect(result.roles).toEqual([])
    })

    it('should handle duplicate roles by including all', () => {
      const scriptData = ['washerwoman', 'washerwoman', 'librarian']

      const result = parseScript(scriptData as any, baseRoles)

      expect(result.roles).toHaveLength(3)
      expect(result.roles.filter((r) => r.id === 'washerwoman')).toHaveLength(2)
    })

    it('should handle roles with object notation but matching base roles', () => {
      const scriptData = [{ id: 'washerwoman' }, { id: 'librarian' }]

      const result = parseScript(scriptData as any, baseRoles)

      expect(result.roles).toHaveLength(2)
      expect(result.roles[0].isCustom).toBe(false)
      expect(result.roles[1].isCustom).toBe(false)
    })

    it('should handle empty base roles array', () => {
      const scriptData = [
        'washerwoman',
        {
          id: 'customrole',
          name: 'Custom',
          team: 'townsfolk' as const,
        },
      ]

      const result = parseScript(scriptData as any, [])

      expect(result.roles).toHaveLength(1)
      expect(result.roles[0].id).toBe('customrole')
      expect(result.roles[0].isCustom).toBe(true)
    })
  })
})
