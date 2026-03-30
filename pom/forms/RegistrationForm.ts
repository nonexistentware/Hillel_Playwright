import { Locator, Page } from "playwright-core";


class RegistrationForm {

    public readonly page: Page;
    public readonly firstName: Locator;
    public readonly lastName: Locator;
    public readonly email: Locator;
    public readonly password: Locator;
    public readonly confirmPassword: Locator;
    public readonly registrationButton: Locator;
    public readonly validationMessage: Locator;
    public readonly registrationSuccessMessage: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.firstName = this.page.locator("#signupName");
        this.lastName = this.page.locator("#signupLastName");
        this.email = this.page.locator("#signupEmail");
        this.password = this.page.locator("#signupPassword");
        this.confirmPassword = this.page.locator("#signupRepeatPassword");
        this.registrationButton = this.page.locator("button.btn.btn-primary").last();
        this.validationMessage = this.page.locator(".invalid-feedback");
        this.registrationSuccessMessage = this.page.getByText("Registration complete");
    }

    async registartion (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
        await this.registrationButton.click();
    }

}

export default RegistrationForm;