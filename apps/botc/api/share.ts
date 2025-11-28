import type { VercelRequest, VercelResponse } from '@vercel/node'
import pako from 'pako'

// Crawler user agents that request link previews
const CRAWLER_USER_AGENTS = [
  'facebookexternalhit', // Facebook
  'Facebot', // Facebook
  'Twitterbot', // Twitter/X
  'LinkedInBot', // LinkedIn
  'WhatsApp', // WhatsApp
  'TelegramBot', // Telegram
  'Slackbot', // Slack
  'Slackbot-LinkExpanding', // Slack
  'Discordbot', // Discord
  'SkypeUriPreview', // Skype
  'pinterest', // Pinterest
  'iMessagebot', // iMessage
  'Applebot', // Apple (iMessage, Safari)
  'redditbot', // Reddit
  'Embedly', // Embedly
  'Quora Link Preview', // Quora
  'outbrain', // Outbrain
  'vkShare', // VK
  'W3C_Validator', // W3C Validator
]

function isCrawler(userAgent: string | undefined): boolean {
  if (!userAgent) return false
  const ua = userAgent.toLowerCase()
  return CRAWLER_USER_AGENTS.some((bot) => ua.includes(bot.toLowerCase()))
}

interface ScriptMeta {
  name: string
  author?: string
  townsfolk: number
  outsider: number
  minion: number
  demon: number
  traveler: number
  loric: number
  totalRoles: number
}

// Local copy of the URL decompression logic, adapted for the Node runtime.
// This avoids importing TS/DOM utilities from the frontend bundle,
// which Vercel does not compile as part of the Serverless Function.
function decompressFromUrl(encoded: string): string {
  try {
    // Decode from base64 into raw bytes
    const bytes = new Uint8Array(Buffer.from(encoded, 'base64'))

    // Try to decompress with gzip (new format)
    try {
      const decompressed = pako.ungzip(bytes)
      return new TextDecoder().decode(decompressed)
    } catch {
      // If decompression fails, assume it's legacy uncompressed format
      // Try UTF-8 decoding first
      try {
        return new TextDecoder().decode(bytes)
      } catch {
        // Fallback to simple base64 decode for backward compatibility
        return Buffer.from(encoded, 'base64').toString('utf-8')
      }
    }
  } catch {
    throw new Error('Failed to decompress data from URL')
  }
}

function parseScriptFromUrl(encodedScript: string): ScriptMeta | null {
  try {
    const decoded = decompressFromUrl(encodedScript)
    const parsed = JSON.parse(decoded)

    if (!Array.isArray(parsed)) {
      return null
    }

    // Extract meta information
    const metaItem = parsed.find(
      (item: unknown) =>
        typeof item === 'object' &&
        item !== null &&
        (item as { id?: string }).id === '_meta',
    )

    const name =
      (metaItem as { name?: string } | undefined)?.name || 'Custom Script'
    const author = (metaItem as { author?: string } | undefined)?.author

    // Count roles by team
    // Roles can be either strings (role IDs) or objects with team property
    const roles = parsed.filter(
      (item: unknown) =>
        item !== null &&
        (typeof item === 'string' ||
          (typeof item === 'object' &&
            (item as { id?: string }).id !== '_meta')),
    )

    let townsfolk = 0
    let outsider = 0
    let minion = 0
    let demon = 0
    let traveler = 0
    let loric = 0

    roles.forEach((role: unknown) => {
      if (typeof role === 'object' && role !== null) {
        const team = (role as { team?: string }).team
        switch (team) {
          case 'townsfolk':
            townsfolk++
            break
          case 'outsider':
            outsider++
            break
          case 'minion':
            minion++
            break
          case 'demon':
            demon++
            break
          case 'traveler':
            traveler++
            break
          case 'loric':
            loric++
            break
        }
      }
    })

    return {
      name,
      author,
      townsfolk,
      outsider,
      minion,
      demon,
      traveler,
      loric,
      totalRoles: roles.length,
    }
  } catch (error) {
    return null
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

function generateOGHTML(
  scriptMeta: ScriptMeta,
  url: string,
  origin: string,
): string {
  const {
    name,
    author,
    townsfolk,
    outsider,
    minion,
    demon,
    traveler,
    loric,
    totalRoles,
  } = scriptMeta

  // Build role summary - only include non-zero counts
  const parts: string[] = []
  if (townsfolk > 0) parts.push(`${townsfolk} Townsfolk`)
  if (outsider > 0)
    parts.push(`${outsider} Outsider${outsider !== 1 ? 's' : ''}`)
  if (minion > 0) parts.push(`${minion} Minion${minion !== 1 ? 's' : ''}`)
  if (demon > 0) parts.push(`${demon} Demon${demon !== 1 ? 's' : ''}`)
  if (traveler > 0)
    parts.push(`${traveler} Traveler${traveler !== 1 ? 's' : ''}`)
  if (loric > 0) parts.push(`${loric} Loric${loric !== 1 ? 's' : ''}`)

  // If no team info available, just show total roles
  const rolesSummary =
    parts.length > 0 ? parts.join(', ') : `${totalRoles} roles`
  const authorPart = author ? ` by ${author}` : ''
  const description = `A Blood on the Clocktower script${authorPart} with ${rolesSummary}. View night order and role details.`
  const title = `${name} - BotC Script Tool`

  const imageUrl = `${origin}/api/og_image?name=${encodeURIComponent(name)}`

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  
  <!-- Open Graph / Facebook / LinkedIn -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${escapeHtml(imageUrl)}" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="og:site_name" content="BotC Script Tool" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
  
  <!-- Redirect to actual page -->
  <meta http-equiv="refresh" content="0;url=${escapeHtml(url)}" />
</head>
<body>
  <h1>${escapeHtml(name)}</h1>
  <p>${escapeHtml(description)}</p>
  <p>If you are not redirected automatically, <a href="${escapeHtml(
    url,
  )}">click here</a>.</p>
</body>
</html>`
}

function generateDefaultOGHTML(
  url: string,
  origin: string,
  errorMessage?: string,
): string {
  const title = 'Blood on the Clocktower Script Tool'
  const description =
    'Create and share custom Blood on the Clocktower scripts with night order sheets and role information'
  const imageUrl = `${origin}/api/og_image?name=${encodeURIComponent(title)}`

  const errorComment = errorMessage
    ? `\n  <!-- Error: ${escapeHtml(errorMessage)} -->`
    : ''

  return `<!DOCTYPE html>
<html>
<head>${errorComment}
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  
  <!-- Open Graph / Facebook / LinkedIn -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${escapeHtml(imageUrl)}" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="og:site_name" content="BotC Script Tool" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
  
  <!-- Redirect to actual page -->
  <meta http-equiv="refresh" content="0;url=${escapeHtml(url)}" />
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(description)}</p>
  <p>If you are not redirected automatically, <a href="${escapeHtml(
    url,
  )}">click here</a>.</p>
</body>
</html>`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userAgent = req.headers['user-agent']
  const host = req.headers.host || 'localhost'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const origin = `${protocol}://${host}`

  // Get the original URL that was requested (before rewrite)
  // Vercel passes this in x-vercel-sc-headers or we reconstruct it
  const scriptParam =
    typeof req.query.script === 'string' ? req.query.script : undefined

  // Reconstruct the full URL as the user would see it
  const fullUrl = scriptParam
    ? `${origin}/?script=${encodeURIComponent(scriptParam)}`
    : origin

  // Only intercept crawler requests
  if (!isCrawler(userAgent)) {
    // For non-crawlers, redirect to the SPA
    return res.redirect(302, fullUrl)
  }

  // If there's a script parameter, try to parse it
  if (scriptParam) {
    const scriptMeta = parseScriptFromUrl(scriptParam)

    if (scriptMeta) {
      const html = generateOGHTML(scriptMeta, fullUrl, origin)
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable') // Cache for 30 days
      return res.status(200).send(html)
    }

    // Script parameter exists but failed to parse
    const html = generateDefaultOGHTML(
      fullUrl,
      origin,
      'Failed to parse script parameter',
    )
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=2592000, immutable') // Cache for 30 days
    return res.status(200).send(html)
  }

  // For crawlers without a script parameter, serve default OG tags
  const html = generateDefaultOGHTML(
    fullUrl,
    origin,
    'No script parameter provided',
  )
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=2592000, immutable') // Cache for 30 days
  return res.status(200).send(html)
}
