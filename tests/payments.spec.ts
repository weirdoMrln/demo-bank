import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { paymentData } from "../test-data/payment.data";

test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("login-input").fill(loginData.userId);
    await page.getByTestId("password-input").fill(loginData.userPass);
    await page.getByTestId("login-button").click();
  });

  test("simple payment", async ({ page }) => {
    // Act
    await page.getByRole("link", { name: "płatności" }).click();
    await page
      .getByTestId("transfer_receiver")
      .fill(paymentData.transferReceiver);
    await page.getByTestId("form_account_to").fill(paymentData.accountNumber);
    await page.getByTestId("form_amount").fill(paymentData.amount);
    await page.getByTestId("form_title").fill(paymentData.title);
    await page.getByRole("button", { name: "wykonaj przelew" }).click();
    await page.getByTestId("close-button").click();
  });
});
