import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerLO');
  await page.getByTestId('login-input').press('Tab');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('test1234');
  await page.getByTestId('login-button').click();
  await page.locator('#widget_1_transfer_receiver').selectOption('2');
  await page.locator('#widget_1_transfer_amount').click();
  await page.locator('#widget_1_transfer_amount').fill('120');
  await page.locator('#widget_1_transfer_title').click();
  await page.locator('#widget_1_transfer_title').fill('Zwrot');
  await page.getByRole('button', { name: 'wykonaj' }).click();
  await page.getByLabel('Przelew wykonany').locator('div').nth(2).click();
  await page.getByTestId('close-button').click();
  await page.locator('#user_messages').click();
});