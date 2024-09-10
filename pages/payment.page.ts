import { expect, Page } from "@playwright/test";

export class PaymentPage {
  constructor(private page: Page) {}
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
