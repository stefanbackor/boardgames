/**
 * Cookie consent state for Google Analytics (Consent Mode v2).
 *
 * gtag.js is loaded in index.html with all storage denied by default. The user
 * grants or refuses analytics_storage via the consent banner; the choice is
 * persisted here and re-applied on load (see index.html) so it survives reloads.
 */

export type ConsentChoice = 'granted' | 'denied'

/** localStorage key — kept in sync with the inline bootstrap in index.html. */
export const CONSENT_KEY = 'botc-cookie-consent'

/**
 * Fired to re-open the consent banner so a user can review or withdraw their
 * choice (GDPR Art. 7(3): withdrawing must be as easy as giving). Dispatched by
 * the footer "Cookie settings" control and the privacy page.
 */
export const CONSENT_REOPEN_EVENT = 'botc:open-consent'

/** Read the persisted choice, or null if the user hasn't decided yet. */
export function getStoredConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

/**
 * Persist the user's choice and push it to Google Consent Mode.
 * Only analytics_storage is managed — this app serves no ads.
 */
export function setConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_KEY, choice)
  } catch {
    /* localStorage unavailable — the choice simply won't persist */
  }

  window.gtag?.('consent', 'update', {
    analytics_storage: choice === 'granted' ? 'granted' : 'denied',
  })
}

/** Re-open the consent banner so the user can review or change their choice. */
export function reopenConsent(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))
  }
}
