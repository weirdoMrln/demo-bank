import { expect, Page } from "@playwright/test";

export class PulpitPage {
  constructor(private page: Page) {}

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

  // Przelew  - zakładka "platnosci"
  saldoKonta = this.page.locator("#money_value.value-wrapper");
  platnosciTab = this.page.getByRole("tab", { name: "platnosci" });
  odbiorcaPrzelewuField = this.page.getByTestId("transfer_receiver");
  numerKontaField = this.page.getByTestId("form_account_to");
  kwotaPrzelewuField = this.page.getByTestId("form_amount");
  tytulPrzelewuField = this.page.getByTestId("form_title");
  checkboxEkspresowyPrzelew = this.page.getByLabel("ekspresowy");
  buttonWykonajPrzelew = this.page.getByRole("button", { name: "wykonaj" });
}
