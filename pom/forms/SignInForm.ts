import { Locator, Page } from "playwright-core";

class SignInForm {
    public readonly page: Page;
    public readonly formTitle: Locator;
    public readonly emailField: Locator;
    public readonly passwordField: Locator;
    public readonly loginButton: Locator;
    public readonly validationError: Locator;
    public readonly wrongDataError: Locator;
    public readonly closeButton: Locator;
    public readonly registrationButton: Locator;
    public readonly forgotPasswordButton: Locator;
    public readonly registrationHeading: Locator;
    public readonly successLoginMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formTitle = this.page.locator('.modal-title', { hasText: 'Log in' });
        this.emailField = this.page.locator('#signinEmail');
        this.passwordField = this.page.locator('#signinPassword');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.validationError = this.page.locator('div.invalid-feedback p');
        this.wrongDataError = this.page.locator('p.alert-danger');
        this.closeButton = this.page.locator('button.close');
        this.registrationButton = this.page.getByRole('button', { name: 'Registration' });
        this.forgotPasswordButton = this.page.getByRole('button', { name: 'Forgot Password' });
        this.registrationHeading = this.page.getByRole('heading', { name: 'Registration' });
        this.successLoginMessage = this.page.locator('div.alert.alert-success > p');
    }
    
    async login(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

}

export { SignInForm };