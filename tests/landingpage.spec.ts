import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test('Landingpage has "Sign up" button', async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page.locator("text=Sign up for a free account")).toBeVisible();
  });

  test("User can log in", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.locator('input[type="text"]').click();
    await page.locator('input[type="text"]').fill("e2e");
    await page.locator('input[type="text"]').press("Tab");
    await page.locator('input[type="password"]').fill("e2e");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();
  });

  // test('test', async ({ page }) => {
  //   await page.getByRole('link', { name: 'Kontakte' }).click();
  //   await page.getByRole('link', { name: 'Kontakt erstellen' }).click();
  //   await page.locator('div').filter({ hasText: /^First namePlease provide a first name$/ }).getByRole('textbox').click();
  //   await page.locator('div').filter({ hasText: /^First namePlease provide a first name$/ }).getByRole('textbox').press('Tab');
  //   await expect(page.getByText('Please provide a first name')).toBeVisible();
  //   await page.locator('div').filter({ hasText: /^First namePlease provide a first name$/ }).getByRole('textbox').click();
  //   await page.locator('div').filter({ hasText: /^First namePlease provide a first name$/ }).getByRole('textbox').fill('Firstname');
  //   await page.locator('div').filter({ hasText: /^First namePlease provide a first name$/ }).getByRole('textbox').press('Tab');
  //   await page.locator('div').filter({ hasText: /^Last namePlease provide a last name$/ }).getByRole('textbox').fill('Lastname');
  //   await page.locator('div').filter({ hasText: /^Last namePlease provide a last name$/ }).getByRole('textbox').press('Tab');
  //   await page.locator('div').filter({ hasText: /^E-MailPlease provide a value$/ }).getByRole('textbox').fill('email@test.de');
  //   await page.locator('div').filter({ hasText: /^E-MailPlease provide a value$/ }).getByRole('textbox').press('Tab');
  //   await page.locator('div').filter({ hasText: /^Date of birthPlease provide a value$/ }).getByRole('textbox').fill('test');
  //   await page.locator('div').filter({ hasText: /^Date of birthPlease provide a value$/ }).getByRole('textbox').press('Tab');
  //   await page.getByPlaceholder('test', { exact: true }).click();
  //   await page.getByPlaceholder('test', { exact: true }).press('ControlOrMeta+a');
  //   await page.getByPlaceholder('test', { exact: true }).fill('dob');
  //   await page.locator('div').filter({ hasText: /^StreetPlease provide a value$/ }).getByRole('textbox').fill('street');
  //   await page.locator('div').filter({ hasText: /^ZIP CodePlease provide a value$/ }).getByRole('textbox').fill('23');
  //   await page.locator('div').filter({ hasText: /^CityPlease provide a value$/ }).getByRole('textbox').fill('city');
  //   await page.locator('div').filter({ hasText: /^CityPlease provide a value$/ }).getByRole('textbox').press('Tab');
  //   await page.getByRole('button', { name: 'Create contact' }).press('Enter');
  // });
});
