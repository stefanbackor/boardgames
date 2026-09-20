import { describe, it, expect } from 'vitest'
import {
  applyBootleggerRules,
  areBootleggerRulesEqual,
  normalizeBootleggerRules,
} from './bootleggerRules'

describe('normalizeBootleggerRules', () => {
  it('should keep an array of rules', () => {
    expect(normalizeBootleggerRules(['Rule A', 'Rule B'])).toEqual([
      'Rule A',
      'Rule B',
    ])
  })

  it('should wrap a single string into an array', () => {
    expect(normalizeBootleggerRules('Rule A')).toEqual(['Rule A'])
  })

  it('should trim rules and drop empty ones', () => {
    expect(normalizeBootleggerRules(['  Rule A  ', '', '   '])).toEqual([
      'Rule A',
    ])
  })

  it('should ignore non-string entries', () => {
    expect(normalizeBootleggerRules(['Rule A', 42, null, { a: 1 }])).toEqual([
      'Rule A',
    ])
  })

  it('should return an empty array for missing or invalid values', () => {
    expect(normalizeBootleggerRules(undefined)).toEqual([])
    expect(normalizeBootleggerRules(null)).toEqual([])
    expect(normalizeBootleggerRules(42)).toEqual([])
    expect(normalizeBootleggerRules('')).toEqual([])
  })
})

describe('areBootleggerRulesEqual', () => {
  it('should treat identical lists as equal', () => {
    expect(areBootleggerRulesEqual(['A', 'B'], ['A', 'B'])).toBe(true)
    expect(areBootleggerRulesEqual([], [])).toBe(true)
  })

  it('should treat different lists as different', () => {
    expect(areBootleggerRulesEqual(['A'], ['B'])).toBe(false)
    expect(areBootleggerRulesEqual(['A'], ['A', 'B'])).toBe(false)
    expect(areBootleggerRulesEqual(['A', 'B'], ['B', 'A'])).toBe(false)
  })
})

describe('applyBootleggerRules', () => {
  it('should write the rules into the meta item', () => {
    const meta = { id: '_meta', name: 'Script' }

    expect(applyBootleggerRules(meta, ['Rule A'])).toEqual({
      id: '_meta',
      name: 'Script',
      bootlegger: ['Rule A'],
    })
  })

  it('should drop the key when there are no rules', () => {
    const meta = { id: '_meta', name: 'Script', bootlegger: ['Rule A'] }

    expect(applyBootleggerRules(meta, [])).toEqual({
      id: '_meta',
      name: 'Script',
    })
    expect('bootlegger' in applyBootleggerRules(meta, [])).toBe(false)
  })

  it('should not mutate the original meta item', () => {
    const meta = { id: '_meta', name: 'Script', bootlegger: ['Rule A'] }

    applyBootleggerRules(meta, [])
    applyBootleggerRules(meta, ['Rule B'])

    expect(meta.bootlegger).toEqual(['Rule A'])
  })
})
