import { test as base } from "@playwright/test";
import GaragePage from "../pom/pages/GaragePage";

const AUTH_FILE = "pom/test-data/states/finalStorageState.json";

type userGaragePage = {
    userGaragePage: GaragePage;
};

export const test = base.extend<userGaragePage>({
    userGaragePage: async ({ browser }, use) => {
        // Використовуємо збережений storage state — юзер одразу залогінений
        const context = await browser.newContext({
            storageState: AUTH_FILE,
        });
        const page = await context.newPage();
        await page.goto("/panel/garage");
        const garagePage = new GaragePage(page);
        await use(garagePage);
        await context.close();
    },
});

export { expect } from "@playwright/test";