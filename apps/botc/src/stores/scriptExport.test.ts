import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { MetaOverrides, ScriptData } from '@/types'
import { buildCommittedScript } from '@/utils/commitScript'
import { compressForUrl, decompressFromUrl } from '@/utils/urlCompression'
import {
  clearOriginalScriptCache,
  useScriptModificationStore,
} from './scriptModificationStore'

const original: ScriptData = [
  { id: '_meta', name: 'Original', author: 'Author' },
  'chef',
  'imp',
]

describe('exporting unsaved script metadata', () => {
  beforeEach(() => {
    sessionStorage.clear()
    clearOriginalScriptCache()
    window.history.replaceState(
      {},
      '',
      '/?script=' + encodeURIComponent(btoa(JSON.stringify(original))),
    )
    useScriptModificationStore.getState().reset()
  })

  afterEach(() => {
    useScriptModificationStore.getState().reset()
    clearOriginalScriptCache()
    window.history.replaceState({}, '', '/')
    sessionStorage.clear()
  })

  const cases: {
    label: string
    script: ScriptData
    edits: MetaOverrides
    expected: ScriptData
  }[] = [
    {
      label: 'an untouched named script',
      script: original,
      edits: {},
      expected: original,
    },
    {
      label: 'an untouched nameless script',
      script: ['chef', 'imp'],
      edits: {},
      expected: ['chef', 'imp'],
    },
    {
      label: 'name, author and homebrew rules together',
      script: original,
      edits: {
        name: 'Renamed',
        author: 'New author',
        bootlegger: ['New rule'],
      },
      expected: [
        {
          id: '_meta',
          name: 'Renamed',
          author: 'New author',
          bootlegger: ['New rule'],
        },
        'chef',
        'imp',
      ],
    },
    {
      label: 'a cleared name',
      script: original,
      edits: { name: '' },
      expected: [{ id: '_meta', name: '', author: 'Author' }, 'chef', 'imp'],
    },
    {
      label: 'a cleared author',
      script: original,
      edits: { author: '' },
      expected: [{ id: '_meta', name: 'Original', author: '' }, 'chef', 'imp'],
    },
    {
      label: 'rules without inventing a name or author',
      script: ['chef', 'imp'],
      edits: { bootlegger: ['New rule'] },
      expected: [{ id: '_meta', bootlegger: ['New rule'] }, 'chef', 'imp'],
    },
    {
      label: 'removed rules',
      script: [
        { id: '_meta', name: 'Original', bootlegger: ['Old rule'] },
        'imp',
      ],
      edits: { bootlegger: [] },
      expected: [{ id: '_meta', name: 'Original' }, 'imp'],
    },
  ]

  it.each(cases)(
    'resolves $label for JSON and share payloads',
    ({ script, edits, expected }) => {
      window.history.replaceState(
        {},
        '',
        '/?script=' + encodeURIComponent(btoa(JSON.stringify(script))),
      )
      clearOriginalScriptCache()
      const store = useScriptModificationStore.getState()
      store.reset()
      if (edits.name !== undefined) store.setName(edits.name)
      if (edits.author !== undefined) store.setAuthor(edits.author)
      if (edits.bootlegger !== undefined)
        store.setBootleggerRules(edits.bootlegger)

      const json = JSON.stringify(
        buildCommittedScript(script, store.getMetaOverrides()).script,
      )
      expect(JSON.parse(json)).toEqual(expected)
      expect(JSON.parse(decompressFromUrl(compressForUrl(json)))).toEqual(
        expected,
      )

      // A reload restores the same metadata diff used by the export resolver.
      const persisted = sessionStorage.getItem('botc-script-modifications')!
      useScriptModificationStore.setState({ metaOverrides: null })
      sessionStorage.setItem('botc-script-modifications', persisted)
      useScriptModificationStore.persist.rehydrate()
      expect(
        buildCommittedScript(script, store.getMetaOverrides()).script,
      ).toEqual(expected)
    },
  )
})
