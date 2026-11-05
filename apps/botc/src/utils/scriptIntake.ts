import type { ScriptMetaFields } from '@/types'
import { normalizeBootleggerRules } from './bootleggerRules'

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
