import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should render homepage with upload controls', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check that the main upload text is present (with correct translation key)
    await expect(
      page.getByText(
        /Upload a script json or pick one from base scripts below to get started/i,
      ),
    ).toBeVisible()

    // Check that file upload label is present (it's a label, not a button role)
    await expect(page.getByText('Choose JSON File')).toBeVisible()

    // Check that Load from URL button is present
    await expect(page.getByRole('button', { name: 'Load from URL' })).toBeVisible()

    // Check that Paste JSON button is present
    await expect(page.getByRole('button', { name: 'Paste JSON' })).toBeVisible()

    // Check that sample script buttons are present
    await expect(
      page.getByRole('button', { name: 'Trouble Brewing' }),
    ).toBeVisible()
  })

  test('should have language selector', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check for language selector - it's a combobox button (the role from debug output)
    const languageSelector = page.getByRole('combobox')
    await expect(languageSelector).toBeVisible()

    // Verify it shows a language option
    await expect(languageSelector).toHaveText(/English|Čeština/)
  })

  test('should display footer with attribution', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check that footer is present with trademark text (using .first() for multiple matches)
    await expect(
      page.getByText(/Steven Medway and The Pandemonium Institute/i).first(),
    ).toBeVisible()

    // Check for at least one bloodontheclocktower.com link (mobile may show fewer links)
    const botcLink = page
      .getByRole('link')
      .filter({ hasText: 'Blood on the Clocktower' })
      .first()
    await expect(botcLink).toBeVisible()
  })

  test('should load sample script when clicked', async ({ page }) => {
    await page.goto('/')

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle')

    // Click on "Trouble Brewing" sample script button
    await page.getByRole('button', { name: 'Trouble Brewing' }).click()

    // Wait for script to load - check for script header using a more specific text selector
    await expect(page.getByText('Trouble Brewing').first()).toBeVisible({
      timeout: 10000,
    })

    // Check that team sections are rendered (using .first() as these appear multiple times)
    await expect(page.getByText('Townsfolk').first()).toBeVisible()
    await expect(page.getByText('Outsiders').first()).toBeVisible()
    await expect(page.getByText('Minions').first()).toBeVisible()
    await expect(page.getByText('Demons').first()).toBeVisible()

    // Check that specific roles from the script are present (Trouble Brewing roles)
    // Using .first() as role names appear multiple times (role card + night order)
    await expect(page.getByText('Washerwoman').first()).toBeVisible()
    await expect(page.getByText('Imp').first()).toBeVisible()
  })

  test('should display print and share buttons when script is loaded', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Load a sample script
    await page.getByRole('button', { name: 'Trouble Brewing' }).click()

    // Wait for script to load
    await expect(page.getByText('Trouble Brewing').first()).toBeVisible({
      timeout: 10000,
    })

    // Check for print button
    await expect(page.getByRole('button', { name: 'Print' })).toBeVisible()

    // Check for share button (not disabled after script loads)
    await expect(page.getByRole('button', { name: 'Share' })).toBeEnabled()
  })

  test('should show night order sections for loaded script', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Load a sample script
    await page.getByRole('button', { name: 'Trouble Brewing' }).click()

    // Wait for script to load
    await expect(page.getByText('Trouble Brewing').first()).toBeVisible({
      timeout: 10000,
    })

    // Check for night order sections (these may be further down the page)
    await expect(page.getByText('First Night')).toBeVisible()
    await expect(page.getByText('Other Nights')).toBeVisible()
  })

  test('should translate "First Night" label when language changes to Czech', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Load a sample script to ensure the night sections are rendered
    await page.getByRole('button', { name: 'Trouble Brewing' }).click()
    await expect(page.getByText('Trouble Brewing').first()).toBeVisible({
      timeout: 10000,
    })

    // Verify the English label is shown by default
    await expect(page.getByText('First Night')).toBeVisible()

    // Change language to Czech via the header language selector
    const languageSelector = page.getByRole('combobox')
    await languageSelector.click()
    await page.getByText('Čeština').click()

    // After language change, the "First Night" label should be translated
    await expect(page.getByText('První noc')).toBeVisible()
    await expect(page.getByText('First Night')).toHaveCount(0)
  })
})
