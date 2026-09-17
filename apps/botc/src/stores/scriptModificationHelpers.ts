import { decompressFromUrl } from '@/utils/urlCompression'
import { extractMeta, getScriptItemId } from '@/utils/parseScript'
import { normalizeBootleggerRules } from '@/utils/bootleggerRules'
import type { ScriptItem } from '@/types'

/**
 * The original script and the `_meta` values it carries
 */
export interface OriginalScript {
  script: ScriptItem[] | null
  name: string
  author: string
  /** Homebrew rules from `_meta.bootlegger`, normalized to an array */
  bootlegger: string[]
}

/**
 * Normalizes script items for comparison.
 *
 * Delegates to {@link getScriptItemId}, so an entry the JSON had no business
 * carrying answers with an empty string rather than throwing - the original is
 * read straight out of a URL anyone can write.
 */
export function normalizeScriptItem(item: ScriptItem): string {
  return getScriptItemId(item)
}

// Helper to get role IDs from script (excluding _meta)
export function getRoleIds(script: ScriptItem[]): string[] {
  return (
    script
      .map(normalizeScriptItem)
      // An entry with no id is no role, and an empty id would match every other
      // one of its kind if it were kept
      .filter((id) => id !== '' && id !== '_meta')
  )
}

// Cache for original script to avoid re-parsing URL on every access. The URL
// it was read from is kept beside the original rather than on it, so that what
// callers are handed is the original and nothing else.
let cachedOriginalScript: { url: string; original: OriginalScript } | null =
  null

/**
 * Builds an original and locks it before it is cached.
 *
 * The same object is handed out on every call rather than a copy - a fresh one
 * per call is a new identity per render for anything downstream that compares
 * it - so it has to be safe to share: a mutation reaching it would move the
 * very "original" the diff is measured against. Freezing makes that impossible
 * rather than merely unwritten-down.
 *
 * The script array is deliberately left alone: it is only ever read, and it is
 * the big one.
 */
function lockOriginal(
  script: ScriptItem[] | null,
  name: string,
  author: string,
  bootlegger: string[],
): OriginalScript {
  return Object.freeze({
    script,
    name,
    author,
    bootlegger: Object.freeze(bootlegger) as string[],
  })
}

/** The one "nothing loaded" result, shared because there is nothing to vary */
const EMPTY_ORIGINAL = lockOriginal(null, '', '', [])

/**
 * Gets the original script from URL parameters
 * Handles both compressed and uncompressed scripts synchronously
 * Results are cached to avoid repeated decompression
 *
 * @param searchParams Optional URL search params (defaults to window.location.search)
 */
export function getOriginalFromUrl(searchParams?: string): OriginalScript {
  // Use provided searchParams or fallback to window.location
  const currentUrl =
    searchParams !== undefined
      ? searchParams
      : typeof window !== 'undefined'
        ? window.location.search
        : ''

  if (!currentUrl) {
    return EMPTY_ORIGINAL
  }

  // Return cached result if URL hasn't changed
  if (cachedOriginalScript && cachedOriginalScript.url === currentUrl) {
    return cachedOriginalScript.original
  }

  const params = new URLSearchParams(currentUrl)
  const encodedScript = params.get('script')

  if (!encodedScript) {
    cachedOriginalScript = { url: currentUrl, original: EMPTY_ORIGINAL }
    return EMPTY_ORIGINAL
  }

  try {
    // Decompress (handles both compressed and uncompressed formats)
    const decoded = decompressFromUrl(encodedScript)
    const parsed = JSON.parse(decoded) as ScriptItem[]

    if (!Array.isArray(parsed)) {
      cachedOriginalScript = { url: currentUrl, original: EMPTY_ORIGINAL }
      return EMPTY_ORIGINAL
    }

    // Extract name, author and homebrew rules from _meta object
    const metaObj = extractMeta(parsed)
    const name = metaObj?.name || ''
    const author = metaObj?.author || ''
    const bootlegger = normalizeBootleggerRules(metaObj?.bootlegger)

    const original = lockOriginal(parsed, name, author, bootlegger)
    cachedOriginalScript = { url: currentUrl, original }
    return original
  } catch (error) {
    console.error('Error parsing script from URL:', error)
    cachedOriginalScript = { url: currentUrl, original: EMPTY_ORIGINAL }
    return EMPTY_ORIGINAL
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
  const bootlegger = normalizeBootleggerRules(metaObj?.bootlegger)

  cachedOriginalScript = {
    url: currentUrl,
    original: lockOriginal(script, name, author, bootlegger),
  }
}

// Helper to clear the cache (useful for testing)
export function clearOriginalScriptCache(): void {
  cachedOriginalScript = null
}

// Cache for the script key, keyed on the search string it was derived from.
// The key is a pure function of that string, so it never needs invalidating.
let cachedScriptKey: { search: string; key: string } | null = null

/**
 * Identifies the script the current URL points at.
 *
 * A diff only means anything for the script it was made on, so anything that
 * outlives a single script - the persisted diff above all - has to be able to
 * tell one script from another. The value is hashed to keep it small: it only
 * has to change when the script changes, it never has to be read back.
 *
 * @param searchParams Optional URL search params (defaults to window.location.search)
 * @returns A short key, or an empty string when no script is in the URL
 */
export function getScriptKey(searchParams?: string): string {
  const search =
    searchParams !== undefined
      ? searchParams
      : typeof window !== 'undefined'
        ? window.location.search
        : ''

  // The hash runs over the whole encoded script, which is the largest thing in
  // the URL, and render effects ask for the key on every script change
  if (cachedScriptKey?.search === search) return cachedScriptKey.key

  if (!search) {
    cachedScriptKey = { search, key: '' }
    return ''
  }

  const params = new URLSearchParams(search)
  const id = params.get('id')
  const script = params.get('script')
  const scriptUrl = params.get('script_url')

  if (id === null && script === null && scriptUrl === null) {
    cachedScriptKey = { search, key: '' }
    return ''
  }

  const identity = `${id ?? ''}|${script ?? ''}|${scriptUrl ?? ''}`

  // djb2, enough to tell two scripts apart
  let hash = 5381
  for (let i = 0; i < identity.length; i++) {
    hash = ((hash << 5) + hash + identity.charCodeAt(i)) | 0
  }

  const key = (hash >>> 0).toString(36)
  cachedScriptKey = { search, key }
  return key
}
