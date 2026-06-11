Feature: Category Tree

  Background:
    Given I am on the home page

  Scenario: Expand a category
    When I click on the "Electronics" expand button
    Then I should see the "Computers" category

  Scenario: Select a category
    When I click on the "Electronics" expand button
    And I select the "Smartphones" category
    Then the "Smartphones" category should be selected

  Scenario: Expand a nested category
    When I click on the "Electronics" expand button
    And I click on the "Computers" expand button
    Then I should see the "Laptops" category

  Scenario: Collapse a category
    When I click on the "Electronics" expand button
    And I click on the "Electronics" collapse button
    Then I should not see the "Computers" category
