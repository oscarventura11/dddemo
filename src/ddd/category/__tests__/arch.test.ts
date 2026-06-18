import { expect, test } from "vitest";
import { filesOfProject } from "tsarch";

test("Domain layer should not depend on Application, Infrastructure or Presentation", async () => {
  const violations = await filesOfProject("tsconfig.app.json")
    .matchingPattern("src/ddd/category/domain/(?!.*(__tests__|mothers)).*")
    .shouldNot()
    .dependOnFiles()
    .matchingPattern(
      "src/ddd/category/(application|infrastructure|presentation)/.*",
    )
    .check();

  expect(violations).toEqual([]);
}, 15000);

test("Application layer should not depend on Infrastructure or Presentation", async () => {
  const violations = await filesOfProject("tsconfig.app.json")
    .matchingPattern("src/ddd/category/application/(?!.*__tests__).*")
    .shouldNot()
    .dependOnFiles()
    .matchingPattern("src/ddd/category/(infrastructure|presentation)/.*")
    .check();

  expect(violations).toEqual([]);
});

test("Infrastructure layer should not depend on Presentation", async () => {
  const violations = await filesOfProject("tsconfig.app.json")
    .matchingPattern("src/ddd/category/infrastructure/(?!.*__tests__).*")
    .shouldNot()
    .dependOnFiles()
    .matchingPattern("src/ddd/category/presentation/.*")
    .check();

  expect(violations).toEqual([]);
});

test("Files in application services should have correct naming suffix", async () => {
  const violations = await filesOfProject("tsconfig.app.json")
    .matchingPattern("src/ddd/category/application/services/(?!.*__tests__).*")
    .should()
    .matchPattern(".*(ReadService|WriteService)\.ts")
    .check();

  expect(violations).toEqual([]);
});

test("Files in application state should have correct naming suffix", async () => {
  const violations = await filesOfProject("tsconfig.app.json")
    .matchingPattern("src/ddd/category/application/state/(?!.*__tests__).*")
    .should()
    .matchPattern(".*State\.ts")
    .check();

  expect(violations).toEqual([]);
});

test("Presentation components should have correct naming suffix", async () => {
  const violations = await filesOfProject("tsconfig.app.json")
    .matchingPattern("src/ddd/category/presentation/(?!.*__tests__).*")
    .should()
    .matchPattern(".*(Component|Container|Skeleton|\\.route)\\.tsx")
    .check();

  expect(violations).toEqual([]);
});

test("Domain exceptions should have correct naming suffix", async () => {
  const violations = await filesOfProject("tsconfig.app.json")
    .matchingPattern("src/ddd/category/domain/exceptions/(?!.*__tests__).*")
    .should()
    .matchPattern(".*Error\.ts")
    .check();

  expect(violations).toEqual([]);
});
