import { describe, it, expect } from 'vitest'
import { getProxiedImageUrl, getImageScale } from './imageUrl'

describe('imageUrl utilities', () => {
  describe('getProxiedImageUrl', () => {
    it('should return undefined for undefined input', () => {
      expect(getProxiedImageUrl(undefined)).toBeUndefined()
    })

    it('should return the same URL if already proxied through wsrv.nl', () => {
      const proxiedUrl = '//wsrv.nl/?url=https://example.com/image.png&h=150&output=webp'
      expect(getProxiedImageUrl(proxiedUrl)).toBe(proxiedUrl)
    })

    it('should proxy a regular URL through wsrv.nl with default height', () => {
      const url = 'https://example.com/image.png'
      const result = getProxiedImageUrl(url)
      expect(result).toContain('//wsrv.nl/')
      expect(result).toContain('h=150')
      expect(result).toContain('output=webp')
      expect(result).toContain(encodeURIComponent(url))
    })

    it('should proxy a regular URL with custom height', () => {
      const url = 'https://example.com/image.png'
      const result = getProxiedImageUrl(url, 300)
      expect(result).toContain('h=300')
    })

    it('should encode URL properly', () => {
      const url = 'https://example.com/image with spaces.png'
      const result = getProxiedImageUrl(url)
      expect(result).toContain(encodeURIComponent(url))
    })
  })

  describe('getImageScale', () => {
    it('should return 1 for undefined input', () => {
      expect(getImageScale(undefined)).toBe(1)
    })

    it('should return 1.3 for wiki.bloodontheclocktower.com URLs', () => {
      const wikiUrl = 'https://wiki.bloodontheclocktower.com/images/thumb/image.png'
      expect(getImageScale(wikiUrl)).toBe(1.3)
    })

    it('should return 1 for non-wiki URLs', () => {
      const regularUrl = 'https://example.com/image.png'
      expect(getImageScale(regularUrl)).toBe(1)
    })

    it('should return 1 for empty string', () => {
      expect(getImageScale('')).toBe(1)
    })

    it('should work with URLs containing wiki.bloodontheclocktower.com anywhere', () => {
      const url = 'https://cdn.wiki.bloodontheclocktower.com/image.png'
      expect(getImageScale(url)).toBe(1.3)
    })
  })
})

