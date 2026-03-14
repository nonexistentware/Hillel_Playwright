import { Locator, Page } from "playwright-core";

class HomePage {

    private readonly page: Page;
    public readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = this.page.locator('button.hero-descriptor_btn.btn.btn-primary');
    }
}

export default HomePage;