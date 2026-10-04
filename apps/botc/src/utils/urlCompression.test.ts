import { describe, it, expect } from 'vitest'
import { compressForUrl, decompressFromUrl, decompressFromUrlSync } from './urlCompression'

describe('urlCompression', () => {
  it('should compress and decompress data correctly', async () => {
    const testData = JSON.stringify({
      meta: { name: 'Test Script', author: 'Test Author' },
      roles: ['washerwoman', 'librarian', 'investigator', 'chef', 'empath'],
    })

    const compressed = await compressForUrl(testData)
    const decompressed = await decompressFromUrl(compressed)

    expect(decompressed).toBe(testData)
  })

  it('should significantly reduce size for large scripts', async () => {
    // Simulate a large script with many roles
    const largeScript = JSON.stringify([
      { id: '_meta', name: 'Large Test Script', author: 'Test Author' },
      ...Array.from({ length: 50 }, (_, i) => ({
        id: `role_${i}`,
        name: `Role ${i}`,
        team: 'townsfolk',
        ability: 'This is a test ability description that is fairly long',
      })),
    ])

    const compressed = await compressForUrl(largeScript)
    const compressionRatio = compressed.length / largeScript.length

    console.log(`Original size: ${largeScript.length} bytes`)
    console.log(`Compressed size: ${compressed.length} bytes`)
    console.log(`Compression ratio: ${(compressionRatio * 100).toFixed(1)}%`)

    // Expect at least 50% compression for this repetitive data
    expect(compressionRatio).toBeLessThan(0.5)
  })

  it('should handle unicode characters correctly', async () => {
    const unicodeData = JSON.stringify({
      name: 'Test with emojis 🎲🎯',
      text: 'Special chars: ñ, é, ü, 中文',
    })

    const compressed = await compressForUrl(unicodeData)
    const decompressed = await decompressFromUrl(compressed)

    expect(decompressed).toBe(unicodeData)
  })

  it('should handle legacy uncompressed format', async () => {
    const testData = JSON.stringify({ name: 'Test' })
    
    // Simulate legacy encoding (just base64 without compression)
    const utf8Bytes = new TextEncoder().encode(testData)
    const binaryString = Array.from(utf8Bytes, (byte) =>
      String.fromCharCode(byte),
    ).join('')
    const legacyEncoded = btoa(binaryString)

    // Should be able to decode legacy format (async version)
    const decompressed = await decompressFromUrl(legacyEncoded)
    expect(decompressed).toBe(testData)
  })

  it('should decode legacy format with sync function', () => {
    const testData = JSON.stringify({ name: 'Test' })
    
    // Simulate legacy encoding (just base64 without compression)
    const utf8Bytes = new TextEncoder().encode(testData)
    const binaryString = Array.from(utf8Bytes, (byte) =>
      String.fromCharCode(byte),
    ).join('')
    const legacyEncoded = btoa(binaryString)

    // Sync version should work for legacy format
    const decompressed = decompressFromUrlSync(legacyEncoded)
    expect(decompressed).toBe(testData)
  })

  it('should not produce + or / that URLSearchParams could mangle', async () => {
    const testData = JSON.stringify({
      roles: Array.from({ length: 30 }, (_, i) => `role_${i}`),
    })

    const compressed = await compressForUrl(testData)

    expect(compressed).not.toMatch(/[+/=]/)
  })

  it('should recover from a legacy link whose + was turned into a space', async () => {
    // Reproduces a real-world failure: a standard-base64 (legacy) link gets
    // shared somewhere that doesn't percent-encode '+', so when the app
    // reads it back via URLSearchParams, every '+' becomes a space before
    // decompressFromUrl ever sees it.
    const legacyEncoded =
      'H4sIAAAAAAAAA12RwWoEIQyGX2XwvE/Q45beey+lZDTdCaOJxDhlKPvu66FgtuDl+xPz/8aP30ApvISvggbhEhgKDnw7UE9hXF6Bl/cM5yhBt010FK/Iy7Urt3C//F3PtCooAU8pZol7gR11ajcFTkVs8+K3qHVGw5y9jKWCbZOL8D6pc0K1f9OhrE8jQI2aTW7jIc/OkicpHMg7YvUtBU5xmLT7FIox94bOAYjNZxaOG+U0pRVU3JaqUBt79qFbG4dcT8KDcoN0SATzZvV0EEEz2o8U/wlUarh/PgDP0gK95QEAAA=='
    const mangled = new URL(
      `https://example.com/?script=${legacyEncoded}`,
    ).searchParams.get('script') as string

    expect(mangled).not.toBe(legacyEncoded) // sanity check the corruption happened

    const decompressed = decompressFromUrl(mangled)
    const parsed = JSON.parse(decompressed)

    expect(Array.isArray(parsed)).toBe(true)
    expect(parsed[0]).toEqual({
      id: '_meta',
      name: 'Everyone Can Play',
      author: 'Ben Burns',
    })
  })

  it('should decompress compressed data with sync function', () => {
    const testData = JSON.stringify({ name: 'Test' })
    
    // Compress the data
    const compressed = compressForUrl(testData)
    
    // Sync version now works for compressed data too
    const syncResult = decompressFromUrlSync(compressed)
    expect(syncResult).toBe(testData)
    
    // Regular decompression should also work
    const regularResult = decompressFromUrl(compressed)
    expect(regularResult).toBe(testData)
  })
})

