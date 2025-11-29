import { describe, it, expect } from 'vitest'
import { extractMeta } from './parseScript'

describe('extractMeta', () => {
  it('should extract metadata from script data', () => {
    const scriptData = [
      { id: '_meta', name: 'Test Script', author: 'Test Author' },
      'washerwoman',
      'librarian',
    ]

    const result = extractMeta(scriptData)

    expect(result).toBeDefined()
    expect(result?.name).toBe('Test Script')
    expect(result?.author).toBe('Test Author')
  })

  it('should return undefined when no metadata present', () => {
    const scriptData = ['washerwoman', 'librarian', 'investigator']

    const result = extractMeta(scriptData)

    expect(result).toBeUndefined()
  })

  it('should handle empty array', () => {
    const result = extractMeta([])

    expect(result).toBeUndefined()
  })

  it('should handle metadata without name or author', () => {
    const scriptData = [{ id: '_meta' }, 'washerwoman']

    const result = extractMeta(scriptData)

    expect(result).toBeDefined()
    expect(result?.name).toBeUndefined()
    expect(result?.author).toBeUndefined()
  })

  it('should find metadata even if not first item', () => {
    const scriptData = [
      'washerwoman',
      'librarian',
      { id: '_meta', name: 'Script Name', author: 'Author Name' },
      'investigator',
    ]

    const result = extractMeta(scriptData)

    expect(result).toBeDefined()
    expect(result?.name).toBe('Script Name')
    expect(result?.author).toBe('Author Name')
  })

  it('should only return first metadata if multiple exist', () => {
    const scriptData = [
      { id: '_meta', name: 'First Script', author: 'First Author' },
      'washerwoman',
      { id: '_meta', name: 'Second Script', author: 'Second Author' },
    ]

    const result = extractMeta(scriptData)

    expect(result?.name).toBe('First Script')
    expect(result?.author).toBe('First Author')
  })

  it('should handle objects that are not metadata', () => {
    const scriptData = [
      { id: 'washerwoman', name: 'Washerwoman' },
      { id: '_meta', name: 'Test Script' },
      { id: 'librarian' },
    ]

    const result = extractMeta(scriptData)

    expect(result?.name).toBe('Test Script')
  })

  it('should handle null values in array', () => {
    const scriptData = [
      null,
      { id: '_meta', name: 'Test Script' },
      'washerwoman',
    ]

    const result = extractMeta(scriptData)

    expect(result?.name).toBe('Test Script')
  })

  it('should handle strings in array', () => {
    const scriptData = [
      'washerwoman',
      { id: '_meta', name: 'Test Script', author: 'Test' },
      'librarian',
    ]

    const result = extractMeta(scriptData)

    expect(result?.name).toBe('Test Script')
    expect(result?.author).toBe('Test')
  })

  it('should handle metadata with additional properties', () => {
    const scriptData = [
      {
        id: '_meta',
        name: 'Test Script',
        author: 'Test Author',
        logo: 'logo.png',
        firstNight: ['role1', 'role2'],
        otherNight: ['role3'],
      },
      'washerwoman',
    ]

    const result = extractMeta(scriptData)

    expect(result).toBeDefined()
    expect(result?.name).toBe('Test Script')
    expect(result?.author).toBe('Test Author')
    // Should still have other properties as it's a generic object
    expect((result as any).logo).toBe('logo.png')
  })
})

