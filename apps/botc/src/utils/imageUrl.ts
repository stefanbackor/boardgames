/**
 * Proxies an image URL through wsrv.nl with specified height.
 * This ensures images are optimized and properly served.
 *
 * @param url - The original image URL
 * @param height - The desired height in pixels (default: 150)
 * @param output - The image format to serve (default: webp)
 * @returns The proxied URL or undefined if no URL provided
 */
export function getProxiedImageUrl(
  url?: string,
  height = 150,
  output: 'webp' | 'png' = 'webp',
): string | undefined {
  if (!url) return url
  if (url.startsWith('//wsrv.nl/')) {
    return url.replace(/output=\w+/, `output=${output}`)
  }
  const encoded = encodeURIComponent(url)
  return `//wsrv.nl/?url=${encoded}&h=${height}&output=${output}`
}

/**
 * Builds the URL of an image meant for printing. Browsers embed a JPEG in a PDF
 * as is but re-encode any other format losslessly, with a separate alpha mask,
 * which costs several times the bytes. JPEG has no transparency, so the image is
 * flattened onto white, matching the printed page.
 *
 * @param url - The original image URL
 * @returns The proxied URL, or the input if the proxy cannot or need not fetch it
 */
export function getPrintImageUrl(url?: string): string | undefined {
  if (!url || /^(data|blob):/.test(url) || url.startsWith('//wsrv.nl/')) {
    return url
  }
  const encoded = encodeURIComponent(url)
  return `//wsrv.nl/?url=${encoded}&h=150&output=jpg&q=80&bg=white`
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
