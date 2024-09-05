import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
test.describe('Payment tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('login-input').fill(loginData.userId);
    await page.getByTestId('password-input').fill(loginData.userPass);
    await page.getByTestId('login-button').click();
  });

  test('simple payment', async ({ page }) => {

  });
});
