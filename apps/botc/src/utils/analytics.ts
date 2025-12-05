/**
 * Google Analytics utility for SPA tracking
 */

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer?: unknown[]
  }
}

/**
 * Check if analytics should be enabled
 * Disabled in development mode only
 */
function isAnalyticsEnabled(): boolean {
  return !import.meta.env.DEV && typeof window.gtag !== 'undefined'
}

/**
 * Send a pageview event to Google Analytics
 * This should be called on route changes in SPAs
 * Automatically skips tracking in development and CI environments
 */
export function sendPageview(url: string) {
  if (!isAnalyticsEnabled()) {
    if (import.meta.env.DEV) {
      console.log('[Analytics] Skipped pageview (dev mode):', url)
    }
    return
  }

  window.gtag!('config', 'G-F6EHG1F8KP', {
    page_path: url,
  })
}

/**
 * Send a custom event to Google Analytics
 * Automatically skips tracking in development and CI environments
 */
export function sendEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (!isAnalyticsEnabled()) {
    if (import.meta.env.DEV) {
      console.log('[Analytics] Skipped event (dev mode):', eventName, eventParams)
    }
    return
  }

  window.gtag!('event', eventName, eventParams)
}

/**
 * Initialize Google Analytics
 * Call this once when the app starts
 * Automatically skips initialization in development and CI environments
 */
export function initAnalytics() {
  if (!isAnalyticsEnabled()) {
    if (import.meta.env.DEV) {
      console.log('[Analytics] Disabled in development/CI environment')
    }
    return
  }

  // Send initial pageview
  sendPageview(window.location.pathname + window.location.search)
}
