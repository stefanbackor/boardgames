/**
 * Proxies an image URL through wsrv.nl with specified height.
 * This ensures images are optimized and properly served.
 *
 * @param url - The original image URL
 * @param height - The desired height in pixels (default: 150)
 * @returns The proxied URL or undefined if no URL provided
 */
export function getProxiedImageUrl(
  url?: string,
  height = 150,
): string | undefined {
  if (!url) return url
  if (url.startsWith('//wsrv.nl/')) return url
  const encoded = encodeURIComponent(url)
  return `//wsrv.nl/?url=${encoded}&h=${height}&output=webp`
}

/**
 * Returns the appropriate scale factor for an image URL
 * Wiki images need a scale of 1.3 to look good, others use 1
 *
 * @param imageUrl - The image URL to check
 * @returns The scale factor (1.3 for wiki images, 1 for others)
 */
export function getImageScale(imageUrl: string | undefined): number {
  if (!imageUrl) return 1
  return imageUrl.includes('wiki.bloodontheclocktower.com') ? 1.3 : 1
}
