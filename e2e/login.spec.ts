import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { BasePage } from "../pages/base.page";

test.describe("User login to Demobank", () => {
  test(
    "successful login with correct credentials",
    {
      tag: ["@Login"],
      annotation: {
        type: "details",
        description:
          "https://trello.com/c/ruquyQmm/5-at-092-login-into-app-successful",
      },
    },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const basePage = new BasePage(page);

      // Arrange
      const user_name = loginPage.userName.innerText();

      // Act
      await loginPage.login(loginData.userId, loginData.userPass);

      // Assert
      await basePage.compareTextForElements(
        await user_name,
        loginData.userName
      );
    }
  );

  test(
    "unsuccessful login with too short username",
    {
      tag: ["@Login"],
      annotation: {
        type: "details",
        description:
          "https://trello.com/c/zmWseYZ7/6-at-093-login-into-app-unsuccessful-too-short-username",
      },
    },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const basePage = new BasePage(page);

      // Arrange
      const error_login_id = loginPage.errorLogin.innerText();

      // Act
      await loginPage.login(loginData.wrongUserId, loginData.userPass);

      // Assert
      await basePage.compareTextForElements(
        await error_login_id,
        loginPage.expected_error_id
      );
    }
  );

  test(
    "unsuccessful login with too short password",
    {
      tag: ["@Login"],
      annotation: {
        type: "details",
        description:
          "https://trello.com/c/dUdcOKnD/7-at-094-login-into-app-unsuccessful-too-short-password",
      },
    },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const basePage = new BasePage(page);

      // Arrange
      const error_login_password = loginPage.errorloginPass.innerText();

      // Act
      await loginPage.login(loginData.userId, loginData.wrongUserPass);

      // Assert
      await basePage.compareTextForElements(
        await error_login_password,
        loginPage.expected_error_pass
      );
    }
  );
});
