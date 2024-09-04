import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  const USERID = "testerLO";
  const USERPASS = "12345678";

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("successful login with correct credentials", async ({ page }) => {
    // Arrange
    const USER_NAME = "Jan Demobankowy";

    // Act
    await page.getByTestId("login-input").fill(USERID);
    await page.getByTestId("password-input").fill(USERPASS);
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(USER_NAME);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    // Arrange
    const WRONG_USERID = "tester";

    // Act
    await page.getByTestId("login-input").fill(WRONG_USERID);
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill(USERPASS);
    await page.getByTestId("error-login-id").click();

    // Assert
    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków",
    );
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    // Arrange
    const WRONG_USERPASS = "1234";

    // Act
    await page.getByTestId("login-input").fill(USERID);
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill(WRONG_USERPASS);
    await page.getByTestId("password-input").blur();

    // Assert
    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków",
    );
  });
});
