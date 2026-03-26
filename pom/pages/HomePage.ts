import { Locator, Page } from "playwright-core";

class HomePage {

    private readonly page: Page;
    public readonly signInButton: Locator;
    public readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = this.page.locator('button.hero-descriptor_btn.btn.btn-primary');
        this.loginButton = this.page.locator('.btn.btn-outline-white.header_signin'); 
    }
}

export default HomePage;