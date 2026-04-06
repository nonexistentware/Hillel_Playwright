import { test, expect } from "@playwright/test";
import HomePage from "../pom/pages/HomePage";
import GaragePage from "../pom/pages/GaragePage";
import RegistrationForm from "../pom/forms/RegistrationForm";
import { VALID_USER } from "../pom/test-data/user";

test.describe("Registration form fields validation", () => {
  let homePage: HomePage;
  let registrationForm: RegistrationForm;
  let garagePage: GaragePage;


test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  registrationForm = new RegistrationForm(page);
  garagePage = new GaragePage(page);

  await page.goto("/");
  await homePage.signInButton.click();
});

test.describe('First Name field validation rules', () => {

test("Left the field name empty", async ({ page }) => {
  await registrationForm.firstName.focus();
  await registrationForm.firstName.blur();
  await expect(registrationForm.validationMessage).toHaveText("Name required");
});
 

test("Checkl that 1 char is not enough for the name field", async ({page}) => {
  await registrationForm.firstName.fill("a");
  await registrationForm.firstName.blur();
  await expect(registrationForm.validationMessage).toHaveText("Name has to be from 2 to 20 characters long");
});

test("Check that 21 chars is not allowed for the name field", async ({page}) => {
  await registrationForm.firstName.fill("a".repeat(21));
  await registrationForm.firstName.blur();
  await expect(registrationForm.validationMessage).toHaveText("Name has to be from 2 to 20 characters long");
});

test("Check that 2 chars is allowed for the name field", async ({page}) => {
  await registrationForm.firstName.fill("ab");
  await registrationForm.firstName.blur();
  await expect(registrationForm.validationMessage).toBeHidden();
});

  test("Check that warning message has red color", async ({page}) => {
    await page.locator("#signupName").focus();
    await page.locator("#signupName").blur();
    await expect(registrationForm.validationMessage).toHaveCSS("color", "rgb(220, 53, 69)");
  });
});

test.describe("Last Name field validation rules", () => {

  test("Left the field last name empty", async ({ page }) => {
    await registrationForm.lastName.focus();
    await registrationForm.lastName.blur();
    await expect(registrationForm.validationMessage).toHaveText("Last name required");
  });

  test("Check that wrong data appeared", async ({ page }) => {
    await registrationForm.lastName.fill("$^$#^436");
    await registrationForm.lastName.blur();
    await expect(registrationForm.validationMessage).toHaveText("Last name is invalid");
  });
  
  test("Check that that 1 char is not enough for the name field", async ({page}) => {
    await registrationForm.lastName.fill("a");
    await registrationForm.lastName.blur();
    await expect(registrationForm.validationMessage).toHaveText("Last name has to be from 2 to 20 characters long");
  });

  test("Check that that 21 chars is not allowed for the name field", async ({page}) => {
    await registrationForm.lastName.fill("a".repeat(21));
    await registrationForm.lastName.blur();
    await expect(registrationForm.validationMessage).toHaveText("Last name has to be from 2 to 20 characters long");
  });

  test("Check that that 2 chars is allowed for the name field", async ({page}) => {
    await registrationForm.lastName.fill("ab");
    await registrationForm.lastName.blur();
    await expect(registrationForm.validationMessage).toBeHidden();
  });

  test("Check that warning message has red color", async ({page}) => {
    await registrationForm.lastName.focus();
    await registrationForm.lastName.blur();
    await expect(registrationForm.validationMessage).toHaveCSS("color", "rgb(220, 53, 69)");
  });
});

test.describe('Email field validation rules', () => {

test("Check that wrong email format is not allowed", async ({ page }) => {
  await registrationForm.email.fill("@#%@#%");
  await registrationForm.email.blur();
  await expect(registrationForm.validationMessage).toHaveText("Email is incorrect");
});

test("Left the field email empty", async ({ page }) => {
  await registrationForm.email.focus();
  await registrationForm.email.blur();
  await expect(registrationForm.validationMessage).toHaveText("Email required");
});

test("Check that warning message has red color", async ({page}) => {
  await registrationForm.email.focus();
  await registrationForm.email.blur();
  await expect(registrationForm.validationMessage).toHaveCSS("color", "rgb(220, 53, 69)");

});
});

test.describe('Password field validation rules', () => {

  test("Check that passwrod lens can't be less than 8 chars", async ({ page }) => {
    await registrationForm.password.fill("1234567");
    await registrationForm.password.blur();
    await expect(registrationForm.validationMessage).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
  });

  test("Check that 15 symbols is allowed for the password field ", async ({ page }) => {
    await registrationForm.password.fill("Q1w2e3r4t5y6u7;");
    await registrationForm.password.blur();
    await expect(registrationForm.validationMessage).toBeHidden();
  });

  test("Check that passwrod lens can't be more than 15 chars", async ({ page }) => {
    await registrationForm.password.fill("Q1w2e3r4t5y6u7;!");
    await registrationForm.password.blur();
    await expect(registrationForm.validationMessage).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
  });

  test("Check that password field can't be empty", async ({ page }) => {
    await registrationForm.password.focus();
    await registrationForm.password.blur();
    await expect(registrationForm.validationMessage).toHaveText("Password required");
  });

  test("Check that warning message has red color", async ({page}) => {
    await registrationForm.password.focus();
    await registrationForm.password.blur();
    await expect(registrationForm.validationMessage).toHaveCSS("color", "rgb(220, 53, 69)");

});
});

test.describe('Cehck validation fules for the Re-enter password field', () => {

  test("Cehck that password should be the same as in the password field", async ({ page }) => {
    await registrationForm.password.fill("Q1w2e3r4t5y;");
    await registrationForm.password.blur();
    await registrationForm.confirmPassword.fill("Q1w2e3r4t5y6;");
    await registrationForm.confirmPassword.blur();
    await expect(registrationForm.validationMessage).toHaveText("Passwords do not match");
  });

  test("Check that Re-enter password field can't be empty", async ({ page }) => {
    await registrationForm.password.fill("Q1w2e3r4t5y;");
    await registrationForm.password.blur();
    await registrationForm.confirmPassword.focus();
    await registrationForm.confirmPassword.blur();
    await expect(registrationForm.validationMessage).toHaveText("Re-enter password required");
});

test("Check that warning message has red color", async ({page}) => {
    await registrationForm.confirmPassword.fill("3235");
  await registrationForm.confirmPassword.focus();
  await registrationForm.confirmPassword.blur();
  await expect(registrationForm.validationMessage).toHaveCSS("color", "rgb(220, 53, 69)");
});
});

test.describe("Cehck login button", () => {

test("Check that new customer could be registered", async ({ page }) => {
  await page.context().storageState({ path: "./pom/test-data/states/initialstorageState.json" });
  const email = `test${Date.now()}@gmail.com`;
  await registrationForm.firstName.fill("Test");
  await registrationForm.lastName.fill("Test");
  await registrationForm.email.fill(email);
  await registrationForm.password.fill(VALID_USER.password);
  await registrationForm.confirmPassword.fill(VALID_USER.password);
  await expect(registrationForm.registrationButton).toBeEnabled();
  await registrationForm.registrationButton.click();
  await expect(page).toHaveURL(/panel\/garage/);
  await expect(garagePage.garageTitle).toBeVisible();
  await page.context().storageState({ path: "./pom/test-data/states/finalStorageState.json" });
});

test("Check that registartion button is disabled if were inputted invalid data ", async ({ page }) => {
  await page.locator("#signupName").fill("34");
  await page.locator("#signupLastName").fill("325");
  await page.locator("#signupEmail").fill("235@");
  await page.locator("#signupPassword").fill("Q1w2e3r4t");
  await page.locator("#signupRepeatPassword").fill("Q1w2e3r4t5y;");
  await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
});

});
});