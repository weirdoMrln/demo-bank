import { test, expect } from "@playwright/test";

test.describe("Pulpit tests", () => {
  const TransferAmount = "150";
  const TransferTitle = "pizza";

  test.beforeEach(async ({ page }) => {
    const USERID = "testerLO";
    const USERPASS = "10987654";

    await page.goto("/");
    await page.getByTestId("login-input").fill(USERID);
    await page.getByTestId("password-input").fill(USERPASS);
    await page.getByTestId("login-button").click();
  });

  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const USER_NAME = "Chuck Demobankowy";
    const TransferReciever = "2";

    // Act
    await page
      .locator("#widget_1_transfer_receiver")
      .selectOption(TransferReciever);
    await page.locator("#widget_1_transfer_amount").fill(TransferAmount);
    await page.locator("#widget_1_transfer_title").fill(TransferTitle);
    await page.locator("#widget_1_transfer_title").click();
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator(".grid-30")).toHaveText(
      `Przelew wykonany! ${USER_NAME} - ${TransferAmount},00PLN - ${TransferTitle}`,
    );
  });

  test("correct balance after successful mobile top-up", async ({ page }) => {
    // Arrange
    const topUpReciever = "503 xxx xxx";
    const topUpAmount = "50";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciever}`;
    const initialBalance = await page.locator("#money_value").innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    await page.locator("#widget_1_topup_receiver").selectOption(topUpReciever);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
    await expect(page.locator("#money_value")).toHaveText(`${expectedBalance}`);
  });

  test("payment with correct data", async ({ page }) => {
    // Arrange
    const TransferReciever = "Marlena X";
    const AccountNumber = "02 000 0000 0000 0000 0000 0";

    // Act
    await page.getByRole("link", { name: "płatności" }).click();
    await page.getByTestId("transfer_receiver").fill(TransferReciever);
    await page.getByTestId("form_account_to").fill(AccountNumber);
    await page.getByTestId("form_amount").fill(TransferAmount);
    await page.getByTestId("form_title").fill(TransferTitle);
    await page.getByLabel("ekspresowy").check();
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator(".ui-dialog-title")).toHaveText(
      "Przelew wykonany",
    );
  });
});
