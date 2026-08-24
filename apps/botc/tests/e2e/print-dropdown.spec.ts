import { test, expect, type Page } from '@playwright/test'

// Sections are hidden for print by toggling these classes — see ScriptContent.tsx.
const HIDE_CLASSES = [
  'print-hide-roles',
  'print-hide-tables',
  'print-hide-first-night',
  'print-hide-other-nights',
]

async function hiddenSections(page: Page) {
  return page.evaluate(
    (classes) =>
      classes.filter((c) => document.querySelector(`.${c}`) !== null),
    HIDE_CLASSES,
  )
}

async function loadSampleScript(page: Page) {
  // The print dialog would block the run, so swallow it before the app loads.
  await page.addInitScript(() => {
    window.print = () => {}
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Trouble Brewing' }).click()
  await expect(page.getByText('Townsfolk').first()).toBeVisible({
    timeout: 10000,
  })
}

async function openPrintMenu(page: Page) {
  await page.getByRole('button', { name: /Print/i }).first().click()
  await expect(page.getByRole('menuitem').first()).toBeVisible()
}

test.describe('Print dropdown', () => {
  test('should offer "All pages" above the single-section options', async ({
    page,
  }) => {
    await loadSampleScript(page)
    await openPrintMenu(page)

    await expect(page.getByRole('menuitem')).toHaveText([
      'All pages',
      'Roles',
      'Travellers, Loric, Fables, Player Distribution',
      'First Night',
      'Other Nights',
    ])
  })

  test('should keep every section when printing all pages', async ({
    page,
  }) => {
    await loadSampleScript(page)
    await openPrintMenu(page)
    await page.getByRole('menuitem', { name: 'All pages', exact: true }).click()

    expect(await hiddenSections(page)).toEqual([])
  })

  test('should print a single section on its own', async ({ page }) => {
    await loadSampleScript(page)
    await openPrintMenu(page)
    await page
      .getByRole('menuitem', { name: 'First Night', exact: true })
      .click()

    expect(await hiddenSections(page)).toEqual([
      'print-hide-roles',
      'print-hide-tables',
      'print-hide-other-nights',
    ])
  })

  test('should restore every section after a single-section print', async ({
    page,
  }) => {
    await loadSampleScript(page)
    await openPrintMenu(page)
    await page.getByRole('menuitem', { name: 'Roles', exact: true }).click()
    expect(await hiddenSections(page)).toHaveLength(3)

    await openPrintMenu(page)
    await page.getByRole('menuitem', { name: 'All pages', exact: true }).click()
    expect(await hiddenSections(page)).toEqual([])
  })
})
