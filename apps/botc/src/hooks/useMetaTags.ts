import { useEffect } from 'react'

export interface MetaTagsConfig {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

/**
 * Hook to dynamically update meta tags for social media sharing
 * Updates both standard meta tags and Open Graph tags
 */
export function useMetaTags(config: MetaTagsConfig) {
  useEffect(() => {
    const {
      title = 'Blood on the Clocktower Script Tool',
      description = 'Create and share custom Blood on the Clocktower scripts with night order sheets and role information',
      image = '/android-chrome-512x512.png',
      url = window.location.href,
      type = 'website',
    } = config

    // Update document title
    document.title = title

    // Helper to set or update meta tag
    const setMetaTag = (
      selector: string,
      content: string,
      attributeName = 'content',
    ) => {
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        const [attr, value] = selector.match(/\[(.*?)="(.*?)"\]/)?.slice(1, 3) || []
        if (attr && value) {
          element.setAttribute(attr, value)
        }
        document.head.appendChild(element)
      }
      element.setAttribute(attributeName, content)
    }

    // Standard meta tags
    setMetaTag('meta[name="description"]', description)

    // Open Graph tags (for Facebook, LinkedIn, etc.)
    setMetaTag('meta[property="og:title"]', title)
    setMetaTag('meta[property="og:description"]', description)
    setMetaTag('meta[property="og:image"]', new URL(image, window.location.origin).href)
    setMetaTag('meta[property="og:url"]', url)
    setMetaTag('meta[property="og:type"]', type)
    setMetaTag('meta[property="og:site_name"]', 'BotC Script Tool')

    // Twitter Card tags
    setMetaTag('meta[name="twitter:card"]', 'summary_large_image')
    setMetaTag('meta[name="twitter:title"]', title)
    setMetaTag('meta[name="twitter:description"]', description)
    setMetaTag('meta[name="twitter:image"]', new URL(image, window.location.origin).href)

    // WhatsApp and other messengers also use Open Graph tags
  }, [config.title, config.description, config.image, config.url, config.type])
}

