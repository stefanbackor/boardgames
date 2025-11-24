import pako from 'pako'

/**
 * Compresses and encodes a string for URL usage
 * Uses gzip compression + base64 encoding
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
  } catch (error) {
    console.error('Compression failed:', error)
    throw new Error('Failed to compress data for URL')
  }
}

/**
 * Decompresses and decodes a URL-encoded string
 * Handles both compressed (new format) and uncompressed (legacy format)
 */
export function decompressFromUrl(encoded: string): string {
  try {
    // Decode from base64
    const binaryString = atob(encoded)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    
    // Try to decompress with gzip (new format)
    try {
      const decompressed = pako.ungzip(bytes)
      return new TextDecoder().decode(decompressed)
    } catch {
      // If decompression fails, assume it's legacy uncompressed format
      // Try UTF-8 decoding first
      try {
        return new TextDecoder().decode(bytes)
      } catch {
        // Fallback to simple atob for backward compatibility
        return atob(encoded)
      }
    }
  } catch (error) {
    console.error('Decompression failed:', error)
    throw new Error('Failed to decompress data from URL')
  }
}

/**
 * Estimates the compression ratio for informational purposes
 */
export function getCompressionRatio(original: string, compressed: string): number {
  return compressed.length / original.length
}

