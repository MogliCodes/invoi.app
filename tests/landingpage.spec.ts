import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test('Landingpage has "Sign up" button', async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page.locator("text=Sign up for a free account")).toBeVisible();
  });
});
