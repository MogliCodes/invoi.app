import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test('Landingpage has "Sign up" button', async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page.locator("text=Sign up for a free account")).toBeVisible();
  });

  test("User can log in", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("link", { name: "Login" }).click();
    await page.locator('input[type="text"]').click();
    await page.locator('input[type="text"]').fill("e2e");
    await page.locator('input[type="text"]').press("Tab");
    await page.locator('input[type="password"]').fill("e2e");
    await page.locator('input[type="password"]').press("Tab");
    await page.getByRole("button", { name: "Login" }).press("Enter");

    // Wait for navigation to dashboard
    await page.waitForURL("**/dashboard");

    // Verify the user is on the dashboard
    await expect(page).toHaveURL("http://localhost:3000/dashboard");
    await page.goto("http://localhost:3000/dashboard");
    await page.getByRole("link", { name: "Contacts", exact: true }).click();
    await page.getByRole("link", { name: "Import contacts" }).click();
    await page.getByRole("button", { name: "Create demo data" }).click();
    // add timeout 1s
    await page.waitForTimeout(2000);
    await page.getByRole("link", { name: "Contacts" }).click();
    await page.getByTestId("toggleAllContacts").check();
    await page.getByText("Choose an action").click();
    await page.getByRole("option", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Apply" }).click();
    await page.getByRole("button", { name: "Delete" }).click();

    await page.waitForTimeout(2000);
    await expect(page).toHaveURL("http://localhost:3000/contacts");
    await page.goto("http://localhost:3000/dashboard");
  });
});
