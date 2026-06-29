import { createBdd } from "playwright-bdd";
import { test } from "./fixtures";
import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const { Given, When, Then } = createBdd(test);

const dddPanel = (page: Page) =>
  page.locator("div").filter({
    has: page.getByRole("heading", { name: "DDD Refactored Version" }),
  });

Given("I am on the home page", async ({ page }) => {
  await page.goto("/");
});

When("I click on the {string} expand button", async ({ page }, name) => {
  const listItem = dddPanel(page)
    .getByText(name, { exact: true })
    .locator("xpath=ancestor::li[1]");
  await listItem.getByRole("button").nth(1).click();
});

When("I click on the {string} collapse button", async ({ page }, name) => {
  const listItem = dddPanel(page)
    .getByText(name, { exact: true })
    .locator("xpath=ancestor::li[1]");
  await listItem.getByRole("button").nth(1).click();
});

When("I select the {string} category", async ({ page }, name) => {
  const listItem = dddPanel(page)
    .getByText(name, { exact: true })
    .locator("xpath=ancestor::li[1]");
  await listItem.locator('[role="button"]').first().click();
});

Then("I should see the {string} category", async ({ page }, name) => {
  await expect(dddPanel(page).getByText(name, { exact: true })).toBeVisible();
});

Then("I should not see the {string} category", async ({ page }, name) => {
  await expect(
    dddPanel(page).getByText(name, { exact: true }),
  ).not.toBeVisible();
});

Then("the {string} category should be selected", async ({ page }, name) => {
  const listItem = dddPanel(page)
    .getByText(name, { exact: true })
    .locator("xpath=ancestor::li[1]");
  const checkbox = listItem.locator('input[type="checkbox"]');
  await expect(checkbox).toBeChecked();
});
