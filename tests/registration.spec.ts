import { test, expect } from "@playwright/test";

test.describe("Registration form fields validation", () => {

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign up" }).click();
});

test.describe('First Name field validation rules', () => {

test("Left the field name empty", async ({ page }) => {
  await page.locator("#signupName").focus();
  await page.locator("#signupName").blur();
  await expect(page.locator(".invalid-feedback")).toHaveText("Name required");
});

test("Checkl that 1 char is not enough for the name field", async ({page}) => {
  await page.locator("#signupName").fill("a");
  await page.locator("#signupName").blur();
  await expect(page.locator(".invalid-feedback")).toHaveText("Name has to be from 2 to 20 characters long");
});

test("Check that 21 chars is not allowed for the name field", async ({page}) => {
  await page.locator("#signupName").fill("a".repeat(21));
  await page.locator("#signupName").blur();
  await expect(page.locator(".invalid-feedback")).toHaveText("Name has to be from 2 to 20 characters long");
});

test("Check that 2 chars is allowed for the name field", async ({page}) => {
  await page.locator("#signupName").fill("ab");
  await page.locator("#signupName").blur();
  await expect(page.locator(".invalid-feedback")).toBeHidden();
});

  test("Check that warning message has red color", async ({page}) => {
    await page.locator("#signupName").focus();
    await page.locator("#signupName").blur();
    await expect(page.locator(".invalid-feedback")).toHaveCSS("color", "rgb(220, 53, 69)");
  });
});

test.describe("Last Name field validation rules", () => {

  test("Left the field last name empty", async ({ page }) => {
    await page.locator("#signupLastName").focus();
    await page.locator("#signupLastName").blur();
    await expect(page.locator(".invalid-feedback")).toHaveText("Last name required");
  });

  test("Check that wrong data appeared", async ({ page }) => {
    await page.locator("#signupLastName").fill("$^$#^436");
    await page.locator("#signupLastName").blur();
    await expect(page.locator(".invalid-feedback")).toHaveText("Last name is invalid");
  });
  
  test("Check that that 1 char is not enough for the name field", async ({page}) => {
    await page.locator("#signupLastName").fill("a");
    await page.locator("#signupLastName").blur();
    await expect(page.locator(".invalid-feedback")).toHaveText("Last name has to be from 2 to 20 characters long");
  });

  test("Check that that 21 chars is not allowed for the name field", async ({page}) => {
    await page.locator("#signupLastName").fill("a".repeat(21));
    await page.locator("#signupLastName").blur();
    await expect(page.locator(".invalid-feedback")).toHaveText("Last name has to be from 2 to 20 characters long");
  });

  test("Check that that 2 chars is allowed for the name field", async ({page}) => {
    await page.locator("#signupLastName").fill("ab");
    await page.locator("#signupLastName").blur();
    await expect(page.locator(".invalid-feedback")).toBeHidden();
  });

  test("Check that warning message has red color", async ({page}) => {
    await page.locator("#signupLastName").focus();
    await page.locator("#signupLastName").blur();
    await expect(page.locator(".invalid-feedback")).toHaveCSS("color", "rgb(220, 53, 69)");
  });
});

test.describe('Email field validation rules', () => {

test("Check that wrong email format is not allowed", async ({ page }) => {
  await page.locator("#signupEmail").fill("@#%@#%");
  await page.locator("#signupEmail").blur();
  await expect(page.locator(".invalid-feedback")).toHaveText("Email is incorrect");
});

test("Left the field email empty", async ({ page }) => {
  await page.locator("#signupEmail").focus();
  await page.locator("#signupEmail").blur();
  await expect(page.locator(".invalid-feedback")).toHaveText("Email required");
});

test("Check that warning message has red color", async ({page}) => {
  await page.locator("#signupEmail").focus();
  await page.locator("#signupEmail").blur();
  await expect(page.locator(".invalid-feedback")).toHaveCSS("color", "rgb(220, 53, 69)");

});
});

test.describe('Password field validation rules', () => {

  test("Check that passwrod lens can't be less than 8 chars", async ({ page }) => {
    await page.locator("#signupPassword").fill("1234567");
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback")).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
  });

  test("Check that 15 symbols is allowed for the password field ", async ({ page }) => {
    await page.locator("#signupPassword").fill("Q1w2e3r4t5y6u7;");
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback")).toBeHidden();
  });

  test("Check that passwrod lens can't be more than 15 chars", async ({ page }) => {
    await page.locator("#signupPassword").fill("Q1w2e3r4t5y6u7;!");
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback")).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
  });

  test("Check that password field can't be empty", async ({ page }) => {
    await page.locator("#signupPassword").focus();
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback")).toHaveText("Password required");
  });

  test("Check that warning message has red color", async ({page}) => {
    await page.locator("#signupPassword").focus();
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback")).toHaveCSS("color", "rgb(220, 53, 69)");

});
});

test.describe('Cehck validation fules for the Re-enter password field', () => {

  test("Cehck that password should be the same as in the password field", async ({ page }) => {
    await page.locator("#signupPassword").fill("Q1w2e3r4t5y;");
    await page.locator("#signupPassword").blur();
    await page.locator("#signupRepeatPassword").fill("Q1w2e3r4t5y6;");
    await page.locator("#signupRepeatPassword").blur();
    await expect(page.locator(".invalid-feedback")).toHaveText("Passwords do not match");
  });

  test("Check that Re-enter password field can't be empty", async ({ page }) => {
    await page.locator("#signupPassword").fill("Q1w2e3r4t5y;");
    await page.locator("#signupPassword").blur();
    await page.locator("#signupRepeatPassword").focus();
    await page.locator("#signupRepeatPassword").blur();
    await expect(page.locator(".invalid-feedback")).toHaveText("Re-enter password required");
});

test("Check that warning message has red color", async ({page}) => {
    await page.locator("#signupRepeatPassword").fill("3235");
  await page.locator("#signupRepeatPassword").focus();
  await page.locator("#signupRepeatPassword").blur();
  await expect(page.locator(".invalid-feedback")).toHaveCSS("color", "rgb(220, 53, 69)");
});
});

test.describe("Cehck login button", () => {

test("Cehgck that new customer could be registered", async ({ page }) => {
  await page.locator("#signupName").fill("Test");
  await page.locator("#signupLastName").fill("Test");
  const email = `test${Date.now()}@gmail.com`;
  await page.locator("#signupEmail").fill(email)
  await page.locator("#signupPassword").fill("Q1w2e3r4t5y;");
  await page.locator("#signupRepeatPassword").fill("Q1w2e3r4t5y;");
  await expect(page.getByRole("button", { name: "Register" })).toBeEnabled();
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("Registration complete")).toBeVisible();
  await page.locator("h1").highlight();
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