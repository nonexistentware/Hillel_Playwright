import { test, expect } from "../fixtures/userGaragePage.fixture";

test.describe("Garage Page", () => {
    test("should display garage title when user is logged in", async ({ userGaragePage }) => {
        await expect(userGaragePage.garageTitle).toBeVisible();
        await expect(userGaragePage.garageTitle).toHaveText("Garage");
    });
});