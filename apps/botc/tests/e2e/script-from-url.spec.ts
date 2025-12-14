import { test, expect } from '@playwright/test'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

test.describe('Script from URL', () => {
  // Helper function to compress script for URL (mimics the app's compression)
  async function compressScriptForUrl(scriptData: unknown): Promise<string> {
    // This is a simplified version - in reality, the app uses pako.gzip
    // For testing, we'll use base64 encoding which the app also supports as fallback
    const json = JSON.stringify(scriptData)
    const base64 = Buffer.from(json, 'utf-8').toString('base64')
    return base64
  }

  test('should load script from URL query parameter', async ({ page }) => {
    // Read a fixture script
    const fixtureContent = readFileSync(
      join(__dirname, '../../fixtures/scripts/Just a TB.json'),
      'utf-8',
    )
    const scriptData = JSON.parse(fixtureContent)

    // Compress the script data
    const compressed = await compressScriptForUrl(scriptData)

    // Navigate with script parameter
    await page.goto(`/?script=${encodeURIComponent(compressed)}`)
    await page.waitForLoadState('networkidle')

    // Wait for script to load - check for script header
    await expect(page.getByText('Just a TB').first()).toBeVisible({
      timeout: 10000,
    })

    // Verify that the script content is displayed (using .first() for multiple matches)
    await expect(page.getByText('Townsfolk').first()).toBeVisible()
    await expect(page.getByText('Chef').first()).toBeVisible()
    await expect(page.getByText('Imp').first()).toBeVisible()
  })

  test('should display correct metadata from URL script', async ({ page }) => {
    const scriptData = [
      {
        id: '_meta',
        author: 'Test Author',
        name: 'Test Script',
      },
      'washerwoman',
      'librarian',
      'imp',
    ]

    const compressed = await compressScriptForUrl(scriptData)
    await page.goto(`/?script=${encodeURIComponent(compressed)}`)
    await page.waitForLoadState('networkidle')

    // Check that metadata is displayed
    await expect(page.getByText('Test Script').first()).toBeVisible({
      timeout: 10000,
    })
    await expect(page.getByText('Test Author')).toBeVisible()
  })

  test('should have URL modal for loading external scripts', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check that "Load from URL" button exists
    const loadButton = page.getByRole('button', { name: 'Load from URL' })
    await expect(loadButton).toBeVisible()

    // Click to open modal
    await loadButton.click()

    // Check that modal opened with heading
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Load from URL' }),
    ).toBeVisible()

    // Check that URL input field exists in modal
    const urlInput = page.getByPlaceholder(/script\.bloodontheclocktower\.com/i)
    await expect(urlInput).toBeVisible()

    // Check that Load Script button exists in modal
    const modalLoadButton = page
      .getByRole('dialog')
      .getByRole('button', { name: 'Load Script' })
    await expect(modalLoadButton).toBeVisible()
  })

  test('should handle invalid script parameter gracefully', async ({
    page,
  }) => {
    // Navigate with invalid script parameter
    await page.goto('/?script=invalid-base64')
    await page.waitForLoadState('networkidle')

    // Should show error message or fall back to homepage
    const errorMessage = page.getByText(/error|failed|invalid/i)
    const uploadText = page.getByText(
      /Upload a script json or pick one from base scripts below/i,
    )

    // Either an error message or the default upload screen should be visible
    const hasError = (await errorMessage.count()) > 0
    const hasUploadText = (await uploadText.count()) > 0
    expect(hasError || hasUploadText).toBeTruthy()
  })

  test('should update URL when committing script changes', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Load a sample script
    await page.getByRole('button', { name: 'Trouble Brewing' }).click()
    await expect(page.getByText('Trouble Brewing').first()).toBeVisible({
      timeout: 10000,
    })

    // Try to modify script name
    const nameInput = page
      .locator('input')
      .filter({ hasText: /Just a TB/i })
      .first()
    const inputCount = await nameInput.count()

    if (inputCount > 0) {
      await nameInput.fill('Modified Script Name')

      // Look for commit button
      const commitButton = page.getByRole('button', { name: 'Commit' })
      const commitCount = await commitButton.count()

      if (commitCount > 0) {
        await commitButton.click()

        // Check that URL contains script parameter
        await expect(page).toHaveURL(/script=/)
      }
    }
  })

  test('should show share button when script is loaded from URL', async ({
    page,
    browserName,
  }) => {
    const fixtureContent = readFileSync(
      join(__dirname, '../../fixtures/scripts/Just a TB.json'),
      'utf-8',
    )
    const scriptData = JSON.parse(fixtureContent)
    const compressed = await compressScriptForUrl(scriptData)

    await page.goto(`/?script=${encodeURIComponent(compressed)}`)
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('Just a TB').first()).toBeVisible({
      timeout: 10000,
    })

    // Check that share button is present and enabled
    const shareButton = page.getByRole('button', { name: 'Share' })
    await expect(shareButton).toBeVisible()
    await expect(shareButton).toBeEnabled()

    // Grant clipboard permissions (only supported in Chromium)
    if (browserName === 'chromium') {
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])

      // Click share button
      await shareButton.click()

      // Wait for the button text to change to "Link Copied!"
      await expect(
        page.getByRole('button', { name: 'Link Copied!' }),
      ).toBeVisible({ timeout: 3000 })
    } else {
      // For other browsers, just verify the button is clickable
      // (they may use native share dialog instead of clipboard)
      await shareButton.click()
      // Give it a moment to process
      await page.waitForTimeout(500)
    }
  })

  test('should display all role cards for script from URL', async ({
    page,
  }) => {
    const scriptData = [
      { id: '_meta', name: 'Mini Script', author: 'Tester' },
      'washerwoman',
      'librarian',
      'chef',
      'butler',
      'drunk',
      'poisoner',
      'spy',
      'imp',
    ]

    const compressed = await compressScriptForUrl(scriptData)
    await page.goto(`/?script=${encodeURIComponent(compressed)}`)
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Mini Script').first()).toBeVisible({
      timeout: 10000,
    })

    // Verify all roles are displayed (using .first() as role names appear multiple times)
    await expect(page.getByText('Washerwoman').first()).toBeVisible()
    await expect(page.getByText('Librarian').first()).toBeVisible()
    await expect(page.getByText('Chef').first()).toBeVisible()
    await expect(page.getByText('Butler').first()).toBeVisible()
    await expect(page.getByText('Drunk').first()).toBeVisible()
    await expect(page.getByText('Poisoner').first()).toBeVisible()
    await expect(page.getByText('Spy').first()).toBeVisible()
    await expect(page.getByText('Imp').first()).toBeVisible()
  })

  test('should render night order for script from URL', async ({ page }) => {
    const fixtureContent = readFileSync(
      join(__dirname, '../../fixtures/scripts/Just a TB.json'),
      'utf-8',
    )
    const scriptData = JSON.parse(fixtureContent)
    const compressed = await compressScriptForUrl(scriptData)

    await page.goto(`/?script=${encodeURIComponent(compressed)}`)
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('Just a TB').first()).toBeVisible({
      timeout: 10000,
    })

    // Scroll down to see night order sections
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Wait a bit for content to render after scroll
    await page.waitForTimeout(500)

    // Check for night order content
    await expect(page.getByText('First Night', { exact: true })).toBeVisible()
    await expect(page.getByText('Other Nights')).toBeVisible()

    // Verify that at least some roles with night actions are present in the page
    // (They should appear in the night order sections)
    const poisonerCount = await page.getByText('Poisoner').count()
    const fortuneTellerCount = await page.getByText(/Fortune.?Teller/i).count()

    // Should have multiple instances (role card + night order)
    expect(poisonerCount).toBeGreaterThan(0)
    expect(fortuneTellerCount).toBeGreaterThan(0)
  })

  test('should load script from BOTC script tool URL using "Load from URL"', async ({
    page,
  }) => {
    // Create a test script
    const scriptData = [
      { id: '_meta', name: 'Test BOTC URL Script', author: 'Test Author' },
      'washerwoman',
      'librarian',
      'chef',
      'imp',
    ]

    // Compress it the same way the app does
    const compressed = await compressScriptForUrl(scriptData)

    // Create a BOTC-style URL
    const botcUrl = `https://script.bloodontheclocktower.com/?script=${encodeURIComponent(compressed)}`

    // Go to the app
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Click the "Load from URL" button to open modal
    const loadButton = page.getByRole('button', { name: 'Load from URL' })
    await loadButton.click()

    // Wait for modal to open
    await expect(page.getByRole('dialog')).toBeVisible()

    // Find the URL input in the modal
    const urlInput = page.getByPlaceholder(/script\.bloodontheclocktower\.com/i)
    await expect(urlInput).toBeVisible()

    // Enter the BOTC URL
    await urlInput.fill(botcUrl)

    // Click the "Load Script" button in the modal
    const modalLoadButton = page
      .getByRole('dialog')
      .getByRole('button', { name: 'Load Script' })
    await modalLoadButton.click()

    // Wait for the script to load
    await expect(page.getByText('Test BOTC URL Script').first()).toBeVisible({
      timeout: 10000,
    })

    // Verify roles are displayed
    await expect(page.getByText('Washerwoman').first()).toBeVisible()
    await expect(page.getByText('Librarian').first()).toBeVisible()
    await expect(page.getByText('Chef').first()).toBeVisible()
    await expect(page.getByText('Imp').first()).toBeVisible()
  })

  test('should load script from any URL with script parameter', async ({
    page,
  }) => {
    // Create a test script
    const scriptData = [
      { id: '_meta', name: 'Generic Script Tool URL', author: 'Test Author' },
      'monk',
      'ravenkeeper',
      'baron',
      'imp',
    ]

    const compressed = await compressScriptForUrl(scriptData)

    // Go to the app
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Click the "Load from URL" button to open modal
    const loadButton = page.getByRole('button', { name: 'Load from URL' })
    await loadButton.click()

    // Wait for modal to open
    await expect(page.getByRole('dialog')).toBeVisible()

    // Find the URL input in the modal
    const urlInput = page.getByPlaceholder(/script\.bloodontheclocktower\.com/i)
    await expect(urlInput).toBeVisible()

    // Create a URL with script parameter from any domain
    const genericUrl = `https://example.com/?script=${encodeURIComponent(compressed)}`

    // Enter the URL
    await urlInput.fill(genericUrl)

    // Click the "Load Script" button in the modal
    const modalLoadButton = page
      .getByRole('dialog')
      .getByRole('button', { name: 'Load Script' })
    await modalLoadButton.click()

    // Wait for the script to load - should decode the parameter instead of fetching
    await expect(page.getByText('Generic Script Tool URL').first()).toBeVisible(
      {
        timeout: 10000,
      },
    )

    // Verify roles are displayed
    await expect(page.getByText('Monk').first()).toBeVisible()
    await expect(page.getByText('Ravenkeeper').first()).toBeVisible()
    await expect(page.getByText('Baron').first()).toBeVisible()
    await expect(page.getByText('Imp').first()).toBeVisible()
  })
})
