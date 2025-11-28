// Lazy-loaded pako module for compression (~221 KB)
import type * as PakoTypes from 'pako'
let pakoModule: typeof PakoTypes | null = null

async function getPako(): Promise<typeof PakoTypes> {
  if (!pakoModule) {
    pakoModule = await import('pako')
  }
  return pakoModule
}

/**
 * Checks if data looks like gzip compressed (starts with gzip magic bytes)
 */
function looksLikeGzip(bytes: Uint8Array): boolean {
  return bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b
}

/**
 * Compresses and encodes a string for URL usage
 * Uses gzip compression + base64 encoding
 * NOTE: This is async because pako is lazy-loaded (~221KB savings on initial load)
 */
export async function compressForUrl(data: string): Promise<string> {
  try {
    const pako = await getPako()
    // Convert string to UTF-8 bytes
    const utf8Bytes = new TextEncoder().encode(data)

    // Compress with gzip
    const compressed = pako.gzip(utf8Bytes)

    // Convert to base64
    const binaryString = Array.from(compressed, (byte) =>
      String.fromCharCode(byte),
    ).join('')

    return btoa(binaryString)
  } catch (error) {
    throw new Error('Failed to compress data for URL')
  }
}

/**
 * Decompresses and decodes a URL-encoded string (async version)
 * Handles both compressed (new format) and uncompressed (legacy format)
 * Use this when you can await the result.
 */
export async function decompressFromUrl(encoded: string): Promise<string> {
  try {
    // Decode from base64
    const binaryString = atob(encoded)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    // Check if it looks like gzip data
    if (looksLikeGzip(bytes)) {
      // Load pako and decompress
      const pako = await getPako()
      const decompressed = pako.ungzip(bytes)
      return new TextDecoder().decode(decompressed)
    }

    // Not gzip - try UTF-8 decoding (legacy format)
    try {
      return new TextDecoder().decode(bytes)
    } catch {
      // Fallback to simple atob for backward compatibility
      return atob(encoded)
    }
  } catch (error) {
    throw new Error('Failed to decompress data from URL')
  }
}

/**
 * Synchronous decompression for legacy (uncompressed) data only.
 * Returns null if data appears to be compressed (needs async decompression).
 * Use this for places that need synchronous access and can handle legacy-only.
 */
export function decompressFromUrlSync(encoded: string): string | null {
  try {
    // Decode from base64
    const binaryString = atob(encoded)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    // If it looks like gzip, return null (needs async)
    if (looksLikeGzip(bytes)) {
      return null
    }

    // Not gzip - try UTF-8 decoding (legacy format)
    try {
      return new TextDecoder().decode(bytes)
    } catch {
      // Fallback to simple atob
      return atob(encoded)
    }
  } catch {
    return null
  }
}

/**
 * Estimates the compression ratio for informational purposes
 */
export function getCompressionRatio(
  original: string,
  compressed: string,
): number {
  return compressed.length / original.length
}
