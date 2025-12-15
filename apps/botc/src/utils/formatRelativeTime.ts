/**
 * Format a timestamp as relative time (e.g., "2 hours ago", "just now")
 * Uses Intl.RelativeTimeFormat for localized output
 *
 * @param timestamp - ISO 8601 timestamp string
 * @param locale - BCP 47 language tag (e.g., 'en', 'de', 'cs')
 * @returns Localized relative time string
 */
export function formatRelativeTime(
  timestamp: string,
  locale: string = 'en',
): string {
  const now = new Date()
  const past = new Date(timestamp)
  const diffMs = now.getTime() - past.getTime()

  // Convert to seconds
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

    // Choose appropriate unit
    if (diffSeconds < 10) {
      return rtf.format(0, 'second') // "just now"
    } else if (diffSeconds < 60) {
      return rtf.format(-diffSeconds, 'second')
    } else if (diffMinutes < 60) {
      return rtf.format(-diffMinutes, 'minute')
    } else if (diffHours < 24) {
      return rtf.format(-diffHours, 'hour')
    } else if (diffDays < 7) {
      return rtf.format(-diffDays, 'day')
    } else if (diffWeeks < 4) {
      return rtf.format(-diffWeeks, 'week')
    } else if (diffMonths < 12) {
      return rtf.format(-diffMonths, 'month')
    } else {
      return rtf.format(-diffYears, 'year')
    }
  } catch (error) {
    // Fallback for unsupported locales or browsers
    console.warn('RelativeTimeFormat not supported:', error)
    return new Date(timestamp).toLocaleDateString(locale)
  }
}
