import type { Page } from '@playwright/test'
import type { MetaOverrides } from '../../src/types'
import { getScriptKey } from '../../src/stores/scriptModificationHelpers'

export function scriptUrl(script: unknown) {
  const encoded = Buffer.from(JSON.stringify(script), 'utf-8').toString(
    'base64',
  )
  return `/?script=${encodeURIComponent(encoded)}`
}

/** Seed once: subsequent reloads must read what the app actually persisted. */
export async function openScript(
  page: Page,
  script: unknown,
  metaOverrides?: MetaOverrides,
) {
  const url = scriptUrl(script)
  if (metaOverrides) {
    await page.addInitScript(
      ({ scriptKey, metaOverrides }) => {
        if (sessionStorage.getItem('e2e-script-seeded')) return
        sessionStorage.setItem('e2e-script-seeded', 'true')
        sessionStorage.setItem(
          'botc-script-modifications',
          JSON.stringify({
            state: { scriptKey, metaOverrides },
            version: 0,
          }),
        )
      },
      { scriptKey: getScriptKey(url.slice(1)), metaOverrides },
    )
  }
  await page.goto(url)
}
