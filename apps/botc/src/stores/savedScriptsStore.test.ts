import { beforeEach, expect, it, vi } from 'vitest'
import { IDBFactory } from 'fake-indexeddb'
import type { useSavedScriptsStore } from './savedScriptsStore'

type LibraryStore = typeof useSavedScriptsStore
let store: LibraryStore
beforeEach(async () => {
  vi.resetModules()
  vi.stubGlobal('indexedDB', new IDBFactory())
  localStorage.clear()
  store = (await import('./savedScriptsStore')).useSavedScriptsStore
})

const save = (name = 'Script 2') =>
  store
    .getState()
    .saveScript(null, ['chef', 'imp'], name, '', 'original-content')

it('persists trimmed folders, membership and collapse state across a fresh store', async () => {
  const id = await save()
  await store.getState().createFolderAndMove(id, '  Favorites  ')
  const folderId = store.getState().folderLibrary.membership[id]
  expect(store.getState().folderLibrary.folders[folderId]).toMatchObject({
    name: 'Favorites',
    collapsed: false,
  })
  await store.getState().setFolderCollapsed(folderId, true)
  vi.resetModules()
  const reloaded = (await import('./savedScriptsStore')).useSavedScriptsStore
  await reloaded.getState().initialize()
  expect(reloaded.getState().folderLibrary).toEqual({
    folders: {
      [folderId]: { id: folderId, name: 'Favorites', collapsed: true },
    },
    membership: { [id]: folderId },
  })
})

it('rejects empty and duplicate names for creation and renaming without moving scripts', async () => {
  const id = await save()
  await expect(store.getState().createFolderAndMove(id, '  ')).rejects.toThrow(
    'Enter a folder name.',
  )
  await store.getState().createFolderAndMove(id, 'Favorites')
  const first = store.getState().folderLibrary.membership[id]
  await expect(
    store.getState().createFolderAndMove(id, ' FAVORITES '),
  ).rejects.toThrow('already exists')
  expect(store.getState().folderLibrary.membership[id]).toBe(first)
  await store.getState().createFolderAndMove(id, 'Other')
  const second = store.getState().folderLibrary.membership[id]
  await expect(
    store.getState().renameFolder(second, ' favorites '),
  ).rejects.toThrow('already exists')
  await expect(store.getState().renameFolder(second, '\t')).rejects.toThrow(
    'Enter a folder name.',
  )
  await store.getState().renameFolder(first, ' favorites ')
  expect(store.getState().folderLibrary.folders[first].name).toBe('favorites')
})

it('moves independently of script content and preserves membership through subsequent saves', async () => {
  const id = await save()
  const original = store.getState().getScript(id)
  await store.getState().createFolderAndMove(id, 'First')
  const first = store.getState().folderLibrary.membership[id]
  expect(store.getState().getScript(id)).toEqual(original)
  await store.getState().saveScript(id, ['imp'], 'Edited', '', 'edited-content')
  expect(store.getState().folderLibrary.membership[id]).toBe(first)
  await store.getState().createFolderAndMove(id, 'Second')
  await store.getState().moveScript(id, first)
  expect(store.getState().folderLibrary.membership[id]).toBe(first)
  await store.getState().moveScript(id, null)
  expect(store.getState().folderLibrary.membership[id]).toBeUndefined()
  expect(store.getState().getScript(id)?.scriptData).toEqual(['imp'])
})

it('keeps scripts when deleting a folder and keeps empty folders when deleting scripts', async () => {
  const id = await save()
  const other = await save('Other')
  await store.getState().createFolderAndMove(id, 'Favorites')
  const folderId = store.getState().folderLibrary.membership[id]
  await store.getState().moveScript(other, folderId)
  await store.getState().deleteFolder(folderId)
  expect(store.getState().folderLibrary).toEqual({
    folders: {},
    membership: {},
  })
  expect(store.getState().getAllScripts()).toHaveLength(2)
  await store.getState().createFolderAndMove(id, 'Empty later')
  const empty = store.getState().folderLibrary.membership[id]
  await store.getState().deleteScript(id)
  expect(store.getState().folderLibrary.folders[empty].name).toBe('Empty later')
  expect(store.getState().folderLibrary.membership[id]).toBeUndefined()
})

it('migrates legacy scripts as unfiled and sorts names naturally with a stable tie-breaker', async () => {
  const legacy = {
    id: 'legacy',
    name: 'Script 10',
    author: '',
    scriptData: ['imp'],
    encodedScript: '',
    savedAt: '',
    lastModified: '',
  }
  localStorage.setItem(
    'botc-saved-scripts',
    JSON.stringify({ state: { scripts: { legacy } } }),
  )
  const second = await save('script 2')
  const first = await save('Script 1')
  expect(
    store
      .getState()
      .getAllScripts()
      .map((script) => script.id),
  ).toEqual([first, second, 'legacy'])
  const duplicate = await save('SCRIPT 2')
  expect(
    store
      .getState()
      .getAllScripts()
      .map((script) => script.id),
  ).toEqual([first, ...[second, duplicate].sort(), 'legacy'])
  expect(store.getState().folderLibrary.membership).toEqual({})
})

it('starts newly saved copies unfiled and leaves exportable content free of folder metadata', async () => {
  const id = await save()
  await store.getState().createFolderAndMove(id, 'Private folder')
  const copy = await save()
  expect(store.getState().folderLibrary.membership[copy]).toBeUndefined()
  expect(store.getState().getScript(id)?.scriptData).toEqual(['chef', 'imp'])
  expect(store.getState().getScript(id)?.encodedScript).toBe('original-content')
})
