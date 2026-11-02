import { readFileSync } from 'node:fs'
import { test, expect } from '@playwright/test'

test.describe('Download PDF', () => {
  test('should download the script in the pages the print feature uses', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Trouble Brewing' }).click()
    await expect(page.getByText('Townsfolk').first()).toBeVisible({
      timeout: 10000,
    })

    const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
    await page.getByRole('button', { name: 'Download PDF' }).click()
    const download = await downloadPromise

    expect(download.suggestedFilename()).toBe('Trouble Brewing.pdf')

    const file = readFileSync(await download.path())
    expect(file.subarray(0, 5).toString()).toBe('%PDF-')

    // Roles, travellers and player counts, first night, other nights
    const pages = file.toString('latin1').match(/\/Type \/Page\b/g)
    expect(pages).toHaveLength(4)
  })

  test('should name the file after an unsaved rename', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Trouble Brewing' }).click()
    const heading = page.locator('.editable-heading')
    await expect(heading).toHaveText('Trouble Brewing', { timeout: 10000 })
    await heading.fill('Renamed Script')
    await heading.blur()

    const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
    await page.getByRole('button', { name: 'Download PDF' }).click()

    expect((await downloadPromise).suggestedFilename()).toBe(
      'Renamed Script.pdf',
    )
  })

  test('should cope with custom roles, homebrew rules and jinxes', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Paste/ }).first().click()
    await page.locator('textarea').fill(
      JSON.stringify([
        {
          id: '_meta',
          name: 'Awkward Script',
          bootlegger: [`See https://example.com/${'long-path/'.repeat(12)}`],
        },
        'alchemist',
        'boffin',
        'spy',
        'imp',
        // No image at all, and an image that cannot be fetched
        {
          id: 'noimage',
          name: 'No Image',
          team: 'townsfolk',
          ability: 'Hm.',
          firstNight: 30,
        },
        {
          id: 'badimage',
          name: 'Bad Image',
          team: 'outsider',
          ability: 'Hm.',
          image: 'https://invalid.invalid/a.png',
          firstNight: 31,
        },
      ]),
    )
    await page.locator('[role=dialog] button').last().click()
    await expect(page.getByText('No Image').first()).toBeVisible({
      timeout: 10000,
    })

    const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
    await page.getByRole('button', { name: 'Download PDF' }).click()
    const download = await downloadPromise

    const file = readFileSync(await download.path())
    expect(file.toString('latin1').match(/\/Type \/Page\b/g)).toHaveLength(4)
  })
})
