import { test, expect } from "@playwright/test";

test.describe("Pulpit tests", () => {
  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const URL = "https://demo-bank.vercel.app/";
    const USERID = "testerLO";
    const USERPASS = "10987654";
    const USER_NAME = "Jan Demobankowy";
    const TransferReciever = "2";
    const TransferAmount = "150";
    const TransferTitle = "pizza";

    // Act
    await page.goto(URL);
    await page.getByTestId("login-input").fill(USERID);
    await page.getByTestId("password-input").fill(USERPASS);
    await page.getByTestId("login-button").click();

    await page
      .locator("#widget_1_transfer_receiver")
      .selectOption(TransferReciever);
    await page.locator("#widget_1_transfer_amount").fill(TransferAmount);
    await page.locator("#widget_1_transfer_title").fill(TransferTitle);
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.locator("close-button").isVisible();
    await page.locator("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! ${USER_NAME} - ${TransferAmount},00PLN - ${TransferTitle}`,
    );
  });

  test("successful mobile top-up", async ({ page }) => {
    // Arrange
    const URL = "https://demo-bank.vercel.app/";
    const USERID = "testerLO";
    const USERPASS = "10987654";
    const TopUpReciever = "503 xxx xxx";
    const TopUpAmount = "50";

    // Act
    await page.goto(URL);
    await page.getByTestId("login-input").fill(USERID);
    await page.getByTestId("password-input").fill(USERPASS);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_topup_receiver").selectOption(TopUpReciever);
    await page.locator("#widget_1_topup_amount").fill(TopUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(
      `Doładowanie wykonane! ${TopUpAmount},00PLN na numer ${TopUpReciever}`,
    );
  });

  test("payment with correct data", async ({ page }) => {
    // Arrange
    const URL = "https://demo-bank.vercel.app/";
    const USERID = "testerLO";
    const USERPASS = "10987654";
    const TransferReciever = "Marlena X";
    const AccountNumber = "02 000 0000 0000 0000 0000 0";
    const Amount = "150";
    const Title = "pizza";

    // Act
    await page.goto(URL);
    await page.getByTestId("login-input").fill(USERID);
    await page.getByTestId("password-input").fill(USERPASS);
    await page.getByTestId("login-button").click();

    await page.getByRole("link", { name: "płatności" }).click();
    await page.getByTestId("transfer_receiver").fill(TransferReciever);
    await page.getByTestId("form_account_to").fill(AccountNumber);
    await page.getByTestId("form_amount").fill(Amount);
    await page.getByTestId("form_title").fill(Title);
    await page.getByLabel("ekspresowy").check();
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator(".ui-dialog-title")).toHaveText(
      "Przelew wykonany",
    );
  });
});
