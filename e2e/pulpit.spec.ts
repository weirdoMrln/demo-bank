import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { pulpitData } from "../test-data/pulpit.data";
import { LoginPage } from "../pages/login.page";
import { BasePage } from "../pages/base.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Pulpit tests", () => {
  let pulpitPage: PulpitPage;
  let basePage: BasePage;
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);
    basePage = new BasePage(page);
    await loginPage.login(loginData.userId, loginData.userPass);
  });

  test(
    "Quick payment with correct data",
    {
      tag: ["@Pulpit", "@Payment", "@E2E"],
      annotation: {
        type: "smoke",
        description:
          "https://trello.com/c/Y7tEAVqT/2-at-090-pulpit-quick-payment-with-correct-data-szybki-przelew",
      },
    },
    async ({ page }) => {
      // Act
      await pulpitPage.quickPayment(
        pulpitData.odbiorcaPrzelewu,
        pulpitData.kwotaPrzelewu,
        pulpitData.tytulPrzelewu
      );

      // Assert
      const actualText = pulpitPage.wiadomosciAlert.innerText();
      const expectedText = `Przelew wykonany! ${pulpitData.odbiorcaPrzelewu} - ${pulpitData.kwotaPrzelewu},00PLN - ${pulpitData.tytulPrzelewu}`;
      await basePage.compareTextForElements(await actualText, expectedText);
    }
  );

  test(
    "correct balance after successful mobile top-up",
    {
      tag: ["@Pulpit", "@Payment", "@E2E"],
      annotation: {
        type: "smoke",
        description:
          "https://trello.com/c/JGqHUeoz/4-at-091-pulpit-correct-balance-after-successful-mobile-top-up-do%C5%82adowianie-telefonu",
      },
    },
    async ({ page }) => {
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
    }
  );
});
