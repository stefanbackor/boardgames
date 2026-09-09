import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import type { Jinx } from '@/types/jinx'
import type { Role } from '@/types'
import { jinxes as en } from './jinxes.en'
import { roles as baseRoles } from './roles.en'
import { useActiveJinxes } from '@/hooks/useActiveJinxes'
import { applyAutoRoles } from '@/utils/scriptAutoRoles'
import cs from './jinxes.cs.overrides'
import de from './jinxes.de.overrides'
import hu from './jinxes.hu.overrides'
import nl from './jinxes.nl.overrides'
import pl from './jinxes.pl.overrides'
import { roleTranslationsCs } from './roles.cs.overrides'
import { roleTranslationsDe } from './roles.de.overrides'
import { roleTranslationsHu } from './roles.hu.overrides'
import { roleTranslationsNl } from './roles.nl.overrides'
import { roleTranslationsPl } from './roles.pl.overrides'

/**
 * The Djinn role card lists every active jinx pair in the current script, and
 * `useActiveJinxes` swaps the whole array for a localized one. A localized array
 * that is missing pairs therefore silently hides jinxes from the Djinn card, and
 * one whose text still describes an older version of a rule misleads the
 * Storyteller. Both happened before: the overrides sat at 71 of 131 pairs and 41
 * of the surviving translations described superseded rules.
 */

type NameMap = Record<string, { name?: string }>

const LANGS: Array<[string, Array<Jinx>, NameMap]> = [
  ['cs', cs, roleTranslationsCs as NameMap],
  ['de', de, roleTranslationsDe as NameMap],
  ['hu', hu, roleTranslationsHu as NameMap],
  ['nl', nl, roleTranslationsNl as NameMap],
  ['pl', pl, roleTranslationsPl as NameMap],
]
const ALL: Array<[string, Array<Jinx>, NameMap | null]> = [
  ['en', en, null],
  ...LANGS,
]

const pairsOf = (jinxes: Array<Jinx>) =>
  jinxes.flatMap((e) => e.hatred.map((h) => `${e.id}|${h.id}`))
const reasonsOf = (jinxes: Array<Jinx>) =>
  new Map(
    jinxes.flatMap((e) => e.hatred.map((h) => [`${e.id}|${h.id}`, h.reason])),
  )

const enPairs = pairsOf(en)
const enReasons = reasonsOf(en)
const enNames = new Map(baseRoles.map((r) => [r.id, r.name]))

describe('jinx data: structure', () => {
  it.each(ALL)('%s has no duplicate pairs or entry ids', (_lang, jinxes) => {
    const p = pairsOf(jinxes)
    expect(p.filter((x, i) => p.indexOf(x) !== i)).toEqual([])
    const ids = jinxes.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(ALL)(
    '%s has no self-jinx and no empty hatred list',
    (_lang, jinxes) => {
      expect(
        pairsOf(jinxes).filter((p) => {
          const [a, b] = p.split('|')
          return a === b
        }),
      ).toEqual([])
      expect(
        jinxes.filter((e) => e.hatred.length === 0).map((e) => e.id),
      ).toEqual([])
    },
  )

  it.each(LANGS)(
    '%s covers every English pair, in the same order',
    (_lang, jinxes) => {
      expect(pairsOf(jinxes)).toEqual(enPairs)
    },
  )

  it('every referenced role id exists in roles.en.ts', () => {
    const known = new Set(baseRoles.map((r) => r.id))
    const unknown = new Set<string>()
    for (const e of en) {
      if (!known.has(e.id)) unknown.add(e.id)
      for (const h of e.hatred) if (!known.has(h.id)) unknown.add(h.id)
    }
    expect([...unknown]).toEqual([])
  })

  it('lists each pair in exactly one direction', () => {
    const seen = new Map<string, string>()
    const both: Array<string> = []
    for (const p of enPairs) {
      const k = p.split('|').sort().join('|')
      if (seen.has(k)) both.push(`${seen.get(k)} + ${p}`)
      else seen.set(k, p)
    }
    expect(both).toEqual([])
  })
})

describe('jinx data: translation text', () => {
  it.each(LANGS)('%s reasons are well-formed', (_lang, jinxes) => {
    const problems: Array<string> = []
    for (const e of jinxes)
      for (const h of e.hatred) {
        const k = `${e.id}|${h.id}`
        const r = h.reason
        if (typeof r !== 'string' || !r.trim()) {
          problems.push(`${k}: empty`)
          continue
        }
        if (r !== r.trim()) problems.push(`${k}: surrounding whitespace`)
        if (/\s\s/.test(r)) problems.push(`${k}: double space`)
        if (/\\/.test(r)) problems.push(`${k}: stray backslash`)
        // Official rule texts end in punctuation or a bracketed setup marker
        // such as "[No Demon]".
        if (!/([.?!]|\])$/.test(r)) problems.push(`${k}: no terminator`)
        if ((r.match(/"/g) ?? []).length % 2)
          problems.push(`${k}: unbalanced straight quote`)
      }
    expect(problems).toEqual([])
  })

  it.each(LANGS)(
    '%s never falls back to the English string',
    (_lang, jinxes) => {
      const mine = reasonsOf(jinxes)
      expect(enPairs.filter((p) => mine.get(p) === enReasons.get(p))).toEqual(
        [],
      )
    },
  )

  it.each(LANGS)('%s has no leftover English rule prose', (_lang, jinxes) => {
    const leaks = [
      /\bIf the [A-Z]/,
      /\bEach night\*,? (the|Riot)\b/,
      /\b(good|evil) wins\b/,
      /\bin play\b/,
      /\bability\b/,
      /\bthe Storyteller\b/,
      /\bmight register as\b/,
    ]
    const hits: Array<string> = []
    for (const e of jinxes)
      for (const h of e.hatred)
        for (const re of leaks)
          if (re.test(h.reason)) hits.push(`${e.id}|${h.id}: ${re}`)
    expect(hits).toEqual([])
  })

  it.each(LANGS)('%s reason lengths are plausible', (lang, jinxes) => {
    // A translation far shorter than the English rule is usually truncated;
    // far longer usually means two rules were merged.
    const mine = reasonsOf(jinxes)
    const odd: Array<string> = []
    for (const p of enPairs) {
      const e = (enReasons.get(p) ?? '').trim().length
      const t = (mine.get(p) ?? '').trim().length
      if (e > 40 && (t < e * 0.5 || t > e * 2.2))
        odd.push(`${p}: en=${e} ${lang}=${t}`)
    }
    expect(odd).toEqual([])
  })

  it.each(LANGS)(
    '%s keeps distinct English rules distinct',
    (_lang, jinxes) => {
      // Two pairs with different English text but identical translation means one
      // was copy-pasted from the other.
      const mine = reasonsOf(jinxes)
      const byText = new Map<string, Array<string>>()
      for (const p of enPairs) {
        const t = mine.get(p)!
        byText.set(t, [...(byText.get(t) ?? []), p])
      }
      const collapsed: Array<string> = []
      for (const [, ps] of byText) {
        if (ps.length < 2) continue
        const distinctEn = new Set(ps.map((p) => enReasons.get(p)!.trim()))
        if (distinctEn.size > 1) collapsed.push(ps.join(' , '))
      }
      expect(collapsed).toEqual([])
    },
  )
})

/**
 * These languages decline role names (cs "Lovec odměn" -> "Lovce odměn",
 * pl "Szpieg" -> "Szpiega", hu "Kém" -> "Kémet"), so a translated reason is
 * checked against word prefixes of the localized name. English is not
 * inflected, so the "does English name this role at all?" side uses exact
 * whole-word matching instead — stemming there both misses short names (Sage,
 * King, Spy) and matches unrelated words ("pla" in "players").
 */
const stems = (name: string, min: number) =>
  name
    .split(/[\s'-]+/)
    .map((w) => w.replace(/[^\p{L}]/gu, ''))
    .filter((w) => w.length >= min)
    .map((w) => w.slice(0, Math.max(min, w.length - 3)).toLowerCase())

const mentionsInflected = (text: string, name: string) => {
  const t = text.toLowerCase()
  return stems(name, 3).some((s) => t.includes(s))
}
const namesRole = (english: string, name: string) =>
  new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(
    english,
  )

/**
 * Accepted gaps: `roles.pl.overrides.ts` has no `name` for the Widow or the
 * Magician, so the role card shows the English token while the jinx prose uses
 * the natural Polish word. Forcing the undeclined English token into a Polish
 * sentence reads worse than the mismatch; the real fix is adding those names.
 */
const ACCEPTED_NAME_GAPS = new Set([
  'pl magician|spy magician',
  'pl magician|widow magician',
  'pl magician|widow widow',
  'pl alchemist|widow widow',
  'pl widow|damsel widow',
  'pl widow|poppygrower widow',
])

describe('jinx data: role names inside reasons', () => {
  it.each(LANGS)(
    '%s names the roles the English text names',
    (lang, jinxes, names) => {
      const shown = (id: string) => names[id]?.name ?? enNames.get(id) ?? id
      const missing: Array<string> = []
      for (const e of jinxes)
        for (const h of e.hatred) {
          const key = `${e.id}|${h.id}`
          const enReason = enReasons.get(key)!
          for (const id of [e.id, h.id]) {
            // "is summoned" / "a riot" are ordinary words, not the role token.
            if (id === 'summoner' && !/\bSummoner\b/.test(enReason)) continue
            if (id === 'riot' && !/\bRiot\b/.test(enReason)) continue
            if (!namesRole(enReason, enNames.get(id)!)) continue
            if (ACCEPTED_NAME_GAPS.has(`${lang} ${key} ${id}`)) continue
            if (!mentionsInflected(h.reason, shown(id)))
              missing.push(`${key}: expected "${shown(id)}" -> ${h.reason}`)
          }
        }
      expect(missing).toEqual([])
    },
  )

  it.each(LANGS)(
    '%s names no role the English text omits',
    (_lang, jinxes, names) => {
      const shown = (id: string) => names[id]?.name ?? enNames.get(id) ?? id
      // Exact name, not a stem: many role names are ordinary words here
      // (cs "Zabiják" vs "zabije", de "Schütze" vs "geschützten", hu
      // "Gonosz iker" vs "gonosz"), so prefix matching is pure noise. A
      // copy-pasted role name shows up in full.
      const stray: Array<string> = []
      for (const e of jinxes)
        for (const h of e.hatred) {
          const enReason = enReasons.get(`${e.id}|${h.id}`)!
          const reason = h.reason.toLowerCase()
          for (const role of baseRoles) {
            if (role.id === e.id || role.id === h.id) continue
            const name = shown(role.id).toLowerCase()
            if (name.length < 5 || !reason.includes(name)) continue
            if (namesRole(enReason, enNames.get(role.id)!)) continue
            if (shown(e.id).toLowerCase().includes(name)) continue
            if (shown(h.id).toLowerCase().includes(name)) continue
            stray.push(`${e.id}|${h.id}: mentions ${role.id} -> ${h.reason}`)
          }
        }
      expect(stray).toEqual([])
    },
  )
})

/** Same algorithm as TeamSection's `djinnJinxes` memo. */
function djinnRows(scriptRoles: Array<Role>, jinxes: Array<Jinx>) {
  const ids = new Set(scriptRoles.map((r) => r.id))
  const rows: Array<{
    id: string
    name: string
    reason: string
    image1: string
    image2: string
  }> = []
  for (const entry of jinxes) {
    if (!ids.has(entry.id)) continue
    for (const hatred of entry.hatred) {
      if (!ids.has(hatred.id)) continue
      const r1 = scriptRoles.find((r) => r.id === entry.id)
      const r2 = scriptRoles.find((r) => r.id === hatred.id)
      if (r1 && r2)
        rows.push({
          id: `${entry.id}-${hatred.id}`,
          name: `${r1.name} & ${r2.name}`,
          reason: hatred.reason,
          image1: r1.image,
          image2: r2.image,
        })
    }
  }
  return rows
}

const allRoles = baseRoles as Array<Role>

describe('Djinn card rendering', () => {
  it.each(ALL)('%s renders every pair with usable content', (_lang, jinxes) => {
    const rows = djinnRows(allRoles, jinxes)
    expect(rows).toHaveLength(enPairs.length)
    expect(
      rows
        .filter(
          (r) =>
            !r.reason.trim() ||
            !r.image1?.startsWith('http') ||
            !r.image2?.startsWith('http') ||
            !r.name.includes(' & '),
        )
        .map((r) => r.id),
    ).toEqual([])
  })

  it('row ids and order match across languages', () => {
    const expected = djinnRows(allRoles, en).map((r) => r.id)
    for (const [lang, jinxes] of LANGS)
      expect(
        djinnRows(allRoles, jinxes).map((r) => r.id),
        lang,
      ).toEqual(expected)
  })

  it('shows only pairs whose both roles are in the script', () => {
    const subset = allRoles.filter((r) =>
      ['chambermaid', 'mathematician', 'butler', 'cannibal', 'imp'].includes(
        r.id,
      ),
    )
    expect(
      djinnRows(subset, cs)
        .map((r) => r.id)
        .sort(),
    ).toEqual(['cannibal-butler', 'mathematician-chambermaid'])
  })
})

describe('Djinn auto add/remove', () => {
  const pick = (...ids: Array<string>) =>
    ids.map((id) => ({
      ...(allRoles.find((r) => r.id === id) as Role),
      isCustom: false,
    }))

  it('adds the Djinn once a jinx pair is active', () => {
    expect(
      applyAutoRoles(pick('chambermaid', 'mathematician'), en, allRoles).map(
        (r) => r.id,
      ),
    ).toContain('djinn')
  })

  it('adds the Djinn for a pair listed in the reverse direction', () => {
    // en lists this as mathematician -> chambermaid.
    expect(
      applyAutoRoles(pick('mathematician', 'chambermaid'), en, allRoles).map(
        (r) => r.id,
      ),
    ).toContain('djinn')
  })

  it('does not add the Djinn with no active pair', () => {
    expect(
      applyAutoRoles(pick('chambermaid', 'washerwoman'), en, allRoles).map(
        (r) => r.id,
      ),
    ).not.toContain('djinn')
  })

  it('removes the Djinn when the last pair is broken', () => {
    const withDjinn = applyAutoRoles(
      pick('chambermaid', 'mathematician'),
      en,
      allRoles,
    )
    const broken = withDjinn.filter((r) => r.id !== 'mathematician')
    expect(applyAutoRoles(broken, en, allRoles).map((r) => r.id)).not.toContain(
      'djinn',
    )
  })
})

describe('useActiveJinxes', () => {
  it('serves English synchronously', () => {
    const { result } = renderHook(() => useActiveJinxes('en'))
    expect(result.current).toBe(en)
  })

  it.each(LANGS)(
    'lazy-loads %s with a full pair set',
    async (_lang, expected) => {
      const { result } = renderHook(() => useActiveJinxes(_lang))
      await waitFor(() => expect(result.current).toBe(expected))
      expect(pairsOf(result.current)).toHaveLength(enPairs.length)
    },
  )

  it('falls back to English for an unsupported language', async () => {
    const { result } = renderHook(() => useActiveJinxes('es'))
    await waitFor(() => expect(result.current).toBe(en))
  })
})
