import { Locator, Page } from "playwright-core";

class GaragePage{

    public readonly page: Page;
    public readonly garageTitle: Locator;
    public readonly addCarButton: Locator;
    public readonly lastAddedCar: Locator
    public readonly removeCarButton: Locator;
    public readonly confirmRemoveButton: Locator
    public readonly successRemoveAlert: Locator;
    public readonly successLoginMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.garageTitle = this.page.getByRole("heading", { name: "Garage" });
        this.addCarButton = this.page.locator('button', { hasText: 'Add car' });
        this.lastAddedCar = this.page.locator('.car-item').first();
        this.removeCarButton = this.page.locator('.btn-outline-danger');
        this.confirmRemoveButton = this.page.locator('.btn-danger');
        this.successRemoveAlert = this.page.locator('.alert-success p', { hasText: 'Car removed' });
        this.successLoginMessage = this.page.locator('div.alert.alert-success > p');

    }

}

export default GaragePage ;