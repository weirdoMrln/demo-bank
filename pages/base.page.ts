import { expect, Page } from "@playwright/test";

export class BasePage {
  constructor(private page: Page) {}

  async compareTextForElements(actualText: string, expectedText: string) {
    const actualElement = actualText.toString();
    expect(actualElement).toContain(expectedText);

    if (actualText != expectedText) {
      throw new Error(
        `Text in element ${actualText} is not equal to ${expectedText}`
      );
    } else {
      console.log(`Text in element ${actualText} is equal to ${expectedText}`);
    }
  }
}
