
## Links

- test site https://demo-bank.vercel.app/  
- code repository https://github.com/weirdoMrln/demo-bank
- Trello board connected with project: https://trello.com/b/k90C2bYr/automated-testsdemo-bank

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`
- cancelling Node process  
  hit twice <kbd>Ctrl</kbd> + <kbd>C</kbd>

## Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```

## Visual Studio Code

- Preview: for README.md
- Autosave: in File -> Auto Save
- Timeline: file context menu -> Open Timeline
- Formatting: editor -> context menu -> Format Document

## Playwright snippets

- test:
  ```javascript
  test("test description", async ({ page }) => {});
  ```
- describe:

  ```javascript
  describe("Group description", () => {});
  ```

- running one test: `test.only`
