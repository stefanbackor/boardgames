# botc-script-tool

This is a Blood On The Clocktower (BOTC) script translator with format suitable for printing.

- Upload BOTC json script downloaded from https://www.botcscripts.com/ or https://script.bloodontheclocktower.com/
- Switch to desired language
- Click to Print player script sheet and first/other night sheets.

## Getting Started

This app is part of the boardgames monorepo. To run this application:

**From the workspace root:**
```bash
# Development server
yarn workspace botc-script-tool dev

# Or using Turbo
turbo dev --filter=botc-script-tool
```

**From this directory:**
```bash
cd apps/botc-script-tool
yarn dev
```

The app will start at [http://localhost:5175](http://localhost:5175)

## Building For Production

```bash
# From workspace root
yarn workspace botc-script-tool build

# From this directory
yarn build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

## Styling

This project uses [Radix UI](https://www.radix-ui.com/).

## Fixtures

`./fixtures` folder contains BOTC script json files that can be used to test this app.