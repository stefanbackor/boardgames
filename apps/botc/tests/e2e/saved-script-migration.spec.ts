import { test, expect } from './fixtures'
import { readSavedScripts, scriptUrl } from './script-state'
import type { SavedScript } from '../../src/types'

const script: SavedScript = {
  id: 'ef8f19cf-249d-4b4c-bce1-53b1addc0553',
  name: 'Legacy library script',
  author: 'Original author',
  scriptData: [
    { id: '_meta', name: 'Legacy library script', author: 'Original author' },
    'chef',
    'imp',
  ],
  encodedScript: '',
  savedAt: '2025-01-01T00:00:00.000Z',
  lastModified: '2025-02-01T00:00:00.000Z',
}
script.encodedScript = new URL(
  scriptUrl(script.scriptData),
  'http://localhost',
).searchParams.get('script')!
const legacy = JSON.stringify({
  state: { scripts: { [script.id]: script } },
  version: 0,
})

test.beforeEach(async ({ page }) => {
  await page.addInitScript((legacy) => {
    if (sessionStorage.getItem('migration-seeded')) return
    sessionStorage.setItem('migration-seeded', 'true')
    localStorage.setItem('botc-saved-scripts', legacy)
  }, legacy)
})

test('migrates before resolving an ID-only link, preserving records and removing the source', async ({
  page,
}) => {
  await page.goto(`/?id=${script.id}`)
  await expect(
    page.getByText('Legacy library script', { exact: true }).first(),
  ).toBeVisible()
  await expect.poll(() => readSavedScripts(page)).toEqual([script])
  expect(
    await page.evaluate(() => localStorage.getItem('botc-saved-scripts')),
  ).toBeNull()
  await page.reload()
  await expect(
    page.getByText('Legacy library script', { exact: true }).first(),
  ).toBeVisible()
  expect(await readSavedScripts(page)).toEqual([script])
})

test('does not reimport stale legacy records after a completed migration', async ({
  page,
}) => {
  await page.goto(`/?id=${script.id}`)
  await expect(page.getByText('Saved', { exact: true })).toBeVisible()
  page.once('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Delete', exact: true }).click()
  await expect.poll(() => readSavedScripts(page)).toEqual([])
  // Simulate a crash before cleanup, or an old tab rewriting its stale copy.
  await page.evaluate(
    (legacy) => localStorage.setItem('botc-saved-scripts', legacy),
    legacy,
  )
  await page.reload()
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('botc-saved-scripts')))
    .toBeNull()
  expect(await readSavedScripts(page)).toEqual([])
})

test('retains malformed legacy data and reports failure instead of an empty library', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('botc-saved-scripts', '{invalid'),
  )
  await page.goto(`/?id=${script.id}`)
  await expect(
    page
      .getByText('Could not load saved scripts. Please reload to retry.')
      .first(),
  ).toBeVisible()
  expect(
    await page.evaluate(() => localStorage.getItem('botc-saved-scripts')),
  ).toBe('{invalid')
})

test('an aborted import leaves its source intact and retries on reload', async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem('import-aborted')) return
    const put = IDBObjectStore.prototype.put
    IDBObjectStore.prototype.put = function (...args) {
      if (this.name === 'scripts') {
        sessionStorage.setItem('import-aborted', 'true')
        throw new DOMException('Simulated full storage', 'QuotaExceededError')
      }
      return put.apply(this, args)
    }
  })
  await page.goto(`/?id=${script.id}`)
  await expect(
    page
      .getByText('Could not load saved scripts. Please reload to retry.')
      .first(),
  ).toBeVisible()
  expect(
    await page.evaluate(() => localStorage.getItem('botc-saved-scripts')),
  ).toBe(legacy)
  await page.reload()
  await expect(page.getByText('Saved', { exact: true })).toBeVisible()
  expect(await readSavedScripts(page)).toEqual([script])
  expect(
    await page.evaluate(() => localStorage.getItem('botc-saved-scripts')),
  ).toBeNull()
})

test('failed saves retain edits and allow retry without changing the URL', async ({
  page,
}) => {
  await page.goto(scriptUrl(['chef', 'imp']))
  await expect(
    page.getByRole('button', { name: 'Save', exact: true }),
  ).toBeVisible()
  await page.getByText('Shared Script', { exact: true }).first().click()
  await page.keyboard.press('ControlOrMeta+a')
  await page.keyboard.insertText('Unsaved name')
  await page.keyboard.press('Enter')
  await page.evaluate(() => {
    const put = IDBObjectStore.prototype.put
    IDBObjectStore.prototype.put = function (...args) {
      IDBObjectStore.prototype.put = put
      if (this.name === 'scripts') {
        this.transaction.abort()
        throw new DOMException('Simulated full storage', 'QuotaExceededError')
      }
      return put.apply(this, args)
    }
  })
  const url = page.url()
  await page.getByRole('button', { name: 'Save', exact: true }).click()
  await expect(
    page.getByText(
      'Could not save script. Your edits are still available. Please try again.',
    ),
  ).toBeVisible()
  await expect(page.getByText('Changes made')).toBeVisible()
  expect(page.url()).toBe(url)
  await page.getByRole('button', { name: 'Save', exact: true }).click()
  await expect(page.getByText('Saved', { exact: true })).toBeVisible()
  await expect(page.getByText('Changes made')).toHaveCount(0)
  expect(
    (await readSavedScripts(page)).some(
      (saved) => saved.name === 'Unsaved name',
    ),
  ).toBe(true)
})
