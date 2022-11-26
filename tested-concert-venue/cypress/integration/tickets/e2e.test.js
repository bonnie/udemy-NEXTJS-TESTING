it("completes the ticket purchase flow, starting not signed in", () => {
  // load shows page
  cy.task("db:reset").visit("/");
  cy.findByRole("button", { name: /shows/i }).click();

  // click second tickets button
  cy.findAllByRole("button", { name: /tickets/i })
    .last()
    .click();

  // get sign in page, and sign in
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));

  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_PASSWORD"));

  cy.findByRole("main").within(() =>
    cy.findByRole("button", { name: /sign in/i }).click()
  );

  // check for correct band name, and 100 tickets left
  cy.findByRole("heading", { name: /the joyous nun riot/i }).should("exist");
  cy.findByText(/100 seats left/i).should("exist");

  // purchase 5 tickets
  cy.findByRole("spinbutton").clear().type("5");
  cy.findByRole("button", { name: /purchase/i }).click();

  // check for confirmation
  cy.findByText(/5 seats confirmed/i).should("exist");

  // check that new reservation appears on user page
  cy.findByRole("button", { name: /see all purchases/i }).click();
  cy.findByText(/the joyous nun riot/i).should("exist");

  // wait 0.5 seconds to avoid race conditions
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500);

  // check that the number of tickets on reservation page has reduced to 95
  cy.findByRole("button", { name: /shows/i }).click();

  // click second (and last) tickets button
  cy.findAllByRole("button", { name: /tickets/i })
    .last()
    .click();

  cy.findByText(/95 seats left/i).should("exist");

  // sign out
  cy.findByRole("button", { name: /sign out/i }).click();
  cy.findByText(Cypress.env("TEST_USER_EMAIL")).should("not.exist");
});
