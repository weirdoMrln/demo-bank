import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";

test.describe("User login to Demobank", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("successful login with correct credentials", async ({ page }) => {

    // Act
    await page.getByTestId("login-input").fill(loginData.userId);
    await page.getByTestId("password-input").fill(loginData.userPass);
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(loginData.userName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    // Act
    await page.getByTestId("login-input").fill(loginData.wrongUserId);
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill(loginData.userPass);
    await page.getByTestId("error-login-id").click();

    // Assert
    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków",
    );
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    // Act
    await page.getByTestId("login-input").fill(loginData.userId);
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill(loginData.wrongUserPass);
    await page.getByTestId("password-input").blur();

    // Assert
    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków",
    );
  });
});
