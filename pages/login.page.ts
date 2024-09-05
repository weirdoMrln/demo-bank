import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId("login-input");
  passwordInput = this.page.getByTestId("password-input");
  loginButton = this.page.getByTestId("login-button");
  clickSomewhere = this.page.locator("#header_2");

  async login(userId: string, userPass: string) {
    await this.loginInput.fill(userId);
    await this.passwordInput.fill(userPass);
    await this.clickSomewhere.click();
    if (await this.loginButton.isDisabled()) {
      console.log("Login button is disabled");
    } else {
      await this.loginButton.click();
    }
  }
}
