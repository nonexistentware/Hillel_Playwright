import { test, expect } from '@playwright/test';

test('should display Igor Sinchuk on profile page', async ({ page }) => {
  await page.route('**/api/users/profile', async route => {
    const response = await route.fetch();
    const json = await response.json();

    const patchedJson = {
      ...json,
      name: 'Test',
      lastName: 'Playwright',
      data: json.data
        ? {
            ...json.data,
            name: 'Test',
            lastName: 'Playwright',
          }
        : json.data,
    };

    await route.fulfill({
      response,
      json: patchedJson,
    });
  });

  await page.goto('https://qauto.forstudy.space/panel/profile', {
    waitUntil: 'domcontentloaded',
  });

  await expect(page).toHaveURL(/\/panel\/profile/);
  await expect(page.getByText('Test Playwright')).toBeVisible();
});