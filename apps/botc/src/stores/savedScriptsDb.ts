import { emptyFolderLibrary, type FolderLibrary } from './folderLibrary'
import type { SavedScript } from '@/types'

const LEGACY_KEY = 'botc-saved-scripts'
const MIGRATION_KEY = 'localStorage-migrated'

function readLegacyScripts(raw: string | null): SavedScript[] {
  if (raw === null) return []
  const value = JSON.parse(raw)
  const scripts = value?.state?.scripts
  if (!scripts || typeof scripts !== 'object' || Array.isArray(scripts)) {
    throw new Error('Invalid saved script library')
  }
  return Object.entries(scripts).map(([id, script]) => {
    const item = script as SavedScript | null
    if (
      !item ||
      item.id !== id ||
      !Array.isArray(item.scriptData) ||
      !['name', 'author', 'encodedScript', 'savedAt', 'lastModified'].every(
        (key) => typeof item[key as keyof SavedScript] === 'string',
      )
    )
      throw new Error('Invalid saved script')
    return item
  })
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('botc-saved-scripts', 1)
    let blocked = false
    request.onupgradeneeded = () => {
      request.result.createObjectStore('scripts', { keyPath: 'id' })
      request.result.createObjectStore('metadata')
    }
    request.onerror = () => reject(request.error)
    request.onblocked = () => {
      blocked = true
      reject(new Error('Close other BOTC tabs and retry'))
    }
    request.onsuccess = () => {
      const db = request.result
      db.onversionchange = () => db.close()
      if (blocked) db.close()
      else resolve(db)
    }
  })
}

/** Import once, atomically recording completion alongside the scripts.
 * The marker prevents an interrupted cleanup or an old tab from restoring
 * stale records over later saves/deletions. All tabs check it in a write
 * transaction so concurrent first loads cannot both import.
 */
export async function loadSavedScripts(): Promise<SavedScript[]> {
  const db = await openDatabase()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(['scripts', 'metadata'], 'readwrite')
    let failure: unknown
    tx.oncomplete = () => resolve()
    tx.onabort = () => reject(failure || tx.error)
    const metadata = tx.objectStore('metadata')
    const marker = metadata.get(MIGRATION_KEY)
    marker.onsuccess = () => {
      if (marker.result) return
      try {
        const scripts = readLegacyScripts(localStorage.getItem(LEGACY_KEY))
        for (const script of scripts) tx.objectStore('scripts').put(script)
        metadata.put(true, MIGRATION_KEY)
      } catch (error) {
        failure = error
        tx.abort()
      }
    }
  }).catch((error) => {
    db.close()
    throw error
  })

  // A failed cleanup is retried next load; the committed marker still prevents
  // reimporting the source. Never remove it before the import commits.
  try {
    localStorage.removeItem(LEGACY_KEY)
  } catch (error) {
    console.warn('Could not remove migrated script library:', error)
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction('scripts', 'readonly')
    const request = tx.objectStore('scripts').getAll()
    tx.oncomplete = () => {
      db.close()
      resolve(request.result)
    }
    tx.onabort = () => {
      db.close()
      reject(tx.error)
    }
  })
}

async function mutateSavedScripts(
  mutate: (store: IDBObjectStore) => void,
): Promise<void> {
  const db = await openDatabase()
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('scripts', 'readwrite')
      tx.oncomplete = () => resolve()
      tx.onabort = () => reject(tx.error)
      mutate(tx.objectStore('scripts'))
    })
  } finally {
    db.close()
  }
}

export function writeSavedScript(script: SavedScript): Promise<void> {
  return mutateSavedScripts((store) => {
    store.put(script)
  })
}

export function deleteSavedScript(id: string): Promise<FolderLibrary> {
  return updateFolderLibrary((library, scripts) => {
    scripts.delete(id)
    delete library.membership[id]
  })
}

/** Read and update folder metadata within one IndexedDB transaction. */
export async function updateFolderLibrary(
  update?: (library: FolderLibrary, scripts: IDBObjectStore) => void,
): Promise<FolderLibrary> {
  const db = await openDatabase()
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(
        ['metadata', 'scripts'],
        update ? 'readwrite' : 'readonly',
      )
      const store = tx.objectStore('metadata')
      const request = store.get('folder-library')
      let library: FolderLibrary
      let failure: unknown
      request.onsuccess = () => {
        library = request.result || emptyFolderLibrary()
        try {
          if (update) {
            update(library, tx.objectStore('scripts'))
            store.put(library, 'folder-library')
          }
        } catch (error) {
          failure = error
          tx.abort()
        }
      }
      tx.oncomplete = () => resolve(library)
      tx.onabort = () => reject(failure || tx.error)
    })
  } finally {
    db.close()
  }
}
