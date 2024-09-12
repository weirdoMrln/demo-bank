import { expect, Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.components";

export class PaymentPage {
  constructor(private page: Page) {}

  // Przelew  - zakładka "platnosci"

  sideMenu = new SideMenuComponent(this.page);

  saldoKonta = this.page.locator("#money_value.value-wrapper");
  odbiorcaPrzelewuField = this.page.getByTestId("transfer_receiver");
  numerKontaField = this.page.getByTestId("form_account_to");
  kwotaPrzelewuField = this.page.getByTestId("form_amount");
  tytulPrzelewuField = this.page.getByTestId("form_title");

  checkboxEkspresowyPrzelew = this.page.getByLabel("ekspresowy");

  buttonWykonajPrzelew = this.page.getByRole("button", { name: "wykonaj" });

  async zrobPrzelew(
    transfer_receiver: string,
    account_number: string,
    amount: string,
    title: string
  ): Promise<void> {
    await this.odbiorcaPrzelewuField.fill(transfer_receiver);
    await this.numerKontaField.fill(account_number);
    await this.kwotaPrzelewuField.fill(amount);
    await this.tytulPrzelewuField.fill(title);

    await this.checkboxEkspresowyPrzelew.check();
    await this.buttonWykonajPrzelew.click();
  }
}
