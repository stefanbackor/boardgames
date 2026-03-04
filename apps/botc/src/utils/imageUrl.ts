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

export type IconStyle = 'wiki' | 'kickstarter'

// Kickstarter icon URLs are generated from the role ID because the
// tomozbot/botc-icons repo uses a flat, predictable naming scheme ({id}.webp).
// Wiki icon URLs cannot be generated — they use hash-based directory paths
// (e.g., images/5/54/Icon_alchemist.png) and are stored per-role in roles.en.ts.
const KICKSTARTER_ICONS_BASE =
  'https://raw.githubusercontent.com/tomozbot/botc-icons/main/WEBP'

export function getKickstarterImageUrl(id: string): string {
  return `${KICKSTARTER_ICONS_BASE}/${id}.webp`
}

/**
 * Returns roles with image URLs resolved for the given icon style.
 * Wiki mode: roles are unchanged (images come from role data).
 * Kickstarter mode: built-in role images are replaced with generated URLs.
 */
export function applyIconStyle<T extends { id: string; image: string }>(
  roles: T[],
  iconStyle: IconStyle,
): T[] {
  if (iconStyle === 'wiki') return roles
  return roles.map((role) => ({
    ...role,
    image: getKickstarterImageUrl(role.id),
  }))
}
