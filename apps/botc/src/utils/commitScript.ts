import { extractMeta, getScriptItemId } from './parseScript'
import {
  applyBootleggerRules,
  normalizeBootleggerRules,
} from './bootleggerRules'
import type { MetaOverrides, ScriptData, ScriptItem } from '@/types'

/**
 * The script as it should be written out, plus the `_meta` values it carries
 */
export interface CommittedScript {
  script: ScriptData
  name: string
  author: string
  /** Homebrew rules from `_meta.bootlegger`, normalized to an array */
  bootlegger: string[]
}

/**
 * Builds the script to hand out: the loaded script data with the unsaved
 * `_meta` overrides applied. Scripts may omit `_meta` entirely, in which case
 * it is created - but only if there is anything to put in it.
 *
 * Saving, sharing and downloading all need this and all have to agree - a share
 * link that silently drops what the JSON download contains is worse than
 * either. Role edits already land in the script data directly, so this only has
 * to resolve `_meta`.
 *
 * Fields the user did not touch are passed through untouched, so handing an
 * unmodified script back out returns exactly what came in. A script that
 * carries no name is handed back without one: the name on screen for such a
 * script is a localized placeholder ("Shared Script") rather than anything an
 * author wrote, and writing that in would hand every later reader a name in a
 * language they never chose. Naming it is the job of whoever files it - see
 * `useScriptCommit`.
 *
 * @param scriptData - The loaded script data
 * @param metaOverrides - Unsaved `_meta` edits from the modification store
 * @returns The script with `_meta` resolved and the values that went into it
 *
 * @example
 * const { script, name } = buildCommittedScript(scriptData, getMetaOverrides())
 */
export function buildCommittedScript(
  scriptData: ScriptData,
  metaOverrides: MetaOverrides | null,
): CommittedScript {
  const currentMeta = extractMeta(scriptData)

  const name =
    metaOverrides?.name !== undefined
      ? metaOverrides.name
      : currentMeta?.name || ''
  const author =
    metaOverrides?.author !== undefined
      ? metaOverrides.author
      : currentMeta?.author || ''

  // Homebrew rules live in _meta.bootlegger (official script tool format)
  const bootleggerOverride = metaOverrides?.bootlegger
  const bootlegger =
    bootleggerOverride !== undefined
      ? bootleggerOverride
      : normalizeBootleggerRules(currentMeta?.bootlegger)

  /**
   * Applies the resolved values to the `_meta` item, leaving every other key
   * (custom role data, night order, anything a tool we do not know about
   * wrote) exactly as it was.
   */
  const commitMeta = (item: { id: string; [key: string]: unknown }) => {
    const meta = { ...item }

    // Write a field only when it has a value or was already present, so
    // passing a script through does not sprout empty keys it never had
    if (name || 'name' in meta) meta.name = name
    if (author || 'author' in meta) meta.author = author

    // Rules are rewritten only when they were edited: normalizing an untouched
    // field would quietly drop whatever shape it is in that we do not read
    return bootleggerOverride !== undefined
      ? applyBootleggerRules(meta, bootleggerOverride)
      : meta
  }

  let hasMetaEntry = false
  const script: ScriptData = scriptData.flatMap((item) => {
    // Anything that is not the _meta entry is handed on exactly as it came,
    // an entry too malformed to have an id included - see getScriptItemId.
    // The string check leads so that what follows is known to be an object.
    if (typeof item === 'string' || getScriptItemId(item) !== '_meta') {
      return [item]
    }

    hasMetaEntry = true
    const meta = commitMeta(item)

    /**
     * Everything the entry carried has been cleared, so the entry goes with it,
     * the same way one is never created for nothing. An entry that arrived
     * with nothing in it is left alone: handing an unmodified script back out
     * has to return exactly what came in.
     */
    const onlyId = (value: object) => Object.keys(value).length === 1
    return onlyId(meta) && !onlyId(item) ? [] : [meta]
  })

  if (!hasMetaEntry) {
    const created: { id: string; [key: string]: unknown } = { id: '_meta' }
    if (name) created.name = name
    if (author) created.author = author
    if (bootlegger.length > 0) created.bootlegger = bootlegger

    // Nothing to record, so no _meta entry either: a script that arrived
    // without one is handed on without one
    if (Object.keys(created).length > 1) {
      script.unshift(created as ScriptItem)
    }
  }

  return { script, name, author, bootlegger }
}
