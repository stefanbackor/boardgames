import type { ScriptData, ScriptMetaFields } from '@/types'
import { normalizeBootleggerRules } from './bootleggerRules'
import { decompressFromUrl } from './urlCompression'

export type { ScriptMetaFields }

/**
 * Reads the role id off a script item.
 *
 * Script data arrives as arbitrary JSON - a pasted file, a shared link, a
 * `script_url` pointing at someone else's tool - and only `Array.isArray` ever
 * stands between that and here. So an entry may be anything at all, `null`
 * included, and `null` is the one that matters: `typeof null === 'object'`, so
 * the obvious `typeof item === 'string' ? item : item.id` reads a property off
 * it and throws.
 *
 * Anything that is not a string or an object carrying a string `id` has no id
 * to give, and answering with an empty string says exactly that: it matches no
 * role and, just as importantly, is not `_meta`.
 *
 * @param item - A script item, trusted no further than the JSON it came from
 * @returns The role id, or an empty string for an entry that has none
 */
export function getScriptItemId(item: unknown): string {
  if (typeof item === 'string') return item

  if (typeof item === 'object' && item !== null) {
    const { id } = item as { id?: unknown }
    if (typeof id === 'string') return id
  }

  return ''
}

/**
 * Reads the script metadata off script data.
 *
 * The `_meta` entry is the first object whose id is `_meta`: a bare `"_meta"`
 * string is not one, and a `null` entry is not read at all - see
 * getScriptItemId. The data itself is left untouched, so exporting a script
 * keeps whatever its `_meta` held.
 *
 * @param data - Script data, trusted no further than the JSON it came from
 * @returns The validated metadata fields
 */
export function readMeta(data: readonly unknown[]): ScriptMetaFields {
  const item = data.find(
    (entry) => typeof entry === 'object' && getScriptItemId(entry) === '_meta',
  ) as Record<string, unknown> | undefined

  const text = (value: unknown) => (typeof value === 'string' ? value : '')

  return {
    present: item !== undefined,
    name: text(item?.name),
    author: text(item?.author),
    bootlegger: normalizeBootleggerRules(item?.bootlegger),
  }
}

/**
 * Where a script comes from: JSON text (a paste, a sample, a file's contents)
 * or the encoded `?script=` value of a share link.
 */
export type ScriptSource =
  | { kind: 'text'; text: string; nameHint?: string }
  | { kind: 'encoded'; param: string }

/**
 * Why a script was rejected. The kinds a source can produce:
 * - `decode-failed`: an encoded value that is not base64 or gzip
 * - `invalid-json`: text, or a decoded value, that is not JSON
 * - `not-array`: JSON that is not a list of characters
 * - `invalid-url`, `fetch-failed`, `network`: a remote URL, see readScriptUrl
 * - `read-failed`: a file that could not be read, see readScriptFile
 */
export type IntakeError =
  | { kind: 'decode-failed' }
  | { kind: 'invalid-json' }
  | { kind: 'not-array' }
  | { kind: 'invalid-url' }
  | { kind: 'fetch-failed'; statusText: string }
  | { kind: 'network'; message: string }
  | { kind: 'read-failed' }

/** A script that passed intake */
export interface IntakeScript {
  /** The script data exactly as it arrived */
  data: ScriptData
  meta: ScriptMetaFields
  /**
   * The name from the script metadata, else the source's name hint, else an
   * empty string - the caller supplies its own fallback for that
   */
  name: string
}

export type IntakeResult =
  | { ok: true; script: IntakeScript }
  | { ok: false; error: IntakeError }

const reject = (error: IntakeError): IntakeResult => ({ ok: false, error })

/**
 * Turns untrusted input into a script, or says why it is not one.
 *
 * Checks only the shape of the document - JSON, a list, and its metadata.
 * Each character is resolved, and legacy spellings repaired, later by
 * parseScript, which also sees saved scripts that never pass through here.
 *
 * @param source - The input and the name to fall back to
 * @returns The script, or the reason it was rejected
 */
export function readScript(source: ScriptSource): IntakeResult {
  let text: string
  let nameHint = ''
  if (source.kind === 'encoded') {
    try {
      text = decompressFromUrl(source.param)
    } catch {
      return reject({ kind: 'decode-failed' })
    }
  } else {
    text = source.text
    nameHint = source.nameHint ?? ''
  }

  let value: unknown
  try {
    value = JSON.parse(text)
  } catch {
    return reject({ kind: 'invalid-json' })
  }

  if (!Array.isArray(value)) return reject({ kind: 'not-array' })

  const meta = readMeta(value)
  return {
    ok: true,
    script: {
      data: value as ScriptData,
      meta,
      name: meta.name || nameHint,
    },
  }
}

/** The file name without its extension */
const fileStem = (name: string) => name.replace(/\.[^/.]+$/, '')

/**
 * Reads a script from a file, named after the file when its metadata is not.
 *
 * @param file - The uploaded file
 * @param read - Reads the file as text; File#text unless a test says otherwise
 */
export async function readScriptFile(
  file: File,
  read: (file: File) => Promise<string> = (file) => file.text(),
): Promise<IntakeResult> {
  let text: string
  try {
    text = await read(file)
  } catch {
    return reject({ kind: 'read-failed' })
  }
  return readScript({ kind: 'text', text, nameHint: fileStem(file.name) })
}

/** How a remote URL delivered its script */
export type ScriptUrlKind = 'encoded_tool_url' | 'direct_json'

/**
 * Reads a script from a URL. A URL carrying a `script` parameter - the
 * official script tool, or anything using its link format - is decoded on the
 * spot; any other URL is fetched and its body read as JSON, named after the
 * file it points at when the metadata is not.
 *
 * @param url - The URL as the user gave it
 * @param fetchImpl - Fetches the URL; the global fetch unless a test says otherwise
 * @returns The result, and how the URL delivered it once it is known to be one
 */
export async function readScriptUrl(
  url: string,
  fetchImpl: typeof fetch = fetch,
): Promise<IntakeResult & { urlKind?: ScriptUrlKind }> {
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
  } catch {
    return reject({ kind: 'invalid-url' })
  }

  const param = parsedUrl.searchParams.get('script')
  if (param) {
    return {
      ...readScript({ kind: 'encoded', param }),
      urlKind: 'encoded_tool_url',
    }
  }

  let text: string
  try {
    const response = await fetchImpl(url)
    if (!response.ok) {
      return {
        ...reject({ kind: 'fetch-failed', statusText: response.statusText }),
        urlKind: 'direct_json',
      }
    }
    text = await response.text()
  } catch (error) {
    return {
      ...reject({
        kind: 'network',
        message: error instanceof Error ? error.message : String(error),
      }),
      urlKind: 'direct_json',
    }
  }

  const nameHint = fileStem(url.split('/').pop() ?? '')
  return {
    ...readScript({ kind: 'text', text, nameHint }),
    urlKind: 'direct_json',
  }
}
