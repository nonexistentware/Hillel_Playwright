import { Locator, Page } from "playwright-core";

class GaragePage {

    public readonly page: Page;
    public readonly garageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.garageTitle = this.page.getByRole("heading", { name: "Garage" });
    }

}

export default GaragePage;