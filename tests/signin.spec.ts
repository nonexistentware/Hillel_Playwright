import { test, expect } from "@playwright/test";
import HomePage from "../pom/pages/HomePage";
import GaragePage from "../pom/pages/GaragePage";
import { SignInForm } from "../pom/forms/SignInForm";
import { VALID_USER } from "../pom/test-data/user";

test.describe("Sign in form fields validation", () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await page.goto("/");
        await homePage.loginButton.click();
    });

    test.describe('Login check', () => {
            test("Valid login credentials", async ({ page }) => {
                await page.context().storageState({ path: "./pom/test-data/states/initialstorageState.json" });
                await signInForm.emailField.fill(VALID_USER.email);
                await signInForm.passwordField.fill(VALID_USER.password);
                await expect(signInForm.loginButton).toBeEnabled();
                await signInForm.loginButton.click();
                await expect(page).toHaveURL(/\/panel\/garage/);
                await expect(signInForm.successLoginMessage).toBeVisible();
                await expect(garagePage.garageTitle).toBeVisible();
                await page.context().storageState({ path: "./pom/test-data/states/finalStorageState.json" });

        });
  });
});
