// Direct import of pako module for compression
import * as pako from 'pako'

/**
 * Checks if data looks like gzip compressed (starts with gzip magic bytes)
 */
function looksLikeGzip(bytes: Uint8Array): boolean {
  return bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b
}

/**
 * Compresses and encodes a string for URL usage
 * Uses gzip compression + URL-safe base64 encoding (RFC 4648 §5: '-'/'_',
 * no padding) so the result never contains '+' or '/'. A literal '+' in a
 * query string is decoded back to a space by URLSearchParams, which would
 * silently corrupt standard base64 before it reaches atob.
 */
export function compressForUrl(data: string): string {
  try {
    // Convert string to UTF-8 bytes
    const utf8Bytes = new TextEncoder().encode(data)

    // Compress with gzip
    const compressed = pako.gzip(utf8Bytes)

    // Convert to base64
    const binaryString = Array.from(compressed, (byte) =>
      String.fromCharCode(byte),
    ).join('')

    return btoa(binaryString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  } catch (error) {
    throw new Error('Failed to compress data for URL')
  }
}

/**
 * Decompresses and decodes a URL-encoded string
 * Handles both compressed (new format) and uncompressed (legacy format)
 */
export function decompressFromUrl(encoded: string): string {
  try {
    // Restore standard base64 alphabet/padding for URL-safe strings (new
    // format), and repair legacy links where a literal '+' in the query
    // string was decoded to a space by URLSearchParams before this ever
    // saw it - a space never occurs in legitimate base64 output.
    const standardBase64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .replace(/ /g, '+')
    const padded = standardBase64.padEnd(
      standardBase64.length + ((4 - (standardBase64.length % 4)) % 4),
      '=',
    )

    // Decode from base64
    const binaryString = atob(padded)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    // Check if it looks like gzip data
    if (looksLikeGzip(bytes)) {
      // Decompress with pako
      const decompressed = pako.ungzip(bytes)
      return new TextDecoder().decode(decompressed)
    }

    // Not gzip - try UTF-8 decoding (legacy format)
    try {
      return new TextDecoder().decode(bytes)
    } catch {
      // Fallback to simple atob for backward compatibility
      return atob(padded)
    }
  } catch (error) {
    throw new Error('Failed to decompress data from URL')
  }
}

/**
 * Synchronous decompression - now same as decompressFromUrl
 * Kept for backward compatibility
 * @deprecated Use decompressFromUrl instead
 */
export function decompressFromUrlSync(encoded: string): string {
  return decompressFromUrl(encoded)
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
