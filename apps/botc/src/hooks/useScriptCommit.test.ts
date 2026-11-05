import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useScriptCommit } from './useScriptCommit'
import {
  useScriptModificationStore,
  getModifiedRoleItems,
  setOriginalScriptCache,
} from '@/stores/scriptModificationStore'
import type { ScriptData } from '@/types'
import { readMeta } from '@/utils/scriptIntake'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))
vi.mock('@/utils/analytics', () => ({ sendEvent: vi.fn() }))

function setup() {
  let resolve!: (id: string) => void
  const write = new Promise<string>((done) => {
    resolve = done
  })
  const baseline: ScriptData = [
    { id: '_meta', name: 'A', author: 'Author A', bootlegger: ['Rule A'] },
    'chef',
    'imp',
  ]
  window.history.replaceState(
    {},
    '',
    `/?script=${encodeURIComponent(btoa(JSON.stringify(baseline)))}`,
  )
  setOriginalScriptCache(baseline)
  const store = useScriptModificationStore.getState()
  store.reset()
  const props: Parameters<typeof useScriptCommit>[0] = {
    scriptData: baseline,
    getMetaOverrides: store.getMetaOverrides,
    fallbackName: 'Shared Script',
    setScriptData: vi.fn(),
    setScriptName: vi.fn(),
    setCurrentScriptUrl: vi.fn(),
    resetModifications: vi.fn(store.reset),
    loadFromUrlParams: vi.fn(),
    getSavedScript: () => null,
    currentScriptId: null,
    saveScript: vi.fn(() => write),
    setCurrentScriptId: vi.fn(),
  }
  return { props, resolve, baseline, store }
}

describe('asynchronous script commits', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.history.replaceState({}, '', '/')
  })

  it('waits for persistence before changing the URL or clearing edits', async () => {
    const { props, resolve } = setup()
    const { result } = renderHook(() => useScriptCommit(props))
    let pending!: Promise<void>
    act(() => {
      pending = result.current.handleSaveChanges()
    })
    await waitFor(() => expect(props.saveScript).toHaveBeenCalledOnce())
    expect(new URLSearchParams(window.location.search).has('id')).toBe(false)
    expect(props.resetModifications).not.toHaveBeenCalled()
    expect(props.setScriptData).not.toHaveBeenCalled()
    await act(async () => {
      resolve('saved-id')
      await pending
    })
    expect(new URLSearchParams(window.location.search).get('id')).toBe(
      'saved-id',
    )
    expect(props.resetModifications).toHaveBeenCalledOnce()
  })

  it('preserves newer edits made while a write is pending', async () => {
    const { props, resolve } = setup()
    const { result } = renderHook(() => useScriptCommit(props))
    let pending!: Promise<void>
    act(() => {
      pending = result.current.handleSaveChanges()
    })
    await waitFor(() => expect(props.saveScript).toHaveBeenCalledOnce())
    useScriptModificationStore.getState().setName('Typed during save')
    await act(async () => {
      resolve('saved-id')
      await pending
    })
    expect(props.resetModifications).not.toHaveBeenCalled()
    expect(useScriptModificationStore.getState().getName()).toBe(
      'Typed during save',
    )
    expect(useScriptModificationStore.getState().isModified()).toBe(true)
  })
  it.each(['name', 'author', 'rules'] as const)(
    'preserves %s changed back to its original value during saving',
    async (field) => {
      const { props, resolve, store } = setup()
      const edit = () => {
        if (field === 'name') store.setName('B')
        if (field === 'author') store.setAuthor('Author B')
        if (field === 'rules') store.setBootleggerRules(['Rule B'])
      }
      const restore = () => {
        if (field === 'name') store.setName('A')
        if (field === 'author') store.setAuthor('Author A')
        if (field === 'rules') store.setBootleggerRules(['Rule A'])
      }
      edit()
      const { result, rerender } = renderHook(
        (props) => useScriptCommit(props),
        { initialProps: props },
      )
      let pending!: Promise<void>
      act(() => {
        pending = result.current.handleSaveChanges()
      })
      await waitFor(() => expect(props.saveScript).toHaveBeenCalledOnce())
      restore()
      expect(store.getMetaOverrides()).toBeNull()
      await act(async () => {
        resolve('saved-id')
        await pending
      })
      expect(store.getName()).toBe('A')
      expect(store.getAuthor()).toBe('Author A')
      expect(store.getBootleggerRules()).toEqual(['Rule A'])
      expect(store.isModified()).toBe(true)

      // Returning to the new baseline must also save the right value: the raw
      // script data and the override store must agree on what that baseline is.
      const updated = vi.mocked(props.setScriptData).mock.lastCall![0]
      rerender({ ...props, scriptData: updated, currentScriptId: 'saved-id' })
      edit()
      expect(store.getMetaOverrides()).toBeNull()
      await act(async () => {
        await result.current.handleSaveChanges()
      })
      const savedMeta = readMeta(vi.mocked(props.saveScript).mock.lastCall![1])
      expect(savedMeta?.name).toBe(field === 'name' ? 'B' : 'A')
      expect(savedMeta?.author).toBe(
        field === 'author' ? 'Author B' : 'Author A',
      )
      expect(savedMeta?.bootlegger).toEqual(
        field === 'rules' ? ['Rule B'] : ['Rule A'],
      )
      expect(store.isModified()).toBe(false)
    },
  )

  it('rebases role additions without duplicating roles already saved', async () => {
    const { props, resolve, store, baseline } = setup()
    store.addRole('washerwoman')
    props.scriptData = [...baseline, 'washerwoman']
    const { result, rerender } = renderHook((props) => useScriptCommit(props), {
      initialProps: props,
    })
    let pending!: Promise<void>
    act(() => {
      pending = result.current.handleSaveChanges()
    })
    await waitFor(() => expect(props.saveScript).toHaveBeenCalledOnce())
    store.addRole('librarian')
    const latest: ScriptData = [...baseline, 'washerwoman', 'librarian']
    rerender({ ...props, scriptData: latest })
    await act(async () => {
      resolve('saved-id')
      await pending
    })
    expect(getModifiedRoleItems(useScriptModificationStore.getState())).toEqual(
      latest,
    )
    expect(useScriptModificationStore.getState().addedRoles).toEqual([
      'librarian',
    ])
    expect(store.isModified()).toBe(true)
  })
})
