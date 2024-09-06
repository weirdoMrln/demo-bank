import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId("login-input");
  passwordInput = this.page.getByTestId("password-input");
  loginButton = this.page.getByTestId("login-button");
  clickSomewhere = this.page.locator("#header_2");
  userName = this.page.getByTestId("user-name");
  errorLogin = this.page.getByTestId("error-login-id");
  expected_error_id = "identyfikator ma min. 8 znaków";
  errorloginPass = this.page.getByTestId("error-login-password");
  expected_error_pass = "hasło ma min. 8 znaków";

  async login(userId: string, userPass: string) {
    await this.page.goto("/");
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
