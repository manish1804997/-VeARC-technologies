# Playwright Tricentis Demo

## Setup

1. Clone repo
2. Install packages: `npm install`
3. Install browsers: `npx playwright install`

## Run tests

- Headless (default): `npm test`
- Headed: `npm run test:headed`

The reporter writes `playwright-results.json` in the project root after the run.

## Where to run

- Locally on your machine (Node >= 16). Use the `test:headed` script to watch the browser.
- CI: Use GitHub Actions — add a step to `actions/setup-node`, `npm ci`, `npx playwright install --with-deps`, then run `npx playwright test`.

