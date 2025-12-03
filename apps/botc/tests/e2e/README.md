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
npx playwright install
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
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Configuration

Tests are configured in `playwright.config.ts` at the project root. Key settings:
- **Base URL**: `http://localhost:5175`
- **Dev Server**: Automatically starts with `npm run dev`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Timeout**: 120 seconds for server startup

## Writing New Tests

1. Create a new `.spec.ts` file in this directory
2. Import test utilities:
   ```typescript
   import { test, expect } from '@playwright/test';
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



