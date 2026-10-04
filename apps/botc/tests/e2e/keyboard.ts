import type { Page } from '@playwright/test'

/** Move to a line edge in a focused editor using the host platform's shortcut. */
export async function moveCursorToLineEdge(page: Page, edge: 'start' | 'end') {
  const key =
    process.platform === 'darwin'
      ? edge === 'start'
        ? 'Meta+ArrowLeft'
        : 'Meta+ArrowRight'
      : edge === 'start'
        ? 'Home'
        : 'End'

  await page.keyboard.press(key)
}

/** Include buttons in WebKit's keyboard navigation on macOS. */
export async function tabToNextControl(
  page: Page,
  browserName: 'chromium' | 'firefox' | 'webkit',
) {
  await page.keyboard.press(
    process.platform === 'darwin' && browserName === 'webkit'
      ? 'Alt+Tab'
      : 'Tab',
  )
}
