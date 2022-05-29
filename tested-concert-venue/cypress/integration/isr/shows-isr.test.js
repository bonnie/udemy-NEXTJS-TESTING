it("skips client-side javascript, confirming data from ISR cache", () => {
  // reference: https://glebbahmutov.com/blog/ssr-e2e/
  cy.request("/shows")
    .its("body")
    .then((html) => {
      // remove all JavaScript so that it doesn't override the static generation
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHtml);
    });

  cy.findAllByText(/2022 apr 1[456]/i).should("have.length.of", 3);
});
