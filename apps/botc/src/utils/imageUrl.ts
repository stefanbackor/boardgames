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
  return `//wsrv.nl/?url=${encoded}&h=${height}`
}

