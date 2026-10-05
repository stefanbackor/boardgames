# End-to-End Tests for BOTC App

This directory contains Playwright end-to-end tests for the Blood on the Clocktower Script Tool application.

## Test Files

### `homepage.spec.ts`
Tests for the homepage functionality:
- Rendering upload controls
- Language selector
- Footer with attribution links
- Loading sample scripts
- Print and share buttons
- Night order sections

### `script-from-url.spec.ts`
Tests for loading and displaying scripts from URL parameters:
- Loading scripts from compressed URL parameters
- Displaying correct metadata
- Loading from external URLs
- Error handling for invalid parameters
- Committing script changes
- Copying share links
- Rendering all role cards
- Displaying night order information

## Running Tests

### Install Playwright Browsers
First time setup:
```bash
npx playwright install chromium webkit
```

### Run All Tests
```bash
npm run test:e2e
```

### Run Tests with UI Mode (Recommended for Development)
```bash
npm run test:e2e:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:e2e:headed
```

### Debug Tests
```bash
npm run test:e2e:debug
```

### View Test Report
After running tests:
```bash
npm run test:e2e:report
```

### Run Specific Test File
```bash
npx playwright test homepage.spec.ts
```

### Run Specific Test
```bash
npx playwright test -g "should render homepage"
```

### Run Tests in Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project="Mobile Safari"
```

## Test Configuration

Tests are configured in `playwright.config.ts` at the project root. Key settings:
- **Base URL**: `http://localhost:5175`
- **Server**: Locally starts `npm run dev` and reuses an existing server. With `CI=1`, builds the frontend and serves it with Vite preview on the same port.
- **Browsers**: Desktop Chromium and Mobile Safari (iPhone 12)
- **Parallelism**: Four workers on CI; Playwright's default locally
- **Retries**: One on CI (reported as flaky if it passes); none locally
- **Timeout**: 120 seconds for server startup

## Writing New Tests

1. Create a new `.spec.ts` file in this directory
2. Import test utilities:
   ```typescript
   import { test, expect } from './fixtures'
   ```
3. Write test cases using `test.describe()` and `test()`
4. Use Playwright's built-in assertions and selectors

## Best Practices

- Use semantic selectors (getByRole, getByText) over CSS selectors
- Add appropriate timeouts for dynamic content
- Use fixtures from `fixtures/scripts/` for test data
- Test both successful and error scenarios
- Keep tests independent and idempotent
- Use descriptive test names

## Troubleshooting

### Tests Fail Due to Server Not Starting
- Ensure port 5175 is not already in use
- Check that `npm run dev` works independently
- Increase `webServer.timeout` in playwright.config.ts

### Tests Are Flaky
- Add explicit waits for dynamic content
- Use `toBeVisible({ timeout: 10000 })` for slow-loading elements
- Check for race conditions in the application

### Can't Find Elements
- Use Playwright Inspector: `npm run test:e2e:debug`
- Check the HTML structure in the browser
- Try different selector strategies

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)





## Metadata and homebrew rules

`bootlegger-rules.spec.ts` and `script-meta-edits.spec.ts` keep real-browser
coverage for contenteditable typing, keyboard/pointer controls, save-on-blur,
navigation prompts, persisted reloads, and refused-control tooltips. Merged
scenarios use named steps where attribution would otherwise be unclear.

Payload permutations belong in `src/stores/scriptExport.test.ts` and
`src/utils/commitScript.test.ts`. One browser test checks the JSON view,
download, and Share buttons together to catch wiring regressions. Use
`openScript` from `script-state.ts` to seed metadata edits when editing itself
is not under test. It seeds once, so subsequent reloads exercise the app's
persisted state. These specs use Playwright's default 30-second timeout.

### Timing check for #52

Measured on 2026-10-05 with the same local dev-server configuration, Chromium
and Mobile Safari, four workers, and no retries. The baseline is `b643e7e`;
these numbers isolate the test refactor from the earlier CI pipeline changes.
Run from `apps/botc` with `yarn playwright test --workers=4 --reporter=json`.
Sum each test result's `duration` to calculate the spec contribution; parallel
work makes that sum different from suite wall time. These are single local
runs, not a CI benchmark.

| Measurement | Before | After |
| --- | ---: | ---: |
| Cases in these two specs, per project | 58 | 22 |
| Full suite wall time | 78.5s | 40.4s |
| Summed duration of these two specs | 233.6s | 88.3s |
| Share of all tests' summed duration | 80.0% | 60.4% |

The baseline passed 167/168 checks (one keyboard-tooltip failure); the final
run passed all 96 checks. The two specs take 37.8% of their previous
summed duration. This meets an approximately 60% duration-reduction reading of
#52. Their fraction of the whole suite is still above 32%, so the stricter
reading of “40% of their current share” remains unmet.

On local Node 26, run unit tests with
`NODE_OPTIONS=--no-experimental-webstorage yarn test`. Its built-in storage
otherwise bypasses the jsdom `Storage.prototype` spies in two existing tests.
