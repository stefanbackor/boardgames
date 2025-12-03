import type { ScriptData } from './parseScript'
import type { ParsedRole } from '@/types'
import { Team } from '@/constants'

/**
 * Generates a meta description for social media sharing based on script data.
 * Includes script author and role counts by team (Townsfolk, Outsider, Minion, Demon, Traveler).
 *
 * @param scriptData - The raw script data
 * @param scriptRoles - The parsed roles from the script
 * @returns A formatted description string for meta tags
 *
 * @example
 * // Returns: "A Blood on the Clocktower script by John Doe with 13 Townsfolk, 2 Outsiders, 4 Minions, 2 Demons. View night order and role details."
 * generateMetaDescription(scriptData, roles)
 */
export function generateMetaDescription(
  scriptData: ScriptData | null,
  scriptRoles: ParsedRole[] | null,
): string {
  // Default description when no script is loaded
  if (!scriptData || !scriptRoles) {
    return 'Create and share custom Blood on the Clocktower scripts with night order sheets and role information'
  }

  // Extract author from metadata if available
  const metaItem = scriptData.find(
    (item) => typeof item === 'object' && item !== null && item.id === '_meta',
  )
  const metaObj = metaItem as { author?: string } | undefined
  const author = metaObj?.author

  // Count roles by team
  const townsfolk = scriptRoles.filter((r) => r.team === Team.Townsfolk).length
  const outsider = scriptRoles.filter((r) => r.team === Team.Outsider).length
  const minion = scriptRoles.filter((r) => r.team === Team.Minion).length
  const demon = scriptRoles.filter((r) => r.team === Team.Demon).length
  const traveler = scriptRoles.filter((r) => r.team === Team.Traveler).length

  // Build role summary parts with proper pluralization
  const parts = [
    `${townsfolk} Townsfolk`,
    `${outsider} Outsider${outsider !== 1 ? 's' : ''}`,
    `${minion} Minion${minion !== 1 ? 's' : ''}`,
    `${demon} Demon${demon !== 1 ? 's' : ''}`,
  ]

  // Add traveler count if any travelers are present
  if (traveler > 0) {
    parts.push(`${traveler} Traveler${traveler !== 1 ? 's' : ''}`)
  }

  const rolesSummary = parts.join(', ')
  const authorPart = author ? ` by ${author}` : ''

  return `A Blood on the Clocktower script${authorPart} with ${rolesSummary}. View night order and role details.`
}
