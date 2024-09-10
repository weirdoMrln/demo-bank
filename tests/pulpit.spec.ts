import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { pulpitData } from "../test-data/pulpit.data";
import { LoginPage } from "../pages/login.page";
import { BasePage } from "../pages/base.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(loginData.userId, loginData.userPass);
  });

  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const basePage = new BasePage(page);

    // Act
    await pulpitPage.odbiorcaPrzelewu.selectOption(pulpitData.odbiorcaPrzelewu);
    await pulpitPage.kwotaPrzelewu.fill(pulpitData.kwotaPrzelewu);
    await pulpitPage.tytulPrzelewu.fill(pulpitData.tytulPrzelewu);
    await pulpitPage.buttonWykonajSzybkiPrzelew.click();
    await page.keyboard.press("Escape");

    // Assert
    const actualText = pulpitPage.wiadomosciAlert.innerText();
    const expectedText = `Przelew wykonany! ${pulpitData.odbiorcaPrzelewu} - ${pulpitData.kwotaPrzelewu},00PLN - ${pulpitData.tytulPrzelewu}`;
    await basePage.compareTextForElements(await actualText, expectedText);
  });

  test("correct balance after successful mobile top-up", async ({ page }) => {
    const basePage = new BasePage(page);
    const pulpitPage = new PulpitPage(page);
    // Act
    await pulpitPage.odbiorcaDoladowania.selectOption(pulpitData.numerTel);
    await pulpitPage.kwotaDoladowania.fill(pulpitData.kwotaDoladowania);
    await pulpitPage.checkboxDoladowanie.click();
    await pulpitPage.buttonDoladujTelefon.click();
    await page.keyboard.press("Escape");

    // Assert
    const expectedMessage = `Doładowanie wykonane! ${pulpitData.kwotaDoladowania},00PLN na numer ${pulpitData.numerTel}`;
    const saldoKonta =
      (await pulpitPage.saldoKonta.textContent()) as unknown as Promise<string>;
    const saldoPoDoladowaniu =
      Number(saldoKonta) - Number(pulpitData.kwotaDoladowania);
    expect(
      Number(saldoKonta) + Number(pulpitData.kwotaDoladowania) ==
        Number(saldoPoDoladowaniu)
    );
    console.log(
      saldoKonta +
        " - " +
        pulpitData.kwotaDoladowania +
        " = " +
        saldoPoDoladowaniu
    );
    await expect(pulpitPage.wiadomosciAlert).toHaveText(expectedMessage);
  });

  test("payment with correct data", async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);

    // Act
    await page.getByRole("link", { name: "płatności" }).click();
    await pulpitPage.odbiorcaPrzelewuField.fill(pulpitData.transferReciever);
    await pulpitPage.numerKontaField.fill(pulpitData.numerKontaDoPrzelewu);
    await pulpitPage.kwotaPrzelewuField.fill(pulpitData.kwotaPrzelewu);
    await pulpitPage.tytulPrzelewuField.fill(pulpitData.tytulPrzelewu);
    await pulpitPage.checkboxEkspresowyPrzelew.check();
    await pulpitPage.buttonWykonajPrzelew.click();
    await page.keyboard.press("Escape");

    // Assert
    const expectedMessage = `Przelew wykonany! ${pulpitData.kwotaPrzelewu},00PLN dla ${pulpitData.transferReciever}`;
    await expect(pulpitPage.wiadomosciAlert).toHaveText(expectedMessage);
  });
});
