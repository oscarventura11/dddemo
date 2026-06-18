import { createBdd } from "playwright-bdd";
import { test } from "./fixtures";
import { expect } from "@playwright/test";

const { When, Then } = createBdd(test);

When("I select the {string} role", async ({ page }, roleName) => {
  await page.getByRole("combobox", { name: "Role" }).click();
  await page.getByRole("option", { name: roleName }).click();
});

When("I enter {string} as email", async ({ page }, email) => {
  await page.getByLabel("Email (for Whitelist)").fill(email);
});

Then("the {string} button should be visible", async ({ page }, buttonText) => {
  await expect(page.getByRole("button", { name: buttonText })).toBeVisible();
});

Then("the {string} button should be enabled", async ({ page }, buttonText) => {
  await expect(page.getByRole("button", { name: buttonText })).toBeEnabled();
});

Then("the {string} button should be disabled", async ({ page }, buttonText) => {
  await expect(page.getByRole("button", { name: buttonText })).toBeDisabled();
});

Then("I should see the {string} button", async ({ page }, buttonText) => {
  await expect(page.getByRole("button", { name: buttonText })).toBeVisible();
});

Then("I should see the {string} banner", async ({ page }, bannerText) => {
  await expect(page.getByText(bannerText)).toBeVisible();
});
