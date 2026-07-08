import { test, expect } from '@playwright/test'

// localStorage key persisting the user's choice — see src/utils/consent.ts.
const CONSENT_KEY = 'botc-cookie-consent'

test.describe('Cookie consent', () => {
  test('should show the consent banner on first visit', async ({ page }) => {
    await page.goto('/')

    // The banner is a labelled dialog with the app-themed heading.
    const banner = page.getByRole('dialog', { name: 'Cookie consent' })
    await expect(banner).toBeVisible()
    await expect(
      banner.getByRole('heading', { name: 'Bluffing with Cookies' }),
    ).toBeVisible()

    // Both choices are offered with a link to the full privacy notice.
    await expect(banner.getByRole('button', { name: 'Reject' })).toBeVisible()
    await expect(banner.getByRole('button', { name: 'Allow' })).toBeVisible()
    await expect(
      banner.getByRole('link', { name: 'Privacy & cookies' }),
    ).toBeVisible()
  })

  test('should grant consent, hide the banner, and persist the choice', async ({
    page,
  }) => {
    await page.goto('/')

    const banner = page.getByRole('dialog', { name: 'Cookie consent' })
    await banner.getByRole('button', { name: 'Allow' }).click()

    // Banner is dismissed and the choice is stored as "granted".
    await expect(banner).toBeHidden()
    await expect
      .poll(() => page.evaluate((key) => localStorage.getItem(key), CONSENT_KEY))
      .toBe('granted')
  })

  test('should reject consent, hide the banner, and persist the choice', async ({
    page,
  }) => {
    await page.goto('/')

    const banner = page.getByRole('dialog', { name: 'Cookie consent' })
    await banner.getByRole('button', { name: 'Reject' }).click()

    // Banner is dismissed and the choice is stored as "denied".
    await expect(banner).toBeHidden()
    await expect
      .poll(() => page.evaluate((key) => localStorage.getItem(key), CONSENT_KEY))
      .toBe('denied')
  })

  test('should not prompt again once a choice has been stored', async ({
    page,
  }) => {
    // Seed a prior choice before any app script runs.
    await page.addInitScript((key) => {
      localStorage.setItem(key, 'granted')
    }, CONSENT_KEY)

    await page.goto('/')

    // Give the app a moment to mount; the banner must stay hidden.
    await expect(
      page.getByRole('button', { name: /^(Load from URL|URL)$/ }),
    ).toBeVisible()
    await expect(
      page.getByRole('dialog', { name: 'Cookie consent' }),
    ).toBeHidden()
  })

  test('should reopen the banner from the privacy page', async ({ page }) => {
    // Start with a stored choice so the banner is not shown automatically.
    await page.addInitScript((key) => {
      localStorage.setItem(key, 'denied')
    }, CONSENT_KEY)

    await page.goto('/privacy')

    const banner = page.getByRole('dialog', { name: 'Cookie consent' })
    await expect(banner).toBeHidden()

    // "Change cookie settings" re-opens the banner so the choice can be revised
    // (GDPR Art. 7(3): withdrawing consent must be as easy as giving it).
    await page.getByRole('button', { name: 'Change cookie settings' }).click()
    await expect(banner).toBeVisible()
  })
})
