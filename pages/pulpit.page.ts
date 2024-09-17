import { expect, Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.components";

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  // Szybki Przelew (main page)
  odbiorcaPrzelewu = this.page.locator("#widget_1_transfer_receiver");
  kwotaPrzelewu = this.page.locator("#widget_1_transfer_amount");
  tytulPrzelewu = this.page.locator("#widget_1_transfer_title");
  buttonWykonajSzybkiPrzelew = this.page.locator("#execute_btn");

  // Doładowanie umeru telefonu (main page)
  odbiorcaDoladowania = this.page.locator("#widget_1_topup_receiver");
  kwotaDoladowania = this.page.locator("#widget_1_topup_amount");
  checkboxDoladowanie = this.page.locator("#uniform-widget_1_topup_agreement");
  buttonDoladujTelefon = this.page.locator("#execute_phone_btn");
  zamknijAlert = this.page.getByTestId("close-button");

  // Messages Alert Banner (main page)
  wiadomosciAlert = this.page.locator("#show_messages");

  // saldo konta
  saldoKonta = this.page.locator("#money_value.value-wrapper");

  async quickPayment(
    odbiorcaPrzelewu: string,
    kwotaPrzelewu: string,
    tytulPrzelewu: string
  ): Promise<void> {
    await this.odbiorcaPrzelewu.selectOption(odbiorcaPrzelewu);
    await this.kwotaPrzelewu.fill(kwotaPrzelewu);
    await this.tytulPrzelewu.fill(tytulPrzelewu);
    await this.buttonWykonajSzybkiPrzelew.click();
  }
}
