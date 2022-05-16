it("displays bands when skipping client-side bundle, confirming initial ISR", () => {
  // reference: https://glebbahmutov.com/blog/ssr-e2e/
  cy.request("/bands")
    .its("body")
    .then((html) => {
      // remove the application code bundle so that it doesn't override the static generation
      const staticHtml = html.replace('<script src="/bundle.js"></script>', "");
      cy.state("document").write(staticHtml);
    });

  // find expected bands
  cy.findByRole("heading", { name: /the wandering bunnies/i }).should("exist");
  cy.findByRole("heading", { name: /shamrock pete/i }).should("exist");
  cy.findByRole("heading", { name: /the joyous nun riot/i }).should("exist");
});
