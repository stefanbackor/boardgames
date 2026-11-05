import { describe, it, expect } from 'vitest'
import { roles as catalog } from '@/data/roles.en'
import { jinxes } from '@/data/jinxes.en'
import { Team } from '@/constants'
import type { ParsedRole, ScriptMetaFields } from '@/types'
import {
  buildScriptView,
  isTeamOnPaper,
  type ScriptViewInput,
} from './scriptView'

const official = (id: string): ParsedRole => {
  const role = catalog.find((r) => r.id === id)
  if (!role) throw new Error(`No role ${id}`)
  return { ...role, isCustom: false }
}

const custom: ParsedRole = {
  ...official('washerwoman'),
  id: 'homebrewer',
  name: 'Homebrewer',
  isCustom: true,
}

const noMeta: ScriptMetaFields = {
  present: false,
  name: '',
  author: '',
  bootlegger: [],
}

const build = (input: Partial<ScriptViewInput> = {}) =>
  buildScriptView({
    roles: [official('washerwoman'), official('imp')],
    meta: noMeta,
    fallbackName: 'Fallback',
    overrides: { name: null, author: null, bootleggerRules: null },
    catalog,
    jinxes,
    ...input,
  })

const ids = (view: ReturnType<typeof build>) => view.roles.map((r) => r.id)

describe('buildScriptView', () => {
  describe('name', () => {
    it('takes the edited name over the metadata', () => {
      const view = build({
        meta: { ...noMeta, name: 'Meta' },
        overrides: { name: 'Edited', author: null, bootleggerRules: null },
      })

      expect(view.name).toBe('Edited')
    })

    it('keeps a name the user cleared', () => {
      const view = build({
        meta: { ...noMeta, name: 'Meta' },
        overrides: { name: '', author: null, bootleggerRules: null },
      })

      expect(view.name).toBe('')
    })

    it('falls back to the metadata, then to the fallback name', () => {
      expect(build({ meta: { ...noMeta, name: 'Meta' } }).name).toBe('Meta')
      expect(build().name).toBe('Fallback')
    })
  })

  describe('author', () => {
    it('has no author line for an author that is empty or only spaces', () => {
      for (const author of [null, '', '   ']) {
        const view = build({
          overrides: { name: null, author, bootleggerRules: null },
        })

        expect(view.hasAuthor).toBe(false)
      }
    })

    it('takes the author from the metadata when it was not edited', () => {
      const view = build({ meta: { ...noMeta, author: 'Steven' } })

      expect(view.author).toBe('Steven')
      expect(view.hasAuthor).toBe(true)
    })

    it('keeps an author the user cleared', () => {
      const view = build({
        meta: { ...noMeta, author: 'Steven' },
        overrides: { name: null, author: '', bootleggerRules: null },
      })

      expect(view.author).toBe('')
      expect(view.hasAuthor).toBe(false)
    })
  })

  describe('pages', () => {
    it('lays the character teams out first, in order, empty ones included', () => {
      const view = build()

      expect(view.pages.characters.map((t) => t.team)).toEqual([
        Team.Townsfolk,
        Team.Outsider,
        Team.Minion,
        Team.Demon,
      ])
      expect(view.pages.characters.every(isTeamOnPaper)).toBe(true)
    })

    it('leaves empty Travellers, Fabled and Loric off paper', () => {
      const view = build()

      expect(view.pages.extras.map((t) => t.team)).toEqual([
        Team.Traveler,
        Team.Fabled,
        Team.Loric,
      ])
      expect(view.pages.extras.some(isTeamOnPaper)).toBe(false)
    })

    it('puts a Traveller on the second page, under the same name', () => {
      // The printed travellers page once came out without the script name
      const view = build({
        roles: [official('washerwoman'), official('beggar')],
        meta: { ...noMeta, name: 'Trouble' },
      })
      const travellers = view.pages.extras[0]

      expect(isTeamOnPaper(travellers)).toBe(true)
      expect(travellers.roles.map((r) => r.role.id)).toEqual(['beggar'])
      expect(view.name).toBe('Trouble')
    })

    it('groups each character under its team', () => {
      const view = build()

      expect(view.pages.characters[0].roles.map((r) => r.role.id)).toEqual([
        'washerwoman',
      ])
      expect(view.pages.characters[3].roles.map((r) => r.role.id)).toEqual([
        'imp',
      ])
    })
  })

  describe('Bootlegger', () => {
    it('takes the rules from the metadata and puts them on the Bootlegger', () => {
      const view = build({ meta: { ...noMeta, bootlegger: ['Rule A'] } })
      const bootlegger = view.pages.extras[2].roles.find(
        (r) => r.role.id === 'bootlegger',
      )

      expect(view.bootleggerRules).toEqual(['Rule A'])
      expect(bootlegger?.rules).toEqual(['Rule A'])
      expect(bootlegger?.lock).toBe('homebrew')
    })

    it('takes edited rules over the metadata', () => {
      const view = build({
        meta: { ...noMeta, bootlegger: ['Rule A'] },
        overrides: { name: null, author: null, bootleggerRules: ['Rule B'] },
      })

      expect(view.bootleggerRules).toEqual(['Rule B'])
    })

    it('keeps the Bootlegger until saving when every rule was deleted', () => {
      const view = build({
        meta: { ...noMeta, bootlegger: ['Rule A'] },
        overrides: { name: null, author: null, bootleggerRules: [] },
      })
      const bootlegger = view.roles.find((r) => r.id === 'bootlegger')

      expect(bootlegger).toBeDefined()
      expect(view.pages.extras[2].roles[0].lock).toBe('unsaved-rules')
    })

    it('adds the Bootlegger for a custom character', () => {
      const view = build({ roles: [official('washerwoman'), custom] })

      expect(ids(view)).toContain('bootlegger')
      expect(
        view.pages.extras[2].roles.find((r) => r.role.id === 'bootlegger')
          ?.lock,
      ).toBe('homebrew')
    })

    it('leaves the Bootlegger out of a script without homebrew', () => {
      expect(ids(build())).not.toContain('bootlegger')
    })

    it('puts the rules on the Bootlegger wherever the script lists it', () => {
      const listedAsTownsfolk = {
        ...official('bootlegger'),
        team: Team.Townsfolk,
      } as ParsedRole
      const view = build({
        roles: [official('washerwoman'), listedAsTownsfolk],
        meta: { ...noMeta, bootlegger: ['Rule A'] },
      })

      expect(
        view.pages.characters[0].roles.find((r) => r.role.id === 'bootlegger')
          ?.rules,
      ).toEqual(['Rule A'])
      expect(view.pages.characters[0].roles[0].rules).toBeUndefined()
    })
  })

  describe('jinxes', () => {
    const jinxed = [official('alchemist'), official('spy')]

    it('adds the Djinn with the jinx when both halves are on the script', () => {
      const view = build({ roles: jinxed })
      const djinn = view.pages.extras[1].roles.find(
        (r) => r.role.id === 'djinn',
      )

      expect(djinn?.jinxes?.map((j) => j.id)).toEqual(['alchemist-spy'])
      expect(djinn?.lock).toBe('jinxes')
    })

    it('marks the jinxed character with the one jinxed with it', () => {
      const view = build({ roles: jinxed })
      const spy = view.pages.characters[2].roles.find(
        (r) => r.role.id === 'spy',
      )

      expect(spy?.hatedBy?.map((h) => h.id)).toEqual(['alchemist'])
    })

    it('takes the Djinn out once half of the pair is gone', () => {
      const view = build({ roles: [official('alchemist'), official('djinn')] })

      expect(ids(view)).not.toContain('djinn')
    })
  })

  it('lists the ids of every character on the sheet', () => {
    const view = build({ roles: [official('washerwoman'), custom] })

    expect([...view.roleIds]).toEqual(ids(view))
  })
})
