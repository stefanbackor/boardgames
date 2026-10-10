/**
 * Switching Google Analytics off for other deployments of this app.
 *
 * The Google tag in index.html reports to botcscript.app's own property. A
 * fork or a group's own copy of the tool builds with
 * VITE_DISABLE_ANALYTICS=true: the tag is then left out of index.html (see
 * vite.config.ts), so nothing reaches that property, and with no analytics
 * there is nothing to ask consent for - the banner and the analytics part of
 * the privacy page are not shown (see ANALYTICS_AVAILABLE in consent.ts).
 */

/** The Google tag in index.html sits between these two comments */
const ANALYTICS_BLOCK =
  /[ \t]*<!-- analytics -->[\s\S]*?<!-- \/analytics -->\n?/

/**
 * index.html without the Google tag.
 *
 * Throws when the markers are gone, so a build that is meant to be free of
 * analytics fails rather than quietly shipping the tag.
 */
export function withoutAnalytics(html: string): string {
  if (!ANALYTICS_BLOCK.test(html)) {
    throw new Error(
      'index.html has no <!-- analytics --> ... <!-- /analytics --> block to leave out',
    )
  }
  return html.replace(ANALYTICS_BLOCK, '')
}
