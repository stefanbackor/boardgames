import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { withoutAnalytics } from './analyticsHtml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const indexHtml = fs.readFileSync(
  path.resolve(__dirname, '../../index.html'),
  'utf-8',
)

describe('withoutAnalytics', () => {
  it('leaves the Google tag out of index.html', () => {
    expect(indexHtml).toContain('googletagmanager.com')

    const html = withoutAnalytics(indexHtml)

    expect(html).not.toContain('googletagmanager.com')
    expect(html).not.toContain('gtag(')
    expect(html).not.toContain('<!-- analytics -->')
  })

  it('keeps the rest of the page', () => {
    const html = withoutAnalytics(indexHtml)

    expect(html).toContain('<title>Blood on the Clocktower Script Tool</title>')
    expect(html).toContain('<link rel="manifest" href="/site.webmanifest" />')
    expect(html).toContain('<div id="root"></div>')
    expect(html).toContain(
      '<script type="module" src="/src/main.tsx"></script>',
    )
  })

  it('fails when the markers are missing', () => {
    expect(() =>
      withoutAnalytics('<html><head></head><body></body></html>'),
    ).toThrow('<!-- analytics -->')
  })
})
