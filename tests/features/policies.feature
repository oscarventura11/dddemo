Feature: Policy Enforcement

  Background:
    Given I am on the home page

  Scenario: Admin can see the submit button enabled
    When I select the "Admin (Can Submit)" role
    And I click on the "Electronics" expand button
    And I select the "Smartphones" category
    Then the "Submit Selection" button should be visible
    And the "Submit Selection" button should be enabled

  Scenario: Regular user cannot see the submit button enabled
    When I select the "Regular User (Blocked)" role
    Then I should see the "Admin Only" button
    And the "Admin Only" button should be disabled

  Scenario: Whitelisted email bypasses role restrictions
    When I select the "Regular User (Blocked)" role
    And I enter "allowed@domain.com" as email
    And I click on the "Electronics" expand button
    And I select the "Smartphones" category
    Then the "Submit Selection" button should be visible
    And the "Submit Selection" button should be enabled

  Scenario: Under construction banner visibility in development
    Then I should see the "⚠️ UNDER CONSTRUCTION - DEV ONLY ⚠️" banner
