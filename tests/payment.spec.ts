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

  test("simple payment", async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const paymentPage = new PaymentPage(page);

    // Act
    await page.getByRole("link", { name: "płatności" }).click();
    await paymentPage.odbiorcaPrzelewuField.fill(paymentData.transferReceiver);
    await paymentPage.numerKontaField.fill(paymentData.accountNumber);
    await paymentPage.kwotaPrzelewuField.fill(paymentData.amount);
    await paymentPage.tytulPrzelewuField.fill(paymentData.title);
    await paymentPage.checkboxEkspresowyPrzelew.check();
    await paymentPage.buttonWykonajPrzelew.click();
    await page.keyboard.press("Escape");

    // Assert
    const expectedMessage = `Przelew wykonany! ${paymentData.amount},00PLN dla ${paymentData.transferReceiver}`;
    await expect(pulpitPage.wiadomosciAlert).toHaveText(expectedMessage);
  });
  });
