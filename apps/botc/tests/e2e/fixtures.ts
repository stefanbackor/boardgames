import { test as base, expect } from '@playwright/test'

/**
 * The Playwright `test` every spec here uses, with third-party traffic blocked.
 *
 * `page.goto` waits for the `load` event, and `load` waits for the page's
 * subresources - the Google Analytics tag in `index.html` among them, because a
 * `<script>` counts. So a third party that is slow, rate limiting or briefly
 * unreachable does not fail on its own terms: it hangs the navigation that was
 * only ever meant to open the app, and the test times out thirty seconds later
 * with the page fully rendered behind it. That was a real flake here, roughly
 * one run in two, landing on a different test each time - which is exactly what
 * made it look like a fault in whichever test drew the short straw.
 *
 * Nothing is lost by cutting it off. The app skips its own analytics calls
 * outside a production build, so the tag is dead weight in a test run; the
 * `wsrv.nl` image proxy behind the role card art has nothing any assertion
 * reads. Blocking it also keeps test runs out of the real analytics property,
 * which they were reaching - the tag reports a pageview of its own whatever the
 * app does.
 *
 * Written as an allowlist rather than a list of known offenders, so a third
 * party added to the app later cannot quietly put the flake back. A test is
 * still free to mock an external URL it does need: routes are matched newest
 * first, and this one is registered before the test body runs, so a route the
 * test adds wins.
 */
export const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const appHost = baseURL ? new URL(baseURL).host : 'localhost:5175'

    /**
     * A predicate rather than a pattern, so only the requests that are about to
     * be blocked are routed at all - the app's own eighty-odd requests per page
     * are left to the browser instead of being proxied through node.
     */
    await page.route(
      (url) => url.host !== appHost,
      (route) => route.abort(),
    )

    await use(page)
  },
})

export { expect }
