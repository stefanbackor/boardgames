import type { Page } from '@playwright/test'
import type { SavedScript, MetaOverrides } from '../../src/types'
import { getScriptKey } from '../../src/stores/scriptModificationHelpers'

export function scriptUrl(script: unknown) {
  const encoded = Buffer.from(JSON.stringify(script), 'utf-8').toString(
    'base64',
  )
  return `/?script=${encodeURIComponent(encoded)}`
}

/** Seed once: subsequent reloads must read what the app actually persisted. */
export async function openScript(
  page: Page,
  script: unknown,
  metaOverrides?: MetaOverrides,
) {
  const url = scriptUrl(script)
  if (metaOverrides) {
    await page.addInitScript(
      ({ scriptKey, metaOverrides }) => {
        if (sessionStorage.getItem('e2e-script-seeded')) return
        sessionStorage.setItem('e2e-script-seeded', 'true')
        sessionStorage.setItem(
          'botc-script-modifications',
          JSON.stringify({
            state: { scriptKey, metaOverrides },
            version: 0,
          }),
        )
      },
      { scriptKey: getScriptKey(url.slice(1)), metaOverrides },
    )
  }
  await page.goto(url)
}

/** Read the committed library, independently of the app's in-memory cache. */
export async function readSavedScripts(page: Page): Promise<SavedScript[]> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const open = indexedDB.open('botc-saved-scripts', 1)
        open.onerror = () => reject(open.error)
        open.onsuccess = () => {
          const db = open.result
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
        }
      }),
  )
}
