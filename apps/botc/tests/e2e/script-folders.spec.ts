import { test, expect } from './fixtures'
import type { Page } from '@playwright/test'
import { scriptUrl } from './script-state'

async function saveScript(page: Page, name: string) {
  await page.goto(scriptUrl([{ id: '_meta', name }, 'chef', 'imp']))
  await expect(
    page.getByRole('button', { name: 'Folder', exact: true }),
  ).toHaveCount(0)
  await page.getByRole('button', { name: 'Save', exact: true }).click()
  await expect(page.getByText('Saved', { exact: true })).toBeVisible()
  return page.url()
}

async function createFolder(page: Page, name: string) {
  await page.getByRole('button', { name: /^(Folder|In )/ }).click()
  await page.getByLabel('Folder name', { exact: true }).fill(name)
  await page.getByRole('button', { name: 'Create folder and move' }).click()
  await expect(
    page.getByRole('dialog', { name: 'Select folder', exact: true }),
  ).toHaveCount(0)
}

async function renameScript(page: Page, name: string) {
  await page
    .locator('h1[contenteditable], h2[contenteditable]')
    .first()
    .fill(name)
  await page.keyboard.press('Enter')
}

test('moves preserve pending edits, Save and Revert preserve membership, and copies start unfiled', async ({
  page,
}) => {
  await saveScript(page, 'Original')
  await renameScript(page, 'Pending name')
  await createFolder(page, 'Private folder')
  await expect(page.getByText('Changes made')).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Pending name', exact: true }).first(),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Revert', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'In Private folder', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Original', exact: true }).first(),
  ).toBeVisible()
  await renameScript(page, 'Committed name')
  await page.getByRole('button', { name: 'Save', exact: true }).click()
  await expect(page.getByText('Saved', { exact: true })).toBeVisible()
  await page.reload()
  await expect(
    page.getByRole('button', { name: 'In Private folder', exact: true }),
  ).toBeVisible()
  const copyUrl = new URL(page.url())
  copyUrl.searchParams.delete('id')
  await page.goto(copyUrl.toString())
  await expect(
    page.getByRole('button', { name: 'Folder', exact: true }),
  ).toHaveCount(0)
  await page.getByRole('button', { name: 'Save', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Folder', exact: true }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Folder', exact: true }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Private folder', exact: true })
    .click()
  await page
    .getByRole('button', { name: 'In Private folder', exact: true })
    .click()
  await page.getByRole('button', { name: 'No folder', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Folder', exact: true }),
  ).toBeVisible()
})

test('homepage sorts naturally, persists collapse, manages empty folders, and deletes without deleting scripts', async ({
  page,
}) => {
  await saveScript(page, 'Script 10')
  await createFolder(page, 'Folder 10')
  const first = page.url()
  await saveScript(page, 'script 2')
  await createFolder(page, 'Folder 2')
  await saveScript(page, 'Unfiled 10')
  await saveScript(page, 'Unfiled 2')
  await page.goto('/')
  await expect(
    page.getByRole('button', { name: 'Folder 2', exact: true }),
  ).toBeVisible()
  const names = await page.getByRole('button').allTextContents()
  expect(names.indexOf('Unfiled 2')).toBeLessThan(names.indexOf('Unfiled 10'))
  expect(names.indexOf('Unfiled 10')).toBeLessThan(names.indexOf('Folder 2'))
  expect(names.indexOf('Folder 2')).toBeLessThan(names.indexOf('Folder 10'))
  await page.getByRole('button', { name: 'Folder 2', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'script 2', exact: true }),
  ).toBeHidden()
  await page.reload()
  await expect(
    page.getByRole('button', { name: 'Folder 2', exact: true }),
  ).toHaveAttribute('aria-expanded', 'false')
  await page
    .getByRole('button', { name: 'Edit folder Folder 2', exact: true })
    .click()
  await page.getByLabel('Folder name', { exact: true }).fill('Folder 1')
  await page.getByRole('button', { name: 'Rename folder', exact: true }).click()
  await expect(page.getByRole('region').first()).toHaveAttribute(
    'aria-label',
    'Folder 1',
  )
  await page
    .getByRole('button', { name: 'Edit folder Folder 1', exact: true })
    .click()
  await page.getByRole('button', { name: 'Delete folder', exact: true }).click()
  await expect(
    page.getByText(
      'Delete this folder? No scripts will be deleted or changed. They will simply become unfiled.',
    ),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Cancel', exact: true }).click()
  await expect(
    page.getByRole('region', { name: 'Folder 1', exact: true }),
  ).toBeVisible()
  await page
    .getByRole('button', { name: 'Edit folder Folder 1', exact: true })
    .click()
  await page.getByRole('button', { name: 'Delete folder', exact: true }).click()
  await page
    .getByRole('button', { name: 'Confirm delete folder', exact: true })
    .click()
  await expect(
    page.getByRole('button', { name: 'script 2', exact: true }),
  ).toBeVisible()
  await page.goto(first)
  await page.getByRole('button', { name: 'In Folder 10', exact: true }).click()
  await page.getByRole('button', { name: 'No folder', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Folder', exact: true }),
  ).toBeVisible()
  await page.goto('/')
  await expect(
    page.getByRole('region', { name: 'Folder 10', exact: true }),
  ).toBeVisible()
  const emptyFolder = page.getByRole('region', {
    name: 'Folder 10',
    exact: true,
  })
  await expect(emptyFolder.getByText('This folder is empty.')).toBeVisible()
  await emptyFolder
    .getByRole('button', { name: 'Folder 10', exact: true })
    .click()
  await expect(emptyFolder.getByText('This folder is empty.')).toBeHidden()
  await emptyFolder
    .getByRole('button', { name: 'Folder 10', exact: true })
    .click()
  await expect(emptyFolder.getByText('This folder is empty.')).toBeVisible()
  await page
    .getByRole('button', { name: 'Edit folder Folder 10', exact: true })
    .click()
  await expect(
    page.getByRole('dialog', { name: 'Edit folder', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Create folder and move' }),
  ).toHaveCount(0)
})

test('picker rejects invalid names, cancellation changes nothing, and failed writes can be retried', async ({
  page,
}) => {
  await saveScript(page, 'Script')
  await createFolder(page, 'Favorites')
  await page.getByRole('button', { name: 'In Favorites', exact: true }).click()
  await page.getByRole('button', { name: 'Create folder and move' }).click()
  await expect(page.getByRole('alert')).toHaveText('Enter a folder name.')
  await page.getByLabel('Folder name', { exact: true }).fill(' FAVORITES ')
  await page.getByRole('button', { name: 'Create folder and move' }).click()
  await expect(page.getByRole('alert')).toHaveText(
    'A folder with this name already exists.',
  )
  await page.getByLabel('Folder name', { exact: true }).fill('Canceled')
  await page.getByRole('button', { name: 'Cancel', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'In Favorites', exact: true }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'In Favorites', exact: true }).click()
  await page.evaluate(() => {
    const put = IDBObjectStore.prototype.put
    IDBObjectStore.prototype.put = function (...args) {
      if (this.name === 'metadata') {
        IDBObjectStore.prototype.put = put
        throw new DOMException('Storage full', 'QuotaExceededError')
      }
      return put.apply(this, args)
    }
  })
  await page.getByRole('button', { name: 'No folder', exact: true }).click()
  await expect(page.getByRole('alert')).toBeVisible()
  await page.getByRole('button', { name: 'Cancel', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'In Favorites', exact: true }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'In Favorites', exact: true }).click()
  await page.getByRole('button', { name: 'No folder', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Folder', exact: true }),
  ).toBeVisible()
  await page.goto('/')
  await expect(
    page.getByRole('region', { name: 'Favorites', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('region', { name: 'Canceled', exact: true }),
  ).toHaveCount(0)
})
