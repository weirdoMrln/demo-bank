import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { BasePage } from "../pages/base.page";

test.describe("User login to Demobank", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("successful login with correct credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const user_name = page.getByTestId("user-name").innerText();
    // Act
    await loginPage.login(loginData.userId, loginData.userPass);
    // Assert
    await basePage.compareTextForElements(await user_name, loginData.userName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const error_login_id = page.getByTestId("error-login-id").innerText();
    const expected_error = "identyfikator ma min. 8 znaków";
    // Act
    await loginPage.login(loginData.wrongUserId, loginData.userPass);
    // Assert
    await basePage.compareTextForElements(await error_login_id, expected_error);
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const error_login_password = page
      .getByTestId("error-login-password")
      .innerText();
    const expected_error = "hasło ma min. 8 znaków";
    // Act
    await loginPage.login(loginData.userId, loginData.wrongUserPass);
    // Assert
    await basePage.compareTextForElements(
      await error_login_password,
      expected_error
    );
  });
});
