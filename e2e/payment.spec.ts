import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { paymentData } from "../test-data/payment.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";
import { PaymentPage } from "../pages/payment.page";

test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(loginData.userId, loginData.userPass);
  });

  test(
    "simple payment",
    {
      tag: ["@Payment", "@Components", "@E2E"],
      annotation: { type: "details", description: "https://trello.com/c/kaC86KGO/8-at-095-simple-payment-from-p%C5%82atno%C5%9Bci-tab" },
    },
    async ({ page }) => {
      // Arrange
      const pulpitPage = new PulpitPage(page);
      const paymentPage = new PaymentPage(page);

      // Act
      await pulpitPage.sideMenu.platnosciTab.click();
      await paymentPage.zrobPrzelew(
        paymentData.transferReceiver,
        paymentData.accountNumber,
        paymentData.amount,
        paymentData.title
      );
      await page.keyboard.press("Escape");

      // Assert
      const expectedMessage = `Przelew wykonany! ${paymentData.amount},00PLN dla ${paymentData.transferReceiver}`;
      await expect(pulpitPage.wiadomosciAlert).toHaveText(expectedMessage);
    }
  );
});
