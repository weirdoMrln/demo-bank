import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { pulpitData } from "../test-data/pulpit.data";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("login-input").fill(loginData.userId);
    await page.getByTestId("password-input").fill(loginData.userPass);
    await page.getByTestId("login-button").click();
  });

  test("quick payment with correct data", async ({ page }) => {
    // Act
    await page
      .locator("#widget_1_transfer_receiver")
      .selectOption(pulpitData.paymentReciever);
    await page
      .locator("#widget_1_transfer_amount")
      .fill(pulpitData.transferAmount);
    await page
      .locator("#widget_1_transfer_title")
      .fill(pulpitData.transferTitle);
    await page.locator("#widget_1_transfer_title").click();
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator(".grid-30")).toHaveText(
      `Przelew wykonany! ${loginData.userName} - ${pulpitData.transferAmount},00PLN - ${pulpitData.transferTitle}`
    );
  });

  test("correct balance after successful mobile top-up", async ({ page }) => {
    // Arrange
    const expectedMessage = `Doładowanie wykonane! ${pulpitData.topUpAmount},00PLN na numer ${pulpitData.topUpReciever}`;
    const initialBalance = await page.locator("#money_value").innerText();
    const expectedBalance =
      Number(initialBalance) - Number(pulpitData.topUpAmount);

    // Act
    await page
      .locator("#widget_1_topup_receiver")
      .selectOption(pulpitData.topUpReciever);
    await page.locator("#widget_1_topup_amount").fill(pulpitData.topUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
    await expect(page.locator("#money_value")).toHaveText(`${expectedBalance}`);
  });

  test("payment with correct data", async ({ page }) => {
    // Act
    await page.getByRole("link", { name: "płatności" }).click();
    await page
      .getByTestId("transfer_receiver")
      .fill(pulpitData.transferReciever);
    await page.getByTestId("form_account_to").fill(pulpitData.accountNumber);
    await page.getByTestId("form_amount").fill(pulpitData.transferAmount);
    await page.getByTestId("form_title").fill(pulpitData.transferTitle);
    await page.getByLabel("ekspresowy").check();
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator(".ui-dialog-title")).toHaveText(
      "Przelew wykonany"
    );
  });
});
