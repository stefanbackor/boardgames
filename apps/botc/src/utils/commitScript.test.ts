import { describe, it, expect } from 'vitest'
import { buildCommittedScript } from './commitScript'
import type { ScriptData } from '@/types'

describe('buildCommittedScript', () => {
  const script: ScriptData = [
    { id: '_meta', name: 'Original', author: 'Author' },
    'washerwoman',
    'imp',
  ]

  it('should keep the script data when there are no overrides', () => {
    const result = buildCommittedScript(script, null)

    expect(result.script).toEqual(script)
    expect(result.name).toBe('Original')
    expect(result.author).toBe('Author')
    expect(result.bootlegger).toEqual([])
  })

  it('should apply name and author overrides', () => {
    const result = buildCommittedScript(script, {
      name: 'Renamed',
      author: 'Someone else',
    })

    expect(result.script[0]).toEqual({
      id: '_meta',
      name: 'Renamed',
      author: 'Someone else',
    })
    expect(result.name).toBe('Renamed')
    expect(result.author).toBe('Someone else')
  })

  it('should keep an empty override apart from a missing one', () => {
    const result = buildCommittedScript(script, { name: '' })

    expect(result.name).toBe('')
    // Author was not overridden, so the script data still decides
    expect(result.author).toBe('Author')
  })

  it('should write homebrew rules into _meta', () => {
    const result = buildCommittedScript(script, {
      bootlegger: ['Spy does not know the Zombuul'],
    })

    expect(result.script[0]).toEqual({
      id: '_meta',
      name: 'Original',
      author: 'Author',
      bootlegger: ['Spy does not know the Zombuul'],
    })
    expect(result.bootlegger).toEqual(['Spy does not know the Zombuul'])
  })

  it('should drop the bootlegger key when the rules are emptied', () => {
    const withRules: ScriptData = [
      {
        id: '_meta',
        name: 'Original',
        author: 'Author',
        bootlegger: ['A rule'],
      },
      'imp',
    ]

    const result = buildCommittedScript(withRules, { bootlegger: [] })

    expect(result.script[0]).toEqual({
      id: '_meta',
      name: 'Original',
      author: 'Author',
    })
    expect('bootlegger' in (result.script[0] as object)).toBe(false)
  })

  it('should report rules that were never edited without rewriting them', () => {
    const withRules: ScriptData = [
      { id: '_meta', name: 'Original', author: 'Author', bootlegger: 'A rule' },
      'imp',
    ]

    const result = buildCommittedScript(withRules, null)

    // Normalized for the caller...
    expect(result.bootlegger).toEqual(['A rule'])
    // ...but the untouched field is handed on as it was
    expect(result.script[0]).toMatchObject({ bootlegger: 'A rule' })
  })

  it('should keep a bootlegger value it does not understand', () => {
    // A shape the app does not read - deliberately outside ScriptMeta
    const withOddRules = [
      {
        id: '_meta',
        name: 'Original',
        author: 'Author',
        bootlegger: [{ text: 'A rule' }],
      },
      'imp',
    ] as unknown as ScriptData

    const result = buildCommittedScript(withOddRules, null)

    // Nothing to display, but dropping the field would be silent data loss
    expect(result.bootlegger).toEqual([])
    expect(result.script[0]).toMatchObject({ bootlegger: [{ text: 'A rule' }] })
  })

  it('should create a _meta entry when the script has none', () => {
    const result = buildCommittedScript(['washerwoman', 'imp'], {
      name: 'Named later',
      bootlegger: ['A rule'],
    })

    expect(result.script).toEqual([
      {
        id: '_meta',
        name: 'Named later',
        bootlegger: ['A rule'],
      },
      'washerwoman',
      'imp',
    ])
  })

  it('should not add empty keys to a created _meta entry', () => {
    const result = buildCommittedScript(['imp'], { name: 'Named later' })

    expect(result.script[0]).toEqual({
      id: '_meta',
      name: 'Named later',
    })
  })

  it('should not create a _meta entry when there is nothing to record', () => {
    const bare: ScriptData = ['washerwoman', 'imp']

    const result = buildCommittedScript(bare, null)

    // A script that arrived without _meta is handed on without one, so sharing
    // an untouched script gives back exactly what came in
    expect(result.script).toEqual(bare)
    expect(result.name).toBe('')
  })

  it('should drop a _meta entry the edits emptied', () => {
    const rulesOnly: ScriptData = [
      { id: '_meta', bootlegger: ['The only thing it carried'] },
      'imp',
    ]

    const result = buildCommittedScript(rulesOnly, { bootlegger: [] })

    // Nothing is left to record, and an entry is never created for nothing -
    // so one that has been emptied must not be left behind either
    expect(result.script).toEqual(['imp'])
  })

  it('should keep a _meta entry that arrived empty', () => {
    const bare: ScriptData = [{ id: '_meta' }, 'imp']

    const result = buildCommittedScript(bare, null)

    // Handing an untouched script back out returns exactly what came in
    expect(result.script).toEqual(bare)
  })

  it('should keep a _meta entry that still carries something', () => {
    const withNightOrder: ScriptData = [
      { id: '_meta', name: 'Named', author: '', firstNight: ['imp'] },
      'imp',
    ]

    const result = buildCommittedScript(withNightOrder, { name: '' })

    // The name is gone, but the night order is not ours to throw away with it
    expect(result.script[0]).toEqual({
      id: '_meta',
      name: '',
      author: '',
      firstNight: ['imp'],
    })
  })

  it('should not add empty keys to a _meta entry that lacks them', () => {
    const nameOnly: ScriptData = [{ id: '_meta', name: 'Original' }, 'imp']

    const result = buildCommittedScript(nameOnly, null)

    expect(result.script[0]).toEqual({ id: '_meta', name: 'Original' })
    expect(result.author).toBe('')
  })

  /**
   * The name on screen for a script that carries none is a localized
   * placeholder, so it is never written in - naming such a script is the job of
   * whoever files it. See the `label` in useScriptCommit.
   */
  describe('a script that carries no name', () => {
    it('should stay nameless, so nothing bakes a placeholder in', () => {
      const bare: ScriptData = ['washerwoman', 'imp']

      expect(buildCommittedScript(bare, null).script).toEqual(bare)
      expect(buildCommittedScript(bare, null).name).toBe('')
    })

    it('should stay nameless even with a _meta entry to put one in', () => {
      const result = buildCommittedScript(
        [{ id: '_meta', author: 'Author' }, 'imp'],
        null,
      )

      expect(result.name).toBe('')
      expect(result.script[0]).toEqual({ id: '_meta', author: 'Author' })
    })

    it('should take a name the user typed', () => {
      const result = buildCommittedScript(['imp'], { name: 'Typed' })

      expect(result.name).toBe('Typed')
      expect(result.script[0]).toEqual({ id: '_meta', name: 'Typed' })
    })

    it('should not put back a name the user cleared', () => {
      const result = buildCommittedScript(script, { name: '' })

      expect(result.name).toBe('')
    })
  })

  it('should preserve custom role data and role order', () => {
    const withCustom: ScriptData = [
      'washerwoman',
      { id: 'mybrew', name: 'My Brew', team: 'townsfolk', ability: 'Does it' },
      { id: '_meta', name: 'Original', author: 'Author' },
      'imp',
    ]

    const result = buildCommittedScript(withCustom, { name: 'Renamed' })

    expect(result.script).toEqual([
      'washerwoman',
      { id: 'mybrew', name: 'My Brew', team: 'townsfolk', ability: 'Does it' },
      { id: '_meta', name: 'Renamed', author: 'Author' },
      'imp',
    ])
  })

  it('should not mutate the script it was given', () => {
    const original: ScriptData = [
      {
        id: '_meta',
        name: 'Original',
        author: 'Author',
        bootlegger: ['A rule'],
      },
      'imp',
    ]

    buildCommittedScript(original, { name: 'Renamed', bootlegger: [] })

    expect(original[0]).toEqual({
      id: '_meta',
      name: 'Original',
      author: 'Author',
      bootlegger: ['A rule'],
    })
  })

  describe('malformed entries', () => {
    it('should not throw on a null entry', () => {
      expect(() =>
        buildCommittedScript([null] as never, { name: 'New' }),
      ).not.toThrow()
    })

    it('should hand malformed entries back exactly as they came', () => {
      const input = [
        { id: '_meta', name: 'Old' },
        'washerwoman',
        null,
        42,
        { name: 'No id at all' },
      ]

      const { script } = buildCommittedScript(input as never, { name: 'New' })

      expect(script).toEqual([
        { id: '_meta', name: 'New' },
        'washerwoman',
        null,
        42,
        { name: 'No id at all' },
      ])
    })

    it('should still find _meta past a malformed entry', () => {
      const input = [null, { id: '_meta', name: 'Old' }, 'imp']

      const { script, name } = buildCommittedScript(input as never, {
        name: 'New',
      })

      expect(name).toBe('New')
      expect(script).toEqual([null, { id: '_meta', name: 'New' }, 'imp'])
    })

    it('should not mistake an entry without an id for _meta', () => {
      // getScriptItemId answers '' for these, which must not match '_meta'
      const input = [{ name: 'No id' }, 'imp']

      const { script } = buildCommittedScript(input as never, { name: 'New' })

      // _meta is created because the script carried none
      expect(script).toEqual([
        { id: '_meta', name: 'New' },
        { name: 'No id' },
        'imp',
      ])
    })
  })
})
