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
 *   in `@/services/scriptSources`
 * - `read-failed`: a file that could not be read, see readScriptFile there
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
  /** The validated script metadata, see readMeta */
  meta: ScriptMetaFields
  /**
   * The name from the script metadata, else the source's name hint, else an
   * empty string - the caller supplies its own fallback for that
   */
  name: string
}

/**
 * What intake answers: the script, or why it was rejected. A union rather than
 * a throw, so every caller has to decide what each failure looks like to the
 * user.
 */
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
