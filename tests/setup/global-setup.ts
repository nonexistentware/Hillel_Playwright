import { chromium } from "@playwright/test";
import { VALID_USER } from "../..//pom/test-data/user";
import { SignInForm } from "../..//pom/forms/SignInForm";
import fs from "fs";

const AUTH_FILE = "pom/test-data/states/auth.json";

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto("/");

    const signInForm = new SignInForm(page);

    await page.getByRole("button", { name: "Sign In" }).click();
    await signInForm.emailField.fill(VALID_USER.email);
    await signInForm.passwordField.fill(VALID_USER.password);
    await signInForm.loginButton.click();

    await page.waitForURL(/\/panel\/garage/);

    await page.context().storageState({ path: AUTH_FILE });

    await browser.close();
}

export default globalSetup;