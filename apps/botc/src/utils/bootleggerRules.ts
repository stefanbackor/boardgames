/**
 * Helpers for the Bootlegger's homebrew rules.
 *
 * Scripts carry these rules in the `_meta.bootlegger` field, the same way the
 * official script tool does:
 *
 *   [{ "id": "_meta", "name": "...", "bootlegger": ["Spy does not know the Zombuul"] }, ...]
 */

/**
 * Normalizes the raw `_meta.bootlegger` value into a list of rules.
 * Accepts an array of strings or a single string, drops anything empty.
 *
 * @param value - The raw value from `_meta.bootlegger`
 * @returns A list of trimmed, non-empty rules
 */
export function normalizeBootleggerRules(value: unknown): string[] {
  if (typeof value === 'string') {
    const rule = value.trim()
    return rule ? [rule] : []
  }

  if (!Array.isArray(value)) return []

  return value
    .filter((rule): rule is string => typeof rule === 'string')
    .map((rule) => rule.trim())
    .filter((rule) => rule.length > 0)
}

/**
 * Compares two rule lists for equality (order sensitive).
 */
export function areBootleggerRulesEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((rule, index) => rule === b[index])
}

/**
 * Returns a copy of a `_meta` item with the homebrew rules applied.
 * The `bootlegger` key is dropped entirely when no rules remain, so scripts
 * without homebrew rules stay free of an empty array.
 *
 * @param meta - The `_meta` script item
 * @param rules - The rules to write
 * @returns A new `_meta` item carrying the rules
 */
export function applyBootleggerRules<T extends object>(
  meta: T,
  rules: string[],
): T {
  const next = { ...meta } as Record<string, unknown>

  if (rules.length > 0) {
    next.bootlegger = rules
  } else {
    delete next.bootlegger
  }

  return next as T
}
