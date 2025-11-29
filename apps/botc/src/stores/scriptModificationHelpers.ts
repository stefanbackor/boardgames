import { decompressFromUrl } from '@/utils/urlCompression'
import { extractMeta } from '@/utils/parseScript'
import type { ScriptItem } from '@/types'

// Helper to normalize script items for comparison
export function normalizeScriptItem(item: ScriptItem): string {
  if (typeof item === 'string') {
    return item
  }
  return item.id
}

// Helper to get role IDs from script (excluding _meta)
export function getRoleIds(script: ScriptItem[]): string[] {
  return script.map(normalizeScriptItem).filter((id) => id !== '_meta')
}

// Cache for original script to avoid re-parsing URL on every access
let cachedOriginalScript: {
  url: string
  script: ScriptItem[] | null
  name: string
  author: string
} | null = null

/**
 * Gets the original script from URL parameters
 * Handles both compressed and uncompressed scripts synchronously
 * Results are cached to avoid repeated decompression
 *
 * @param searchParams Optional URL search params (defaults to window.location.search)
 */
export function getOriginalFromUrl(searchParams?: string): {
  script: ScriptItem[] | null
  name: string
  author: string
} {
  // Use provided searchParams or fallback to window.location
  const currentUrl =
    searchParams !== undefined
      ? searchParams
      : typeof window !== 'undefined'
        ? window.location.search
        : ''

  if (!currentUrl) {
    return { script: null, name: '', author: '' }
  }

  // Return cached result if URL hasn't changed
  if (cachedOriginalScript && cachedOriginalScript.url === currentUrl) {
    return {
      script: cachedOriginalScript.script,
      name: cachedOriginalScript.name,
      author: cachedOriginalScript.author,
    }
  }

  const params = new URLSearchParams(currentUrl)
  const encodedScript = params.get('script')

  if (!encodedScript) {
    cachedOriginalScript = {
      url: currentUrl,
      script: null,
      name: '',
      author: '',
    }
    return { script: null, name: '', author: '' }
  }

  try {
    // Decompress (handles both compressed and uncompressed formats)
    const decoded = decompressFromUrl(encodedScript)
    const parsed = JSON.parse(decoded) as ScriptItem[]

    if (!Array.isArray(parsed)) {
      cachedOriginalScript = {
        url: currentUrl,
        script: null,
        name: '',
        author: '',
      }
      return { script: null, name: '', author: '' }
    }

    // Extract name and author from _meta object
    const metaObj = extractMeta(parsed)
    const name = metaObj?.name || ''
    const author = metaObj?.author || ''

    cachedOriginalScript = { url: currentUrl, script: parsed, name, author }
    return { script: parsed, name, author }
  } catch (error) {
    console.error('Error parsing script from URL:', error)
    cachedOriginalScript = {
      url: currentUrl,
      script: null,
      name: '',
      author: '',
    }
    return { script: null, name: '', author: '' }
  }
}

/**
 * Populates the cache with a loaded script
 * Use this to explicitly set the cached script (useful for testing or pre-loading)
 * @param script The loaded script data
 * @param searchParams Optional URL search params (defaults to window.location.search)
 */
export function setOriginalScriptCache(
  script: ScriptItem[],
  searchParams?: string,
): void {
  const currentUrl =
    searchParams !== undefined
      ? searchParams
      : typeof window !== 'undefined'
        ? window.location.search
        : ''

  if (!currentUrl) return

  const metaObj = extractMeta(script)
  const name = metaObj?.name || ''
  const author = metaObj?.author || ''

  cachedOriginalScript = {
    url: currentUrl,
    script,
    name,
    author,
  }
}

// Helper to clear the cache (useful for testing)
export function clearOriginalScriptCache(): void {
  cachedOriginalScript = null
}
