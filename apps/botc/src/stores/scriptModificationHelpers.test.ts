import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import {
  normalizeScriptItem,
  getRoleIds,
  getOriginalFromUrl,
  setOriginalScriptCache,
  clearOriginalScriptCache,
} from './scriptModificationHelpers'
import type { ScriptItem } from '@/types'

// Mock the URL compression utility
vi.mock('@/utils/urlCompression', () => ({
  decompressFromUrl: vi.fn((encoded: string) => {
    // Handle real compressed script for testing
    if (encoded.startsWith('H4sIA')) {
      // For testing, return a mock script for compressed data
      return JSON.stringify([
        { id: '_meta', name: 'Compressed Script', author: 'Compressor' },
        'washerwoman',
        'librarian',
      ])
    }

    // Or decodes simple base64 for tests
    try {
      return atob(encoded)
    } catch {
      throw new Error('Invalid encoded data')
    }
  }),
}))

// Mock the parseScript utility
vi.mock('@/utils/parseScript', () => ({
  extractMeta: vi.fn((script: ScriptItem[]) => {
    const metaItem = script.find((item) => {
      if (typeof item === 'string') return false
      return item.id === '_meta'
    })
    if (metaItem && typeof metaItem === 'object') {
      return metaItem as { name?: string; author?: string }
    }
    return null
  }),
}))

describe('scriptModificationHelpers', () => {
  beforeEach(() => {
    clearOriginalScriptCache()
  })

  afterEach(() => {
    clearOriginalScriptCache()
  })

  describe('normalizeScriptItem', () => {
    it('should return the string as-is when item is a string', () => {
      const result = normalizeScriptItem('washerwoman')
      expect(result).toBe('washerwoman')
    })

    it('should return the id property when item is an object', () => {
      const item = { id: 'fortune_teller', name: 'Fortune Teller' }
      const result = normalizeScriptItem(item)
      expect(result).toBe('fortune_teller')
    })

    it('should handle _meta objects', () => {
      const item = { id: '_meta', name: 'My Script', author: 'Test Author' }
      const result = normalizeScriptItem(item)
      expect(result).toBe('_meta')
    })

    it('should handle custom role objects', () => {
      const customRole = {
        id: 'custom_role',
        name: 'Custom Role',
        ability: 'Does custom things',
        image: 'custom.png',
      }
      const result = normalizeScriptItem(customRole)
      expect(result).toBe('custom_role')
    })
  })

  describe('getRoleIds', () => {
    it('should return an empty array for an empty script', () => {
      const result = getRoleIds([])
      expect(result).toEqual([])
    })

    it('should extract IDs from string items', () => {
      const script: ScriptItem[] = ['washerwoman', 'librarian', 'chef']
      const result = getRoleIds(script)
      expect(result).toEqual(['washerwoman', 'librarian', 'chef'])
    })

    it('should extract IDs from object items', () => {
      const script: ScriptItem[] = [
        { id: 'washerwoman' },
        { id: 'librarian', name: 'Librarian' },
        { id: 'chef' },
      ]
      const result = getRoleIds(script)
      expect(result).toEqual(['washerwoman', 'librarian', 'chef'])
    })

    it('should exclude _meta from the result', () => {
      const script: ScriptItem[] = [
        { id: '_meta', name: 'Test Script', author: 'Test Author' },
        'washerwoman',
        'librarian',
        'chef',
      ]
      const result = getRoleIds(script)
      expect(result).toEqual(['washerwoman', 'librarian', 'chef'])
    })

    it('should handle mixed string and object items', () => {
      const script: ScriptItem[] = [
        { id: '_meta', name: 'Test Script' },
        'washerwoman',
        { id: 'librarian' },
        'chef',
        { id: 'custom_role', name: 'Custom' },
      ]
      const result = getRoleIds(script)
      expect(result).toEqual([
        'washerwoman',
        'librarian',
        'chef',
        'custom_role',
      ])
    })

    it('should handle custom role objects with additional properties', () => {
      const script: ScriptItem[] = [
        {
          id: 'custom_role',
          name: 'Custom Role',
          ability: 'Special ability',
          image: 'image.png',
        },
      ]
      const result = getRoleIds(script)
      expect(result).toEqual(['custom_role'])
    })
  })

  describe('getOriginalFromUrl', () => {
    it('should return null script when searchParams is empty', () => {
      const result = getOriginalFromUrl('')
      expect(result).toEqual({ script: null, name: '', author: '' })
    })

    it('should return null script when no script parameter exists', () => {
      const result = getOriginalFromUrl('?foo=bar')
      expect(result).toEqual({ script: null, name: '', author: '' })
    })

    it('should parse valid script from URL', () => {
      const script = [
        { id: '_meta', name: 'Test Script', author: 'Test Author' },
        'washerwoman',
        'librarian',
      ]
      const encoded = btoa(JSON.stringify(script))
      const result = getOriginalFromUrl(`?script=${encoded}`)

      expect(result.script).toEqual(script)
      expect(result.name).toBe('Test Script')
      expect(result.author).toBe('Test Author')
    })

    it('should handle script without _meta', () => {
      const script = ['washerwoman', 'librarian', 'chef']
      const encoded = btoa(JSON.stringify(script))
      const result = getOriginalFromUrl(`?script=${encoded}`)

      expect(result.script).toEqual(script)
      expect(result.name).toBe('')
      expect(result.author).toBe('')
    })

    it('should handle real gzip-compressed script data', () => {
      // Real compressed script from production use
      const compressedScript =
        'H4sIAAAAAAAAA1WQ0UoEMQxFf2Xo836BHyD4JuibiGQ7sY3TNkuaTneV%2FXcrCM28FO5pcnOTtx9Hq3twHxkV3MkVyDjkC256W2B5JEjbbXBoGlnGz2vE5RnKipkLtbw8laqkTdHdT%2F9ePrHfMmwok62Cw9mAWkaBjyAHmkEjjoc8QZn4M3FHCSRpMuVevJDtZgGfTJAKOxQ1emSoKljrZJdIiStfojUCUaqm8auFkA7pIZg5uelxTkccewyXyc4gZ%2BuwpabfU%2BJOSTuZnTupj%2BaoKFh4bzY6aYRgrgQlhDb1ToEl898uExZeoUYiUzYq%2BOru779bHNlCDAIAAA%3D%3D'
      const result = getOriginalFromUrl(`?script=${compressedScript}`)
      // Mock returns a decompressed script
      expect(result.script).toEqual([
        { id: '_meta', name: 'Compressed Script', author: 'Compressor' },
        'washerwoman',
        'librarian',
      ])
      expect(result.name).toBe('Compressed Script')
      expect(result.author).toBe('Compressor')
    })

    it('should return null for invalid JSON', () => {
      const encoded = btoa('not valid json')
      const result = getOriginalFromUrl(`?script=${encoded}`)
      expect(result).toEqual({ script: null, name: '', author: '' })
    })

    it('should return null when decoded data is not an array', () => {
      const notAnArray = { foo: 'bar' }
      const encoded = btoa(JSON.stringify(notAnArray))
      const result = getOriginalFromUrl(`?script=${encoded}`)
      expect(result).toEqual({ script: null, name: '', author: '' })
    })

    it('should cache results for the same URL', () => {
      const script = [
        { id: '_meta', name: 'Test Script', author: 'Test Author' },
        'washerwoman',
      ]
      const encoded = btoa(JSON.stringify(script))
      const searchParams = `?script=${encoded}`

      // First call
      const result1 = getOriginalFromUrl(searchParams)
      // Second call with same URL
      const result2 = getOriginalFromUrl(searchParams)

      expect(result1).toEqual(result2)
      expect(result1.script).toBe(result2.script) // Should be same reference
    })

    it('should update cache when URL changes', () => {
      const script1 = ['washerwoman', 'librarian']
      const script2 = ['chef', 'empath']
      const encoded1 = btoa(JSON.stringify(script1))
      const encoded2 = btoa(JSON.stringify(script2))

      const result1 = getOriginalFromUrl(`?script=${encoded1}`)
      const result2 = getOriginalFromUrl(`?script=${encoded2}`)

      expect(result1.script).toEqual(script1)
      expect(result2.script).toEqual(script2)
      expect(result1.script).not.toEqual(result2.script)
    })

    it('should handle _meta with only name', () => {
      const script = [{ id: '_meta', name: 'Test Script' }, 'washerwoman']
      const encoded = btoa(JSON.stringify(script))
      const result = getOriginalFromUrl(`?script=${encoded}`)

      expect(result.name).toBe('Test Script')
      expect(result.author).toBe('')
    })

    it('should handle _meta with only author', () => {
      const script = [{ id: '_meta', author: 'Test Author' }, 'washerwoman']
      const encoded = btoa(JSON.stringify(script))
      const result = getOriginalFromUrl(`?script=${encoded}`)

      expect(result.name).toBe('')
      expect(result.author).toBe('Test Author')
    })

    it('should handle complex scripts with custom roles', () => {
      const script = [
        { id: '_meta', name: 'Complex Script', author: 'Designer' },
        'washerwoman',
        {
          id: 'custom_role',
          name: 'Custom Role',
          ability: 'Special ability',
          image: 'custom.png',
        },
        'librarian',
      ]
      const encoded = btoa(JSON.stringify(script))
      const result = getOriginalFromUrl(`?script=${encoded}`)

      expect(result.script).toEqual(script)
      expect(result.name).toBe('Complex Script')
      expect(result.author).toBe('Designer')
    })

    it('should handle URL with multiple parameters', () => {
      const script = ['washerwoman', 'librarian']
      const encoded = btoa(JSON.stringify(script))
      const result = getOriginalFromUrl(`?foo=bar&script=${encoded}&baz=qux`)

      expect(result.script).toEqual(script)
    })

    it('should cache results for compressed scripts', () => {
      const compressedScript =
        'H4sIAAAAAAAAA1WQ0UoEMQxFf2Xo836BHyD4JuibiGQ7sY3TNkuaTneV%2FXcrCM28FO5pcnOTtx9Hq3twHxkV3MkVyDjkC256W2B5JEjbbXBoGlnGz2vE5RnKipkLtbw8laqkTdHdT%2F9ePrHfMmwok62Cw9mAWkaBjyAHmkEjjoc8QZn4M3FHCSRpMuVevJDtZgGfTJAKOxQ1emSoKljrZJdIiStfojUCUaqm8auFkA7pIZg5uelxTkccewyXyc4gZ%2BuwpabfU%2BJOSTuZnTupj%2BaoKFh4bzY6aYRgrgQlhDb1ToEl898uExZeoUYiUzYq%2BOru779bHNlCDAIAAA%3D%3D'
      const searchParams = `?script=${compressedScript}`

      // First call - decompresses and caches
      const result1 = getOriginalFromUrl(searchParams)
      expect(result1.script).toEqual([
        { id: '_meta', name: 'Compressed Script', author: 'Compressor' },
        'washerwoman',
        'librarian',
      ])

      // Second call with same URL - should use cached result
      const result2 = getOriginalFromUrl(searchParams)
      expect(result2).toEqual(result1)
      expect(result2.script).toBe(result1.script) // Same reference
    })
  })

  describe('clearOriginalScriptCache', () => {
    it('should clear the cache', () => {
      const script = ['washerwoman', 'librarian']
      const encoded = btoa(JSON.stringify(script))
      const searchParams = `?script=${encoded}`

      // Populate cache
      getOriginalFromUrl(searchParams)

      // Clear cache
      clearOriginalScriptCache()

      // This should work without using cached value
      const result = getOriginalFromUrl(searchParams)
      expect(result.script).toEqual(script)
    })
  })

  describe('setOriginalScriptCache', () => {
    beforeEach(() => {
      clearOriginalScriptCache()
    })

    it('should populate cache with provided script', () => {
      const script: ScriptItem[] = [
        { id: '_meta', name: 'Cached Script', author: 'Cache Author' },
        'washerwoman',
        'librarian',
      ]
      const searchParams = '?script=fake-compressed-data'

      // Set cache
      setOriginalScriptCache(script, searchParams)

      // Sync function should now return cached script
      const result = getOriginalFromUrl(searchParams)
      expect(result.script).toEqual(script)
      expect(result.name).toBe('Cached Script')
      expect(result.author).toBe('Cache Author')
    })

    it('should extract name and author from script', () => {
      const script: ScriptItem[] = [
        { id: '_meta', name: 'Test Name', author: 'Test Author' },
        'chef',
      ]
      const searchParams = '?script=data'

      setOriginalScriptCache(script, searchParams)

      const result = getOriginalFromUrl(searchParams)
      expect(result.name).toBe('Test Name')
      expect(result.author).toBe('Test Author')
    })

    it('should handle script without _meta', () => {
      const script: ScriptItem[] = ['washerwoman', 'librarian']
      const searchParams = '?script=data'

      setOriginalScriptCache(script, searchParams)

      const result = getOriginalFromUrl(searchParams)
      expect(result.script).toEqual(script)
      expect(result.name).toBe('')
      expect(result.author).toBe('')
    })

    it('should do nothing if searchParams is empty', () => {
      const script: ScriptItem[] = ['washerwoman']

      setOriginalScriptCache(script, '')

      // Cache should not be set
      const result = getOriginalFromUrl('?script=other')
      expect(result.script).toBe(null)
    })

    it('should allow explicitly setting cache to override URL decompression', () => {
      const compressedScript =
        'H4sIAAAAAAAAA1WQ0UoEMQxFf2Xo836BHyD4JuibiGQ7sY3TNkuaTneV%2FXcrCM28FO5pcnOTtx9Hq3twHxkV3MkVyDjkC256W2B5JEjbbXBoGlnGz2vE5RnKipkLtbw8laqkTdHdT%2F9ePrHfMmwok62Cw9mAWkaBjyAHmkEjjoc8QZn4M3FHCSRpMuVevJDtZgGfTJAKOxQ1emSoKljrZJdIiStfojUCUaqm8auFkA7pIZg5uelxTkccewyXyc4gZ%2BuwpabfU%2BJOSTuZnTupj%2BaoKFh4bzY6aYRgrgQlhDb1ToEl898uExZeoUYiUzYq%2BOru779bHNlCDAIAAA%3D%3D'
      const searchParams = `?script=${compressedScript}`

      // Set cache with loaded script (overrides URL decompression)
      const loadedScript: ScriptItem[] = [
        { id: '_meta', name: 'Loaded Script', author: 'Loader' },
        'washerwoman',
        'librarian',
      ]
      setOriginalScriptCache(loadedScript, searchParams)

      // Function returns the explicitly cached script
      const result = getOriginalFromUrl(searchParams)
      expect(result.script).toEqual(loadedScript)
      expect(result.name).toBe('Loaded Script')
      expect(result.author).toBe('Loader')
    })
  })
})
