import { describe, it, expect } from 'vitest'
import { compressForUrl, decompressFromUrl } from './urlCompression'

describe('urlCompression', () => {
  it('should compress and decompress data correctly', () => {
    const testData = JSON.stringify({
      meta: { name: 'Test Script', author: 'Test Author' },
      roles: ['washerwoman', 'librarian', 'investigator', 'chef', 'empath'],
    })

    const compressed = compressForUrl(testData)
    const decompressed = decompressFromUrl(compressed)

    expect(decompressed).toBe(testData)
  })

  it('should significantly reduce size for large scripts', () => {
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

    const compressed = compressForUrl(largeScript)
    const compressionRatio = compressed.length / largeScript.length

    console.log(`Original size: ${largeScript.length} bytes`)
    console.log(`Compressed size: ${compressed.length} bytes`)
    console.log(`Compression ratio: ${(compressionRatio * 100).toFixed(1)}%`)

    // Expect at least 50% compression for this repetitive data
    expect(compressionRatio).toBeLessThan(0.5)
  })

  it('should handle unicode characters correctly', () => {
    const unicodeData = JSON.stringify({
      name: 'Test with emojis 🎲🎯',
      text: 'Special chars: ñ, é, ü, 中文',
    })

    const compressed = compressForUrl(unicodeData)
    const decompressed = decompressFromUrl(compressed)

    expect(decompressed).toBe(unicodeData)
  })

  it('should handle legacy uncompressed format', () => {
    const testData = JSON.stringify({ name: 'Test' })
    
    // Simulate legacy encoding (just base64 without compression)
    const utf8Bytes = new TextEncoder().encode(testData)
    const binaryString = Array.from(utf8Bytes, (byte) =>
      String.fromCharCode(byte),
    ).join('')
    const legacyEncoded = btoa(binaryString)

    // Should be able to decode legacy format
    const decompressed = decompressFromUrl(legacyEncoded)
    expect(decompressed).toBe(testData)
  })
})

