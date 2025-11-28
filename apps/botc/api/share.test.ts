/**
 * Tests for the Share (Open Graph) API endpoint
 *
 * This endpoint generates Open Graph meta tags for social media link previews
 * when scripts are shared via the /api/share route. It detects crawlers and
 * serves them HTML with appropriate meta tags, while redirecting regular
 * browsers to the SPA.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import handler from './share'
import { decompressFromUrl, compressForUrl } from '../src/utils/urlCompression'

// Helper to create mock request
function createMockRequest(
  query: Record<string, string | string[]>,
  userAgent?: string,
  host = 'botc.app',
): Partial<VercelRequest> {
  return {
    query,
    headers: {
      'user-agent': userAgent,
      host,
    },
  }
}

// Helper to create mock response
function createMockResponse() {
  const res: Partial<VercelResponse> = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    redirect: vi.fn().mockReturnThis(),
    setHeader: vi.fn().mockReturnThis(),
  }
  return res as VercelResponse
}

describe('Share API Handler', () => {
  describe('Sample Script Parameter', () => {
    // Create a valid sample script and encode it
    let SAMPLE_SCRIPT_PARAM: string

    beforeEach(async () => {
      const sampleScript = [
        {
          id: '_meta',
          name: 'Trouble Brewing',
          author: 'The Pandemonium Institute',
        },
        { id: 'washerwoman', team: 'townsfolk' },
        { id: 'librarian', team: 'townsfolk' },
        { id: 'investigator', team: 'townsfolk' },
        { id: 'chef', team: 'townsfolk' },
        { id: 'empath', team: 'townsfolk' },
        { id: 'fortuneteller', team: 'townsfolk' },
        { id: 'undertaker', team: 'townsfolk' },
        { id: 'monk', team: 'townsfolk' },
        { id: 'ravenkeeper', team: 'townsfolk' },
        { id: 'virgin', team: 'townsfolk' },
        { id: 'slayer', team: 'townsfolk' },
        { id: 'soldier', team: 'townsfolk' },
        { id: 'mayor', team: 'townsfolk' },
        { id: 'butler', team: 'outsider' },
        { id: 'drunk', team: 'outsider' },
        { id: 'recluse', team: 'outsider' },
        { id: 'saint', team: 'outsider' },
        { id: 'poisoner', team: 'minion' },
        { id: 'spy', team: 'minion' },
        { id: 'scarletwoman', team: 'minion' },
        { id: 'baron', team: 'minion' },
        { id: 'imp', team: 'demon' },
      ]

      SAMPLE_SCRIPT_PARAM = await compressForUrl(JSON.stringify(sampleScript))
    })

    it('should decode the sample script parameter correctly', async () => {
      // Decompress the parameter
      const decompressed = await decompressFromUrl(SAMPLE_SCRIPT_PARAM)
      const parsed = JSON.parse(decompressed)

      // Should be a valid array
      expect(Array.isArray(parsed)).toBe(true)

      // Should contain a _meta object
      const meta = parsed.find((item: any) => item?.id === '_meta')
      expect(meta).toBeDefined()
      expect(meta.name).toBe('Trouble Brewing')

      // Should have roles
      const roles = parsed.filter(
        (item: any) => item !== null && item?.id !== '_meta',
      )
      expect(roles.length).toBe(22) // 13 townsfolk + 4 outsiders + 4 minions + 1 demon
    })

    it('should generate OG HTML for the sample script when accessed by crawler', async () => {
      const req = createMockRequest(
        { script: SAMPLE_SCRIPT_PARAM },
        'facebookexternalhit/1.1',
      )
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'text/html; charset=utf-8',
      )
      expect(res.send).toHaveBeenCalled()

      // Get the HTML that was sent
      const html = (res.send as any).mock.calls[0][0]

      // Should contain Open Graph meta tags
      expect(html).toContain('og:title')
      expect(html).toContain('og:description')
      expect(html).toContain('og:image')
      expect(html).toContain('Trouble Brewing')
      expect(html).toContain('The Pandemonium Institute')
    })

    it('should redirect non-crawlers to the main app', async () => {
      const req = createMockRequest(
        { script: SAMPLE_SCRIPT_PARAM },
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0',
      )
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      expect(res.redirect).toHaveBeenCalledWith(
        302,
        expect.stringContaining('/?script='),
      )
    })
  })

  describe('Crawler Detection', () => {
    const crawlers = [
      'facebookexternalhit',
      'Facebot',
      'Twitterbot',
      'LinkedInBot',
      'WhatsApp',
      'Discordbot',
      'Slackbot',
    ]

    it.each(crawlers)('should detect %s as a crawler', async (crawler) => {
      const req = createMockRequest({}, crawler)
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      // Should serve HTML, not redirect
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalled()
      expect(res.redirect).not.toHaveBeenCalled()
    })

    it('should not detect regular browsers as crawlers', async () => {
      const browsers = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko Firefox/89.0',
      ]

      for (const userAgent of browsers) {
        const req = createMockRequest({}, userAgent)
        const res = createMockResponse()

        await handler(req as VercelRequest, res)

        // Should redirect, not serve HTML
        expect(res.redirect).toHaveBeenCalled()
      }
    })
  })

  describe('Script Parsing', () => {
    it('should generate custom OG tags for valid scripts', async () => {
      const script = [
        {
          id: '_meta',
          name: 'Test Script',
          author: 'Test Author',
        },
        { id: 'washerwoman', team: 'townsfolk' },
        { id: 'librarian', team: 'townsfolk' },
        { id: 'imp', team: 'demon' },
      ]

      const encoded = await compressForUrl(JSON.stringify(script))

      const req = createMockRequest({ script: encoded }, 'Twitterbot')
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      const html = (res.send as any).mock.calls[0][0]

      expect(html).toContain('Test Script')
      expect(html).toContain('Test Author')
      expect(html).toContain('2 Townsfolk')
      expect(html).toContain('1 Demon')
    })

    it('should use default OG tags for invalid scripts', async () => {
      const req = createMockRequest(
        { script: 'invalid-base64-data!!!' },
        'Twitterbot',
      )
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      const html = (res.send as any).mock.calls[0][0]

      expect(html).toContain('Blood on the Clocktower Script Tool')
      expect(html).toContain(
        '<!-- Error: Failed to parse script parameter -->',
      )
    })

    it('should use default OG tags when no script parameter provided', async () => {
      const req = createMockRequest({}, 'Twitterbot')
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      const html = (res.send as any).mock.calls[0][0]

      expect(html).toContain('Blood on the Clocktower Script Tool')
      expect(html).toContain('<!-- Error: No script parameter provided -->')
    })
  })

  describe('Role Counting', () => {
    it('should correctly count roles by team', async () => {
      const script = [
        { id: '_meta', name: 'Role Count Test' },
        { id: 'role1', team: 'townsfolk' },
        { id: 'role2', team: 'townsfolk' },
        { id: 'role3', team: 'townsfolk' },
        { id: 'role4', team: 'outsider' },
        { id: 'role5', team: 'outsider' },
        { id: 'role6', team: 'minion' },
        { id: 'role7', team: 'minion' },
        { id: 'role8', team: 'minion' },
        { id: 'role9', team: 'demon' },
        { id: 'role10', team: 'traveler' },
      ]

      const encoded = await compressForUrl(JSON.stringify(script))

      const req = createMockRequest({ script: encoded }, 'Twitterbot')
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      const html = (res.send as any).mock.calls[0][0]

      expect(html).toContain('3 Townsfolk')
      expect(html).toContain('2 Outsiders')
      expect(html).toContain('3 Minions')
      expect(html).toContain('1 Demon')
      expect(html).toContain('1 Traveler')
    })

    it('should handle singular vs plural correctly', async () => {
      const script = [
        { id: '_meta', name: 'Singular Test' },
        { id: 'role1', team: 'outsider' },
        { id: 'role2', team: 'minion' },
        { id: 'role3', team: 'demon' },
      ]

      const encoded = await compressForUrl(JSON.stringify(script))

      const req = createMockRequest({ script: encoded }, 'Twitterbot')
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      const html = (res.send as any).mock.calls[0][0]

      expect(html).toContain('1 Outsider')
      expect(html).toContain('1 Minion')
      expect(html).toContain('1 Demon')
      // Ensure not using plurals
      expect(html).not.toContain('1 Outsiders')
      expect(html).not.toContain('1 Minions')
      expect(html).not.toContain('1 Demons')
    })
  })

  describe('Security', () => {
    it('should escape HTML in script names', async () => {
      const script = [
        {
          id: '_meta',
          name: '<script>alert("xss")</script>',
          author: '<img src=x onerror=alert(1)>',
        },
        { id: 'role1', team: 'townsfolk' },
      ]

      const encoded = await compressForUrl(JSON.stringify(script))

      const req = createMockRequest({ script: encoded }, 'Twitterbot')
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      const html = (res.send as any).mock.calls[0][0]

      // Should be escaped
      expect(html).not.toContain('<script>alert')
      expect(html).not.toContain('<img src=x')
      expect(html).toContain('&lt;script&gt;')
      expect(html).toContain('&lt;img')
    })
  })

  describe('Caching', () => {
    it('should set cache headers for successful responses', async () => {
      const req = createMockRequest({}, 'Twitterbot')
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      expect(res.setHeader).toHaveBeenCalledWith(
        'Cache-Control',
        'public, max-age=2592000, immutable',
      )
    })
  })

  describe('URL Construction', () => {
    it('should construct correct URLs with https for production', async () => {
      const req = createMockRequest(
        {}, // No script parameter needed for URL construction test
        'Twitterbot',
        'botc.app',
      )
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      const html = (res.send as any).mock.calls[0][0]
      expect(html).toContain('https://botc.app')
    })

    it('should construct correct URLs with http for localhost', async () => {
      const req = createMockRequest(
        {}, // No script parameter needed for URL construction test
        'Twitterbot',
        'localhost:3000',
      )
      const res = createMockResponse()

      await handler(req as VercelRequest, res)

      const html = (res.send as any).mock.calls[0][0]
      expect(html).toContain('http://localhost:3000')
    })
  })
})


