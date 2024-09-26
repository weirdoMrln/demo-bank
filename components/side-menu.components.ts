import { Page } from "@playwright/test";

export class SideMenuComponent {
    constructor(private page: Page) {}
    platnosciTab = this.page.getByRole('link', { name: "płatności" });
    kontaOsobisteTab = this.page.getByRole('link', { name: "konta osobiste" });

}