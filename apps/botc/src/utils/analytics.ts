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
 * Send a pageview event to Google Analytics
 * This should be called on route changes in SPAs
 */
export function sendPageview(url: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-F6EHG1F8KP', {
      page_path: url,
    })
  }
}

/**
 * Send a custom event to Google Analytics
 */
export function sendEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams)
  }
}

/**
 * Initialize Google Analytics
 * Call this once when the app starts
 */
export function initAnalytics() {
  // Send initial pageview
  sendPageview(window.location.pathname + window.location.search)
}
